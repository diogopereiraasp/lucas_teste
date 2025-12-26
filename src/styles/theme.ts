export const theme = {
  colors: {
    background: '#f5f6f8',
    surface: '#ffffff',
    primary: '#1f7a8c',
    primaryDark: '#155a66',
    secondary: '#ffb703',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#e5e7eb',
    danger: '#ef4444',
    success: '#22c55e',
    overlay: 'rgba(15, 23, 42, 0.6)'
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  shadows: {
    soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
    subtle: '0 4px 14px rgba(15, 23, 42, 0.08)'
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  }
};

export type Theme = typeof theme;
