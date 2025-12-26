import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import BookingPage from '../pages/BookingPage/BookingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BookingPage />
    </ThemeProvider>
  );
};

export default App;
