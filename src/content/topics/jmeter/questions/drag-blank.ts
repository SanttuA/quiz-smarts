import type { DragBlankQuestion } from '../../../types'
import {
  jmeterComponentReference,
  jmeterDashboardReference,
  jmeterTestPlanReference,
} from './shared'

export const dragBlankQuestions = [
  {
    id: 'jmeter.drag-thread-group',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Add the workload element beneath the Test Plan.',
    instruction: 'Choose the element that owns threads, ramp-up, and loops.',
    template: { before: 'Test Plan\n└─ ', after: '\n   └─ HTTP Request' },
    options: [
      { id: 'thread-group', label: 'Thread Group', code: 'Thread Group' },
      { id: 'header-manager', label: 'HTTP Header Manager', code: 'HTTP Header Manager' },
      { id: 'assertion', label: 'Response Assertion', code: 'Response Assertion' },
      { id: 'listener', label: 'Summary Report', code: 'Summary Report' },
    ],
    correctOptionId: 'thread-group',
    explanation:
      'A Thread Group is the required workload container under which controllers and samplers execute for each configured virtual-user thread.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.drag-http-sampler',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Send a GET request to the health endpoint.',
    instruction: 'Choose the sampler that performs an HTTP call.',
    template: { before: 'Thread Group\n└─ ', after: '\n   Method: GET\n   Path: /health' },
    options: [
      { id: 'http', label: 'HTTP Request', code: 'HTTP Request' },
      { id: 'constant', label: 'Constant Timer', code: 'Constant Timer' },
      { id: 'csv', label: 'CSV Data Set Config', code: 'CSV Data Set Config' },
      { id: 'json', label: 'JSON Extractor', code: 'JSON Extractor' },
    ],
    correctOptionId: 'http',
    explanation:
      'The HTTP Request sampler sends an HTTP or HTTPS request and records its result for assertions, listeners, and reports.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-request-defaults',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Share the HTTPS protocol and API host across every HTTP sampler in the Thread Group.',
    instruction: 'Choose the configuration element for common request fields.',
    template: {
      before: 'Thread Group\n├─ ',
      after: '\n│  Protocol: https\n│  Server: api.example.test',
    },
    options: [
      { id: 'defaults', label: 'HTTP Request Defaults', code: 'HTTP Request Defaults' },
      { id: 'headers', label: 'HTTP Header Manager', code: 'HTTP Header Manager' },
      { id: 'cookies', label: 'HTTP Cookie Manager', code: 'HTTP Cookie Manager' },
      { id: 'cache', label: 'HTTP Cache Manager', code: 'HTTP Cache Manager' },
    ],
    correctOptionId: 'defaults',
    explanation:
      'HTTP Request Defaults provides shared protocol, host, port, path, and related values to HTTP samplers within its scope.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-cookie-manager',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Preserve session cookies between login and checkout requests for each virtual user.',
    instruction: 'Choose the component that manages HTTP cookies.',
    template: { before: 'Thread Group\n├─ ', after: '\n├─ Login\n└─ Checkout' },
    options: [
      { id: 'cookies', label: 'HTTP Cookie Manager', code: 'HTTP Cookie Manager' },
      { id: 'headers', label: 'HTTP Header Manager', code: 'HTTP Header Manager' },
      { id: 'defaults', label: 'HTTP Request Defaults', code: 'HTTP Request Defaults' },
      {
        id: 'authorization',
        label: 'HTTP Authorization Manager',
        code: 'HTTP Authorization Manager',
      },
    ],
    correctOptionId: 'cookies',
    explanation:
      'HTTP Cookie Manager stores cookies received by a thread and supplies applicable cookies to its later HTTP requests.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-csv-config',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Load username and password values from accounts.csv.',
    instruction: 'Choose the configuration element for delimited test data.',
    template: {
      before: 'Thread Group\n├─ ',
      after: '\n│  Filename: accounts.csv\n│  Variables: username,password',
    },
    options: [
      { id: 'csv', label: 'CSV Data Set Config', code: 'CSV Data Set Config' },
      { id: 'user-parameters', label: 'User Parameters', code: 'User Parameters' },
      { id: 'counter', label: 'Counter', code: 'Counter' },
      { id: 'random', label: 'Random Variable', code: 'Random Variable' },
    ],
    correctOptionId: 'csv',
    explanation:
      'CSV Data Set Config reads rows from a file and exposes named columns as variables during each test iteration.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-json-extractor',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Capture the access token returned by the login JSON response.',
    instruction: 'Choose the post-processor that evaluates a JSONPath expression.',
    template: {
      before: 'Login HTTP Request\n└─ ',
      after: '\n   Variable: token\n   JSONPath: $.access_token',
    },
    options: [
      { id: 'json-extractor', label: 'JSON Extractor', code: 'JSON Extractor' },
      { id: 'json-assertion', label: 'JSON Assertion', code: 'JSON Assertion' },
      { id: 'debug', label: 'Debug PostProcessor', code: 'Debug PostProcessor' },
      { id: 'xpath', label: 'XPath2 Extractor', code: 'XPath2 Extractor' },
    ],
    correctOptionId: 'json-extractor',
    explanation:
      'JSON Extractor selects data from a JSON response after the sampler and stores it under the configured variable name.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-response-assertion',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Fail the create-order sample if its response does not contain an orderId field.',
    instruction: 'Choose the component that validates response content.',
    template: { before: 'Create order HTTP Request\n└─ ', after: '\n   Pattern: "orderId"' },
    options: [
      { id: 'response', label: 'Response Assertion', code: 'Response Assertion' },
      { id: 'duration', label: 'Duration Assertion', code: 'Duration Assertion' },
      { id: 'size', label: 'Size Assertion', code: 'Size Assertion' },
      { id: 'compare', label: 'Compare Assertion', code: 'Compare Assertion' },
    ],
    correctOptionId: 'response',
    explanation:
      'Response Assertion checks selected response fields against text or regular-expression patterns and fails a nonmatching sample.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-constant-timer',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Pause for one second before each sampler in the checkout flow.',
    instruction: 'Choose the timer that applies one fixed delay.',
    template: { before: 'Checkout controller\n├─ ', after: '\n│  Thread delay: 1000 ms' },
    options: [
      { id: 'constant', label: 'Constant Timer', code: 'Constant Timer' },
      { id: 'uniform', label: 'Uniform Random Timer', code: 'Uniform Random Timer' },
      { id: 'precise', label: 'Precise Throughput Timer', code: 'Precise Throughput Timer' },
      { id: 'sync', label: 'Synchronizing Timer', code: 'Synchronizing Timer' },
    ],
    correctOptionId: 'constant',
    explanation:
      'A Constant Timer delays each sampler in its scope by the same configured number of milliseconds before execution.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-transaction-controller',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Measure login and profile retrieval as one complete sign-in transaction.',
    instruction: 'Choose the logical controller that can produce a combined transaction sample.',
    template: {
      before: 'Thread Group\n└─ ',
      after: ': Sign in\n   ├─ POST /login\n   └─ GET /profile',
    },
    options: [
      { id: 'transaction', label: 'Transaction Controller', code: 'Transaction Controller' },
      { id: 'loop', label: 'Loop Controller', code: 'Loop Controller' },
      { id: 'once', label: 'Once Only Controller', code: 'Once Only Controller' },
      { id: 'random', label: 'Random Controller', code: 'Random Controller' },
    ],
    correctOptionId: 'transaction',
    explanation:
      'A Transaction Controller groups child samplers and can create a combined sample. By default that sample excludes timer and pre/post-processor duration unless the include-duration option is enabled.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.drag-report-output',
    topicId: 'jmeter',
    kind: 'drag-blank',
    prompt: 'Choose the option that selects the HTML dashboard output directory.',
    instruction: 'Complete the reporting command with the directory option.',
    template: { before: 'jmeter -g results.jtl ', after: ' report' },
    options: [
      { id: 'output', label: '-o', code: '-o' },
      { id: 'log', label: '-l', code: '-l' },
      { id: 'test', label: '-t', code: '-t' },
      { id: 'jmeter-log', label: '-j', code: '-j' },
    ],
    correctOptionId: 'output',
    explanation:
      'The -o option names the empty output directory where JMeter writes the generated HTML dashboard and its assets.',
    reference: jmeterDashboardReference,
  },
] as const satisfies readonly DragBlankQuestion[]
