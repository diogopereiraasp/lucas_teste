import { QRCodeCanvas } from 'qrcode.react';
import styled from 'styled-components';
import { formatCurrency } from '../utils/formatters';

const PaymentLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PixBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
`;

const PixPayload = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  resize: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $primary }) => ($primary ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.text)};
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    background: ${({ theme, $primary }) => ($primary ? theme.colors.primaryDark : theme.colors.background)};
  }
`;

type PixPaymentProps = {
  payload: string;
  total: number;
  paymentConfirmed: boolean;
  onCopy: () => void;
  onTogglePayment: (confirmed: boolean) => void;
  onConfirmBooking: () => void;
  canConfirm: boolean;
};

const PixPayment = ({
  payload,
  total,
  paymentConfirmed,
  onCopy,
  onTogglePayment,
  onConfirmBooking,
  canConfirm
}: PixPaymentProps) => {
  return (
    <PaymentLayout>
      <div>
        <h3>Pagamento via Pix</h3>
        <p>
          Total: <strong>{formatCurrency(total)}</strong>
        </p>
        <p>
          Escaneie o QR Code ou copie o código Pix para concluir o pagamento. Após o pagamento,
          confirme abaixo.
        </p>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={paymentConfirmed}
            onChange={(event) => onTogglePayment(event.target.checked)}
          />
          Confirmo que realizei o pagamento
        </CheckboxLabel>
      </div>

      <PixBox>
        <QRCodeCanvas value={payload} size={180} />
        <PixPayload value={payload} readOnly aria-label="Payload Pix" />
        <ActionButton type="button" onClick={onCopy}>
          Copiar código Pix
        </ActionButton>
        <ActionButton type="button" onClick={onConfirmBooking} disabled={!canConfirm} $primary>
          Confirmar agendamento
        </ActionButton>
      </PixBox>
    </PaymentLayout>
  );
};

export default PixPayment;
