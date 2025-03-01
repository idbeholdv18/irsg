import fs from "fs-extra";
import path from "path";
import ejs from "ejs";
import { Layer } from "./layers/Layer.enum";
import { toPascalCase } from "./utils/toPascalCase";
import chalk from "chalk";

const TEMPLATES_DIR = path.join(__dirname, "..", "templates", "slice");

export const generateSlice = async (
  layer: Layer,
  name: string,
  opt?: string
) => {
  const sliceDir = path.join(process.cwd(), "src", layer, name);
  if (await fs.pathExists(sliceDir)) {
    console.error(
      chalk.red(
        `Error: slice with name '${name}' already exists on layer '${layer}'.`
      )
    );
    process.exit(1);
  }

  try {
    await fs.ensureDir(sliceDir);

    const indexTemplate = await fs.readFile(
      path.join(TEMPLATES_DIR, "index.ts.ejs"),
      "utf-8"
    );
    const indexContent = ejs.render(indexTemplate, {
      name: toPascalCase(name),
      opt,
    });
    await fs.writeFile(path.join(sliceDir, "index.ts"), indexContent);

    const componentTemplate = await fs.readFile(
      path.join(TEMPLATES_DIR, "component.tsx.ejs"),
      "utf-8"
    );
    const componentDir = path.join(sliceDir, "ui");
    await fs.ensureDir(componentDir);
    const componentContent = ejs.render(componentTemplate, {
      name: toPascalCase(name),
    });
    await fs.writeFile(
      path.join(componentDir, `${toPascalCase(name)}.tsx`),
      componentContent
    );

    console.log(
      chalk.green(
        `OK: Slice '${name}' layer '${layer}' has been successfully created`
      )
    );
  } catch (error) {
    console.error(chalk.red("Error: Slice creating error:", error));
  }
};
