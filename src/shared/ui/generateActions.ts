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
  "actions"
);

export function generateActions(componentName: string) {
  const actionsDir = path.join(
    pathTo(Path.Frontend_UiKit),
    componentName,
    "actions"
  );

  fs.ensureDirSync(actionsDir);

  // creating {component}/actions/{component}Action.enum.ts
  const actionEnumTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "action.enum.tsx.ejs"),
    "utf-8"
  );
  const actionEnumContent = ejs.render(actionEnumTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(actionsDir, `${toPascalCase(componentName)}Action.enum.tsx`),
    actionEnumContent
  );

  // creating {component}/actions/{component}Action.type.ts
  const actionTypeTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "action.type.tsx.ejs"),
    "utf-8"
  );
  fs.ensureDirSync(actionsDir);
  const actionTypeContent = ejs.render(actionTypeTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(actionsDir, `${toPascalCase(componentName)}Action.type.tsx`),
    actionTypeContent
  );

  // creating {component}/actions/{component}Payload.type.ts
  const payloadTypeTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "payload.type.tsx.ejs"),
    "utf-8"
  );
  fs.ensureDirSync(actionsDir);
  const payloadTypeContent = ejs.render(payloadTypeTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(actionsDir, `${toPascalCase(componentName)}Payload.type.tsx`),
    payloadTypeContent
  );
}
