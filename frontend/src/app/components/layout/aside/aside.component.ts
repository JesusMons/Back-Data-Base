import { Component, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../services/menu.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-aside',
  standalone: true,
  templateUrl: './aside.component.html',
  imports: [PanelMenuModule,CommonModule],
  styleUrls: ['./aside.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class AsideComponent {

  menuItems: MenuItem[]=[];
  menuVisible: boolean = true; // Estado inicial del menú

  constructor(private menuService: MenuService,private cd: ChangeDetectorRef) {}
  ngOnInit() :void {
    
    this.menuItems = [
      {
        label: 'Users',
        icon: 'pi pi-users',
        items: [
          { label: 'Users', icon: 'pi pi-user', routerLink: '/users' },
          { label: 'User Types', icon: 'pi pi-list', routerLink: '/user-types' },
        ]
      },
      {
        label: 'Faculties',
        icon: 'pi pi-briefcase',
        items: [
          { label: 'Faculties', icon: 'pi pi-briefcase', routerLink: '/faculty' },
          { label: 'Programs', icon: 'pi pi-book', routerLink: '/program' },
        ]
      },
      {
        label: 'Investigations Groups',
        icon: 'pi pi-sitemap',
        routerLink: '/investigationGroup'
      },
      {
        label: 'Publications',
        icon: 'pi pi-file',
        items: [
          {label: 'Publications', icon:'pi pi-file', routerLink: '/publications'},
          { label: 'Keywords', icon: 'pi pi-tag', routerLink: ['/keywords'] },
          { label: 'Publication Types', icon: 'pi pi-file', routerLink: ['/publication-types'] },
        ]
      }
    ];
    this.menuService.menuVisible$.subscribe(visible => {
      this.menuVisible = visible;
      this.cd.detectChanges();
    });
  }
}
