import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { DragBlankQuestion, QuestionChoice } from '../../../content/types'
import type { QuizResponse } from '../model/responses'
import styles from './QuestionInputs.module.css'

interface DragBlankInputProps {
  question: DragBlankQuestion
  value?: QuizResponse
  onChange: (response: QuizResponse) => void
  disabled: boolean
}

interface DraggableChipProps {
  option: QuestionChoice
  isSelected: boolean
  disabled: boolean
}

function DraggableChip({ option, isSelected, disabled }: DraggableChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: option.id,
    disabled,
  })

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`${styles.dragOption} ${isSelected ? styles.dragOptionSelected : ''} ${isDragging ? styles.dragging : ''}`}
      style={{ transform: CSS.Translate.toString(transform) }}
      disabled={disabled}
      aria-label={`Drag ${option.label} to the blank`}
      {...listeners}
      {...attributes}
    >
      <span className={styles.grip} aria-hidden="true">
        ⠿
      </span>
      <code>{option.code ?? option.label}</code>
    </button>
  )
}

interface DropTemplateProps {
  question: DragBlankQuestion
  selectedOption?: QuestionChoice
  disabled: boolean
  onClear: () => void
}

function DropTemplate({ question, selectedOption, disabled, onClear }: DropTemplateProps) {
  const { setNodeRef, isOver } = useDroppable({ id: `${question.id}-blank`, disabled })

  return (
    <div className={styles.codeTemplate}>
      <span>{question.template.before}</span>
      <button
        ref={setNodeRef}
        type="button"
        className={`${styles.dropTarget} ${isOver ? styles.dropTargetActive : ''}`}
        onClick={onClear}
        disabled={disabled}
        aria-label={
          selectedOption ? `Blank contains ${selectedOption.label}` : 'Empty answer blank'
        }
      >
        {selectedOption?.code ?? selectedOption?.label ?? 'drop here'}
      </button>
      <span>{question.template.after}</span>
    </div>
  )
}

export function DragBlankInput({ question, value, onChange, disabled }: DragBlankInputProps) {
  const selectedId = value?.kind === 'drag-blank' ? value.optionId : undefined
  const selectedOption = question.options.find((option) => option.id === selectedId)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  function handleDragEnd(event: DragEndEvent) {
    if (event.over?.id === `${question.id}-blank`) {
      onChange({ kind: 'drag-blank', optionId: String(event.active.id) })
    }
  }

  return (
    <div className={styles.dragBlank}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DropTemplate
          question={question}
          selectedOption={selectedOption}
          disabled={disabled}
          onClear={() => {
            if (selectedId && !disabled) onChange({ kind: 'drag-blank', optionId: '' })
          }}
        />
        <div className={styles.optionBank} aria-label="Draggable answer options">
          {question.options.map((option) => (
            <DraggableChip
              key={option.id}
              option={option}
              isSelected={selectedId === option.id}
              disabled={disabled}
            />
          ))}
        </div>
      </DndContext>

      <fieldset className={styles.directOptions} disabled={disabled}>
        <legend>Or select an answer</legend>
        <div>
          {question.options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={`${question.id}-options`}
                value={option.id}
                checked={selectedId === option.id}
                onChange={() => onChange({ kind: 'drag-blank', optionId: option.id })}
              />
              <code>{option.code ?? option.label}</code>
            </label>
          ))}
        </div>
      </fieldset>
      <span className={styles.inputHint}>Drag to the blank or select an option directly.</span>
    </div>
  )
}
