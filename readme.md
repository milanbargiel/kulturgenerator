<p style="max-width: 300px">
    <a href="https://www.kulturgenerator.de" target="_blank">
        <img src="https://www.kulturgenerator.de/assets/images/kulturgenerator.png">
    </a>
</p>

```bash
# app: shop to be build (based on vuejs)
# cms: cms app (strapi)
# landingpage: static web page with art submission form
# nginx-conf: configuration on linux server
# spreadsheet-app-scripts: google spreadsheet api for fetching data from submission form
```

### APP
*our crazy development with vue.js happens here*

create `.env.local` file in root folder:
```
VUE_APP_API_BASEURL = http://localhost:1337
```

### CMS
Backend and Api of Kulturgenerator.

create `.env` file in root folder to connect to local database:
```
DATABASE_USERNAME=your-local-postgres-db-username
DATABASE_PASSWORD=your-local-postgres-db-password
```

### LANDINGPAGE
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

### SPREADSHEET-APP-SCRIPTS
- Used for development on Google-App-Scripts-Code that is used for fetching data from the visit-form of the landingpage
- Run `npm install` from your command line to install npm modules
- Run `npm run eslint` to check code with JS code guidelines defined in `.eslintrc.json`
- Run `npm run deploy` to push a new version of the App-Script to the Google-Spreadsheet
- Keep in mind that local testing is not possible, if unsure about any changes, create a test project and spreadsheet first
