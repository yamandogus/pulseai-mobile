import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

// Tema tipleri
type ThemeType = 'light' | 'dark';

// Context için tipler
interface ThemeContextType {
    theme: ThemeType;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
}

// Renk paletleri
export const colors = {
    light: {
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#1A1A1A',
        textSecondary: '#6B7280',
        primary: '#6366F1',
        border: '#E5E7EB',
        card: '#FFFFFF',
        shadow: '#000000',
    },
    dark: {
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        textSecondary: '#94A3B8',
        primary: '#818CF8',
        border: '#334155',
        card: '#1E293B',
        shadow: '#000000',
    },
};

// Context oluştur
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key
const THEME_STORAGE_KEY = '@pulse_theme';

// Provider bileşeni
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>('light');
    const { setColorScheme } = useNativeWindColorScheme();

    // Uygulama açıldığında kaydedilmiş temayı yükle
    useEffect(() => {
        loadTheme();
    }, []);

    // Tema değiştiğinde NativeWind'e bildir
    useEffect(() => {
        setColorScheme(theme);
    }, [theme, setColorScheme]);

    // Temayı AsyncStorage'dan yükle
    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === 'dark' || savedTheme === 'light') {
                setThemeState(savedTheme);
            }
        } catch (error) {
            console.log('Tema yüklenirken hata:', error);
        }
    };

    // Temayı değiştir ve kaydet
    const setTheme = async (newTheme: ThemeType) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
            setThemeState(newTheme);
        } catch (error) {
            console.log('Tema kaydedilirken hata:', error);
        }
    };

    // Temayı toggle et
    const toggleTheme = () => {
        console.log('Tema değiştiriliyor:', theme);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const value: ThemeContextType = {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook - temaya kolay erişim için
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Renklere kolay erişim için hook
export const useColors = () => {
    const { theme } = useTheme();
    return colors[theme];
};

export default ThemeContext;
