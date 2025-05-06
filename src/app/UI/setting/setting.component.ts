import { Component, ElementRef, ViewChild} from '@angular/core';

type Tab = 'profile' | 'password' | 'notifications'| 'infoSoc';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  activeTab: Tab = 'profile';
  avatar = 'assets/user-upload-bro.svg';
  name = 'Jean Dupont';
  email = 'jean.dupont@example.com';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  emailNotifications = true;
  pushNotifications = true;

  tabs = [
    { id: 'profile' as const, label: 'Profil Public' },
    { id: 'password' as const, label: 'Mot de Passe' },
  ];


  @ViewChild('fileInput') fileInput!: ElementRef;

  // Déclencher l'input file
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Gérer la sélection d'un fichier
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
