import inquirer from "inquirer";
import chalk from "chalk";
import { isValidName } from "../../../validators/isValidName";

export async function promptComponentName(): Promise<string> {
  let name: string;
  while (true) {
    try {
      const { componentName } = await inquirer.prompt([
        {
          type: "input",
          name: "componentName",
          message: "Enter component name:",
        },
      ]);
      name = componentName;

      if (isValidName(name)) {
        return name;
      } else {
        console.log(
          chalk.red(
            "Error: UI component name can't be empty or contain whitespaces. Please try again"
          )
        );
      }
    } catch (e) {
      console.log(chalk.red("\nStopped (Ctrl+C)"));
      process.exit(0);
    }
  }
}
