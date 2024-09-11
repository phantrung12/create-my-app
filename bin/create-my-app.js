#! /usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const inquirer = require("inquirer");
// const chalk = require("chalk");

const program = new Command();

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

const createFile = (filePath, content = "") => {
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
};

program
  .version("1.0.0")
  .argument("<project-name>", "name of the project")
  //   .action((projectName) => {
  //     const projectRoot = path.join(process.cwd(), projectName);

  //     console.log(`Creating project in ${projectRoot}...`);

  //     // Tạo cấu trúc thư mục
  //     createDir(projectRoot);
  //     createDir(path.join(projectRoot, "public"));
  //     createDir(path.join(projectRoot, "src"));
  //     createDir(path.join(projectRoot, "src/components"));
  //     createDir(path.join(projectRoot, "src/assets"));
  //     createDir(path.join(projectRoot, "src/styles"));
  //     // Tạo các tệp cơ bản
  //     createFile(
  //       path.join(projectRoot, "public/index.html"),
  //       `
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>${projectName}</title>
  // </head>
  // <body>
  //   <div id="root"></div>
  // </body>
  // </html>
  //     `
  //     );

  //     createFile(
  //       path.join(projectRoot, "src/index.js"),
  //       `
  // import React from 'react';
  // import ReactDOM from 'react-dom/client';
  // import './styles/index.css';
  // import App from './App';

  // const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // );
  //     `
  //     );

  //     createFile(
  //       path.join(projectRoot, "src/App.js"),
  //       `
  // import React from 'react';

  // function App() {
  //   return (
  //     <div className="App">
  //       <h1>Hello, ${projectName}!</h1>
  //     </div>
  //   );
  // }

  // export default App;
  //     `
  //     );

  //     createFile(
  //       path.join(projectRoot, "src/styles/index.css"),
  //       `
  // body {
  //   margin: 0;
  //   font-family: Arial, sans-serif;
  // }
  //     `
  //     );

  //     createFile(
  //       path.join(projectRoot, "package.json"),
  //       JSON.stringify(
  //         {
  //           name: projectName,
  //           version: "1.0.0",
  //           main: "src/index.js",
  //           scripts: {
  //             start: "react-scripts start",
  //             build: "react-scripts build",
  //             test: "react-scripts test",
  //             eject: "react-scripts eject",
  //           },
  //           dependencies: {},
  //           devDependencies: {},
  //         },
  //         null,
  //         2
  //       )
  //     );

  //     console.log("Project structure created successfully.");
  //   });
  // .action(() => {
  //   inquirer
  //     .prompt([
  //       {
  //         type: "input",
  //         name: "name",
  //         message: "What's your name?",
  //       },
  //     ])
  //     .then((answers) => {
  //       console.log(`Hey there, ${answers.name}!`);
  //     });
  // });

  .action((projectName) => {
    const templateDir = path.join(__dirname, "../templates");
    const targetDir = path.join(process.cwd(), projectName);

    fs.copy(templateDir, targetDir, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // Render EJS templates (if any)
      const pkgJsonPath = path.join(targetDir, "package.json");
      ejs.renderFile(pkgJsonPath, { projectName }, (err, str) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        fs.writeFile(pkgJsonPath, str, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }

          console.log(`Project ${projectName} has been created successfully!`);
        });
      });
    });
  });

program.parse(process.argv);
