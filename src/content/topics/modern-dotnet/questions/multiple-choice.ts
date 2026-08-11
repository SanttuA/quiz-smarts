import type { MultipleChoiceQuestion } from '../../../types'
import {
  dotnetAssemblyReference,
  dotnetCliReference,
  dotnetConfigurationReference,
  dotnetDependencyInjectionReference,
  dotnetDeploymentReference,
  dotnetGarbageCollectionReference,
  dotnetIntroductionReference,
  dotnetReferenceAddReference,
  dotnetSdkReference,
  dotnetTargetFrameworkReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'modern-dotnet.mcq.modern-platform',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'Which statement correctly distinguishes modern .NET from .NET Framework?',
    instruction: 'Choose the statement that reflects the current platform families.',
    choices: [
      {
        id: 'cross-platform',
        label:
          'Modern .NET is cross-platform; .NET Framework is the original Windows-only implementation',
      },
      {
        id: 'framework-newer',
        label: '.NET Framework is the newer cross-platform implementation',
      },
      { id: 'same-product', label: 'They are two names for exactly the same installed product' },
      { id: 'browser-only', label: 'Modern .NET runs only inside web browsers' },
    ],
    correctChoiceId: 'cross-platform',
    explanation:
      'Modern .NET is the actively evolving cross-platform implementation, while .NET Framework is the original Windows-focused implementation.',
    reference: dotnetIntroductionReference,
  },
  {
    id: 'modern-dotnet.mcq.sdk-build',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'What should a developer install to create and build .NET applications?',
    instruction: 'Choose the installation that includes the development tools.',
    choices: [
      { id: 'sdk', label: 'The .NET SDK' },
      { id: 'runtime', label: 'Only the .NET runtime' },
      { id: 'gc', label: 'Only the garbage collector' },
      { id: 'framework-pack', label: 'A .NET Framework targeting pack only' },
    ],
    correctChoiceId: 'sdk',
    explanation:
      'The SDK supplies the CLI, compilers, build tooling, libraries, and a runtime needed for development.',
    reference: dotnetSdkReference,
  },
  {
    id: 'modern-dotnet.mcq.implicit-restore',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt:
      'What normally happens when dotnet build needs dependencies that have not been restored?',
    instruction: 'Choose the standard CLI behavior.',
    choices: [
      { id: 'implicit', label: 'The build performs an implicit restore before compiling' },
      { id: 'skip-packages', label: 'The build silently ignores all package references' },
      { id: 'publish', label: 'The build publishes a self-contained application first' },
      { id: 'uninstall', label: 'The build removes unrecognized dependencies' },
    ],
    correctChoiceId: 'implicit',
    explanation:
      'Commands that require resolved dependencies, including build, normally invoke restore implicitly unless it is disabled.',
    reference: dotnetCliReference,
  },
  {
    id: 'modern-dotnet.mcq.target-framework',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'What does the net10.0 target framework moniker select for a project?',
    instruction: 'Choose the role of a target framework.',
    choices: [
      { id: 'api-set', label: 'The .NET 10 API set available to compile against' },
      { id: 'cpu-only', label: 'Only the destination CPU architecture' },
      { id: 'configuration', label: 'The Debug or Release build configuration' },
      { id: 'package-source', label: 'The NuGet server used during restore' },
    ],
    correctChoiceId: 'api-set',
    explanation:
      'A target framework moniker identifies the framework and version whose APIs are available to the project.',
    reference: dotnetTargetFrameworkReference,
  },
  {
    id: 'modern-dotnet.mcq.project-reference',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt:
      'How should an app project depend directly on a sibling library project in the same repository?',
    instruction: 'Choose the dependency declaration intended for another project.',
    choices: [
      { id: 'project-reference', label: 'Add a ProjectReference to the library project' },
      {
        id: 'package-reference',
        label: 'Add a PackageReference with the project folder as its version',
      },
      { id: 'runtime-id', label: 'Set RuntimeIdentifier to the library name' },
      { id: 'copy-source', label: 'Copy the library source into every consuming project' },
    ],
    correctChoiceId: 'project-reference',
    explanation:
      'ProjectReference represents a dependency on another project and lets the build order and output references be managed together.',
    reference: dotnetReferenceAddReference,
  },
  {
    id: 'modern-dotnet.mcq.assembly-contents',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'What does a typical managed .NET assembly contain?',
    instruction: 'Choose the artifacts produced by normal managed compilation.',
    choices: [
      { id: 'il-metadata', label: 'Intermediate language, metadata, and a manifest' },
      { id: 'source-only', label: 'Only the original C# source text' },
      { id: 'one-cpu', label: 'Only native instructions for one fixed CPU' },
      { id: 'json-only', label: 'Only runtime configuration in JSON' },
    ],
    correctChoiceId: 'il-metadata',
    explanation:
      'A managed assembly carries compiled intermediate language together with type metadata and assembly identity information.',
    reference: dotnetAssemblyReference,
  },
  {
    id: 'modern-dotnet.mcq.gc-reclaims',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'Which objects are eligible for reclamation by the .NET garbage collector?',
    instruction: 'Choose the condition used by managed garbage collection.',
    choices: [
      {
        id: 'unreachable',
        label: 'Managed objects that are no longer reachable by the application',
      },
      { id: 'all-old', label: 'Every object older than one second' },
      { id: 'all-disposable', label: 'Only objects that implement IDisposable' },
      { id: 'stack-values', label: 'Every local value as soon as its method starts' },
    ],
    correctChoiceId: 'unreachable',
    explanation:
      'The collector identifies managed objects that can no longer be reached from application roots and reclaims their memory.',
    reference: dotnetGarbageCollectionReference,
  },
  {
    id: 'modern-dotnet.mcq.singleton-lifetime',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt:
      'What does a singleton registration mean in the built-in dependency injection container?',
    instruction: 'Choose the lifetime behavior of a singleton service.',
    choices: [
      { id: 'one-container', label: 'One service instance is reused for the container lifetime' },
      { id: 'every-resolution', label: 'A new service instance is created for every resolution' },
      { id: 'one-method', label: 'The service exists only during one method call' },
      { id: 'compile-time', label: 'The service is created by the compiler at build time' },
    ],
    correctChoiceId: 'one-container',
    explanation:
      'A singleton is created once by the service provider and reused until that provider is disposed.',
    reference: dotnetDependencyInjectionReference,
  },
  {
    id: 'modern-dotnet.mcq.configuration-precedence',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'How are duplicate configuration keys handled when providers are added in sequence?',
    instruction: 'Choose the standard configuration precedence rule.',
    choices: [
      { id: 'later-wins', label: 'The value from the later provider takes precedence' },
      { id: 'first-wins', label: 'The first value can never be replaced' },
      { id: 'compile-error', label: 'Duplicate keys always cause a compile error' },
      { id: 'random', label: 'A provider is selected randomly at startup' },
    ],
    correctChoiceId: 'later-wins',
    explanation:
      'Configuration providers are evaluated in order, and a later provider overrides an earlier value for the same key.',
    reference: dotnetConfigurationReference,
  },
  {
    id: 'modern-dotnet.mcq.framework-dependent',
    topicId: 'modern-dotnet',
    kind: 'multiple-choice',
    prompt: 'What does a framework-dependent deployment expect on its destination machine?',
    instruction: 'Choose the runtime requirement of this deployment model.',
    choices: [
      { id: 'compatible-runtime', label: 'A compatible .NET runtime is already installed' },
      { id: 'full-sdk', label: 'The complete .NET SDK and source repository are installed' },
      { id: 'no-runtime', label: 'No .NET runtime is needed under any circumstances' },
      { id: 'framework-only', label: 'Only .NET Framework 4.8 is installed' },
    ],
    correctChoiceId: 'compatible-runtime',
    explanation:
      'Framework-dependent publishing omits the platform runtime, so the target environment must provide a compatible shared runtime.',
    reference: dotnetDeploymentReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
