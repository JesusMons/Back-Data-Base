import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuService } from '../../../services/menu.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [MenubarModule, ButtonModule],
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class HeaderComponent {

  headerItems: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() : void{
    this.headerItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },
      { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] }
    ];
  }

  toggleMenu() {
    this.menuService.toggleMenu(); // Cerrar el menú
    console.log('Menu toggle');
  }
}
