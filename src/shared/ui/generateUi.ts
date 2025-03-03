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
  "ui"
);

export function generateUI(componentName: string) {
  const uiDir = path.join(pathTo(Path.Frontend_UiKit), componentName, "ui");

  fs.ensureDirSync(uiDir);

  // creating {component}/ui/{component}.tsx
  const componentUITemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "component.tsx.ejs"),
    "utf-8"
  );
  const componentUIContent = ejs.render(componentUITemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(uiDir, `${toPascalCase(componentName)}.tsx`),
    componentUIContent
  );

  // creating {component}/ui/{component}.provider.ts
  const dispatchUITemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "component.provider.tsx.ejs"),
    "utf-8"
  );
  fs.ensureDirSync(uiDir);
  const dispatchUIContent = ejs.render(dispatchUITemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(uiDir, `${toPascalCase(componentName)}.provider.tsx`),
    dispatchUIContent
  );
}
