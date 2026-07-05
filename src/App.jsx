import { Navbar } from '@components/Navigation';
import { Footer } from '@components/Footer';
import { HeroSection, ExperienceSection, Gallery3Section } from '@sections';
import { AppWrapper, MainContent, ThemeSwitcher } from '@ui';
import { ThemeProvider } from '@theme/ThemeContext';
import '@styles/App-Common.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppWrapper id="app-wrapper">
        <Navbar />
        <MainContent id="app-main-content">
          <HeroSection />
          <ExperienceSection />
          <Gallery3Section />
          {/*<Contact />*/}
          <Footer />
        </MainContent>
        <ThemeSwitcher />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;


