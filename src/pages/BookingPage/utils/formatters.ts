export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const formatDate = (value?: string) => {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
};

export const buildPixPayload = (total: number, orderId: string) =>
  `00020101021226800014BR.GOV.BCB.PIX0136barbeariax.com/pix/${orderId}52040000530398654${
    String(Math.round(total * 100)).padStart(12, '0')
  }5802BR5920Barbearia X6009Sao Paulo62140510${orderId}6304ABCD`;
