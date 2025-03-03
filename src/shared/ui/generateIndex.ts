import path from "path";
import { Path, pathTo } from "../../utils/pathTo";
import fs from "fs-extra";
import ejs from "ejs";
import { toPascalCase } from "../../utils/toPascalCase";

const TEMPLATES_DIR = path.join(
  __dirname,
  "..",
  "templates",
  "shared",
  "ui",
  "stateful"
);

export function generateIndex(componentName: string) {
  const indexDir = path.join(pathTo(Path.Frontend_UiKit), componentName);

  fs.ensureDirSync(indexDir);

  // creating {component}/index/index.ts
  const indexTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "index.ts.ejs"),
    "utf-8"
  );
  const indexContent = ejs.render(indexTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(path.join(indexDir, `index.ts`), indexContent);
}
