import { useMemo, useState } from 'react';
import BarberPicker from './components/BarberPicker';
import DatePicker from './components/DatePicker';
import PixPayment from './components/PixPayment';
import ReviewCard from './components/ReviewCard';
import ServicePicker from './components/ServicePicker';
import Stepper from './components/Stepper';
import SuccessModal from './components/SuccessModal';
import TimeSlotPicker from './components/TimeSlotPicker';
import { useBookingReducer } from './hooks/useBookingReducer';
import { barbers } from './mocks/barbers';
import { services } from './mocks/services';
import { getTimeSlots } from './mocks/timeSlots';
import type { Step } from './types';
import { formatCurrency, buildPixPayload } from './utils/formatters';
import { isDateValid } from './utils/validators';
import {
  Actions,
  Button,
  Card,
  Container,
  Divider,
  Header,
  LoadingText,
  Main,
  PageWrapper,
  SectionSubtitle,
  SectionTitle
} from './BookingPage.styles';

const stepTitles: Record<Step, { title: string; subtitle: string }> = {
  service: {
    title: 'Selecione o serviço',
    subtitle: 'Escolha o tipo de corte e o profissional (opcional).'
  },
  schedule: {
    title: 'Escolha data e horário',
    subtitle: 'Selecione o melhor dia e um horário disponível.'
  },
  review: {
    title: 'Revise seu agendamento',
    subtitle: 'Confira os dados antes de seguir para o pagamento.'
  },
  payment: {
    title: 'Pagamento',
    subtitle: 'Finalize seu agendamento com Pix.'
  }
};

const BookingPage = () => {
  const [state, dispatch] = useBookingReducer();
  const [copyMessage, setCopyMessage] = useState('');

  const selectedService = services.find((service) => service.id === state.serviceId);
  const selectedBarber = barbers.find((barber) => barber.id === state.barberId);

  const slots = useMemo(() => {
    if (!state.date) return [];
    return getTimeSlots();
  }, [state.date]);

  const canContinueService = Boolean(state.serviceId);
  const canContinueSchedule = Boolean(state.date && state.timeSlot && isDateValid(state.date));
  const canContinueReview = Boolean(selectedService && state.date && state.timeSlot);

  const pixPayload = useMemo(() => {
    if (!selectedService) return '';
    const orderId = `BX-${Date.now().toString().slice(-6)}`;
    return buildPixPayload(selectedService.price, orderId);
  }, [selectedService]);

  const handleNext = () => {
    if (state.step === 'review') {
      dispatch({ type: 'SET_LOADING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'NEXT_STEP' });
      }, 600);
      return;
    }

    dispatch({ type: 'NEXT_STEP' });
  };

  const handleBack = () => {
    if (state.step === 'service') return;
    dispatch({ type: 'PREV_STEP' });
  };

  const handleCopyPix = async () => {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopyMessage('Código Pix copiado!');
    } catch (error) {
      setCopyMessage('Não foi possível copiar.');
    }
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const handleConfirmBooking = () => {
    const code = `AG-${Math.floor(Math.random() * 90000 + 10000)}`;
    dispatch({ type: 'CONFIRM_BOOKING', payload: code });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const currentStep = stepTitles[state.step];

  return (
    <PageWrapper>
      <Header>Barbearia X — Agendamento</Header>
      <Main>
        <Container>
          <Stepper currentStep={state.step} />
          <Card>
            <SectionTitle>{currentStep.title}</SectionTitle>
            <SectionSubtitle>{currentStep.subtitle}</SectionSubtitle>

            {state.step === 'service' && (
              <>
                <ServicePicker
                  services={services}
                  selectedId={state.serviceId}
                  onSelect={(serviceId) => dispatch({ type: 'SELECT_SERVICE', payload: serviceId })}
                />
                <Divider />
                <SectionTitle>Profissional</SectionTitle>
                <SectionSubtitle>Opcional, mas ajuda a priorizar sua preferência.</SectionSubtitle>
                <BarberPicker
                  barbers={barbers}
                  selectedId={state.barberId}
                  onSelect={(barberId) => dispatch({ type: 'SELECT_BARBER', payload: barberId })}
                />
              </>
            )}

            {state.step === 'schedule' && (
              <>
                <DatePicker
                  value={state.date}
                  onChange={(value) => dispatch({ type: 'SELECT_DATE', payload: value })}
                />
                {state.date && (
                  <>
                    <Divider />
                    <SectionTitle>Horários disponíveis</SectionTitle>
                    <TimeSlotPicker
                      slots={slots}
                      selected={state.timeSlot}
                      onSelect={(time) => dispatch({ type: 'SELECT_TIME', payload: time })}
                    />
                  </>
                )}
              </>
            )}

            {state.step === 'review' && (
              <ReviewCard
                service={selectedService}
                barber={selectedBarber}
                date={state.date}
                time={state.timeSlot}
                notes={state.notes}
                onNotesChange={(value) => dispatch({ type: 'SET_NOTES', payload: value })}
              />
            )}

            {state.step === 'payment' && selectedService && (
              <>
                {state.loading ? (
                  <LoadingText>Preparando o Pix...</LoadingText>
                ) : (
                  <>
                    <PixPayment
                      payload={pixPayload}
                      total={selectedService.price}
                      paymentConfirmed={state.paymentConfirmed}
                      onCopy={handleCopyPix}
                      onTogglePayment={(confirmed) =>
                        dispatch({ type: 'CONFIRM_PAYMENT', payload: confirmed })
                      }
                      onConfirmBooking={handleConfirmBooking}
                      canConfirm={state.paymentConfirmed}
                    />
                    {copyMessage && <p aria-live="polite">{copyMessage}</p>}
                  </>
                )}
              </>
            )}

            <Divider />

            <Actions>
              <Button type="button" onClick={handleBack}>
                Voltar
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                disabled={
                  (state.step === 'service' && !canContinueService) ||
                  (state.step === 'schedule' && !canContinueSchedule) ||
                  (state.step === 'review' && !canContinueReview) ||
                  state.step === 'payment'
                }
              >
                Continuar
              </Button>
            </Actions>

            {state.step === 'service' && selectedService && (
              <p>
                Total estimado: <strong>{formatCurrency(selectedService.price)}</strong>
              </p>
            )}
          </Card>
        </Container>
      </Main>

      {state.successCode && (
        <SuccessModal
          code={state.successCode}
          service={selectedService}
          barber={selectedBarber}
          date={state.date}
          time={state.timeSlot}
          onReset={handleReset}
        />
      )}
    </PageWrapper>
  );
};

export default BookingPage;
