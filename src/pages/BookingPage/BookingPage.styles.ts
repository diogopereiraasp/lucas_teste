import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Container = styled.section`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: 1.25rem;
`;

export const SectionSubtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.muted};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary : theme.colors.border};
  background:
    ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary : 'transparent'};
  color:
    ${({ theme, variant }) =>
      variant === 'primary' ? '#fff' : theme.colors.text};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    background:
      ${({ theme, variant }) =>
        variant === 'primary' ? theme.colors.primaryDark : theme.colors.background};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 999px;
  font-size: 0.85rem;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-style: italic;
`;
