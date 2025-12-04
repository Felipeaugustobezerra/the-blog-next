'use server';
import { logColor } from '@/utils/log-color';
import { asyncdelay } from '@/utils/async-delay';

export async function deletePostAction(id: string) {
  // await asyncdelay(5000, true); // Simula uma operação demorada
  logColor('' + id);

  return id;
}
