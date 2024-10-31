import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Meetings } from './meetings.interface';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, FormsModule], // Include FormsModule here
  standalone: true,
})
export class CalendarComponent {
  @Input() meetings: WritableSignal<Meetings> = signal({}); // Use @Input decorator

  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  showAddEventPopup: boolean = false;
  newEvent: string = '';
  eventTimeFrom: string = '';
  eventTimeTo: string = '';

  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({ day: 1 })
      .map((d) => d.start as DateTime);
  });
  DATE_MED = DateTime.DATE_MED;

  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (!activeDay) return [];
    const activeDayISO = activeDay.toISODate();
    return activeDayISO ? this.meetings()[activeDayISO] ?? [] : [];
  });

  addEvent(): void {
    const activeDay = this.activeDay();
    if (activeDay && this.newEvent.trim()) {
      const activeDayISO = activeDay.toISODate();
      if (activeDayISO) {
        const eventDetails = `${this.newEvent.trim()} (${this.eventTimeFrom} - ${this.eventTimeTo})`;
        const meetings = { ...this.meetings() };
        meetings[activeDayISO] = [
          ...(meetings[activeDayISO] || []),
          eventDetails,
        ];
        this.meetings.set(meetings);
        this.newEvent = '';
        this.eventTimeFrom = '';
        this.eventTimeTo = '';
        this.showAddEventPopup = false;
      }
    }
  }

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 })
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 })
    );
  }

  goToToday(): void {
    const today = this.today();
    this.firstDayOfActiveMonth.set(today.startOf('month'));
    this.activeDay.set(today);
  }
}
