export interface Album {
  id: number;
  name: string;
  description: string;
  coverImageName?: string;
  photoCount?: number;
}

export interface AlbumDto {
  id?: number;
  name: string;
  description: string;
}
