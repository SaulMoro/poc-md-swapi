export const extractIdFromUrl = (url: string): number => +url.split('/').splice(-2)[0];
