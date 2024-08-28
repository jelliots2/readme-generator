import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

interface Question {
  type: string;
  name: string;
  message: string;
  choices?: string[];
  default?: string;
}

const questions: Question[] = [
  {
    type: 'input',
    name: 'title',
    message: 'Input the title of your project.',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Input a description of your project',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Input installation instructions.',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Input usage instructions.',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Input contribution instructions.',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Input test instructions.',
    default: 'npm test',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project.',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'Creative Commons'],
    default: 'MIT',
  },
  {
    type: 'input',
    name: 'github',
    message: 'Input your GitHub username.',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Input your email address.',
  },
];

const badgeUrls: { [key: string]: string } = {
  'MIT': 'https://img.shields.io/badge/License-MIT-green',
  'Apache 2.0': 'https://img.shields.io/badge/License-Apache%202.0-blue',
  'GPL 3.0': 'https://img.shields.io/badge/License-GPL%20v3-blue',
  'BSD 3-Clause': 'https://img.shields.io/badge/License-BSD%203--Clause-orange',
  'Creative Commons': 'https://img.shields.io/badge/License-Creative%20Commons%20BY%204.0-lightgrey'
};

function writeToFile(fileName: string, data: string): void {
  fs.writeFile(fileName, data, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error('ERROR: File not written:', err);
    } else {
      const absolutePath = path.resolve(fileName);
      console.log('README file generated. Path:');
      console.log(`${absolutePath}`);
    }
  });
}

function init(): void {
  inquirer.prompt(questions).then((answers: Record<string, any>) => {
    const badgeUrl = badgeUrls[answers.license as keyof typeof badgeUrls];
    const data = `
# ${answers.title}

![License](${badgeUrl})

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

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
This project is licensed under the ${answers.license} License.

## Questions
For any questions, please contact me at [${answers.email}](mailto:${answers.email}) or visit my GitHub profile: [${answers.github}](https://github.com/${answers.github}).

    `;
    writeToFile('README.md', data);
  });
}

init();
