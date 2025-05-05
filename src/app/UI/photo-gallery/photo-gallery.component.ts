import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Photo {
  id: string;
  name: string;
  url: string;
  album: string;
  albumId: string;
  date: Date;
  description?: string;
}

interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhoto?: string;
}

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
  // Sample data for demonstration
  photos: Photo[] = [
    {
      id: '1',
      name: 'Main Training Area',
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80',
      album: 'Facility',
      albumId: '1',
      date: new Date('2023-05-15'),
      description: 'Our main training area with premium equipment'
    },
    {
      id: '2',
      name: 'Cardio Zone',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      album: 'Facility',
      albumId: '1',
      date: new Date('2023-05-16')
    },
    {
      id: '3',
      name: 'Yoga Class',
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      album: 'Classes',
      albumId: '2',
      date: new Date('2023-06-02'),
      description: 'Morning yoga session in progress'
    }
  ];

  albums: Album[] = [
    { id: '1', name: 'Facility', description: 'Training hall facilities and equipment' },
    { id: '2', name: 'Classes', description: 'Photos from our training classes' },
    { id: '3', name: 'Events', description: 'Special events and workshops' }
  ];

  // State management
  filteredPhotos: Photo[] = [];
  selectedAlbum: string = 'all';
  viewingPhoto: Photo | null = null;
  currentPhotoIndex: number = 0;
  showUploadModal = false;
  showAlbumModal = false;
  editingPhoto: Photo | null = null;
  selectedFiles: SelectedFile[] = [];

  // Forms
  photoForm: FormGroup;
  albumForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.filterPhotos();
  }

  // Photo filtering by album
  filterPhotos(): void {
    if (this.selectedAlbum === 'all') {
      this.filteredPhotos = [...this.photos];
    } else if (this.selectedAlbum === 'new') {
      this.openAlbumModal();
      this.selectedAlbum = 'all';
      this.filterPhotos();
    } else {
      this.filteredPhotos = this.photos.filter(photo => photo.albumId === this.selectedAlbum);
    }
  }

  // File handling
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

  // Photo viewer methods
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

  // Modal controls
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

  // Data operations
  savePhoto(): void {
    if (this.editingPhoto) {
      // Update existing photo
      const updatedPhoto = {
        ...this.editingPhoto,
        name: this.photoForm.value.name,
        albumId: this.photoForm.value.album,
        album: this.albums.find(a => a.id === this.photoForm.value.album)?.name || '',
        description: this.photoForm.value.description
      };

      const index = this.photos.findIndex(p => p.id === this.editingPhoto?.id);
      if (index !== -1) {
        this.photos[index] = updatedPhoto;
      }

      if (this.viewingPhoto?.id === updatedPhoto.id) {
        this.viewingPhoto = updatedPhoto;
      }
    } else {
      // Add new photos from selected files
      this.selectedFiles.forEach(file => {
        const newPhoto: Photo = {
          id: this.generateId(),
          name: file.name.split('.')[0], // Remove extension
          url: file.preview,
          album: this.photoForm.value.album ?
                this.albums.find(a => a.id === this.photoForm.value.album)?.name || '' : 'Uncategorized',
          albumId: this.photoForm.value.album || '',
          date: new Date(),
          description: this.photoForm.value.description
        };
        this.photos.unshift(newPhoto); // Add to beginning
      });
    }

    this.filterPhotos();
    this.closeUploadModal();
  }

  deletePhoto(id: string): void {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.photos = this.photos.filter(photo => photo.id !== id);
      this.filterPhotos();

      if (this.viewingPhoto?.id === id) {
        this.closeViewer();
      }
    }
  }

  createAlbum(): void {
    const newAlbum: Album = {
      id: this.generateId(),
      name: this.albumForm.value.name,
      description: this.albumForm.value.description
    };

    this.albums.push(newAlbum);
    this.closeAlbumModal();
    this.selectedAlbum = newAlbum.id;
    this.filterPhotos();
  }

  // Helper methods
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
