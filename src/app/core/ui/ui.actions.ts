import { createAction } from '@ngrx/store';

export const toggleTheme = createAction('[App Page] Toggle Theme');

export const toggleMainSidebar = createAction('[App Page] Toggle Main Sidebar');
export const selectItemOnMainSidebar = createAction('[App Page] Select Item On Main Sidebar');
export const enterLargeBreakpointWithSidebarOpen = createAction(
  '[Ui Effects] Enter Large Breakpoint With Sidebar Open',
);

export const openLogin = createAction('[App Page] Open Login');

export const closeFloatingSidebar = createAction('[App Page] Close Floating Sidebar');
