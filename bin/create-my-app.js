#! /usr/bin/env node

const { Command } = require("commander");
const path = require("path");
const git = require("simple-git");
const { exec } = require("child_process");

const program = new Command();
async function createProject(name) {
  const repoUrl = "https://github.com/phantrung12/base-proj.git";
  const projectPath = path.join(process.cwd(), name);

  // console.log(`Cloning repository into ${projectPath}...`);

  try {
    // Clone repository vào thư mục `projectPath`
    await git().clone(repoUrl, projectPath);

    // Cài đặt dependencies
    console.log("Installing dependencies...");
    exec(`cd ${projectPath} && npm install`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during npm install: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log(
        "Project setup complete! You can now cd into your project and run `npm start`."
      );
    });
  } catch (err) {
    console.error("Error cloning repository: ", err);
  }
}

// Định nghĩa command cho CLI
program
  .version("1.0.0")
  .argument("<project-name>", "Tên project cần tạo")
  .action((name) => {
    createProject(name);
  });

// Parse arguments từ dòng lệnh
program.parse(process.argv);
