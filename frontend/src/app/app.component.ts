import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/layout/content/content.component';
import { AsideComponent } from './components/layout/aside/aside.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,ContentComponent,AsideComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'PANDIU';
  menuVisible: boolean = true; // Inicializa el estado del menú

  constructor(private menuService: MenuService) {}

  ngOnInit() :void {
    // Suscribirse al estado de visibilidad del menú
    this.menuService.menuVisible$.subscribe(visible => {
      this.menuVisible = visible;
    });
  }
}
