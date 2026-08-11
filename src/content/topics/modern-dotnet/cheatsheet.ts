import type { CheatSheetSection } from '../../types'
import {
  dotnetAssemblyReference,
  dotnetCliReference,
  dotnetConfigurationReference,
  dotnetDependencyInjectionReference,
  dotnetDeploymentReference,
  dotnetGarbageCollectionReference,
  dotnetGenericHostReference,
  dotnetIntroductionReference,
  dotnetLoggingReference,
  dotnetManagedExecutionReference,
  dotnetNativeAotReference,
  dotnetOptionsReference,
  dotnetPackageReference,
  dotnetProjectSdkReference,
  dotnetRidReference,
  dotnetSdkReference,
  dotnetSingleFileReference,
  dotnetSupportReference,
  dotnetTargetFrameworkReference,
  dotnetTestReference,
  dotnetTrimmingReference,
} from './questions/shared'

export const modernDotnetCheatSheet = [
  {
    id: 'platform-runtime',
    title: 'The modern .NET platform',
    summary: 'The SDK builds apps, while the runtime executes managed code across platforms.',
    items: [
      {
        term: 'Modern .NET',
        detail:
          'Modern .NET is the actively evolving, open-source, cross-platform implementation of .NET.',
      },
      {
        term: '.NET Framework',
        detail:
          '.NET Framework is the original Windows-only implementation and remains in maintenance for existing applications.',
      },
      {
        term: '.NET 10 LTS',
        detail:
          '.NET 10 is a Long Term Support release; supported installations must stay current with servicing updates.',
      },
      {
        term: 'SDK versus runtime',
        detail:
          'The SDK contains tools for creating and building apps and includes a runtime; a runtime alone only runs compatible apps.',
      },
      {
        term: 'CLR',
        detail:
          'The Common Language Runtime loads and executes managed code and provides services such as garbage collection and exception handling.',
      },
      {
        term: 'Base libraries',
        detail:
          'The .NET libraries provide common APIs for collections, files, networking, JSON, threading, and other application needs.',
      },
    ],
    references: [dotnetIntroductionReference, dotnetSupportReference, dotnetSdkReference],
  },
  {
    id: 'cli-workflow',
    title: 'SDK and CLI workflow',
    summary:
      'The dotnet command drives a portable create, restore, build, test, and publish workflow.',
    items: [
      {
        term: 'Inspect the environment',
        detail:
          'dotnet --info reports the active SDK, installed runtimes, architecture, and environment.',
        code: 'dotnet --info',
      },
      {
        term: 'Create from a template',
        detail: 'dotnet new creates a project or file from an installed template.',
        code: 'dotnet new console -n WorkerTool',
      },
      {
        term: 'Restore dependencies',
        detail:
          'dotnet restore resolves project dependencies; commands such as build and test normally restore implicitly.',
        code: 'dotnet restore',
      },
      {
        term: 'Build',
        detail: 'dotnet build compiles a project and its dependencies; -c selects a configuration.',
        code: 'dotnet build -c Release',
      },
      {
        term: 'Run from source',
        detail: 'dotnet run builds when needed and launches the selected project for development.',
        code: 'dotnet run --project src/WorkerTool',
      },
      {
        term: 'Test and publish',
        detail: 'dotnet test runs test projects; dotnet publish produces deployment-ready output.',
        code: 'dotnet test\ndotnet publish -c Release',
      },
    ],
    references: [dotnetCliReference, dotnetSdkReference],
  },
  {
    id: 'projects-dependencies',
    title: 'Projects, targets, and dependencies',
    summary:
      'SDK-style project files declare the build SDK, target framework, and dependency graph.',
    items: [
      {
        term: 'SDK-style project',
        detail: 'The Project Sdk attribute selects build targets and default conventions.',
        code: '<Project Sdk="Microsoft.NET.Sdk">\n  <!-- properties and items -->\n</Project>',
      },
      {
        term: 'Target framework',
        detail: 'A target framework moniker selects the API set available at compile time.',
        code: '<TargetFramework>net10.0</TargetFramework>',
      },
      {
        term: 'Project properties',
        detail:
          'Properties configure output type, nullable analysis, implicit global using directives, and other build behavior.',
        code: '<Nullable>enable</Nullable>\n<ImplicitUsings>enable</ImplicitUsings>',
      },
      {
        term: 'Project references',
        detail:
          'ProjectReference creates a build-time dependency on another project in the repository.',
        code: '<ProjectReference Include="../Core/Core.csproj" />',
      },
      {
        term: 'NuGet package references',
        detail:
          'PackageReference declares an external package and version as part of the project dependency graph.',
        code: '<PackageReference Include="Humanizer" Version="2.14.1" />',
      },
      {
        term: 'Solutions',
        detail:
          'A solution groups projects for common CLI and IDE operations without becoming a runtime dependency.',
        code: 'dotnet sln add src/Core/Core.csproj',
      },
    ],
    references: [dotnetProjectSdkReference, dotnetTargetFrameworkReference, dotnetPackageReference],
  },
  {
    id: 'managed-execution',
    title: 'Packages and managed execution',
    summary:
      'Restore supplies assets, assemblies carry compiled code, and the runtime manages execution.',
    items: [
      {
        term: 'Restore output',
        detail:
          'NuGet restore resolves compatible package assets and writes the dependency information used by the build.',
      },
      {
        term: 'Assemblies',
        detail:
          'A .NET assembly is a deployment and versioning unit that contains compiled code and metadata, commonly in a DLL or EXE.',
      },
      {
        term: 'Intermediate language',
        detail:
          'The compiler normally produces Common Intermediate Language and metadata rather than machine code for one CPU.',
      },
      {
        term: 'JIT compilation',
        detail:
          'The runtime typically compiles methods from intermediate language to native machine code as they are needed.',
      },
      {
        term: 'Garbage collection',
        detail:
          'The garbage collector reclaims managed objects that can no longer be reached; unmanaged resources still need deterministic cleanup.',
      },
      {
        term: 'IDisposable',
        detail:
          'Dispose and using provide deterministic cleanup for resources such as streams, handles, and connections.',
        code: 'using FileStream stream = File.OpenRead(path);',
      },
    ],
    references: [
      dotnetPackageReference,
      dotnetAssemblyReference,
      dotnetManagedExecutionReference,
      dotnetGarbageCollectionReference,
    ],
  },
  {
    id: 'app-hosting',
    title: 'Hosting, configuration, and observability',
    summary:
      'The Generic Host composes lifetime, dependency injection, configuration, and logging.',
    items: [
      {
        term: 'Create the host builder',
        detail:
          'CreateApplicationBuilder establishes conventional configuration and logging providers for a hosted app.',
        code: 'HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);',
      },
      {
        term: 'Register dependencies',
        detail:
          'Services are registered by abstraction and implementation, then resolved through constructor injection.',
        code: 'builder.Services.AddSingleton<IClock, SystemClock>();',
      },
      {
        term: 'Service lifetimes',
        detail:
          'Transient creates instances per resolution, scoped reuses one within a scope, and singleton reuses one for the container lifetime.',
      },
      {
        term: 'Configuration providers',
        detail:
          'Configuration can combine JSON files, environment variables, command-line arguments, and other providers; later providers override earlier keys.',
      },
      {
        term: 'Options pattern',
        detail:
          'The options pattern binds related configuration into typed settings classes for injection.',
        code: 'builder.Services.Configure<WorkerOptions>(\n    builder.Configuration.GetSection("Worker"));',
      },
      {
        term: 'Structured logging',
        detail:
          'ILogger uses named message-template placeholders so providers can preserve values as structured fields.',
        code: 'logger.LogInformation("Processed {Count} jobs", count);',
      },
    ],
    references: [
      dotnetGenericHostReference,
      dotnetDependencyInjectionReference,
      dotnetConfigurationReference,
      dotnetOptionsReference,
      dotnetLoggingReference,
    ],
  },
  {
    id: 'testing-deployment',
    title: 'Testing and deployment',
    summary: 'Test before publishing, then choose a deployment model for the target environment.',
    items: [
      {
        term: 'Run automated tests',
        detail:
          'dotnet test builds test projects and invokes their configured test runner; a nonzero exit code signals failure to automation.',
        code: 'dotnet test -c Release',
      },
      {
        term: 'Framework-dependent publish',
        detail:
          'Framework-dependent output is smaller but requires a compatible .NET runtime on the destination.',
        code: 'dotnet publish -c Release --self-contained false',
      },
      {
        term: 'Self-contained publish',
        detail:
          'Self-contained output includes the runtime and targets a runtime identifier, increasing deployment size.',
        code: 'dotnet publish -c Release -r linux-x64 --self-contained true',
      },
      {
        term: 'Runtime identifiers',
        detail:
          'A RID names a target operating system and architecture, such as linux-x64 or win-arm64.',
      },
      {
        term: 'Single-file and trimming',
        detail:
          'Single-file publishing bundles application files; trimming can reduce size but requires trim-compatible code and dependencies.',
      },
      {
        term: 'Native AOT',
        detail:
          'Native AOT compiles ahead of time for faster startup and smaller memory use, but restricts dynamic loading and runtime code generation.',
        code: '<PublishAot>true</PublishAot>',
      },
    ],
    references: [
      dotnetTestReference,
      dotnetDeploymentReference,
      dotnetRidReference,
      dotnetSingleFileReference,
      dotnetTrimmingReference,
      dotnetNativeAotReference,
    ],
  },
] as const satisfies readonly CheatSheetSection[]
