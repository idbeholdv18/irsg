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
  "context"
);

export function generateContext(componentName: string) {
  const contextDir = path.join(
    pathTo(Path.Frontend_UiKit),
    componentName,
    "context"
  );

  fs.ensureDirSync(contextDir);

  // creating {component}/contex/{component}.context.ts
  const componentContextTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "component.context.tsx.ejs"),
    "utf-8"
  );
  const componentContextContent = ejs.render(componentContextTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(contextDir, `${toPascalCase(componentName)}.context.tsx`),
    componentContextContent
  );

  // creating {component}/contex/Dispatch{component}.context.ts
  const dispathContextTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "dispatch.context.tsx.ejs"),
    "utf-8"
  );
  fs.ensureDirSync(contextDir);
  const dispathContextContent = ejs.render(dispathContextTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(contextDir, `Dispatch${toPascalCase(componentName)}.context.tsx`),
    dispathContextContent
  );
}
