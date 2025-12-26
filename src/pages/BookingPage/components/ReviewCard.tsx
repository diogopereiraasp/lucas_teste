import styled from 'styled-components';
import type { Barber, Service } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`;

const NotesField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Textarea = styled.textarea`
  min-height: 90px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  resize: vertical;
`;

type ReviewCardProps = {
  service?: Service;
  barber?: Barber;
  date?: string;
  time?: string;
  notes: string;
  onNotesChange: (value: string) => void;
};

const ReviewCard = ({ service, barber, date, time, notes, onNotesChange }: ReviewCardProps) => {
  return (
    <div>
      <ReviewGrid>
        <ReviewItem>
          <strong>Serviço</strong>
          <span>{service?.name ?? '-'}</span>
          <span>Duração: {service?.duration ?? 0} min</span>
        </ReviewItem>
        <ReviewItem>
          <strong>Profissional</strong>
          <span>{barber?.name ?? 'Sem preferência'}</span>
          <span>Especialidade: {barber?.focus ?? 'Equipe completa'}</span>
        </ReviewItem>
        <ReviewItem>
          <strong>Data e horário</strong>
          <span>{formatDate(date)}</span>
          <span>{time ?? '-'}</span>
        </ReviewItem>
        <ReviewItem>
          <strong>Total</strong>
          <span>{formatCurrency(service?.price ?? 0)}</span>
        </ReviewItem>
      </ReviewGrid>

      <NotesField>
        <label htmlFor="booking-notes">Observações (opcional)</label>
        <Textarea
          id="booking-notes"
          placeholder="Ex: preferência de estilo, alergias, etc."
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
        />
      </NotesField>
    </div>
  );
};

export default ReviewCard;
