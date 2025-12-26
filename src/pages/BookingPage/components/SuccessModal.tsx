import styled from 'styled-components';
import type { Barber, Service } from '../types';
import { formatDate } from '../utils/formatters';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 520px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

type SuccessModalProps = {
  code: string;
  service?: Service;
  barber?: Barber;
  date?: string;
  time?: string;
  onReset: () => void;
};

const SuccessModal = ({ code, service, barber, date, time, onReset }: SuccessModalProps) => {
  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="success-title">
      <Modal>
        <h3 id="success-title">Agendamento confirmado!</h3>
        <p>
          Código do agendamento: <Highlight>{code}</Highlight>
        </p>
        <p>
          {service?.name} com {barber?.name ?? 'nossa equipe'} em {formatDate(date)} às{' '}
          {time}.
        </p>
        <p>Obrigado por escolher a Barbearia X. Esperamos você!</p>
        <ActionButton type="button" onClick={onReset}>
          Novo agendamento
        </ActionButton>
      </Modal>
    </Overlay>
  );
};

export default SuccessModal;
