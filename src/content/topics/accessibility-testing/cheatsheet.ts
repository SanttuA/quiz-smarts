import type { CheatSheetSection } from '../../types'
import {
  accessibilityEvaluationReference,
  ariaDialogReference,
  axeReference,
  lighthouseReference,
  waveReference,
  wcagContrastReference,
  wcagFocusReference,
  wcagKeyboardTrapReference,
} from './questions/shared'

export const accessibilityTestingCheatSheet = [
  {
    id: 'testing-strategy',
    title: 'Layer the evidence',
    summary: 'Automation starts the investigation; people complete it.',
    items: [
      {
        term: 'Automated scans',
        detail:
          'Run repeatable rules early and often to catch detectable markup, naming, ARIA, and contrast defects.',
      },
      {
        term: 'Manual checks',
        detail:
          'Verify keyboard behavior, visible focus, reading order, meaningful alternatives, errors, and dynamic states.',
      },
      {
        term: 'Assistive technology',
        detail:
          'Use representative browser and screen-reader combinations to inspect names, roles, states, and announcements.',
      },
      {
        term: 'User evaluation',
        detail:
          'Include people with disabilities, while still evaluating against accessibility standards and a defined scope.',
      },
      {
        term: 'No single pass',
        detail:
          'A clean automated report or perfect score does not prove that a page conforms to WCAG or is usable.',
      },
    ],
    references: [accessibilityEvaluationReference],
  },
  {
    id: 'lighthouse',
    title: 'Lighthouse',
    summary: 'Use a broad page audit to find common failures and establish a repeatable signal.',
    items: [
      {
        term: 'Run it',
        detail:
          'Use the Lighthouse panel in Chrome DevTools, the command line, a Node module, or Lighthouse CI.',
      },
      {
        term: 'Interpret the score',
        detail:
          'The accessibility score is a weighted average of automated audits, not a conformance percentage.',
      },
      {
        term: 'All-or-nothing audits',
        detail:
          'An individual accessibility audit does not award partial points when only some matching elements pass.',
      },
      {
        term: 'Manual audits',
        detail:
          'Review Lighthouse’s manual-check guidance even though those checks do not contribute to the score.',
      },
      {
        term: 'Test real states',
        detail:
          'Audit authenticated pages and important UI states, not only the public landing page.',
      },
    ],
    references: [lighthouseReference],
  },
  {
    id: 'axe',
    title: 'axe',
    summary: 'Bring rule-based accessibility checks into development and automated tests.',
    items: [
      {
        term: 'Browser scan',
        detail:
          'Use axe DevTools to scan a full page, inspect affected elements, and open rule-specific remediation guidance.',
      },
      {
        term: 'Test integration',
        detail: 'Run axe-core after rendering a meaningful component, page, or user-flow state.',
        code: 'const results = await axe.run(document)\nexpect(results.violations).toHaveLength(0)',
      },
      {
        term: 'Incomplete results',
        detail:
          'Treat incomplete nodes as items needing human review, not as automatic passes or confirmed violations.',
      },
      {
        term: 'Stable rules',
        detail:
          'Pin and deliberately update axe-core so rule changes are reviewed instead of silently changing CI.',
      },
      {
        term: 'Fix the interface',
        detail:
          'Prefer correcting semantic HTML and component behavior over suppressing a rule without evidence.',
      },
    ],
    references: [axeReference],
  },
  {
    id: 'wave',
    title: 'WAVE',
    summary: 'Evaluate accessibility information in the visual context of the rendered page.',
    items: [
      {
        term: 'Red errors',
        detail:
          'Investigate likely accessibility errors and confirm their effect in the rendered interface.',
      },
      {
        term: 'Yellow alerts',
        detail:
          'Review potential concerns that require human judgment; an alert is not automatically a failure.',
      },
      {
        term: 'Green features',
        detail:
          'Verify detected accessibility features. The goal is not to remove every non-error icon.',
      },
      {
        term: 'Extension',
        detail:
          'Use a WAVE browser extension for local, private, authenticated, or heavily scripted content.',
      },
      {
        term: 'Structure view',
        detail:
          'Turn off styles and inspect headings, landmarks, labels, alternatives, and reading order in context.',
      },
    ],
    references: [waveReference],
  },
  {
    id: 'keyboard-focus',
    title: 'Keyboard and focus',
    summary: 'Operate the entire flow without relying on a pointer.',
    items: [
      {
        term: 'Move both ways',
        detail: 'Use Tab and Shift+Tab to reach every interactive element in a logical order.',
        code: 'Tab → next\nShift+Tab → previous',
      },
      {
        term: 'Operate controls',
        detail:
          'Activate controls with their expected keys and test composite widgets against their documented pattern.',
      },
      {
        term: 'Visible focus',
        detail: 'Every keyboard-operable control needs a visible focus indicator.',
        code: ':focus-visible { outline: 3px solid currentColor; }',
      },
      {
        term: 'No accidental trap',
        detail:
          'Focus must be able to leave a component, except while intentionally contained in an operable modal dialog.',
      },
      {
        term: 'Managed focus',
        detail:
          'After dialogs, errors, or route changes, place focus where the user can understand and continue the task.',
      },
    ],
    references: [wcagFocusReference, wcagKeyboardTrapReference, ariaDialogReference],
  },
  {
    id: 'semantics-perception',
    title: 'Semantics and perception',
    summary: 'Inspect what users can perceive and what assistive technology exposes.',
    items: [
      {
        term: 'Native first',
        detail:
          'Prefer native buttons, links, inputs, headings, and landmarks before adding ARIA to generic elements.',
      },
      {
        term: 'Name, role, state',
        detail:
          'Check that controls expose a meaningful accessible name, the correct role, and current state or value.',
      },
      {
        term: 'Text contrast',
        detail:
          'WCAG AA requires at least 4.5:1 for normal text and 3:1 for qualifying large text, with defined exceptions.',
      },
      {
        term: 'Alternatives',
        detail:
          'Give informative images equivalent text; use an empty alt attribute for images that are truly decorative.',
        code: '<img src="divider.svg" alt="">',
      },
      {
        term: 'Zoom and reflow',
        detail:
          'Test zoom, narrow viewports, high contrast or forced colors, reduced motion, and text spacing where relevant.',
      },
    ],
    references: [accessibilityEvaluationReference, wcagContrastReference],
  },
] as const satisfies readonly CheatSheetSection[]
