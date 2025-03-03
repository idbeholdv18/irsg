import path from "path";
import { promptProjectName } from "./inquirer/promptProjectName";
import degit from "degit";
import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { Config } from "../types/Config.type";

export async function createReactApp() {
  const projectName = await promptProjectName();
  const repo = "github:idbeholdv18/irsg-template";
  const destination = path.join(process.cwd(), projectName);
  const frontendPath = path.join(destination, "frontend");

  console.log(chalk.yellow(`Cloning template to ${destination}...`));

  try {
    const emitter = degit(repo, { cache: false, force: true });
    await emitter.clone(destination);

    const config: Config = {
      projectName,
      frontendBase: "frontend",
      backendBase: "backend",
    };
    const configPath = path.join(destination, "irsg.config.json");
    writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log(chalk.yellow("Git initialization..."));
    execSync("git init", { cwd: destination, stdio: "inherit" });
    execSync("git branch -m main master", {
      cwd: destination,
      stdio: "inherit",
    });
    execSync("git add .", { cwd: destination, stdio: "inherit" });
    execSync('git commit -m "Initial commit"', {
      cwd: destination,
      stdio: "inherit",
    });
    console.log(chalk.green("Git initialized!"));

    console.log(chalk.yellow("Installing dependencies..."));
    execSync("npm install", { cwd: frontendPath, stdio: "inherit" });
    console.log(chalk.green("OK: Dependencies installed"));

    console.log(chalk.green("OK: Project has been created"));
  } catch (err) {
    console.error("Error: CRA error:", err);
    process.exit(1);
  }
}
