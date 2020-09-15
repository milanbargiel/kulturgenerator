### LANDINGPAGE
*Static web page for introducing the Kulturgenerator project with a Newsletter and art-submission form*

- Run `npm install` from your command line to install npm modules
- Run `npm start` to start a local development server that reloads browser on filechange of scss, javascript, asset-file change
- Development is done in `/dev`
- Files for distribution are located in `dist`
- When finished developing, run `npm run deployProduction` to copy files from dist folder to production server

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