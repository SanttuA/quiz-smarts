import type { CheatSheetSection } from '../../types'

export const robotFrameworkCheatSheet = [
  {
    id: 'anatomy',
    title: 'Suite anatomy',
    summary: 'Robot data is organized into readable sections.',
    items: [
      {
        term: 'Settings',
        detail: 'Imports libraries and resources and configures suite-level metadata.',
        code: '*** Settings ***\nLibrary    Collections\nResource   shared.resource',
      },
      {
        term: 'Variables',
        detail: 'Defines values available throughout the suite file.',
        code: '*** Variables ***\n${BASE_URL}    https://example.test',
      },
      {
        term: 'Test Cases / Tasks',
        detail: 'Contains named scenarios composed from keyword calls.',
        code: '*** Test Cases ***\nHealth check\n    Status Should Be    200',
      },
      {
        term: 'Keywords',
        detail: 'Builds reusable domain-level actions from lower-level keywords.',
      },
    ],
  },
  {
    id: 'spacing',
    title: 'Files and spacing',
    summary: 'Whitespace separates cells, so visible alignment matters.',
    items: [
      {
        term: 'Cell separator',
        detail: 'Use two or more spaces, or a tab. Four spaces are recommended for clarity.',
      },
      {
        term: 'File extensions',
        detail: 'Suites normally use .robot; dedicated resource files should use .resource.',
      },
      {
        term: 'Escaping',
        detail:
          'Use ${SPACE}, ${EMPTY}, or a backslash when whitespace is data rather than a separator.',
      },
    ],
  },
  {
    id: 'variables',
    title: 'Variables and scope',
    summary: 'The sigil communicates how a value is used.',
    items: [
      { term: 'Scalar', detail: 'Stores one value.', code: '${name}' },
      { term: 'List', detail: 'Expands values as positional arguments.', code: '@{users}' },
      { term: 'Dictionary', detail: 'Expands key-value pairs.', code: '&{config}' },
      {
        term: 'Scope',
        detail:
          'Prefer local values; suite and global variables have wider effects and should be used deliberately.',
        code: 'VAR    ${message}    Hello    scope=LOCAL',
      },
    ],
  },
  {
    id: 'keywords',
    title: 'User keywords',
    summary: 'Name intent once and reuse it across tests.',
    items: [
      {
        term: 'Arguments',
        detail: 'Declare required and defaulted inputs with [Arguments].',
        code: 'Create user\n    [Arguments]    ${name}    ${role}=viewer\n    Log    ${name}: ${role}',
      },
      {
        term: 'Return values',
        detail: 'Assign a keyword result, or return from a user keyword with RETURN.',
        code: '${value}=    Get value\nRETURN    ${value}',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings, tags, and assertions',
    summary: 'Small settings make suites easier to select and maintain.',
    items: [
      {
        term: 'Test settings',
        detail: 'Use [Tags], [Setup], [Teardown], [Template], and [Timeout] inside a test.',
        code: '[Tags]    smoke    critical',
      },
      {
        term: 'Assertions',
        detail: 'BuiltIn is always available and includes Should Be Equal and many other checks.',
        code: 'Should Be Equal    ${actual}    ${expected}',
      },
    ],
  },
  {
    id: 'control-flow',
    title: 'Control flow and execution',
    summary: 'Native blocks read like structured pseudocode.',
    items: [
      {
        term: 'Blocks',
        detail: 'FOR, WHILE, IF / ELSE, and TRY / EXCEPT structures all close with END.',
        code: 'FOR    ${item}    IN    @{ITEMS}\n    Log    ${item}\nEND',
      },
      {
        term: 'Run suites',
        detail: 'Pass a file or directory to robot; use --include and --exclude to filter tags.',
        code: 'robot tests/\nrobot --include smoke tests/',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
