import type { MultipleChoiceQuestion } from '../../../types'
import {
  jmeterBestPracticesReference,
  jmeterComponentReference,
  jmeterDashboardReference,
  jmeterGettingStartedReference,
  jmeterRemoteTestingReference,
  jmeterTestPlanReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'jmeter.mcq.expected-workload',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'Which test evaluates a service under its expected production workload?',
    instruction: 'Choose the test whose primary goal is expected-load behavior.',
    choices: [
      { id: 'load', label: 'A load test' },
      { id: 'spike', label: 'A spike test' },
      { id: 'stress', label: 'A stress test beyond expected capacity' },
      { id: 'functional', label: 'A single-user functional check' },
    ],
    correctChoiceId: 'load',
    explanation:
      'A load test applies a representative expected workload and checks whether response time, throughput, and reliability meet its goals.',
    reference: jmeterBestPracticesReference,
  },
  {
    id: 'jmeter.mcq.thread-group',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'What does the standard JMeter Thread Group primarily configure?',
    instruction: 'Choose the element that defines how virtual-user threads execute.',
    choices: [
      { id: 'workload', label: 'Threads, ramp-up, loops, and optional duration' },
      { id: 'headers', label: 'Only the HTTP headers sent by one request' },
      { id: 'dashboard', label: 'The charts rendered in the HTML dashboard' },
      { id: 'assertions', label: 'Only the validation rules for a response' },
    ],
    correctChoiceId: 'workload',
    explanation:
      'A Thread Group controls the number of threads and their scheduling, including ramp-up, repetition, and optional lifetime settings.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.mcq.ramp-up',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'A Thread Group has 20 threads and a 100-second ramp-up. What does ramp-up do?',
    instruction: 'Choose how JMeter schedules the starts of those threads.',
    choices: [
      { id: 'spread', label: 'It starts the threads gradually across roughly 100 seconds' },
      { id: 'pause', label: 'It starts all threads immediately, then pauses for 100 seconds' },
      { id: 'requests', label: 'It guarantees exactly 100 requests per second' },
      { id: 'timeout', label: 'It fails every request that takes over 100 seconds' },
    ],
    correctChoiceId: 'spread',
    explanation:
      'Ramp-up spreads thread starts over the configured period; with 20 threads in 100 seconds, starts are spaced about five seconds apart.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.mcq.http-defaults',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'Where should a plan place a protocol and host shared by many HTTP Request samplers?',
    instruction: 'Choose the configuration element that removes repeated request settings.',
    choices: [
      { id: 'defaults', label: 'HTTP Request Defaults' },
      { id: 'assertion', label: 'Response Assertion' },
      { id: 'timer', label: 'Constant Timer' },
      { id: 'listener', label: 'View Results Tree' },
    ],
    correctChoiceId: 'defaults',
    explanation:
      'HTTP Request Defaults supplies shared values to HTTP samplers in its scope while still allowing an individual sampler to override them.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.mcq.fast-error',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'Why should an HTTP load test add assertions to important responses?',
    instruction: 'Choose the reason response validation matters to performance results.',
    choices: [
      { id: 'validate', label: 'A fast error response should not be treated as successful work' },
      { id: 'pace', label: 'Assertions automatically add realistic think time' },
      { id: 'threads', label: 'Assertions create more virtual-user threads' },
      { id: 'distribute', label: 'Assertions distribute a plan across remote engines' },
    ],
    correctChoiceId: 'validate',
    explanation:
      'Assertions verify expected response facts and mark a sample failed when the system returns an invalid result, even when that result arrives quickly.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.mcq.csv-data',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt:
      'Which element reads prepared usernames and passwords into variables for many iterations?',
    instruction: 'Choose the data-driven configuration element.',
    choices: [
      { id: 'csv', label: 'CSV Data Set Config' },
      { id: 'cookie', label: 'HTTP Cookie Manager' },
      { id: 'transaction', label: 'Transaction Controller' },
      { id: 'summary', label: 'Summary Report' },
    ],
    correctChoiceId: 'csv',
    explanation:
      'CSV Data Set Config reads delimited rows and assigns their fields to JMeter variables for use by samplers during test iterations.',
    reference: jmeterComponentReference,
  },
  {
    id: 'jmeter.mcq.timer-purpose',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'What is the primary purpose of a timer in an HTTP user journey?',
    instruction: 'Choose the behavior used to avoid back-to-back requests.',
    choices: [
      { id: 'delay', label: 'Delay samplers in its scope to model pacing or think time' },
      { id: 'validate', label: 'Check that every response contains valid JSON' },
      { id: 'extract', label: 'Extract a token from a response body' },
      { id: 'report', label: 'Create an HTML report after the run' },
    ],
    correctChoiceId: 'delay',
    explanation:
      'A timer pauses before affected samplers execute, allowing the plan to model user pacing instead of issuing requests continuously without delay.',
    reference: jmeterTestPlanReference,
  },
  {
    id: 'jmeter.mcq.cli-load',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'How should a validated JMeter plan normally be run for meaningful load?',
    instruction: 'Choose the execution mode recommended by the JMeter manual.',
    choices: [
      { id: 'cli', label: 'CLI mode with results written to a JTL file' },
      { id: 'gui', label: 'GUI mode with several graph listeners open' },
      { id: 'editor', label: 'A text editor displaying the JMX file' },
      { id: 'browser', label: 'A browser repeatedly refreshing the dashboard' },
    ],
    correctChoiceId: 'cli',
    explanation:
      'JMeter recommends building and debugging in the GUI but running actual load in CLI mode to reduce generator resource overhead.',
    reference: jmeterGettingStartedReference,
  },
  {
    id: 'jmeter.mcq.percentile',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt: 'What does a 95th-percentile response time of 800 ms mean?',
    instruction: 'Choose the correct interpretation of the percentile.',
    choices: [
      { id: 'below', label: '95% of included samples completed in 800 ms or less' },
      { id: 'average', label: 'The arithmetic mean response time was exactly 800 ms' },
      { id: 'slowest', label: 'The slowest request completed in exactly 800 ms' },
      { id: 'errors', label: 'Exactly 5% of the requests returned an error' },
    ],
    correctChoiceId: 'below',
    explanation:
      'The 95th percentile is a distribution boundary: 95 percent of the measured samples are at or below that response time.',
    reference: jmeterDashboardReference,
  },
  {
    id: 'jmeter.mcq.remote-threads',
    topicId: 'jmeter',
    kind: 'multiple-choice',
    prompt:
      'A 100-thread plan runs on three JMeter remote engines. How many total threads are configured?',
    instruction: 'Account for how distributed execution applies the test plan.',
    choices: [
      { id: 'three-hundred', label: '300 threads because each engine runs the full plan' },
      { id: 'one-hundred', label: '100 threads divided automatically across the engines' },
      { id: 'thirty-three', label: 'About 33 threads in total after division' },
      { id: 'three', label: 'Three threads, one for each engine' },
    ],
    correctChoiceId: 'three-hundred',
    explanation:
      'Remote JMeter engines each execute the complete test plan, so the configured thread count is multiplied by the number of engines.',
    reference: jmeterRemoteTestingReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
