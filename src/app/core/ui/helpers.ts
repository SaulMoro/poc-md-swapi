export const THEME_KEY = 'MD_theme';

export const lsTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark';
export const mediaTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
