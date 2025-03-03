import path from "path";
import { findProjectRoot } from "./findProjectRoot";
import { getConfig } from "./getConfig";

export enum Path {
  Root = "root/",
  Frontend_Base = "root/frontend/",
  Frontend_UiKit = "root/frontend/src/shared/ui/",

  Backend_Base = "Backend",
}

export function pathTo(to: Path) {
  const projectRoot = findProjectRoot();
  const { frontendBase, backendBase } = getConfig();

  switch (to) {
    case Path.Root:
      return projectRoot;

    case Path.Frontend_Base: // {project}/frontend
      return path.join(projectRoot, frontendBase);
    case Path.Frontend_UiKit: // {project}/frontend/src/shared/ui
      return path.join(projectRoot, frontendBase, "src", "shared", "ui");

    case Path.Backend_Base: // {project}/backend
      return path.join(projectRoot, backendBase);

    default:
      throw new Error("Unknown path");
  }
}
