import styled from 'styled-components';
import type { TimeSlot } from '../types';

const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SlotButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.text)};
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

type TimeSlotPickerProps = {
  slots: TimeSlot[];
  selected?: string;
  onSelect: (time: string) => void;
};

const TimeSlotPicker = ({ slots, selected, onSelect }: TimeSlotPickerProps) => {
  return (
    <SlotGrid role="radiogroup" aria-label="Selecione um horário">
      {slots.map((slot) => (
        <SlotButton
          key={slot.time}
          type="button"
          $active={selected === slot.time}
          onClick={() => onSelect(slot.time)}
          disabled={!slot.available}
          role="radio"
          aria-checked={selected === slot.time}
        >
          {slot.time}
        </SlotButton>
      ))}
    </SlotGrid>
  );
};

export default TimeSlotPicker;
