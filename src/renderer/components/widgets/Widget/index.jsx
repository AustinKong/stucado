import { IconContext } from '@phosphor-icons/react';

import './styles.css';

export const Widget = ({ className, title, interaction, children }) => {
  return (
    <div className={`widget ${className}`}>
      <div className="widget-header">
        <h2 className="widget-header__title">{title}</h2>
        <>{interaction}</>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  );
};

export const InteractionButton = ({ icon, text, onClick }) => {
  return (
    <button className="widget__interaction-button" onClick={onClick}>
      <IconContext.Provider
        value={{
          size: 24,
          weight: 'regular',
        }}
      >
        {icon}
      </IconContext.Provider>
      <div className="widget__interaction-text">{text}</div>
    </button>
  );
};
