import { ZodFormattedError } from 'zod';

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  return Object.values(error)
    .map(field => {
      if (Array.isArray(field)) return field;
      return typeof field === 'object' && field !== null && '_errors' in field
        ? field._errors
        : [];
    })
    .flat()
    .filter(Boolean);
}
