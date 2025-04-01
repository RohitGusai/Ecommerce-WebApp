import { CartItem } from "./cartitem"

export interface Order{
  _id?:string,
  PaymentType : string,
  userId :string,
    items : CartItem[],
    address : any,
    date : Date,
    totalAmount : number,
    status?: string
}
