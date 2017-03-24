// Importuje wszystkie serwisy z pliku index.ts i tworzy z nich objekt.
import * as services from './services';
import { Store } from './store';
export { App } from './app';
export { routes } from './routes';

// map creates new array of object values 
const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  // Add store service
  Store,
  // Jumps throught return array form a function
  ...mapValuesToArray(services)
]