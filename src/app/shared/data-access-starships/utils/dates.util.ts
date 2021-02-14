import { STARSHIPS_EXPIRATION_MINUTES, STARSHIP_DETAILS_EXPIRATION_MINUTES } from '../models/constants';

export function getNowPlusMinutes(minutes: number): Date {
  const today = new Date();
  today.setMinutes(today.getMinutes() + minutes);
  return today;
}
export function getNowPlusMinutesISO(minutes: number): string {
  return getNowPlusMinutes(minutes).toJSON();
}
export function getStarshipListExpirationFromNow(): string {
  return getNowPlusMinutesISO(STARSHIPS_EXPIRATION_MINUTES);
}
export function getStarshipDetailsExpirationFromNow(): string {
  return getNowPlusMinutesISO(STARSHIP_DETAILS_EXPIRATION_MINUTES);
}

export function dateIsExpired(date: Date): boolean {
  return date < new Date();
}
export function dateInISOIsExpired(date: string): boolean {
  return dateIsExpired(new Date(date));
}
