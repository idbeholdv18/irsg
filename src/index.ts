#!/usr/bin/env node
import pkg from "../package.json";

import chalk from "chalk";
import { Command } from "commander";
import { generateSlice } from "./generator";
import { Layer } from "./layers/Layer.enum";
import { chooseLayer } from "./inquirer/chooseLayer";
import { chooseName } from "./inquirer/chooseName";
import { createReactApp } from "./cra";
import { promptComponentName } from "./shared/ui/inquirer/promptComponentName";
import { generateComponent } from "./shared/ui/generateComponent";

const program = new Command();

program
  .name("irsg")
  .description("CLI generator for FSD slices creating")
  .version(pkg.version);

program
  .command("g")
  .description("Creates new slice")
  .action(async (options) => {
    const layer = await chooseLayer();
    const name = await chooseName();

    generateSlice(layer as Layer, name, options.opt);
  })
  .configureOutput({
    writeErr: (str) => process.stdout.write(chalk.red(`${str}`)),
  });

program
  .command("create-app")
  .description("Creates react app")
  .action(async (option) => {
    createReactApp();
  });

program
  .command("ui")
  .description("Creates ui kit component")
  .action(async (option) => {
    const componentName = await promptComponentName();
    generateComponent(componentName);
  });

program.parse(process.argv);
