import styled from 'styled-components';
import { getTodayIso } from '../utils/validators';

const DateField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-width: 260px;
`;

const DateInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const minDate = getTodayIso();

  return (
    <DateField>
      <label htmlFor="booking-date">Data</label>
      <DateInput
        id="booking-date"
        type="date"
        min={minDate}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </DateField>
  );
};

export default DatePicker;
