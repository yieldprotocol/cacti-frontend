import { format, subDays } from 'date-fns';

export const nameFromMaturity = (maturity: number, style: string = 'MMMM yyyy') =>
  format(subDays(new Date(maturity * 1000), 2), style);
