#!/usr/bin/env node

import { Command } from 'commander';

import { init } from './commands/init';
import { copy } from './commands/copy';
import { buildSchema } from './commands/buildSchema';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

const program = new Command();

program.name('tsh-frontend-components').description('Copy TSH Frontend Components to your project');

program.addCommand(init);
program.addCommand(copy);
program.addCommand(buildSchema);

program.parse();
