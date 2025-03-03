import { readFileSync } from "fs";
import { findProjectRoot } from "./findProjectRoot";
import path from "path";
import { Config } from "../types/Config.type";

export function getConfig(): Config {
  const configPath = path.join(findProjectRoot(), "irsg.config.json");
  const configFile = readFileSync(configPath, "utf-8");
  return JSON.parse(configFile);
}
