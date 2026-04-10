import { createContext } from 'react';

type MainEventsType = {
  on<T = any>(eventName: string | symbol, listener: (...args: T[]) => void): void;
  emit<T = any>(eventName: string | symbol, payload: T): void;
};

export interface MainContextType {
  mainEvents?: MainEventsType | null;
}

export const MainContext = createContext<MainContextType>({
  mainEvents: { on: () => ({}), emit: () => ({}) },
});
