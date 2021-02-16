# MD Starwars

PoC para MD consumiendo Swapi

**IMPORTANTE: Si van a ver la app mediante el enlace de firebase del repositorio, hay que desactivar el CORS para que funcione el registro y el login en la demo, al ser un servicio de terceros que tiene bloqueada las conexiones. Si levantan la aplicación en local esto no ocurre.**

[Demo of project](https://poc-md-swapi.web.app)

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
- [Anotaciones](#anotaciones)
- [Optimizaciones](#optimizaciones)
- [Code scaffolding](#code-scaffolding)
- [Contact](#contact)

## **Quick Start**

1. Run `npm i`
2. Run `npm run start`

## **Description**

**IMPORTANTE: Si van a ver la app mediante el enlace de firebase del repositorio, hay que desactivar el CORS para que funcione el registro y el login en la demo, al ser un servicio de terceros que tiene bloqueada las conexiones. Si levantan la aplicación en local esto no ocurre.**

Entendemos que la primera versión era una prueba de concepto con motivos de presentación a negocio y ahora se requiere una estructura base empresarial. Nos basaremos en las mejores prácticas, clean code y últimas tecnologías disponibles. Las carácterísticas generales de la arquitectura desarrollada es:

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

## **Anotaciones**

Estas son algunas anotaciones de las decisiones tomadas, se puede obtener más información visitando las [Issues](https://github.com/SaulMoro/poc-md-swapi/issues?q=is%3Aissue+is%3Aclosed), [PullRequest](https://github.com/SaulMoro/poc-md-swapi/pulls?q=is%3Apr+is%3Aclosed) o los Commits.

- Se ha dessarrollado siguiendo el sistema Git Flow, con Issues y Pull Requests.
- Se ha usado TailwindCSS para realizar un maquetado rápido. Se ha seguido la técnica de maquetación Mobile First.
- El estado de la interfaz, auth y los features se manejan mediante state management (redux) con NgRx.
- Se ha realizado Unit tests, Integration tests y e2e tests de las funcionalidades y state management de lo relacionado con Auth. También se ha realizado los tests de los servicios de starships, films y people.
- Se ha usado para tests las últimas y más famosas herramientas de testing, descritas previamente.
- Se ha usado [MSW (Mock Service Worker)](https://mswjs.io/) para mockear el backend en el entorno de desarrollo y pruebas, así ahorramos llamadas a nuestro backend.
- Se mostrará un skeleton loader animado mientras se carga información, en lugar de los clásicos spinners.
- La lista de starship es de tipo infinite scroll.
- Una Github action que hace una preview del pull request, para ver una versión de la app antes de hacer merge con la rama main.
- Se ahorra manejo del estado, gracias al router state de ngrx.

## **Optimizaciones**

- Se ha creado un sistema de cache, gracias al uso de NgRx y el Local Storage. Con las siguientes carácterísticas:
1. Revalidar la cache cada 10 minutos por página de la lista.
2. Revalidar la cache cada 5 minutos por detalle de una nave, ya que se sobreentiende que muestra más información que la lista y que es más frecuente que cambie ese información extra.
3. Se rehidrata la información, mostrando la versión cacheada mientras cargamos la nueva versión.
4. La información de films y people no se rehidrata, ya que usaremos solamente la imagen y el nombre, y entendemos que el nombre y la ruta de la imagen no cambiará.
- Se ha creado una Preloading Strategy basada en roles, dónde no hará la precarga de módulos a los que el usuario no puede acceder por sus permisos.
- Se ha creado una directiva para hacer las imágenes lazy, no cargará las imágenes que no están en la vista actual.
- Otras mejoras: trackBy, Componentes OnPush, Intersection Observer, ...
 
Otras optimizaciones que se pueden realizar:

- Colocar los assets en un CDN
- Prerenderizar la web para convertila en una aplicación Jamstack. Hice de ponente en un Webinar dónde explico como implementarlo con Angular. [Enlace al vídeo](https://www.youtube.com/watch?v=gycXzCT9UTI). [Enlace al artículo](https://enmilocalfunciona.io/jamstack-angular-desarrollo-web-parte-1/)
- (Optimización de desarrollo) Crear una arquitectura basada en monorepositorio con [Nx Workspaces](https://nx.dev/). Dispongo de varios ejemplos de proyectos con esta arquitectura.

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
