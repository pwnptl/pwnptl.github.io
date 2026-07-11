import { Navbar } from '@components/Navigation';
import { Footer } from '@components/Footer';
import {
  HeroSection,
  ExperienceSection,
  ProjectsSection,
  Gallery3Section,
  EducationSection,
  TechStackSection,
  StatsDashboardSection,
  ArticlesSection,
} from '@sections';
import { AppWrapper, MainContent, ControlsContainer } from '@ui';
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
          <EducationSection />
          <ProjectsSection />
          <Gallery3Section />
          <TechStackSection />
          <StatsDashboardSection />
          <ArticlesSection />
          <Footer />
        </MainContent>
        <ControlsContainer isThemeSwitcherEnabled={true} isGoToTopEnabled={true} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

