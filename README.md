# PandaGo QA Roleplay

It is a complete test that allows utter creativity to the candidate.

It is necessary to know about E2E and APIs testing, design patterns, CI, and Code coverage; giving complete freedom for the choice of tools and programming language, going through different integrations such as CI, SonarQube/SonarCloud, and ending with the way to document it.

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

## Test cases

The test cases created can be found here: [Test Cases](/resources/testcases.pdf)

For this role play, I have chosen the first of the proposed scenarios:
-   A login scenario.
    -  Email and password inputs
    - Remember me checkbox
    - Validation errors before submitting the form
    - Validation error if login information is wrong

I used the Qase tool for writing the test cases.
- It is a free test management tool (up to 3 users).
- It allows the creation of suites.
- I can indicate the layer on which the test cases are executed.
- It allows me to mark if the test case is automated.
- If you have Jira, it lets you create a bug associated with the test case if you set it as failed.
- And above all, it allows you to write the test cases using Gherkin and gives way to work with BDD.



### What is BDD?

BDD is an agile working methodology. We can consider it as an extension of TDD.

This methodology seeks to use a natural language that allows Dev, QA, and Business collaboration.



**Workflow**

![BDD](/resources/BDD.png)

First, Business (Product) defines the needing/feature desired.



> **Title**
> 
> A clear and concise title.
> 
> **Definition**
> 
> As a: the person or role who will benefit from the feature
> 
> I want: the feature
> 
> So that: the benefit or value of the feature



Once the US is documented, Business meets one person from the Development team and one person from the QA team. They discuss the US previously created. This is called The three amigos meeting.

The key goal for this discussion is to trigger conversation and identify any missing specifications. The discussion also gives a platform for QA, the development team, and the Product Owner to converge and hear out each other's perspectives to enrich the requirement and also make sure they are building the right product.

Then the examples are documented using a specification language like Gherkin, which can be used for development & automation.

The acceptance criteria for a given scenario are structured as follows.



> **Given**: the initial context at the beginning of the scenario, in one or more clauses.
>
> **When**: the event that triggers the scenario.
>
> **Then**: the expected outcome, in one or more clauses.



After that, Automation and development phases start.

-   During the sprint, the first step is to define an automation test (QA) that will fail because the US is not developed yet. (Failing Scenario)
-   Then starts the Dev phase. The Dev team will work following the TDD methodology.
-   Once the development has ended, the automation test will be working (Passing Scenario)
-   At that point, QA will determine if it is necessary to refactor de test previously created.

![BDDWorkflow](/resources/BDDWorkflow.png)

## Code coverage

We have several options available to check the quality of our code and the coverage we have.

We can use the code coverage provided by Cypress https://docs.cypress.io/guides/tooling/code-coverage.
It seems an attractive option. However, I have not been able to investigate it.

Because of this, I have opted for Sonarqube and Sonarcloud.

At first, I used SonarQube. I created a Docker container using the SonarQube image. It allowed me to have SonarQube accessible on localhost (I specified it on port 9000) and run the sonar-scanner from the terminal with this command:

    sonar-scanner.bat -D "sonar.projectKey=pandago" -D "sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=0244e3b029bac787d27ed195a8aa112a7c26a709"

The SonarQube configuration file I have kept here [sonar-project_old.properties](sonar-project_local.properties)
and here you can see a screenshot of the result of the project execution.

![BDDWorkflow](/resources/sonarqube/sonarqube-overall-code.png)

I decided to implement GitHub actions for code analysis in the project. I realized that the integration was with SonarCloud, so I cruised configure it, creating a token for SonarCloud, a new sonar-project.properties file, and a build.yml file where I specify that SonarCloud will launch every time there is a merge to the Main branch.

### Is SonarQube or SonarCloud better?

The reality is that both are valid and different, so the choice will depend more on the ecosystem we are setting up.

In a Cloud environment, SonarCloud, hosted in SonarSource in AWS, is the best option. In addition, it has fast integration with GitHub.com, GitLab.com, Bitbucket.org, and Azure DevOps. 

If, on the other hand, our ecosystem is based on our servers or a self-managed cloud environment such as GCP (Google Cloud Platform), it will be better to opt for SonarQube. Like SonarCloud, it has integrations with GitHub, GitLab, Bitbucket, and Azure DevOps.

## Improvements for this project

Although my feeling about the project I am delivering is good, I have been wanting to implement improvements such as:

- To implement Gherkin and start working with BDD.
- To create more tests. Specifically, the test that checks that the "Remember me" button creates a cookie or adds information to an existing cookie.
- To create the unit tests that verify the created functions.
- To implement in SonarCloud the generated report of these unit tests to have a code coverage report.
- To dockerize the project. Dockerizing a project reduces infrastructure resources and allows running the application on any computer without extra configurations.

## Conclusion

Although the proposed test seems to be easy and affordable, it is really complete.

Once I started working on it, I realized the number of bangs needed, such as CI, Code coverage...

Even though the test is not as complete as I would like it to be, I consider is a good technical test, so I am really happy with the work I am delivering to you, and I look forward to your comments on it.

Thank you very much.