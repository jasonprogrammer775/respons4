export interface MarsWeatherData {
  sol_keys: string[];
  validity_checks: Record<string, unknown>;
  [key: string]: {
    AT: {
      av: number;
      ct: number;
      mn: number;
      mx: number;
    };
    First_UTC: string;
    Last_UTC: string;
    PRE: {
      av: number;
      ct: number;
      mn: number;
      mx: number;
    };
    Season: string;
  } | unknown;
}