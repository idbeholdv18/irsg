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
  "types"
);

export function generateTypes(componentName: string) {
  const typesDir = path.join(
    pathTo(Path.Frontend_UiKit),
    componentName,
    "types"
  );

  fs.ensureDirSync(typesDir);

  // creating {component}/types/{component}State.type.ts
  const typesTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "componentState.type.ts.ejs"),
    "utf-8"
  );
  const typesContent = ejs.render(typesTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(typesDir, `${toPascalCase(componentName)}State.type.ts`),
    typesContent
  );
}
