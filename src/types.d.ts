
export interface ICategory {
  type: string,
  name: string
}
export interface IApiCategory extends ICategory{
  id:string
}
export interface IOptions {
  value:string,
  label: string
}