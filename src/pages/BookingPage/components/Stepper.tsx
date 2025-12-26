import styled from 'styled-components';
import type { Step } from '../types';

const StepperWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 999px;
  background: ${({ theme, $active, $completed }) =>
    $active || $completed ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active, $completed }) =>
    $active || $completed ? '#fff' : theme.colors.muted};
  border: 1px solid
    ${({ theme, $active, $completed }) =>
      $active || $completed ? theme.colors.primary : theme.colors.border};
  font-weight: 600;
  font-size: 0.9rem;
`;

const steps: { label: string; value: Step }[] = [
  { label: 'Serviço', value: 'service' },
  { label: 'Data/Horário', value: 'schedule' },
  { label: 'Revisão', value: 'review' },
  { label: 'Pagamento', value: 'payment' }
];

type StepperProps = {
  currentStep: Step;
};

const Stepper = ({ currentStep }: StepperProps) => {
  const currentIndex = steps.findIndex((step) => step.value === currentStep);

  return (
    <StepperWrapper aria-label="Etapas do agendamento">
      {steps.map((step, index) => (
        <StepItem
          key={step.value}
          $active={currentStep === step.value}
          $completed={index < currentIndex}
          aria-current={currentStep === step.value ? 'step' : undefined}
        >
          {step.label}
        </StepItem>
      ))}
    </StepperWrapper>
  );
};

export default Stepper;
