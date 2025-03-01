import inquirer from "inquirer";
import { isValidName } from "../validators/isValidName";
import chalk from "chalk";

export async function chooseName(): Promise<string> {
  let name: string;
  while (true) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Slice name:",
      },
    ]);
    name = answer.name;

    if (isValidName(name)) {
      return name;
    } else {
      console.log(
        chalk.red(
          "Error: Slice name can't be empty or contain whitespaces. Please try again"
        )
      );
    }
  }
}
