#!/usr/bin/env node

import { Command } from "commander";
import { generateSlice } from "./generator";

const program = new Command();

program
  .version("1.0.0")
  .description("CLI генератор для создания слайсов")
  .command("generate:slice <name>")
  .description("Создать новый слайс")
  .action((name) => {
    generateSlice(name);
  });

program.parse(process.argv);
