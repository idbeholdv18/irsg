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
  "hooks"
);

export function generateHooks(componentName: string) {
  const hooksDir = path.join(
    pathTo(Path.Frontend_UiKit),
    componentName,
    "hooks"
  );

  fs.ensureDirSync(hooksDir);

  // creating {component}/hooks/use{component}.ts
  const componentHookTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "useComponent.ts.ejs"),
    "utf-8"
  );
  const componentHookContent = ejs.render(componentHookTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(hooksDir, `use${toPascalCase(componentName)}.ts`),
    componentHookContent
  );

  // creating {component}/hooks/use{component}Dispatch.ts
  const dispatchHookTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "useDispatch.ts.ejs"),
    "utf-8"
  );
  fs.ensureDirSync(hooksDir);
  const dispatchHookContent = ejs.render(dispatchHookTemplate, {
    upper_name: toPascalCase(componentName),
    name: componentName,
  });
  fs.writeFileSync(
    path.join(hooksDir, `use${toPascalCase(componentName)}Dispatch.ts`),
    dispatchHookContent
  );
}
