export interface CustomerModel {
  id: string;
  userId : number;
  userName: string;
  email: string;
  telephone: string;
  pack: string;
  dateDebut: Date;
  dateFin: Date;
  profileImage: File | null;
  UrlImagesCustomer?: string;
  montPay:String;
}
