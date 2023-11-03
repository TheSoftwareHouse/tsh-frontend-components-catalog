/* eslint-disable no-console */
// INFO: Console log has any type and method of log throws a warning without eslint disable
import chalk from 'chalk';

export const logger = {
  error(...args: unknown[]) {
    console.log('❌', chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log('⚠️', chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log('ℹ️', chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log('✅', chalk.green(...args));
  },
};
