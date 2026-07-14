import type { TextBlankQuestion } from '../../../types'
import {
  accessibilityEvaluationReference,
  axeReference,
  wcagContrastReference,
  wcagFocusReference,
} from './shared'

export const textBlankQuestions = [
  {
    id: 'accessibility-testing.text.page-language',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Add the page language to this English document root.',
    instruction: 'Type the missing attribute and value.',
    template: {
      before: '<html ',
      after: '>',
    },
    canonicalAnswer: 'lang="en"',
    acceptedAnswers: ['lang="en"', "lang='en'"],
    explanation:
      'The lang attribute identifies the document’s default human language so assistive technology can apply suitable pronunciation and language rules.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.text.decorative-alt',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Complete the image markup for a purely decorative divider.',
    instruction: 'Type the missing attribute and value.',
    template: {
      before: '<img src="divider.svg" ',
      after: '>',
    },
    canonicalAnswer: 'alt=""',
    acceptedAnswers: ['alt=""', "alt=''"],
    explanation:
      'An explicitly empty alt attribute marks the image as decorative. Omitting alt altogether can cause assistive technology to announce unhelpful file information.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.text.form-label',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Associate this visible label with the email input.',
    instruction: 'Type the missing label attribute and value.',
    template: {
      before: '<label ',
      after: '>Email</label>\n<input id="email" type="email">',
    },
    canonicalAnswer: 'for="email"',
    acceptedAnswers: ['for="email"', "for='email'"],
    explanation:
      'A label’s for value matches its control’s id. This gives the input an accessible name and makes clicking the label focus the input.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.text.main-landmark',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Choose the native element that identifies the page’s primary content.',
    instruction: 'Include the angle brackets.',
    template: {
      before: '<header>…</header>\n',
      after: '\n  <h1>Account</h1>\n</main>',
    },
    canonicalAnswer: '<main>',
    acceptedAnswers: ['<main>'],
    explanation:
      'The main element creates the primary-content landmark, helping assistive-technology users bypass repeated page regions and navigate directly to the content.',
    reference: accessibilityEvaluationReference,
  },
  {
    id: 'accessibility-testing.text.axe-run',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Complete this axe-core call that scans the current document.',
    instruction: 'Type the missing function call.',
    template: {
      before: 'const results = await ',
      after: '\nconsole.log(results.violations)',
    },
    canonicalAnswer: 'axe.run(document)',
    acceptedAnswers: ['axe.run(document)', 'axe.run()'],
    explanation:
      'axe.run(document) evaluates the document and resolves with categorized results. Calling axe.run() without a context also uses the current document.',
    reference: axeReference,
  },
  {
    id: 'accessibility-testing.text.axe-violations',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Name the axe-core result property containing confirmed rule violations.',
    instruction: 'Type the missing property name.',
    template: {
      before: 'expect(results.',
      after: ').toHaveLength(0)',
    },
    canonicalAnswer: 'violations',
    acceptedAnswers: ['violations'],
    explanation:
      'The violations array contains rules that failed. Incomplete results are separate because they require manual review before an outcome can be determined.',
    reference: axeReference,
  },
  {
    id: 'accessibility-testing.text.focus-visible',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Complete the CSS selector for a keyboard-oriented focus indicator.',
    instruction: 'Include the leading colon.',
    template: {
      before: 'button',
      after: ' { outline: 3px solid currentColor; }',
    },
    canonicalAnswer: ':focus-visible',
    acceptedAnswers: [':focus-visible'],
    explanation:
      ':focus-visible lets the browser show author-defined focus styling when a visible focus indicator is most relevant, especially for keyboard interaction.',
    reference: wcagFocusReference,
  },
  {
    id: 'accessibility-testing.text.keyboard-forward',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Name the standard key used to move forward through focusable elements.',
    instruction: 'Type the key name.',
    template: {
      before: '',
      after: ' moves to the next focusable element.',
    },
    canonicalAnswer: 'Tab',
    acceptedAnswers: ['Tab', 'Tab key'],
    explanation:
      'Tab normally advances keyboard focus, while Shift+Tab moves backward. Testing both directions helps reveal missing targets, illogical order, and traps.',
    reference: wcagFocusReference,
  },
  {
    id: 'accessibility-testing.text.normal-contrast',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Complete the WCAG AA minimum contrast ratio for normal text.',
    instruction: 'Type the ratio.',
    template: {
      before: 'Normal text: ',
      after: ' minimum',
    },
    canonicalAnswer: '4.5:1',
    acceptedAnswers: ['4.5:1', '4.5 to 1'],
    explanation:
      'The minimum contrast ratio for normal text at WCAG Level AA is 4.5:1. Qualifying large text has a lower 3:1 threshold.',
    reference: wcagContrastReference,
  },
  {
    id: 'accessibility-testing.text.live-region',
    topicId: 'accessibility-testing',
    kind: 'text-blank',
    prompt: 'Make this non-urgent status message a polite live region.',
    instruction: 'Type the missing ARIA attribute and value.',
    template: {
      before: '<div ',
      after: '>Draft saved</div>',
    },
    canonicalAnswer: 'aria-live="polite"',
    acceptedAnswers: ['aria-live="polite"', "aria-live='polite'"],
    explanation:
      'A polite live region asks assistive technology to announce updated content at the next graceful opportunity instead of interrupting the current speech.',
    reference: accessibilityEvaluationReference,
  },
] as const satisfies readonly TextBlankQuestion[]
