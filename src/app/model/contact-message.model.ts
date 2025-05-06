export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  get date(): Date;
}
