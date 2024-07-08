
export class CheckoutRequestModel{
    email: string | undefined = "";
    name: string | undefined = "";
    phoneNumber: string | undefined = "";
    paymentTypeId: number|undefined;
    posTransactionId: number|undefined;
    processPaymentRequest: ProcessPaymentRequest|undefined
 }
  
 export class ProcessPaymentRequest{
    POSTransactionId: string| undefined = "";
 }