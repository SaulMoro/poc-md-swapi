import { createAction } from '@ngrx/store';

export const enterStarshipsPage = createAction('[Starships Page] Enter Starships Page');
export const scrollToNextStarshipsPage = createAction('[Starships Page] Scroll To Next Starships Page');
export const scrollToPrevStarshipsPage = createAction('[Starships Page] Scroll To Prev Starships Page');

export const enterStarshipDetailsPage = createAction('[Starships Details Page] Enter Starship Details Page');
