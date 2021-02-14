# MdStarwars

PoC para MD consumiendo Swapi

[Demo of project](https://poc-md-swapi.web.app)

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
- [Code scaffolding](#code-scaffolding)
- [Contact](#contact)

## **Quick Start**

1. Run `npm i`
2. Run `npm run start`

## **Description**

Entendemos que la primera versión era una prueba de concepto con motivos de presentación a negocio y ahora se requiere una estructura base empresarial. Nos basaremos en las mejores prácticas, clean code y últimas tecnologías disponibles, usando:

**Angular Core**

- **Core and Shared modules**
- **Lazy Loading Features**
- **Container / Presentational Components** (Smart / Dumb Components)
- **Strict mode** Angular & Typescript
- **TailwindCSS** (supported natively on Angular 11.2) for fast mockup
- **Formly** for generating dynamic forms
- **Performance** with the use of trackBy, Componentes OnPush, Intersection Observer, Virtual Scrolling, Lazy images, ...

**State Management**

- **NgRx** as State Management
- **NgRx Entity** for the treatment of entities
- **NgRx Router State** to manage the state of the App from the Router in NgRx
- [**Good Actions Hygiene**](https://www.youtube.com/watch?v=JmnsEvoy-gY) to think on actions as events ([Source] Event), not as commands
- [**ngrx-store-localstorage**](https://github.com/btroncone/ngrx-store-localstorage) to save or retrieve parts of the state from the localStorage. We rehydrate NgRx content (Cache)

**Test**

- [Jest](https://jestjs.io) for running unit tests
- [Angular Testing Library](https://github.com/testing-library/angular-testing-library) for unit test assertions
- [Cypress](https://cypress.io) for running E2E tests
- [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library) for end to end test assertions
- [MSW (Mock Service Worker)](https://mswjs.io/) for mock tests, e2e tests and dev environment

**Other**

- **eslint and stylelint** as lint tools with ngrx and rxjs rules
- **Git Flow**
- **Dark Mode** with Media Query 'prefers-color-scheme: dark' and localStorage support
- **Prefetch Directive** to preload information when a component is hovered over or displayed on the screen
- **Auto Lazy Load Images Directive** to automatically add lazy load to images and data-srcset support using lazysizes lib
- **Skeleton content loader** with TailwindCSS
- **Barrel files**
- **Auto deploy on Merge and preview on PR** with Github Actions
- **CodeQL** analysis
- **Husky and lint-staged** to pass lint and prettier to changed code on commit
- **Commitlint** to use [Convetional Commits](https://www.conventionalcommits.org/)

## **Code scaffolding**

```bash
# Create Lazy Feature
> ng g module features/(nombre-feature) --module [app | parent-module-name] --route (route-name)

# Create Data-Access of a Feature (Not Shared)
> ng g module features/(nombre-feature)/data-access-(state-name) --module features/(nombre-feature-padre)
> ng g @ngrx/schematics:feature features/(nombre-feature)/data-access-(state-name)/+state/(StateName) -m features/(nombre-feature)/data-access-(state-name) --creators --api
> ng g service features/(nombre-feature)/data-access-(state-name)/services/(service-name)
> ng g interface features/(nombre-feature)/data-access-(state-name)/models/(model-name) model

# Create Shared Data-Access
> ng g module shared/data-access-(state-name) --module shared
> ng g @ngrx/schematics:feature shared/data-access-(state-name)/+state/(StateName) -m shared/data-access-(state-name) --creators --api
> ng g service shared/data-access-(state-name)/services/(service-name)
> ng g interface shared/data-access-(state-name)/models/(model-name) model

# Misc
> ng g component features/(nombre-feature)/containers/(container-name)
> ng g component features/(nombre-feature)/components/(component-name)
> ng g service features/(nombre-feature)/services/(service-name)
> ng g interface features/(nombre-feature)/models/(model-name) model
```

## Contact

**Saúl Moro Gómez**
