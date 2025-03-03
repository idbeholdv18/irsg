import chalk from "chalk";
import { existsSync } from "fs";
import path from "path";

export function findProjectRoot(): string {
  let currentDir = process.cwd();

  while (currentDir !== path.resolve(currentDir, "..")) {
    const configPath = path.join(currentDir);

    if (existsSync(path.resolve(currentDir, "irsg.config.json"))) {
      return configPath;
    }

    currentDir = path.resolve(currentDir, "..");
  }

  console.error(
    chalk.red("Config file irsg.config.json not found in any parent directory")
  );
  process.exit(1);
}
