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

## Technical decision: Selenium or Cypress?

Both tools are suitable and valid options for E2E test automation.

To choose one or the other, we need to understand how they work and what we need.

Selenium consists of libraries that work through the HTTP JSON protocol, which establishes communication between a controller and the real browser through HTTP requests.

![Selenium](/resources/selenium.png)

On the other hand, Cypress has a different architecture. It uses a node.js server process that interacts with the browser in real time, without using a driver as an intermediary.

![Cypress](/resources/cypress.png)

The difference between the architectures allows us to draw one of the first conclusions, which is with respect to execution time, since Cypress, eliminating the driver, performs a faster execution.
However, this is not the only thing to consider when selecting a framework. The following comparison table will provide more information on Selenium VS Cypress.

| Feature | Selenium | Cypress |
|---------|----------|---------|
| Cross Browser | All | Chrome-family browsers and Firefox                                                          |
| Installation | The installation is more complex as it requires specific libraries for each language and the webdriver. It does not have to be inside the project on which we want to run it. | The installation is simple. It has to be inside the project on which we want to run it.     |
| Tab handling | Yes | No                                                                                          |
| Waiting for the elements | Manual handling (explicit, implicit) | Automated & manual handling                                                                 |
| Specific service requests | Complex depending on the chosen tool and application. | Simple using cy.request()                                                                   |
| Headless executions | Yes | Yes                                                                                         |
| Reports | Screenshots and customizable documentation. | Screenshots, videos, and customizable documentation                                         |


Considering this information, and taking into account the needs of the technical test, I have opted for Cypress due to:

- Having higher execution speed.
- Easier installation.
- To facilitate the work with the waits of the elements.
- Easier way to handle with requests.
- Be a friendlier option for the Frontend team. As the tests are coded in JS, it gives the Frontend team the freedom to continue creating the tests they consider necessary, avoiding a possible bottleneck in the QA team.


Trello app --> https://github.com/filiphric/cypress-tau-course
cucumber para cypress --> npm install --save-dev cypress-cucumber-preprocessor
install trello app --> npm install --> package.json --> "postinstall": "cd app && npm install"
launch trello app --> npm start --> package.json --> "start": "cd app && npm start"
launch cypress --> npx cypress open
sonarqube --> sonar-scanner.bat -D"sonar.projectKey=pandago" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=0244e3b029bac787d27ed195a8aa112a7c26a709"
n