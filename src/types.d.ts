import { store } from './app/store.ts';

export interface ICategory {
  type: string,
  name: string
}
export interface IOptions {
  value:string,
  label: string
}