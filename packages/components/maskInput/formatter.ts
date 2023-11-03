import { MaskType } from './MaskInput';
import { handleFormatCreditCard, handleFormatDate, handleFormatPhoneNumber } from './utils';

type Formatter = (value: string) => string;

const formatters: Record<MaskType, Formatter> = {
  phone: handleFormatPhoneNumber,
  date: handleFormatDate,
  creditCard: handleFormatCreditCard,
};

export const formatValue = (value: string, maskType: MaskType) => formatters[maskType](value);
