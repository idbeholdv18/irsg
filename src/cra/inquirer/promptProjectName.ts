import chalk from "chalk";
import { existsSync } from "fs";
import inquirer from "inquirer";
import path from "path";

export async function promptProjectName() {
  while (true) {
    try {
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Enter project name:",
          validate: (input) => {
            if (!input.trim()) return "Error: Project name can't be empty";
            if (existsSync(path.join(process.cwd(), input)))
              return "Directory already exists. Try another name";
            return true;
          },
        },
      ]);
      if (
        projectName.trim() &&
        !existsSync(path.join(process.cwd(), projectName))
      ) {
        return projectName;
      }
    } catch (e) {
      console.log(chalk.red("\nStopped (Ctrl+C)"));
      process.exit(0);
    }
  }
}
