import { useContext } from "react";
import { ThemeContext } from "../../Context";
import './ThemeToggle.css'


export const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <label className="switch" htmlFor="toggleTheme">
        <input
          id="toggleTheme"
          name='toggle-theme'
          aria-label="toggleThemeInput"
          aria-live="polite"
          type="checkbox"
          checked={darkTheme}
          onChange={toggleTheme}
          className="toggleInput"
        />
      </label>
      <p aria-label='current-applied-theme' className="px-2">{darkTheme ? "Dark Theme" : "Light Theme"}</p>
    </div>
  );
};

export default ThemeToggle;
