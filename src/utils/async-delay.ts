import { logColor } from './log-color';

export async function asyncdelay(ms: number = 0, verbose = false) {
  if (ms <= 0) return;

  if (verbose) {
    logColor(`Aguardando ${ms / 1000}s...`, 'yellow');
  }

  await new Promise(resolve => setTimeout(resolve, ms));

  if (verbose) {
    logColor(`Aguardando ${ms / 1000}s...`, 'green');
  }
}
