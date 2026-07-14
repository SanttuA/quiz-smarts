import type { MultipleChoiceQuestion } from '../../../types'
import {
  accessibilityEvaluationReference,
  axeReference,
  lighthouseReference,
  waveReference,
  wcagContrastReference,
  wcagFocusReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'accessibility-testing.mcq.automation-limit',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'What does a clean automated accessibility scan prove?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'conformance', label: 'The page fully conforms to WCAG' },
      { id: 'usable', label: 'Every person with a disability can use the page' },
      {
        id: 'no-detected',
        label: 'The selected rules found no detectable violations in that state',
      },
      { id: 'certified', label: 'The scanning tool has certified the page' },
    ],
    correctChoiceId: 'no-detected',
    explanation:
      'Automated tools can only evaluate rules they can reliably determine in the tested page state. Conformance and usability also require knowledgeable human evaluation.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.mcq.lighthouse-score',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'How should a Lighthouse accessibility score be interpreted?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'coverage', label: 'As the percentage of all WCAG criteria that were tested' },
      {
        id: 'weighted',
        label: 'As a weighted average of Lighthouse’s automated accessibility audits',
      },
      { id: 'users', label: 'As the percentage of disabled users who can complete the page' },
      { id: 'manual', label: 'As a score calculated mainly from manual audits' },
    ],
    correctChoiceId: 'weighted',
    explanation:
      'Lighthouse calculates a weighted average from its automated accessibility audits. Manual audits are important guidance but do not contribute to the score.',
    reference: lighthouseReference,
  },
  {
    id: 'accessibility-testing.mcq.wave-icons',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'What does a yellow alert icon in WAVE mean?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'pass', label: 'The element definitely passes WCAG' },
      { id: 'failure', label: 'The element is always a confirmed WCAG failure' },
      { id: 'review', label: 'The element may need human review in context' },
      { id: 'ignored', label: 'The element was excluded from evaluation' },
    ],
    correctChoiceId: 'review',
    explanation:
      'WAVE alerts call attention to information that needs human judgment. They are prompts to investigate, not automatic passes or confirmed failures.',
    reference: waveReference,
  },
  {
    id: 'accessibility-testing.mcq.axe-incomplete',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'What should you do with an axe-core result classified as incomplete?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'pass', label: 'Count it as a definite pass' },
      { id: 'delete', label: 'Delete it because it is a tool error' },
      { id: 'review', label: 'Review the affected element manually' },
      { id: 'violation', label: 'Count it as a confirmed violation without inspection' },
    ],
    correctChoiceId: 'review',
    explanation:
      'Axe returns incomplete results when it cannot determine the outcome with sufficient certainty. A person must inspect the element and its context.',
    reference: axeReference,
  },
  {
    id: 'accessibility-testing.mcq.keyboard-trap',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'Which check is most useful for finding an accidental keyboard focus trap?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'pointer', label: 'Click every control with a pointer' },
      { id: 'tab', label: 'Navigate forward with Tab and backward with Shift+Tab' },
      { id: 'zoom', label: 'Zoom the page to 200%' },
      { id: 'html', label: 'Validate only the static HTML source' },
    ],
    correctChoiceId: 'tab',
    explanation:
      'Moving through the interface with Tab and Shift+Tab reveals whether focus can reach, operate, and leave interactive components in both directions.',
    reference: wcagFocusReference,
  },
  {
    id: 'accessibility-testing.mcq.icon-button-name',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'A button contains only an unlabeled trash-can icon. What is the key issue?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'color', label: 'The button must use a red background' },
      { id: 'name', label: 'The button lacks a meaningful accessible name' },
      { id: 'tabindex', label: 'Every button must have tabindex="0"' },
      { id: 'title', label: 'Every button must have a title attribute' },
    ],
    correctChoiceId: 'name',
    explanation:
      'An icon-only button still needs an accessible name such as “Delete message,” supplied by visible text or a reliable naming technique.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.mcq.native-button',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'Which implementation is the strongest starting point for a clickable action?',
    instruction: 'Choose one answer.',
    choices: [
      {
        id: 'button',
        label: '<button type="button">Save</button>',
        code: '<button type="button">Save</button>',
      },
      {
        id: 'div',
        label: '<div onclick="save()">Save</div>',
        code: '<div onclick="save()">Save</div>',
      },
      {
        id: 'span',
        label: '<span role="button">Save</span>',
        code: '<span role="button">Save</span>',
      },
      {
        id: 'image',
        label: '<img src="save.svg" onclick="save()">',
        code: '<img src="save.svg" onclick="save()">',
      },
    ],
    correctChoiceId: 'button',
    explanation:
      'A native button includes button semantics, keyboard focusability, and expected activation behavior. Recreating those features on a generic element is error-prone.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.mcq.text-contrast',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'What is the WCAG AA minimum contrast ratio for normal-sized text?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'two', label: '2:1' },
      { id: 'three', label: '3:1' },
      { id: 'four-five', label: '4.5:1' },
      { id: 'seven', label: '7:1' },
    ],
    correctChoiceId: 'four-five',
    explanation:
      'WCAG 2.2 Level AA requires at least 4.5:1 for normal text. Qualifying large text has a 3:1 minimum, and the criterion defines limited exceptions.',
    reference: wcagContrastReference,
  },
  {
    id: 'accessibility-testing.mcq.decorative-image',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt:
      'How should a purely decorative HTML image normally be exposed to assistive technology?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'filename', label: 'Use the file name as its alt text' },
      { id: 'empty', label: 'Give it an empty alt attribute: alt=""' },
      { id: 'omit', label: 'Omit the alt attribute' },
      { id: 'decorative', label: 'Use alt="decorative image"' },
    ],
    correctChoiceId: 'empty',
    explanation:
      'An empty alt attribute tells assistive technology that an image adds no information. Omitting alt can cause some screen readers to announce the file name.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.mcq.dynamic-states',
    topicId: 'accessibility-testing',
    kind: 'multiple-choice',
    prompt: 'When should automated checks run in a dynamic user flow?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'initial', label: 'Only before JavaScript loads' },
      { id: 'release', label: 'Only once immediately before release' },
      { id: 'states', label: 'At meaningful states such as opened dialogs and validation errors' },
      { id: 'production', label: 'Only against the public production landing page' },
    ],
    correctChoiceId: 'states',
    explanation:
      'Many barriers appear only after interaction. Scanning important rendered states catches issues in dialogs, menus, errors, expanded content, and authenticated views.',
    reference: axeReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
