# Frontend Boilerplate:

##### *A simple boilerplate for creating websites with handlebars based templates.*
Inspired by https://www.keithcirkel.co.uk/ and https://css-tricks.com/why-npm-scripts/.

### Set up a development server and build files for deployment
- run `npm install` from your command line to install npm modules
- run `npm start` to start a local development server that reloads browser on filechange
- when finished developing, copy all files from `dist` folder to put on your webserver

### Folder structure
```bash
├── dev
|   ├── assets
|   |   └── images
|   ├── js
|   ├── scss
|   └── templates
├── dist
|   ├── assets
|   |   └── images
|   ├── js
|   ├── index.html
|   └── main.css
└── package.json
```

### Npm Scritps based automation
**When Nunjucks-File changes:**
- Build html files in dist folder from templates and partials
- Reload Browser

**When Scss file changes:**
- Lint Scss and output errors in console
- Compile Scss to Css and copy to dist folder
- add Vendor prefixes
- Reload Browser

**When JS file changes:**
- Copy to dist folder
- Reload Browser

**When asset file changes:**
- Copy to dist folder
- Reload Browser

**When Image file changes:**
- Optimize Image and copy to dist folder
- Reload Browser