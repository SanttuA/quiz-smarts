import type { DragBlankQuestion } from '../../../types'
import {
  accessibilityEvaluationReference,
  axeReference,
  lighthouseReference,
  waveReference,
  wcagContrastReference,
  wcagFocusReference,
} from './shared'

export const dragBlankQuestions = [
  {
    id: 'accessibility-testing.drag.lighthouse-category',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Select the Lighthouse category for common accessibility audits.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Lighthouse category: ',
      after: '',
    },
    options: [
      { id: 'accessibility', label: 'Accessibility', code: 'Accessibility' },
      { id: 'performance', label: 'Performance', code: 'Performance' },
      { id: 'seo', label: 'SEO', code: 'SEO' },
    ],
    correctOptionId: 'accessibility',
    explanation:
      'The Accessibility category runs Lighthouse’s automated accessibility audits and links failures to guidance, while other categories evaluate different quality dimensions.',
    reference: lighthouseReference,
  },
  {
    id: 'accessibility-testing.drag.wave-red',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Complete the WAVE icon meaning.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'A red WAVE icon identifies an accessibility ',
      after: ' that needs investigation.',
    },
    options: [
      { id: 'error', label: 'error', code: 'error' },
      { id: 'feature', label: 'feature', code: 'feature' },
      { id: 'alert', label: 'alert', code: 'alert' },
    ],
    correctOptionId: 'error',
    explanation:
      'WAVE uses red icons for detected accessibility errors. The issue still needs contextual review so the team understands and fixes the user impact.',
    reference: waveReference,
  },
  {
    id: 'accessibility-testing.drag.axe-review',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the axe-core result group that requires human judgment.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Manually review results.',
      after: '',
    },
    options: [
      { id: 'incomplete', label: 'incomplete', code: 'incomplete' },
      { id: 'passes', label: 'passes', code: 'passes' },
      { id: 'violations', label: 'violations', code: 'violations' },
      { id: 'inapplicable', label: 'inapplicable', code: 'inapplicable' },
    ],
    correctOptionId: 'incomplete',
    explanation:
      'Incomplete results contain nodes for which axe-core could not reach a certain outcome. A tester must inspect them rather than treating them as passes.',
    reference: axeReference,
  },
  {
    id: 'accessibility-testing.drag.native-action',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the native element for this form action.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '<form>\n  ',
      after: ' type="submit">Create account</button>\n</form>',
    },
    options: [
      { id: 'button', label: '<button', code: '<button' },
      { id: 'div', label: '<div', code: '<div' },
      { id: 'span', label: '<span', code: '<span' },
    ],
    correctOptionId: 'button',
    explanation:
      'A button is the native element for an action. It supplies semantics and expected keyboard behavior without rebuilding them with ARIA and event handlers.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.drag.decorative-image',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the correct alternative for a decorative flourish.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '<img src="flourish.svg" ',
      after: '>',
    },
    options: [
      { id: 'empty', label: 'alt=""', code: 'alt=""' },
      { id: 'filename', label: 'alt="flourish.svg"', code: 'alt="flourish.svg"' },
      { id: 'word', label: 'alt="image"', code: 'alt="image"' },
    ],
    correctOptionId: 'empty',
    explanation:
      'Empty alt text communicates that the image is decorative and should be skipped. Repeating a file name or the word “image” adds noise without meaning.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.drag.input-description',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Associate this input with its existing hint text.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '<input id="password" ',
      after: '="password-hint">\n<p id="password-hint">Use at least 12 characters.</p>',
    },
    options: [
      { id: 'describedby', label: 'aria-describedby', code: 'aria-describedby' },
      { id: 'hidden', label: 'aria-hidden', code: 'aria-hidden' },
      { id: 'expanded', label: 'aria-expanded', code: 'aria-expanded' },
    ],
    correctOptionId: 'describedby',
    explanation:
      'aria-describedby points to supplementary text that describes a control. The input still needs its primary accessible name, normally from a label.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.drag.reverse-keyboard',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the standard shortcut for moving focus backward.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '',
      after: ' moves to the previous focusable element.',
    },
    options: [
      { id: 'shift-tab', label: 'Shift+Tab', code: 'Shift+Tab' },
      { id: 'escape', label: 'Escape', code: 'Escape' },
      { id: 'enter', label: 'Enter', code: 'Enter' },
      { id: 'space', label: 'Space', code: 'Space' },
    ],
    correctOptionId: 'shift-tab',
    explanation:
      'Shift+Tab normally reverses sequential focus navigation. Testing forward and backward movement can expose illogical order and focus traps.',
    reference: wcagFocusReference,
  },
  {
    id: 'accessibility-testing.drag.large-contrast',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the WCAG AA contrast minimum for qualifying large text.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Large text minimum: ',
      after: '',
    },
    options: [
      { id: 'three', label: '3:1', code: '3:1' },
      { id: 'four-five', label: '4.5:1', code: '4.5:1' },
      { id: 'seven', label: '7:1', code: '7:1' },
    ],
    correctOptionId: 'three',
    explanation:
      'Qualifying large-scale text has a minimum contrast ratio of 3:1 at WCAG Level AA. Normal text generally requires at least 4.5:1.',
    reference: wcagContrastReference,
  },
  {
    id: 'accessibility-testing.drag.focus-selector',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the selector that preserves a visible keyboard focus indicator.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'a',
      after: ' { outline: 3px solid currentColor; }',
    },
    options: [
      { id: 'focus-visible', label: ':focus-visible', code: ':focus-visible' },
      { id: 'hover', label: ':hover', code: ':hover' },
      { id: 'active', label: ':active', code: ':active' },
    ],
    correctOptionId: 'focus-visible',
    explanation:
      ':focus-visible can provide a clear focus indicator for keyboard interaction. Hover and active states do not show which element currently has keyboard focus.',
    reference: wcagFocusReference,
  },
  {
    id: 'accessibility-testing.drag.scan-state',
    topicId: 'accessibility-testing',
    kind: 'drag-blank',
    prompt: 'Choose the most valuable point to scan a dialog component.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Render page → ',
      after: ' → run axe → review results',
    },
    options: [
      { id: 'open', label: 'open the dialog', code: 'open the dialog' },
      { id: 'remove', label: 'remove the dialog', code: 'remove the dialog' },
      { id: 'disable', label: 'disable all scripts', code: 'disable all scripts' },
    ],
    correctOptionId: 'open',
    explanation:
      'Opening the dialog exposes its rendered semantics, controls, and relationships to the scanner. Important interactive states need checks of their own.',
    reference: axeReference,
  },
] as const satisfies readonly DragBlankQuestion[]
