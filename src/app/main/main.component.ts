import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppHeaderComponent,RouterLink,RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @Input() isLeftSidebarCollapsed!: boolean;

  headerClass = computed(() => {
    return this.isLeftSidebarCollapsed ? 'header-collapsed' : 'header-expanded';
  });

  bodyClass = computed(() => {
    return this.isLeftSidebarCollapsed ? 'body-collapsed' : 'body-expanded';
  });
}
