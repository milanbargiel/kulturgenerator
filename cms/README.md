# Strapi Application Guidelines <a id="top"></a>

## Table of Contents
1. [Admin Panel Access](#first)
2. [FAQ](#faq)
3. [Installation on Ubuntu](#second)
    * [Additional Explanation](#additional)
        * [Skip the Droplet part!](#droplet)
        * [Step 1: Install Node.js on the server](#nodejs)
        * [Step 2: Install Git on the server](#git)
        * [Step 3: Install PostgreSQL Database on the server](#postgresql)
        * [Step 4: Deploy Strapi from Github on server](#deploy)
        * [Step 5: Install and configure PM2 ](#pm2)
        * [Step 6: Set up webhook on Github](#webhook)
        * [Final step: Use domain name instead of ip](#domain)

## Admin Panel Access <a id="first"></a>
Visit [xyz.kulturgenerator.org/admin](https://xyz.kulturgenerator.org/admin) for Admin Panel.

At Admin Panel you can add new content (e.g. artwork) and generally cultivate Kulturgenerator data.

## Frequently Asked Questions <a id="faq"></a>

### How to run CMS locally?
- Create a local Postgresql Database with name `kulturgenerator`, `user: ''` and `password: ''` (empty user and empty password) as defined in `database.js` file.
- Install npm modules and run `npm run develop` in your console to start the local development server

### How to debug Strapi on Production Server?
- Stop Kulturgenerator pm2 process with `pm2 stop kulturgenerator-cms` to be able to run the cms manually
- Delete cms build and cache `rm -rf build .cache`
- Create new build with `NODE_ENV=production npm run build`
- Start CMS-App from Terminal to see error output in console `NODE_ENV=production npm run develop`

### How to perform a database migration when a field changes?
- The migration has to be done manually in Postgresql with Queries
- For Example 
```
UPDATE artworks SET status = 'ZweiteRunde' WHERE status = 'Auswahl';
UPDATE artworks SET status = 'ErsteRunde' WHERE status = 'Teilnahme';
```

### How to download Production Image and Database dump to develop with local database?
- Insert kulturgeneratorServer as environment variable to ssh config file `~/.ssh/config` 
- Run `npm run getUploads` to clear local image folder and then download all images from remote server into local `public/uploads` folder
- Run `npm run getDatabaseDump` to download Postgresql Database dump from remote server and insert dump into local Postgres Database with name kulturgenerator

### Why can't I create or update content-types in production/staging?

From [Strapi Troubleshooting FAQs](https://strapi.io/documentation/v3.x/getting-started/troubleshooting.html#why-can-t-i-create-or-update-content-types-in-production-staging)

> Strapi stores model configuration files (what defines the model schema) in files such as api/restaurant/models/restaurant.settings.json. Due to how Node.js works, in order for changes to take effect, that would require Node to restart the server. This could potentially cause downtime of your production service and likewise these changes should be tracked in some kind of source control.
>
> Generally your "flow" of development would follow the following path:
>
> * Development - Develop your Strapi application locally on your host machine, then push changes into source control.
> * Staging - Deploy changes from source control to a "production-like" environment for testing.
> * Production - If no other changes are needed, deploy into production.
> * Repeat as needed, it is recommended that you properly version and test your application as you go.
>
> At this time and in the future there is no plan to allow model creating or updating while in a production environment, and there is currently no plans to move model settings into the database. There is no known nor recommended workarounds for this.

#### Quickguide
1. `git pull` your latest changes from the remote repo.
2. Start strapi app locally with `npm run develop` `(strapi develop)` (important: you cannot add content types when using `npm start` `(strapi start)`).
3. Add content-type at `localhost:1337/admin`.
4. `git push` to the remote repository. If you are working on a feature branch you have to merge your changes into `master`. The changes are auto-deployed from `master`.
5. If you setup `pm2` with `--watch` command, your newly created content type should automatically appear on `xyz.kulturgenerator.org/admin`. You can check if watching is enabled with `cd ~ / pm2 list`. `pm2 start` will also reload your strapi application.
6. If you have deleted a content-type make sure to also delete corresponding tables in the Posgresql database. This is not done automatically.

## Installation on Ubuntu 18.04 <a id="second"></a>

Strapi is already set up and ready to use for Kulturgenerator. The admin panel can be accessed via the link above. However, if we ever had to migrate the server to another location or for another reason had to re-install Strapi, just follow along this guide from Strapi.io.

Milan discovered that the official [Strapi Documentation Guide for an installation on Digital Ocean Cloud Servers](https://strapi.io/documentation/v3.x/deployment/digitalocean.html) is basically the same process for our LEMP stack server.

The installation process can be split up into the following steps:

1. Install Strapi locally on your machine.
[Guide for installing Strapi via the CLI](https://strapi.io/documentation/v3.x/installation/cli.html)

2. Add to a Github repository.

3. Do configuration on server to pull your Strapi from Github.
[See deployement Guide Digital Ocean](https://strapi.io/documentation/v3.x/deployment/digitalocean.html#setup-production-server-and-install-node-js)

### Additional explanation to the steps in the Guide <a id="additional"></a>

#### Skip the Droplet part! <a id="droplet"></a>

Digital Ocean is a cloud server, so you have to configure a new server environment (Droplet) for your Strapi installation.
We already have our server ready and set up, so skip this part and head right onto [Setup production server and install Node.js](https://strapi.io/documentation/v3.x/deployment/digitalocean.html#setup-production-server-and-install-node-js).

#### Step 1: Install Node.js on the server <a id="nodejs"></a>

It's good practice to have a new Linux user only for the purpose of the configuration of the Strapi set up. So you should follow those initial steps in the guide. You will use this user throughout the whole process.

#### Step 2: Install Git on the server <a id="git"></a>

> Note: For the auto-deployment webhook to work later in the guide it's recommended to already set up some authentification along (We used a password). A new version of your local Strapi can be auto-deployed, when you push on to the `$master`. This has to be set up via a Webhook. How to do so is explained at the end of the guide.

#### Step 3: Install PostgreSQL Database on the server <a id="postgresql"></a>

> **Note:**
The database should have the same name as the Linux user you created eariler (e.g. kulturgenerator).

> **Note:**
Inside the `./config/database.js` kepp the ip address on `127.0.0.1`. Even though it's a production environment.

#### Step 4: Deploy Strapi from Github on server<a id="deploy"></a>

 > **Note:**
 (`'NODE_ENV' = production npm run build`) is run only once. It sets up the envirnment from local (which it is on Github) to production.

> **Note:**
Install the firewall. Because why not :-)
--> `ufw firewall` (basic firewall that is included in Ubuntu)

#### Step 5: Install and configure PM2 <a id="pm2"></a>

> **Note:**
pm2 is a deamon tool that keeps Strapi running.

> **Note:**
cd `~` means changing into your users home directory (e.g. /kulturgenerator is the home directory for the user kulturgenerator).

> **Note:**
pm2 config is the place that holds your environment variables. You can also create an `env` file. It's in the guide.

> **Important:** Include `watch: true` in your `ecosystem.config.js`
```
module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: '/home/your-name/my-strapi-project/my-project',
      script: 'npm',
      args: 'start',
      watch: true,
      // Delay between restart
      watch_delay: 1000,
      ignore_watch : ["node_modules"],
      watch_options: {
        "followSymlinks": false
      }
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: 'localhost', // database endpoint
        DATABASE_PORT: '5432',
        DATABASE_NAME: 'strapi', // DB name
        DATABASE_USERNAME: 'your-name', // your username for psql
        DATABASE_PASSWORD: 'password', // your password for psql
      },
    },
  ],
};
```

> **Explanation**: 
pm2 acts as a wrapper for `npm start` with all the adequate env variables. And also has a feature to automatically restart all configs after server fails and is restarted. It's explained in the guide.

> **Note:**
pm2 has a great monitoring tool to detect bugs or wrong configurations.

#### Step 6: Set up webhook on Github <a id="webhook"></a>

> **Setup:**
Use the "just the `push` event" configuration in Github settings.

> **Note:**
`your-secret-key` is your key from Github

#### Final step: Use domain name instead of ip <a id="domain"></a>

Configure a domain name instead of the ip address.

That's it! :-)

[Back to top](#top)

