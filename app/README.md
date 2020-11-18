# kulturgenerator

```bash
# RELEVANT FOLDERS
├── src
|   ├── assets # fonts and images
|   ├── components # reusable pieces of html
|   ├── styles # scss files
|   └── views # actual "pages" of kulturgenerator in html
└── package.json #lists all packages to install
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Production deployment
- Check that Paypal-Production-Api is present in local env file `.env.local`
- Check that VUE_APP_API_BASEURL points to production Strapi CMS
- Run `npm run deploy` in project folder

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
