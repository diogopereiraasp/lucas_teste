import styled from 'styled-components';
import type { Barber } from '../types';

const BarberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const BarberCard = styled.button<{ $active: boolean }>`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

type BarberPickerProps = {
  barbers: Barber[];
  selectedId?: string;
  onSelect: (barberId?: string) => void;
};

const BarberPicker = ({ barbers, selectedId, onSelect }: BarberPickerProps) => {
  return (
    <BarberGrid role="radiogroup" aria-label="Selecione um profissional">
      <BarberCard
        type="button"
        $active={!selectedId}
        onClick={() => onSelect(undefined)}
        role="radio"
        aria-checked={!selectedId}
      >
        <strong>Sem preferência</strong>
        <span>Priorizamos a equipe disponível.</span>
      </BarberCard>
      {barbers.map((barber) => (
        <BarberCard
          key={barber.id}
          type="button"
          $active={selectedId === barber.id}
          onClick={() => onSelect(barber.id)}
          role="radio"
          aria-checked={selectedId === barber.id}
        >
          <strong>{barber.name}</strong>
          <span>Foco: {barber.focus}</span>
        </BarberCard>
      ))}
    </BarberGrid>
  );
};

export default BarberPicker;
