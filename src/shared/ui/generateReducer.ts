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
  "stateful",
  "reducer"
);

export function generateReducer(componentName: string) {
  const reducerDir = path.join(
    pathTo(Path.Frontend_UiKit),
    componentName,
    "reducer"
  );

  fs.ensureDirSync(reducerDir);

  // creating {component}/reducer/{component}.reducer.ts
  const reducerTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "reducer.ts.ejs"),
    "utf-8"
  );
  const reducerContent = ejs.render(reducerTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(reducerDir, `${toPascalCase(componentName)}.reducer.ts`),
    reducerContent
  );
}
