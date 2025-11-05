import React, { createContext, useState } from 'react';
import { Appearance } from 'react-native';
// Inline fallback Colors definition to avoid unresolved module import
const Colors = {
    light: {
        background: '#ffffff',
        text: '#000000',
        primary: '#0a84ff',
    },
    dark: {
        background: '#000000',
        text: '#ffffff',
        primary: '#0a84ff',
    },
};


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
     
    return (
        <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}