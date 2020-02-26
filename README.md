<div align="center">
  <h1>@system76/asset-components</h1>
  <h3>System76 image asset url helpers and Vue components</h3>
  <br>
  <br>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@system76/asset-components/">
    <img src="https://img.shields.io/npm/v/@system76/asset-components.svg" alt="npm">
  </a>

  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate">
  </a>

  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standard">
  </a>
</p>

---

This repository contains code for handling System76 image assets including url
helpers, [Fastly Image Optimization API](https://docs.fastly.com/api/imageopto/)
helpers, and useful Vue components.

## Using

This package publishes ES modules! You will not be able to use it unless your
bundler supports it, luckily most do. You should be able to just import away
with webpack (and in extension nuxt).

```sh
npm install --save @system76/asset-components
```

We recommend you install the components onto your Vue instance for global
component usage.

```js
import Vue from 'vue'
import { install } from '@system76/asset-components'

install(Vue, { domain: 'https://fastly-cdn.example.com' })
```

Look at the [published Storybook](https://asset-components.origin76.com/) for
examples on how to use this library.

## Development

1) Download the repository

2) Run `npm ci`

3) Run `npm run build`

4) Run `npm start`

5) Start hacking

### Documenting

We use styleguide to document our components. Please write your own stories
and documentation in markdown format like the other `.mdx` files. Along with
storybook, we also use styleguidist for documentation in the component file.
This gets outputted in the form of nice prop tables in storybook. Here are some
resources on how to get started:

- [Storybook markdown syntax](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md)
- [vue-docgen-api](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#full-example)

## Deployment

To [trigger a release](https://semantic-release.gitbook.io/semantic-release/#triggering-a-release),
push a commit to the `master` branch in the
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
format.
