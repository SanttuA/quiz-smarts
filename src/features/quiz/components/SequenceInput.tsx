import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { SequenceItem, SequenceQuestion } from '../../../content/types'
import type { QuizResponse } from '../model/responses'
import styles from './QuestionInputs.module.css'

interface SequenceInputProps {
  question: SequenceQuestion
  value?: QuizResponse
  onChange: (response: QuizResponse) => void
  disabled: boolean
}

interface SortableRowProps {
  item: SequenceItem
  index: number
  count: number
  disabled: boolean
  onMove: (direction: -1 | 1) => void
}

function SortableRow({ item, index, count, disabled, onMove }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled,
  })

  function handleMoveKey(event: React.KeyboardEvent, direction: -1 | 1) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      onMove(direction)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`${styles.sequenceRow} ${isDragging ? styles.sequenceDragging : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <span className={styles.rowNumber} aria-hidden="true">
        {index + 1}
      </span>
      <code>{item.code}</code>
      <div className={styles.rowActions}>
        <button
          type="button"
          onClick={() => onMove(-1)}
          onKeyDown={(event) => handleMoveKey(event, -1)}
          disabled={disabled || index === 0}
          aria-label={`Move ${item.code} up`}
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          onKeyDown={(event) => handleMoveKey(event, 1)}
          disabled={disabled || index === count - 1}
          aria-label={`Move ${item.code} down`}
        >
          ↓
        </button>
        <button
          type="button"
          className={styles.dragHandle}
          disabled={disabled}
          aria-label={`Drag ${item.code}`}
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
      </div>
    </div>
  )
}

export function SequenceInput({ question, value, onChange, disabled }: SequenceInputProps) {
  const itemIds =
    value?.kind === 'sequence'
      ? value.itemIds
      : question.items.map((sequenceItem) => sequenceItem.id)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function updateOrder(nextItemIds: string[]) {
    onChange({ kind: 'sequence', itemIds: nextItemIds })
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return
    const oldIndex = itemIds.indexOf(String(event.active.id))
    const newIndex = itemIds.indexOf(String(event.over.id))
    if (oldIndex >= 0 && newIndex >= 0) updateOrder(arrayMove(itemIds, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className={styles.sequenceList} aria-label="Lines to order">
          {itemIds.map((itemId, index) => {
            const item = question.items.find((candidate) => candidate.id === itemId)
            if (!item) return null
            return (
              <SortableRow
                key={item.id}
                item={item}
                index={index}
                count={itemIds.length}
                disabled={disabled}
                onMove={(direction) => {
                  const nextIndex = index + direction
                  if (nextIndex >= 0 && nextIndex < itemIds.length) {
                    updateOrder(arrayMove(itemIds, index, nextIndex))
                  }
                }}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}
