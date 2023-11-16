import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export class DateFormatService {
  public static formatToRelativeDateTimeString(date: Date): string {
    const relativeDateStringFormatted = formatDistanceToNow(date, {
      locale: ptBR,
      addSuffix: true,
    });

    return relativeDateStringFormatted;
  }
}
