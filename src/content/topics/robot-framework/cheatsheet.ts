import type { CheatSheetSection } from '../../types'
import {
  robotControlStructuresReference,
  robotDataSectionsReference,
  robotParsingReference,
  robotTestCasesReference,
  robotUserKeywordsReference,
  robotVariablesReference,
} from './questions/shared'

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
      {
        term: 'Comments',
        detail:
          'Data in the Comments section is ignored. Use documentation, metadata, or Log when information must appear in outputs.',
      },
      {
        term: 'Directory suites',
        detail:
          'Put directory-level suite settings in an initialization file, typically __init__.robot.',
      },
    ],
    references: [robotDataSectionsReference],
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
        term: 'reStructuredText',
        detail:
          'Robot data can live in reStructuredText code blocks. Files ending in .robot.rst are parsed by default.',
      },
      {
        term: 'Escaping',
        detail:
          'Use ${SPACE}, ${EMPTY}, or a backslash when whitespace is data rather than a separator.',
      },
      {
        term: 'Continuation rows',
        detail: 'Start the first cell with ... to continue a long row on the next line.',
        code: 'Log Many    first    second\n...         third    fourth',
      },
    ],
    references: [robotParsingReference],
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
      {
        term: 'Automatic test name',
        detail: '${TEST_NAME} contains the name of the currently executing test case.',
        code: 'Log    Running ${TEST_NAME}',
      },
      {
        term: 'Environment variables',
        detail: 'Use percent-curly syntax to read string values from the operating system.',
        code: 'Log    Home is %{HOME}',
      },
      {
        term: 'Current data directory',
        detail:
          '${CURDIR} is the absolute path to the directory containing the current test data file.',
        code: 'File Should Exist    ${CURDIR}${/}data.json',
      },
    ],
    references: [robotVariablesReference],
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
      {
        term: 'Reusable files',
        detail:
          'Use Resource to import shared user keywords and Variables to import values from a variable file.',
        code: 'Resource     shared.resource\nVariables    config.py',
      },
    ],
    references: [robotUserKeywordsReference],
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
        term: 'Documentation and timeout',
        detail:
          '[Documentation] describes an individual test in outputs. [Timeout] limits how long it may run.',
        code: '[Documentation]    Verifies the happy path\n[Timeout]          30 seconds',
      },
      {
        term: 'Assertions',
        detail: 'BuiltIn is always available and includes Should Be Equal and many other checks.',
        code: 'Should Be Equal    ${actual}    ${expected}',
      },
      {
        term: 'Templates',
        detail: '[Template] applies one keyword to each following row of test data.',
        code: '[Template]    Login should fail\nbad-user      valid-pass\nvalid-user    bad-pass',
      },
      {
        term: 'Test lifecycle',
        detail:
          '[Setup] runs before the test body. [Teardown] runs afterward, even if the test fails.',
        code: '[Setup]       Open application\nCheck dashboard\n[Teardown]    Close application',
      },
    ],
    references: [robotTestCasesReference],
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
        term: 'Loop control',
        detail: 'CONTINUE skips to the next FOR or WHILE iteration. BREAK exits the loop entirely.',
      },
      {
        term: 'Error handling',
        detail:
          'EXCEPT handles matching failures, ELSE runs when no error occurs, and FINALLY always runs cleanup.',
        code: 'TRY\n    Fetch response\nEXCEPT\n    Log    Failed\nFINALLY\n    Close connection\nEND',
      },
      {
        term: 'Groups',
        detail: 'GROUP collects related steps under an optional name and closes with END.',
        code: 'GROUP    Submit credentials\n    Input Username    demo\nEND',
      },
      {
        term: 'Run suites',
        detail: 'Pass a file or directory to robot; use --include and --exclude to filter tags.',
        code: 'robot tests/\nrobot --include smoke tests/',
      },
      {
        term: 'Validate and rerun',
        detail:
          '--dryrun validates data without running library keywords. --rerunfailed selects failures from an earlier output file.',
        code: 'robot --dryrun tests/\nrobot --rerunfailed output.xml tests/',
      },
      {
        term: 'Output location',
        detail: '--outputdir (or -d) selects where generated output files are created.',
        code: 'robot --outputdir results tests/',
      },
    ],
    references: [robotControlStructuresReference],
  },
] as const satisfies readonly CheatSheetSection[]
