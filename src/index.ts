#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import degit from "degit";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const repoMap: Record<string, string> = {
  "react-basic": "your-username/react-template-basic",
  "react-ts": "your-username/react-template-ts",
};

program
  .version("1.0.0")
  .argument("<project-name>", "New project name")
  .option("-t, --template <template>", "choose template", "react-basic")
  .action(async (projectName: string, options: { template: string }) => {
    const repo = repoMap[options.template];

    if (!repo) {
      console.log(chalk.red("Error: template not found!"));
      process.exit(1);
    }

    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`Folder "${projectName}" already exists!`));
      process.exit(1);
    }

    console.log(chalk.blue(`Creating project: ${projectName}`));
    const emitter = degit(`github:${repo}`, { cache: false });

    try {
      await emitter.clone(projectPath);
      fs.rmSync(path.join(projectPath, ".git"), {
        recursive: true,
        force: true,
      });

      console.log(
        chalk.green("Template downloaded! Installing dependencies...")
      );
      execSync(`cd ${projectPath} && npm install`, { stdio: "inherit" });

      console.log(chalk.green("Ready! start with:"));
      console.log(chalk.blue(`   cd ${projectName} && npm run dev`));
    } catch (error) {
      console.error(chalk.red("Installation error!"), error);
    }
  });

program.parse(process.argv);
