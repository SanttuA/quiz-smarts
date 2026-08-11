import type { SequenceQuestion } from '../../../types'
import {
  dotnetCliReference,
  dotnetConfigurationReference,
  dotnetDeploymentReference,
  dotnetGarbageCollectionReference,
  dotnetGenericHostReference,
  dotnetManagedExecutionReference,
  dotnetPackageAddReference,
  dotnetSolutionReference,
  dotnetTestReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'modern-dotnet.sequence.create-and-run',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange a CLI workflow that creates and runs a console project.',
    instruction: 'Create the project, enter its directory, and then run it.',
    items: [
      { id: 'create', code: 'dotnet new console -n WorkerTool' },
      { id: 'enter', code: 'cd WorkerTool' },
      { id: 'run', code: 'dotnet run' },
    ],
    correctOrder: ['create', 'enter', 'run'],
    explanation:
      'The project directory must exist before entering it, and dotnet run then discovers and launches that project.',
    reference: dotnetCliReference,
  },
  {
    id: 'modern-dotnet.sequence.solution-project',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange a workflow that creates a solution and adds a new library project.',
    instruction: 'Create both artifacts before adding the project to the solution.',
    items: [
      { id: 'solution', code: 'dotnet new sln -n Acme' },
      { id: 'library', code: 'dotnet new classlib -n Core -o src/Core' },
      { id: 'add', code: 'dotnet sln add src/Core/Core.csproj' },
    ],
    correctOrder: ['solution', 'library', 'add'],
    acceptedOrders: [['library', 'solution', 'add']],
    explanation:
      'The solution and project can be created in either order, but both must exist before dotnet sln can add the project.',
    reference: dotnetSolutionReference,
  },
  {
    id: 'modern-dotnet.sequence.restore-build-run',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange an explicit dependency and execution pipeline.',
    instruction: 'Resolve dependencies, compile the project, and then launch its built output.',
    items: [
      { id: 'restore', code: 'dotnet restore' },
      { id: 'build', code: 'dotnet build --no-restore' },
      { id: 'run', code: 'dotnet run --no-build' },
    ],
    correctOrder: ['restore', 'build', 'run'],
    explanation:
      'Restore prepares dependencies, build consumes them without restoring again, and run can reuse the existing build output.',
    reference: dotnetCliReference,
  },
  {
    id: 'modern-dotnet.sequence.add-package',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange a workflow that adds and uses a NuGet package.',
    instruction: 'Declare the dependency, use its API in source, and verify the project compiles.',
    items: [
      { id: 'add', code: 'dotnet package add Humanizer' },
      { id: 'use', code: 'string text = "job".Pluralize();' },
      { id: 'build', code: 'dotnet build' },
    ],
    correctOrder: ['add', 'use', 'build'],
    explanation:
      'Adding the package updates the project dependency, source can then use its API, and the build verifies the resolved reference and code.',
    reference: dotnetPackageAddReference,
  },
  {
    id: 'modern-dotnet.sequence.managed-execution',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange the normal managed compilation and execution stages.',
    instruction: 'Follow code from source through compilation and runtime execution.',
    items: [
      { id: 'compile', code: 'Compiler emits IL and metadata into an assembly' },
      { id: 'load', code: 'The .NET runtime loads the assembly' },
      { id: 'jit', code: 'The JIT compiles an invoked method to native code' },
      { id: 'execute', code: 'The processor executes the native instructions' },
    ],
    correctOrder: ['compile', 'load', 'jit', 'execute'],
    explanation:
      'Managed source is compiled into an assembly, loaded by the runtime, compiled per method to native code, and executed by the processor.',
    reference: dotnetManagedExecutionReference,
  },
  {
    id: 'modern-dotnet.sequence.deterministic-cleanup',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange the lifetime of a file stream that needs deterministic cleanup.',
    instruction: 'Acquire the resource, use it, and release it when the using scope ends.',
    items: [
      { id: 'open', code: 'using FileStream stream = File.OpenRead(path);' },
      { id: 'read', code: 'int firstByte = stream.ReadByte();' },
      { id: 'leave', code: '// Leave the using scope' },
      { id: 'dispose', code: '// FileStream.Dispose is invoked' },
    ],
    correctOrder: ['open', 'read', 'leave', 'dispose'],
    explanation:
      'The stream is acquired before use, and leaving its using scope invokes Dispose so the file handle is released deterministically.',
    reference: dotnetGarbageCollectionReference,
  },
  {
    id: 'modern-dotnet.sequence.host-lifecycle',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange the composition and startup of a hosted worker application.',
    instruction: 'Create the builder, register the worker, build the host, and run it.',
    items: [
      {
        id: 'builder',
        code: 'HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);',
      },
      { id: 'service', code: 'builder.Services.AddHostedService<Worker>();' },
      { id: 'build', code: 'using IHost host = builder.Build();' },
      { id: 'run', code: 'await host.RunAsync();' },
    ],
    correctOrder: ['builder', 'service', 'build', 'run'],
    explanation:
      'Registrations are added to the builder before Build creates the service provider, and RunAsync then starts and manages the host.',
    reference: dotnetGenericHostReference,
  },
  {
    id: 'modern-dotnet.sequence.configuration-provider',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt:
      'Arrange a host setup that lets prefixed environment variables override earlier configuration.',
    instruction:
      'Create the builder, add the later provider, read the merged value, and build the host.',
    items: [
      {
        id: 'builder',
        code: 'HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);',
      },
      {
        id: 'provider',
        code: 'builder.Configuration.AddEnvironmentVariables("WORKER_");',
      },
      { id: 'read', code: 'string? queue = builder.Configuration["Queue"];' },
      { id: 'build', code: 'using IHost host = builder.Build();' },
    ],
    correctOrder: ['builder', 'provider', 'read', 'build'],
    explanation:
      'The builder exposes its configuration pipeline, the added environment provider has later precedence, and the merged value is available before Build.',
    reference: dotnetConfigurationReference,
  },
  {
    id: 'modern-dotnet.sequence.create-test-project',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange a workflow that creates a test project for an existing Core library.',
    instruction:
      'Create the test project, reference the code under test, add tests, and execute them.',
    items: [
      { id: 'create', code: 'dotnet new xunit -n Core.Tests -o tests/Core.Tests' },
      {
        id: 'reference',
        code: 'dotnet reference add src/Core/Core.csproj --project tests/Core.Tests/Core.Tests.csproj',
      },
      { id: 'write', code: '// Add tests that exercise Core behavior' },
      { id: 'test', code: 'dotnet test tests/Core.Tests/Core.Tests.csproj' },
    ],
    correctOrder: ['create', 'reference', 'write', 'test'],
    explanation:
      'The test project must exist before receiving a project reference, after which its tests can compile and run against the library.',
    reference: dotnetTestReference,
  },
  {
    id: 'modern-dotnet.sequence.release-deployment',
    topicId: 'modern-dotnet',
    kind: 'sequence',
    prompt: 'Arrange a guarded self-contained deployment workflow.',
    instruction: 'Validate the code, publish for the target, deploy the output, and then start it.',
    items: [
      { id: 'test', code: 'dotnet test -c Release' },
      {
        id: 'publish',
        code: 'dotnet publish -c Release -r linux-x64 --self-contained true -o artifacts/worker',
      },
      { id: 'deploy', code: 'Deploy the artifacts/worker directory to the Linux x64 host' },
      { id: 'start', code: 'Start the published WorkerTool executable' },
    ],
    correctOrder: ['test', 'publish', 'deploy', 'start'],
    explanation:
      'Tests guard the release, publish creates target-specific output, deployment transfers that output, and the destination then starts it.',
    reference: dotnetDeploymentReference,
  },
] as const satisfies readonly SequenceQuestion[]
