import chalk from "chalk";
import fs, { pathExistsSync } from "fs-extra";
import path from "path";
import { Path, pathTo } from "../../utils/pathTo";
import { generateActions } from "./generateActions";
import { generateContext } from "./generateContext";
import { generateHooks } from "./generateHooks";
import { generateReducer } from "./generateReducer";
import { generateTypes } from "./generateTypes";
import { generateIndex } from "./generateIndex";
import { generateUI } from "./generateUi";

export function generateComponent(componentName: string) {
  const componentDir = path.join(pathTo(Path.Frontend_UiKit), componentName);

  if (pathExistsSync(componentDir)) {
    console.error(
      chalk.red(
        `Error: component with name '${componentName}' already exists in ui-kit.`
      )
    );
    process.exit(1);
  }

  try {
    fs.ensureDir(componentDir);

    generateActions(componentName);
    generateContext(componentName);
    generateHooks(componentName);
    generateReducer(componentName);
    generateTypes(componentName);
    generateUI(componentName);
    generateIndex(componentName);

    console.log(
      chalk.green(
        `OK: UI component ${componentName} has been successfully created`
      )
    );
  } catch (error) {
    console.error(chalk.red("Error: UI component creating error:", error));
  }
}
