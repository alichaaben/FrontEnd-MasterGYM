export interface Photo {
  id: number;
  name: string;
  imageName: string;
  description: string;
  uploadDate: Date;
  albumId: number;
  url?: string;
  albumName?: string;
  displayDate?: Date;
}

export interface PhotoDto {
  id: number;
  name: string;
  description: string;
  albumId: number;
  photoImage?: File;
}
