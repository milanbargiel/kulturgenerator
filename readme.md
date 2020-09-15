<p style="max-width: 300px">
    <a href="https://www.kulturgenerator.de" target="_blank">
        <img src="https://www.kulturgenerator.de/assets/images/kulturgenerator.png">
    </a>
</p>

```bash
# app: shop to be build (based on vuejs)
# cms: cms app and backend api of kulturgenerator (strapi)
# landingpage: static web page with art submission form
# nginx-conf: configuration on linux server
# spreadsheet-app-scripts: google spreadsheet api for fetching data from submission form
```

## The Designers Guide for Changing Styles of Kulturgenerator
*What we will do: Get the Kulturgenerator app up and running in local development mode and push changes to github.com. Let's go!*

#### 1. Install package managers
*In web development package managers are used to reuse code packages of other developers in your own project. To install these packages we need Homebrew and npm.*

* Open Terminal App on mac

##### Install Homebrew
* First, install Homebrew. To do so insert in Terminal:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* Then run `brew update` to make sure Homebrew is up to date.

```bash
brew update
```

* As a safe measure you should run `brew doctor` to make sure your system is ready to brew. Run the command below and follow any recommendations from brew doctor.

```bash
brew doctor
```

* Next, add Homebrew’s location to your `$PATH` in your `.bash_profile` or `.zshrc` file.

```bash
export PATH="/usr/local/bin:$PATH"
```

##### Install npm

* Next, install Node (npm will be installed with Node):

```bash
brew install node
```

#### 2. Download Kulturgenerator from [github.com](https://www.github.com)

* Ask Moritz or Milan to invite you to Kulturgenerator Repository https://github.com/milanbargiel/kulturgenerator
* Open Terminal App and navigate to folder where you want to install the Kulturgenerator

```bash
cd path/to/install/
```

* Download Kulturgenerator from github with the following command

```bash
# run command within path/to/install/

git clone https://github.com/milanbargiel/kulturgenerator.git
```

#### 3. Start Kulturgenerator app in local development mode

* Install Kulturgenerator packages by navigating to `/app` folder and running `npm install` in Terminal app. All packages that are listed in `/app/package.json` will be installed.
 
```bash
cd path/to/install/kulturgenerator/app # navigate to app folder of kulturgenerator repository
npm install # install packages
```

* Run `npm start` to start local development server and see Kulturgenerator page in browser at http://localhost:8080/

```bash
# path/to/install/kulturgenerator/app
npm start
```

#### 4. Checkout a git branch, make changes and push them to github.com for code review by Moritz or Milan
*In software and web development tools for version control are used to work together, simultaneously on a growing code base. We use git and github for saving all changes to the code base in versions, in order to undo changes, when you made a mistake*

* Go to project folder 
* Pull latest changes with `git pull` from remote repository at github.com

```bash
cd path/to/install/kulturgenerator/app # navigate to app folder
git pull
```

* Create a new git branch for your changes

```bash
# path/to/install/kulturgenerator/app
git checkout -b your-branch-name # Create branch with name your-branch-name. Please change this name to suit your needs e.g. design-polishing.
```

* Implement changes to code base by changing files with a text editor like [Sublime](https://www.sublimetext.com/). 
* Commit changes to github
* Do it over and over again for all changes
* Ask Moritz or Milan to review your code changes on [github.com](https://www.github.com) to integrate them into the master branch.

```bash
git add -A # Add all changes
git commit -m "Change header styles" # Add a commit message
git push origin your-branch-name # Push changes to branch at github.com
```

