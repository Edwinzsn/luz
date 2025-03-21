import React, { createContext, useState, useContext } from 'react';

const FocusContext = createContext();

export const useFocus = () => useContext(FocusContext);

export const FocusProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(false);  // Estado del foco

  const toggleFocus = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <FocusContext.Provider value={{ isOn, toggleFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
