import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo, PhotoDto } from '../../model/photo.model';
import { Album, AlbumDto } from '../../model/album.model';
import { PhotoService } from '../../services/photo.service';
import { AlbumService } from '../../services/album.service';
import { HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';

interface SelectedFile {
  file: File;
  name: string;
  preview: string;
  uploadProgress?: number;
  uploadComplete?: boolean;
}

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  public imageBaseUrl = `${environment.UrlImagesGallery}`;
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
  isUploading = false;
  uploadProgress = 0;


  photoForm: FormGroup;
  albumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private albumService: AlbumService
  ) {
    this.photoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      album: ['', Validators.required],
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
        url: `assets/Gallery/${photo.imageName}`,
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
            preview: e.target.result,
            uploadProgress: 0,
            uploadComplete: false
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
    this.isUploading = false;
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
    if (this.photoForm.invalid) {
      this.photoForm.markAllAsTouched();
      return;
    }

    if (this.editingPhoto) {
      this.updateExistingPhoto();
    } else {
      this.uploadNewPhotos();
    }
  }

  private updateExistingPhoto(): void {
    if (!this.editingPhoto) return;

    const formData = new FormData();
    formData.append('id', this.editingPhoto.id.toString());
    formData.append('name', this.photoForm.value.name);
    formData.append('description', this.photoForm.value.description);
    formData.append('albumId', this.photoForm.value.album);

    if (this.selectedFiles.length > 0) {
      formData.append('photoImage', this.selectedFiles[0].file);
    }

    this.isUploading = true;
    this.photoService.updatePhotoFormData(formData).subscribe({
      next: (updatedPhoto) => {
        const index = this.photos.findIndex(p => p.id === updatedPhoto.id);
        if (index !== -1) {
          this.photos[index] = {
            ...updatedPhoto,
            url: `assets/Gallery/${updatedPhoto.imageName}?t=${new Date().getTime()}`,
            albumName: this.getAlbumName(updatedPhoto.albumId),
            displayDate: new Date(updatedPhoto.uploadDate)
          };
        }
        this.filterPhotos();
        this.closeUploadModal();
      },
      error: (err) => {
        console.error('Error updating photo:', err);
        this.isUploading = false;
      }
    });
  }

  private uploadNewPhotos(): void {
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;
    const uploadPromises = this.selectedFiles.map((file, index) => {
      const formData = new FormData();
      formData.append('name', this.photoForm.value.name || file.name.split('.')[0]);
      formData.append('description', this.photoForm.value.description);
      formData.append('albumId', this.photoForm.value.album);
      formData.append('photoImage', file.file);

      return new Promise<Photo>((resolve, reject) => {
        this.photoService.createPhotoFormData(formData).subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              file.uploadProgress = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.Response) {
              file.uploadComplete = true;
              resolve(event.body as Photo);
            }
          },
          error: (err) => {
            reject(err);
          }
        });
      });
    });

    Promise.all(uploadPromises).then(newPhotos => {
      this.photos = [
        ...newPhotos.map(photo => ({
          ...photo,
          url: `assets/Gallery/${photo.imageName}?t=${new Date().getTime()}`,
          albumName: this.getAlbumName(photo.albumId),
          displayDate: new Date(photo.uploadDate)
        })),
        ...this.photos
      ];
      this.filterPhotos();
      this.closeUploadModal();
    }).catch(err => {
      console.error('Error uploading photos:', err);
      this.isUploading = false;
    });
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
