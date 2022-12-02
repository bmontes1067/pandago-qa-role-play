# PandaGo QA Roleplay

## How to install it
First of all, it will be necessary to clone this repository.

    git clone https://github.com/bmontes1067/padago-qa-role-play.git

Once downloaded, we will proceed to install all the dependencies by executing the command

    npm install

**Warning: we must have NodeJS installed.**

The next step will be to launch the Trello application. The Trello application will be available at the URL https://localhost:3000

    npm start

## Running the tests

We have two options to launch the tests:

- The first one will be executing `npx cypress open`
  Cypress will open, and we will select on which browser we will launch the tests and then the test file.

- On the other hand, we can use the headless alternative executing `npx cypress run`
  Cypress will execute the tests in headless mode using electron. A video of the execution will be recorded and save in the folder `cypress/videos/`


Trello app --> https://github.com/filiphric/cypress-tau-course
cucumber para cypress --> npm install --save-dev cypress-cucumber-preprocessor
install trello app --> npm install --> package.json --> "postinstall": "cd app && npm install"
launch trello app --> npm start --> package.json --> "start": "cd app && npm start"
launch cypress --> npx cypress open
sonarqube --> sonar-scanner.bat -D"sonar.projectKey=pandago" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=0244e3b029bac787d27ed195a8aa112a7c26a709"
n