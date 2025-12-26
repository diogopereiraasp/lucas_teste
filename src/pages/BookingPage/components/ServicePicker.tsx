import styled from 'styled-components';
import type { Service } from '../types';
import { formatCurrency } from '../utils/formatters';

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const ServiceCard = styled.button<{ $active: boolean }>`
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
  transition: border 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Price = styled.span`
  font-weight: 700;
`;

type ServicePickerProps = {
  services: Service[];
  selectedId?: string;
  onSelect: (serviceId: string) => void;
};

const ServicePicker = ({ services, selectedId, onSelect }: ServicePickerProps) => {
  return (
    <ServiceGrid role="radiogroup" aria-label="Selecione um serviço">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          type="button"
          $active={selectedId === service.id}
          onClick={() => onSelect(service.id)}
          role="radio"
          aria-checked={selectedId === service.id}
        >
          <strong>{service.name}</strong>
          <span>Duração: {service.duration} min</span>
          <Price>{formatCurrency(service.price)}</Price>
        </ServiceCard>
      ))}
    </ServiceGrid>
  );
};

export default ServicePicker;
