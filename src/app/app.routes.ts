import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
    { path: 'app-board', component: BoardComponent },
    { path: 'app-calendar', component: CalendarComponent },
  ];

