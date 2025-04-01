import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FocusContext = createContext();

export const useFocus = () => useContext(FocusContext);

export const FocusProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(false);  // Estado del foco

  // Función para recuperar el estado del foco desde AsyncStorage al iniciar la app
  useEffect(() => {
    const loadFocusState = async () => {
      try {
        const savedFocusState = await AsyncStorage.getItem('focusState');
        if (savedFocusState !== null) {
          setIsOn(JSON.parse(savedFocusState));
        }
      } catch (error) {
        console.error("Error al cargar el estado del foco desde AsyncStorage", error);
      }
    };

    loadFocusState();
  }, []);

  // Función para alternar el estado del foco y guardarlo en AsyncStorage
  const toggleFocus = async () => {
    const newFocusState = !isOn;
    setIsOn(newFocusState);

    try {
      await AsyncStorage.setItem('focusState', JSON.stringify(newFocusState));
    } catch (error) {
      console.error("Error al guardar el estado del foco en AsyncStorage", error);
    }
  };

  return (
    <FocusContext.Provider value={{ isOn, toggleFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
