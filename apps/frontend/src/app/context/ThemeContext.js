'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('suds_modo_escuro');
    const initialValue = savedTheme === 'true';
    setModoEscuro(initialValue);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.dataset.theme = modoEscuro ? 'dark' : 'light';
    localStorage.setItem('suds_modo_escuro', String(modoEscuro));
  }, [modoEscuro]);

  const toggleModoEscuro = () => {
    setModoEscuro((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ modoEscuro, toggleModoEscuro }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
