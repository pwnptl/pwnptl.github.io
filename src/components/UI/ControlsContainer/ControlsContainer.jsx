import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { GoToTopButton } from '../GoToTopButton/GoToTopButton';
import './ControlsContainer.css';

export function ControlsContainer({ isThemeSwitcherEnabled = true, isGoToTopEnabled = true }) {
  return (
    <div id="controls-container" className="controls-container">
      {isThemeSwitcherEnabled && <ThemeSwitcher />}
      {isGoToTopEnabled && <GoToTopButton isEnabled={true} />}
    </div>
  );
}

export default ControlsContainer;
