import type { CheatSheetSection } from '../../types'

export const jmeterCheatSheet = [
  {
    id: 'goals-workloads-safety',
    title: 'Goals, workloads, and safety',
    summary:
      'Define the question and a representative workload before generating traffic against an authorized target.',
    items: [
      {
        term: 'Test with permission',
        detail:
          'Run meaningful load only against environments you are authorized to test, with owners aware of the schedule and stop conditions.',
      },
      {
        term: 'Load test',
        detail:
          'Evaluate behavior under an expected workload, using explicit targets for response time, throughput, and error rate.',
      },
      {
        term: 'Stress and spike tests',
        detail:
          'A stress test explores behavior beyond expected capacity; a spike test applies a sudden workload change.',
      },
      {
        term: 'Soak test',
        detail:
          'Sustain a representative workload long enough to reveal leaks, resource exhaustion, or gradual degradation.',
      },
      {
        term: 'Concurrent threads',
        detail:
          'A JMeter thread executes its scenario independently; thread count models concurrent virtual users, not a guaranteed request rate.',
      },
      {
        term: 'Ramp-up',
        detail:
          'Ramp-up spreads thread starts across time so the test reaches its intended concurrency deliberately instead of all at once.',
      },
    ],
  },
  {
    id: 'plans-threads-http',
    title: 'Test plans, threads, and HTTP',
    summary:
      'Build a readable tree whose scope makes the workload, requests, and shared configuration explicit.',
    items: [
      {
        term: 'Minimal plan',
        detail:
          'A minimal executable plan contains a Test Plan, a Thread Group, and at least one sampler.',
        code: 'Test Plan\n└─ Thread Group\n   └─ HTTP Request',
      },
      {
        term: 'Thread Group',
        detail:
          'Configure the number of threads, ramp-up period, loop count, and optionally the duration of the workload.',
      },
      {
        term: 'HTTP Request sampler',
        detail:
          'An HTTP Request sampler sends one request and records timing, status, and response information for that sample.',
      },
      {
        term: 'HTTP Request Defaults',
        detail:
          'Put shared protocol, host, port, or path defaults in one configuration element and override only what differs.',
      },
      {
        term: 'Controllers',
        detail:
          'Logical controllers group requests or control execution; a Transaction Controller can measure a business operation.',
      },
      {
        term: 'Scope matters',
        detail:
          'Configuration elements, timers, assertions, and post-processors affect the samplers within their position in the test tree.',
      },
    ],
  },
  {
    id: 'state-data-validation',
    title: 'State, test data, and validation',
    summary:
      'Make each virtual user realistic by managing protocol state, external data, dynamic values, and response checks.',
    items: [
      {
        term: 'HTTP Header Manager',
        detail:
          'Define headers such as Content-Type or Authorization in the scope that needs them.',
        code: 'Content-Type: application/json',
      },
      {
        term: 'HTTP Cookie Manager',
        detail:
          'Store and send cookies for each JMeter thread so session-based HTTP flows behave more like separate users.',
      },
      {
        term: 'CSV Data Set Config',
        detail:
          'Read prepared input rows into variables, avoiding expensive runtime generation and repeated hard-coded accounts.',
        code: 'username,password',
      },
      {
        term: 'Variables',
        detail:
          'Reference a JMeter variable with dollar-brace syntax wherever its resolved value is needed.',
        code: '${username}',
      },
      {
        term: 'Correlation',
        detail:
          'Extract a dynamic value from one response with a post-processor and use the variable in a later request.',
        code: 'token → ${token}',
      },
      {
        term: 'Assertions',
        detail:
          'Check status, content, size, duration, or structured response data so fast error pages are not counted as successful behavior.',
      },
    ],
  },
  {
    id: 'pacing-repeatability',
    title: 'Pacing and repeatability',
    summary:
      'Shape traffic intentionally and keep scenarios reproducible enough to compare one run with another.',
    items: [
      {
        term: 'Think time',
        detail:
          'Model pauses between user actions with timers instead of sending every request back-to-back.',
      },
      {
        term: 'Timer scope',
        detail:
          'A timer delays each sampler in its scope before that sampler runs; multiple applicable timer delays are added together.',
      },
      {
        term: 'Constant Timer',
        detail:
          'Add the same delay before affected samplers when a fixed pause matches the scenario.',
        code: 'Thread Delay: 1000 ms',
      },
      {
        term: 'Variable pacing',
        detail:
          'Use variable or randomized delays when a fixed pause would create unrealistically synchronized traffic.',
      },
      {
        term: 'Transactions',
        detail:
          'Group related requests under a Transaction Controller. Its generated sample excludes timer and pre/post-processor duration by default; enable the include-duration option when those delays belong in the business action.',
      },
      {
        term: 'Controlled comparisons',
        detail:
          'Record the plan, data, environment, load profile, and acceptance thresholds so results can be compared honestly.',
      },
    ],
  },
  {
    id: 'validate-run-report',
    title: 'Validate, run, and report',
    summary:
      'Debug a small workload interactively, then execute the real load efficiently from the command line.',
    items: [
      {
        term: 'GUI for construction',
        detail:
          'Use the GUI and lightweight listeners to build, validate, and debug a plan with only a few threads.',
      },
      {
        term: 'CLI for load',
        detail:
          'Run the actual load in CLI mode so the graphical interface and heavy listeners do not distort the generator.',
        code: 'jmeter -n -t test.jmx -l results.jtl',
      },
      {
        term: 'JMX test plan',
        detail: 'The -t option selects the saved JMeter test plan to execute.',
        code: '-t checkout.jmx',
      },
      {
        term: 'JTL results',
        detail: 'The -l option writes sample results for later aggregation and analysis.',
        code: '-l results.jtl',
      },
      {
        term: 'Runtime property',
        detail: 'Pass an overridable JMeter property at launch and read it from the plan with __P.',
        code: '-Jthreads=50\n${__P(threads,10)}',
      },
      {
        term: 'HTML dashboard',
        detail:
          'Generate the dashboard after a run with -e and an empty output directory selected by -o.',
        code: 'jmeter -n -t test.jmx -l results.jtl -e -o report',
      },
    ],
  },
  {
    id: 'analyze-scale',
    title: 'Analyze results and scale carefully',
    summary:
      'Interpret multiple signals together and confirm that the load generator itself stayed trustworthy.',
    items: [
      {
        term: 'Response-time percentiles',
        detail:
          'A 95th percentile of 800 ms means 95% of included samples completed in 800 ms or less; it is not the slowest request.',
      },
      {
        term: 'Throughput',
        detail:
          'Read completed work per unit of time alongside concurrency, pacing, and the exact transaction being counted.',
      },
      {
        term: 'Error rate',
        detail:
          'Investigate failed samples and assertion failures; averages and throughput are misleading if the system returns errors.',
      },
      {
        term: 'Apdex',
        detail:
          'The HTML dashboard calculates Apdex from configurable satisfied and tolerated response-time thresholds.',
      },
      {
        term: 'Generator health',
        detail:
          'Monitor load-generator CPU, memory, network, Java heap, and logs so injector saturation is not blamed on the target.',
      },
      {
        term: 'Distributed load',
        detail:
          'Each remote engine runs the complete plan, so total threads multiply by the number of engines rather than being divided automatically.',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
