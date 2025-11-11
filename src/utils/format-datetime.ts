import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);
  return format(date, "dd/MM/yyyy 'ás' HH'h'MM", {
    locale: ptBR, // You can specify a locale if needed
  });
}
export function formatRelativeDate(rawDate: string): string {
  const date = new Date(rawDate);
  return formatDistanceToNow(date, {
    locale: ptBR, // You can specify a locale if needed
    addSuffix: true,
  });
}
