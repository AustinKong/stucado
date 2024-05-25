# stucado

An Electron application with React

### Development

Start development server:

```bash
$ npm run dev
```

File structure is as follows:

```
stucado/
├── build/ (build output files)
├── resources/ (public resources, e.g. app icons)
└── src/
    ├── main/
    │   ├── database/
    │   │   ├── cache.js (manages CRUD of short-term data)
    │   │   └── database.js (manages CRUD of long-term data)
    │   ├── models/ (machine learning models)
    │   ├── services/ (general business logic and API calls)
    │   └── index.js (entry point of app, delegates logic to services/)
    ├── renderer/
    │   ├── assets/
    │   │   ├── fonts/
    │   │   ├── icons/
    │   │   └── images/
    │   ├── components/
    │   │   ├── generic/
    │   │   ├── pages/
    │   │   ├── widgets/
    │   │   └── Layout.jsx (defines the app layout, e.g. navbar)
    │   ├── data/
    │   │   ├── slices/ (Redux slices)
    │   │   └── store.js
    │   ├── services/ (for communication with backend)
    │   ├── styles/ (css styles)
    │   ├── App.jsx (root React component)
    │   ├── index.html (html to load main.jsx)
    │   └── main.jsx (entry point for renderer, loads App.jsx)
    ├── preload/
    │   └── index.js (to expose APIs to renderer)
    └── shared/
        └── constants.js (shared constants)
```

Important: Files ending with `.test.js` will not be added into version control, use this for testing individual units.

### Build

Build (output in dist folder):

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```