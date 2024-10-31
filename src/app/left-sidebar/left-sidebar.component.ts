import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  items = [
    { routeLink: 'home', icon: 'home', label: 'Home' },
    { routeLink: 'my-tasks', icon: 'check_circle', label: 'My Tasks' },
    { routeLink: 'goals', icon: 'track_changes', label: 'Goals' },
  ];

  lists = [
    { name: 'FocusPad Design', color: '#FFB74D' },
    { name: 'Website Design', color: '#42A5F5' },
    { name: 'Mobile Design', color: '#66BB6A' },
    { name: 'Blank', color: '#BA68C8' },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
