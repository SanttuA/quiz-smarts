import type { SequenceQuestion } from '../../../types'
import {
  jmeterBestPracticesReference,
  jmeterBuildWebPlanReference,
  jmeterComponentReference,
  jmeterDashboardReference,
  jmeterGettingStartedReference,
  jmeterRemoteTestingReference,
  jmeterTestPlanReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'jmeter.sequence.minimal-http-plan',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange the hierarchy of a minimal JMeter web test plan.',
    instruction:
      'Nest the workload and HTTP sampler beneath the root plan, then validate the response.',
    items: [
      { id: 'plan', code: 'Test Plan' },
      { id: 'threads', code: '└─ Thread Group' },
      { id: 'request', code: '   └─ HTTP Request: GET /health' },
      { id: 'assertion', code: '      └─ Response Assertion: contains "ok"' },
    ],
    correctOrder: ['plan', 'threads', 'request', 'assertion'],
    explanation:
      'The Thread Group belongs under the Test Plan, its sampler sends the request, and the child assertion validates that sampler response.',
    reference: jmeterBuildWebPlanReference,
  },
  {
    id: 'jmeter.sequence.design-workload',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange the preparation of a controlled load test before traffic begins.',
    instruction:
      'Establish permission and goals, model the workload, prepare the environment, then validate with a small run.',
    items: [
      { id: 'permission', code: 'Confirm authorization, owners, schedule, and stop conditions' },
      { id: 'goals', code: 'Define transactions and response-time, throughput, and error targets' },
      { id: 'model', code: 'Choose concurrency, ramp-up, pacing, duration, and test data' },
      { id: 'prepare', code: 'Prepare monitoring and a controlled target environment' },
      { id: 'validate', code: 'Validate the scenario with only a few threads' },
      { id: 'load', code: 'Run the approved workload and watch stop conditions' },
    ],
    correctOrder: ['permission', 'goals', 'model', 'prepare', 'validate', 'load'],
    explanation:
      'Authorization and measurable goals constrain the workload design, which must be prepared and validated before meaningful load is generated.',
    reference: jmeterBestPracticesReference,
  },
  {
    id: 'jmeter.sequence.parameterized-login',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange a data-driven login scenario using a CSV file.',
    instruction:
      'Prepare the data, expose its columns as variables, use them, then validate the response.',
    items: [
      { id: 'file', code: 'Create accounts.csv with username,password rows' },
      { id: 'config', code: 'Add CSV Data Set Config with variables username,password' },
      { id: 'request', code: 'Send POST /login with ${username} and ${password}' },
      { id: 'assertion', code: 'Assert that the login response is successful' },
      { id: 'small-run', code: 'Run a small validation and confirm different rows are used' },
    ],
    correctOrder: ['file', 'config', 'request', 'assertion', 'small-run'],
    explanation:
      'The data file and its variable mapping must exist before a sampler can resolve the credentials, after which validation confirms the flow.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.sequence.correlated-token',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange a correlated API flow that reuses a dynamic access token.',
    instruction:
      'Obtain the token, extract it, send it with the protected request, and validate access.',
    items: [
      { id: 'login', code: 'Send POST /login' },
      { id: 'extract', code: 'Extract $.access_token into the token variable' },
      { id: 'header', code: 'Set Authorization: Bearer ${token}' },
      { id: 'profile', code: 'Send GET /profile' },
      { id: 'assert', code: 'Assert that the profile response contains the expected user' },
    ],
    correctOrder: ['login', 'extract', 'header', 'profile', 'assert'],
    explanation:
      'The login response must exist before its token can be extracted and supplied to the protected request that the final assertion validates.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.sequence-session-cookies',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange a session-based checkout flow for each JMeter thread.',
    instruction:
      'Configure cookie handling, establish a session, then exercise and validate checkout.',
    items: [
      { id: 'manager', code: 'Add HTTP Cookie Manager to the Thread Group' },
      { id: 'login', code: 'Send the login request and receive the session cookie' },
      { id: 'cart', code: 'Send the add-to-cart request with the stored cookie' },
      { id: 'checkout', code: 'Send the checkout request in the same thread' },
      { id: 'assert', code: 'Assert that checkout returns a valid order identifier' },
    ],
    correctOrder: ['manager', 'login', 'cart', 'checkout', 'assert'],
    explanation:
      'Cookie management must be configured before login so the resulting session state follows that thread through cart and checkout requests.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.sequence-paced-transaction',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange the runtime flow of a paced product-purchase transaction.',
    instruction:
      'Browse, pause like a user, add the item, pause again, then complete the transaction.',
    items: [
      { id: 'browse', code: 'GET /products' },
      { id: 'browse-think', code: 'Apply think time before the next user action' },
      { id: 'add', code: 'POST /cart/items' },
      { id: 'cart-think', code: 'Apply think time before checkout' },
      { id: 'checkout', code: 'POST /checkout' },
      { id: 'transaction', code: 'Record the complete purchase transaction result' },
    ],
    correctOrder: ['browse', 'browse-think', 'add', 'cart-think', 'checkout', 'transaction'],
    explanation:
      'User actions occur in business order with intentional pauses, and the enclosing transaction result is complete only after its child requests finish.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.sequence-gui-to-cli',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange the workflow from constructing a plan to running production-style load.',
    instruction:
      'Build and debug lightly, remove expensive diagnostics, then run from the command line.',
    items: [
      { id: 'build', code: 'Build the JMX plan in the JMeter GUI' },
      { id: 'debug', code: 'Validate with a few threads and View Results Tree' },
      { id: 'fix', code: 'Fix failed requests, assertions, and dynamic data handling' },
      { id: 'trim', code: 'Disable or remove resource-heavy diagnostic listeners' },
      { id: 'save', code: 'Save the validated test plan' },
      { id: 'run', code: 'Run jmeter -n -t test.jmx -l results.jtl' },
    ],
    correctOrder: ['build', 'debug', 'fix', 'trim', 'save', 'run'],
    explanation:
      'The GUI supports construction and small-run debugging, while a cleaned and saved plan should use CLI mode for the actual load.',
    reference: jmeterGettingStartedReference,
  },
  {
    id: 'jmeter.sequence-html-report',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange a CLI run that produces an HTML dashboard for analysis.',
    instruction:
      'Prepare clean outputs, execute the plan, then open and interpret the generated report.',
    items: [
      { id: 'clean', code: 'Choose a new results file and an empty report directory' },
      {
        id: 'run',
        code: 'Run jmeter -n -t checkout.jmx -l results.jtl -e -o report',
      },
      { id: 'complete', code: 'Wait for the load test and report generation to finish' },
      { id: 'open', code: 'Open report/index.html' },
      { id: 'review', code: 'Review errors, percentiles, throughput, and time-series graphs' },
    ],
    correctOrder: ['clean', 'run', 'complete', 'open', 'review'],
    explanation:
      'JMeter requires suitable result and output paths before the run, then generates the dashboard that can be reviewed after completion.',
    reference: jmeterDashboardReference,
  },
  {
    id: 'jmeter.sequence-analyze-results',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange a trustworthy review of a completed load-test result.',
    instruction: 'Verify evidence quality before judging the service against its targets.',
    items: [
      { id: 'profile', code: 'Confirm the intended load profile and test duration were achieved' },
      { id: 'generator', code: 'Check generator CPU, memory, network, heap, and logs' },
      { id: 'errors', code: 'Inspect error rate, assertion failures, and response codes' },
      { id: 'timing', code: 'Review percentiles and throughput over time' },
      { id: 'target', code: 'Correlate changes with target-system monitoring' },
      { id: 'criteria', code: 'Compare the valid run with the predefined acceptance criteria' },
    ],
    correctOrder: ['profile', 'generator', 'errors', 'timing', 'target', 'criteria'],
    explanation:
      'A run is interpretable only after confirming its workload and generator health, then combining errors, performance distributions, and target telemetry.',
    reference: jmeterDashboardReference,
  },
  {
    id: 'jmeter.sequence-distributed-run',
    topicId: 'jmeter',
    kind: 'sequence',
    prompt: 'Arrange the safe preparation of a distributed JMeter run.',
    instruction:
      'Validate locally, prepare identical engines, calculate total load, then launch and monitor.',
    items: [
      { id: 'validate', code: 'Validate the plan in CLI mode on one load generator' },
      { id: 'engines', code: 'Install matching JMeter and Java setups on every remote engine' },
      { id: 'data', code: 'Place required CSV data and plug-ins on every engine' },
      { id: 'calculate', code: 'Multiply threads per plan by engine count to confirm total load' },
      { id: 'servers', code: 'Start jmeter-server on the approved remote engines' },
      { id: 'run', code: 'Launch the remote run from a CLI controller' },
      { id: 'monitor', code: 'Monitor generators, network, target health, and stop conditions' },
    ],
    correctOrder: ['validate', 'engines', 'data', 'calculate', 'servers', 'run', 'monitor'],
    explanation:
      'Distributed load requires a validated plan, equivalent engine dependencies and data, and an explicit total-load calculation before launch.',
    reference: jmeterRemoteTestingReference,
  },
] as const satisfies readonly SequenceQuestion[]
