// TODO: Include packages needed for this application
import fs from 'fs';
import inquirer from 'inquirer';

// Complete: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "Input the title of your project.",
  },
  {
    type: "input",
    name: "description",
    message: "Input a description of your project",
  },
  {
    type: "input",
    name: "Installation",
    message: "Input installation instructions.",
  },
  {
    type: "input",
    name: "usage",
    message: "Input usage instructions.",
  },
  {
    type: "input",
    name: "contributing",
    message: "Input contribution instructions.",
  },
  {
    type: "input",
    name: "tests",
    message: "Input test instructions.",
    default: "npm test",
  },
  {
    type: "input",
    name: "license",
    message: "Input the license(s) for your project.",
    default: "MIT",
  },
  {
    type: "input",
    name: "github",
    message: "Input your GitHub username.",
  },
  {
    type: "input",
    name: "email",
    message: "Input your email address.",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('ERROR: File not written:', err);
    } else {
      console.log('README file generated. Path: ')
    }
  })
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const data = `
    # ${answers.title}

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
This project is licensed under the ${answers.license} license.

## Questions
If you have any questions, please open an issue or contact me via email at ${answers.email}. 
You can also find more of my work at [${answers.github}](https://github.com/${answers.github}).
`;

    writeToFile('README.md', data);
  }).catch((err) => {
    console.error('An error occurred:', err);
  });
}
// Function call to initialize app
init();
