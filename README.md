<h1 align="center">TSH Frontend components + CLI</h1>


- [📘 Project context](#-project-context)
- [🔨 Setup \& Usage](#-setup--usage)
  - [Husky](#husky)
  - [Packages](#packages)
  - [Components](#components)
    - [Local development](#local-development)
  - [CLI](#cli)
    - [Destination project initialization](#destination-project-initialization)
    - [Component copy](#component-copy)
- [🛃 Development \& Conventions](#-development--conventions)
  - [File system](#file-system)
  - [schema.json](#schemajson)
- [🔥 Deployment](#-deployment)
  - [Building the package](#building-the-package)
  - [Storybook hosting](#storybook-hosting)


## 📘 Project context

Knowledge sharing and development process acceleration are the backbone of this project. In this repository you can find components that can be treated as an inspiration or starter point for production graded code.

Main assumption is that custom MUI based components in this repository should be versatile and easy to configure in your current project.

This project has also a CLI that can be used to copy components directly to your project.

___

## 🔨 Setup & Usage

### Husky

In order to keep codebase frequently tested, linted and formatted, set up husky:

```
npm run prepare
```

### Packages

Install packages for both projects - components and CLI:

```
npm i
```

```
cd packages/cli
```

```
npm i
```

And return to the main directory:

```
../..
```

### Components

#### Local development


To work on components, you can run Storybook on your localhost to set up hermetic, hot-reloading environment. In order to do that, run:

```
npm run storybook
```

To set up a new component in Storybook, you have to create a story (`ComponentName.stories.tsx`), check out official documentation for in-depth guidelines - [link to Storybook docs](https://storybook.js.org/docs/react/writing-stories/introduction). Or simply follow convention from components that already exists in this repository.

### CLI

#### Destination project initialization


In order to add your destination project, you have to run command:

```
npm run init
```

And follow steps that are visible in your console.

You can set up multiple destination projects to have multiple choice for where to copy components to. All you need to do is to run this command again.

Your configuration will be saved in `cli.settings.json` file, you can manipulate project metadata directly from there.

#### Component copy

To copy components to project that you set up earlier, go ahead and run command:

```
npm run copy
```

And follow steps that are visible in your console.

As a default, Storybook file (`*.stories.tsx`) is selected to be copied, if your project doesn't have Storybook set up, hit `N` button in CLI wizard at 3rd step.

___

## 🛃 Development & Conventions

### File system

In order to keep CLI running, new components should be kept in separate directories in `packages/components`. Example:

If you would like to add `Input` component, create directory and name it as the component (lowercased):

```
packages/components/input
```

And add files in that directory. 

### schema.json

In order to manage components dependencies (both libraries and other components), we created a `packages/schema.json` file to keep it in one place.
If you are adding new component, you have to declare it in that file.

Example:
I've created a `<List/>` component that have `<ListItem/>` as a dependency, and it is based on MUI library. Schema for that component may look like that:

`packages/schema.json`
```
...
components: [
  ...,
  {
    "name": "List",
    "componentsDependencies": ["ListItem"],
    "packagesDependencies": ["@mui/material"]
  }
]
...
```

**Important! Component which isn't declared in `schema.json` won't show up in CLI copy list.**
___

## 🔥 Deployment

### Building the package

In current version, CLI is bundled with components in one package. In order to build the end-product, you have to run command:

```
npn run build-cli
```

It will transform Typescript source code of CLI to Javascript and copy components directory to `dist`.

### Storybook hosting

Storybook is currently hosted at https://dz6s1m3491km4.cloudfront.net/