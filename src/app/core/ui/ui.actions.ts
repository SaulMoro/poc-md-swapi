import { createAction } from '@ngrx/store';

export const toggleTheme = createAction('[App Page] Toggle Theme');

export const toggleMainSidebar = createAction('[App Page] Toggle Main Sidebar');
export const selectItemOnMainSidebar = createAction('[App Page] Select Item On Main Sidebar');

export const openLogin = createAction('[App Page] Open Login');
export const closeLoginSidebar = createAction('[App Page] Close Login Sidebar');
