import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo, PhotoDto } from '../../model/photo.model';
import { Album, AlbumDto } from '../../model/album.model';
import { PhotoService } from '../../services/photo.service';
import { AlbumService } from '../../services/album.service';

interface SelectedFile {
  file: File;
  name: string;
  preview: string;
}

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[] = [];
  albums: Album[] = [];
  filteredPhotos: Photo[] = [];
  selectedAlbum: string = 'all';
  viewingPhoto: Photo | null = null;
  currentPhotoIndex: number = 0;
  showUploadModal = false;
  showAlbumModal = false;
  editingPhoto: Photo | null = null;
  selectedFiles: SelectedFile[] = [];

  photoForm: FormGroup;
  albumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private albumService: AlbumService
  ) {
    this.photoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      album: [''],
      description: ['']
    });

    this.albumForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAlbums();
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getAllPhotos().subscribe(photos => {
      this.photos = photos.map(photo => ({
        ...photo,
        url: `../../../assets/Gallery/${photo.imageName}`,
        albumName: this.getAlbumName(photo.albumId),
        displayDate: new Date(photo.uploadDate)
      }));
      this.filterPhotos();
    });
  }

  loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe(albums => {
      this.albums = albums;
    });
  }

  getAlbumName(albumId: number): string {
    const album = this.albums.find(a => a.id === albumId);
    return album ? album.name : 'Uncategorized';
  }

  filterPhotos(): void {
    if (this.selectedAlbum === 'all') {
      this.filteredPhotos = [...this.photos];
    } else if (this.selectedAlbum === 'new') {
      this.openAlbumModal();
      this.selectedAlbum = 'all';
    } else {
      const albumId = Number(this.selectedAlbum);
      this.filteredPhotos = this.photos.filter(photo => photo.albumId === albumId);
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.handleFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            file,
            name: file.name,
            preview: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeSelectedFile(file: SelectedFile): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  viewPhoto(photo: Photo): void {
    this.viewingPhoto = photo;
    this.currentPhotoIndex = this.filteredPhotos.findIndex(p => p.id === photo.id);
  }

  closeViewer(): void {
    this.viewingPhoto = null;
  }

  navigatePhoto(direction: number): void {
    this.currentPhotoIndex += direction;
    this.viewingPhoto = this.filteredPhotos[this.currentPhotoIndex];
  }

  canNavigatePrevious(): boolean {
    return this.currentPhotoIndex > 0;
  }

  canNavigateNext(): boolean {
    return this.currentPhotoIndex < this.filteredPhotos.length - 1;
  }

  openUploadModal(): void {
    this.showUploadModal = true;
    this.editingPhoto = null;
    this.selectedFiles = [];
    this.photoForm.reset();
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.editingPhoto = null;
    this.selectedFiles = [];
  }

  openEditModal(photo: Photo): void {
    this.editingPhoto = photo;
    this.showUploadModal = true;
    this.photoForm.patchValue({
      name: photo.name,
      album: photo.albumId,
      description: photo.description || ''
    });
  }

  openAlbumModal(): void {
    this.showAlbumModal = true;
    this.albumForm.reset();
  }

  closeAlbumModal(): void {
    this.showAlbumModal = false;
  }


  savePhoto(): void {
    if (this.editingPhoto) {
      const photoDto: PhotoDto = {
        id: this.editingPhoto.id,
        name: this.photoForm.value.name,
        description: this.photoForm.value.description,
        albumId: Number(this.photoForm.value.album)
      };

      if (this.selectedFiles.length > 0) {
        photoDto.photoImage = this.selectedFiles[0].file;
      }

      this.photoService.updatePhoto(this.editingPhoto.id, photoDto).subscribe(updatedPhoto => {
        const index = this.photos.findIndex(p => p.id === updatedPhoto.id);
        if (index !== -1) {
          this.photos[index] = {
            ...updatedPhoto,
            url: `../../../assets/Gallery/${updatedPhoto.imageName}`,
            albumName: this.getAlbumName(updatedPhoto.albumId),
            displayDate: new Date(updatedPhoto.uploadDate)
          };
        }
        this.filterPhotos();
        this.closeUploadModal();
      });
    } else {
      const uploadPromises = this.selectedFiles.map(file => {
        const photoDto: PhotoDto = {
          name: this.photoForm.value.name || file.name.split('.')[0],
          description: this.photoForm.value.description,
          albumId: Number(this.photoForm.value.album),
          photoImage: file.file
        };

        return this.photoService.createPhoto(photoDto).toPromise();
      });

      Promise.all(uploadPromises).then(newPhotos => {
        const validPhotos = newPhotos.filter(photo => photo !== undefined) as Photo[];
        this.photos = [
          ...validPhotos.map(photo => ({
            ...photo,
            uploadDate: new Date(photo.uploadDate)
          })),
          ...this.photos
        ];
        this.filterPhotos();
        this.closeUploadModal();
      });
    }
  }


  deletePhoto(id: number): void {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.photoService.deletePhoto(id).subscribe(() => {
        this.photos = this.photos.filter(photo => photo.id !== id);
        this.filterPhotos();

        if (this.viewingPhoto?.id === id) {
          this.closeViewer();
        }
      });
    }
  }

  createAlbum(): void {
    if (this.albumForm.valid) {
      const albumDto: AlbumDto = {
        name: this.albumForm.value.name,
        description: this.albumForm.value.description
      };

      this.albumService.createAlbum(albumDto).subscribe(newAlbum => {
        this.albums.push(newAlbum);
        this.closeAlbumModal();
        this.selectedAlbum = newAlbum.id.toString();
        this.loadPhotos();
      });
    }
  }
}
