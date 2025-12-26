export const getTodayIso = () => new Date().toISOString().split('T')[0];

export const isDateValid = (value?: string) => {
  if (!value) return false;
  const today = getTodayIso();
  return value >= today;
};
