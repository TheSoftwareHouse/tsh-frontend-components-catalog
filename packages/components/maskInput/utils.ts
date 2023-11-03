// Basic implementation of formatting logic. Feel free to modify it to meet Your requirements :)

export const handleFormatPhoneNumber = (value: string) => {
  let phoneValue = value.replace(/\D/g, '');
  phoneValue = phoneValue.slice(0, 10);
  if (phoneValue.length >= 6) {
    phoneValue = `(${phoneValue.slice(0, 3)}) ${phoneValue.slice(3, 6)}-${phoneValue.slice(6)}`;
  }
  return phoneValue;
};

export const handleFormatDate = (value: string) => {
  let dateValue = value.replace(/\D/g, '');
  dateValue = dateValue.slice(0, 8);
  if (dateValue.length >= 4) {
    dateValue = `${dateValue.slice(0, 2)}/${dateValue.slice(2, 4)}/${dateValue.slice(4)}`;
  }
  return dateValue;
};

export const handleFormatCreditCard = (value: string) => {
  let cardValue = value.replace(/[^\d\s]/g, '');
  const cardNumber = cardValue.replace(/\s/g, '');
  cardValue = cardNumber.slice(0, 16);
  if (cardValue.length >= 4) {
    const formattedCardNumber = cardNumber.match(/\d{1,4}/g)?.join(' ');
    cardValue = formattedCardNumber || '';
  }
  return cardValue;
};
