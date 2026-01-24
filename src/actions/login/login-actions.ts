'use server';

import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(5000); // Vou manter
  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Invalid form submission.',
    };
  }
  // Extract form data
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  // Validate credentials
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = password === process.env.LOGIN_PASSWORD;

  return {
    username: '',
    error: '',
  };
}
