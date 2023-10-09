export type Locale = 'en' | 'lt'; // simplistic version as per the task

export interface OpenIbanResponse {
  iban: string;
  valid: boolean;
  messages: string[];
}
