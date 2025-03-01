import inquirer from "inquirer";
import { Layer } from "../layers/Layer.enum";

export async function chooseLayer(): Promise<string> {
  const choices = Object.values(Layer);
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "layer",
      message: "Choose layer:",
      choices: choices,
    },
  ]);
  return answer.layer;
}
