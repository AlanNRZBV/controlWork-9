
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

export interface ITransaction {
  category: string,
  amount: number,
  createdAt: string
}
export interface IOptions extends IOptions{
}

export interface IExpense {
  name: string,
  id: string
}
export interface IIncome extends IExpense{
}
