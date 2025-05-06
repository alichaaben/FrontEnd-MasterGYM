export interface ContactUser {
  //id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  // createdAt: Date;
}
