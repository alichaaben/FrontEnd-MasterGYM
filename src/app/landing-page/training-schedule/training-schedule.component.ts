import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TrainingSessionService } from '../../services/training-session.service';
import { TrainingSession } from '../../model/training-session.model';

@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css'],
  providers: [DatePipe]
})
export class TrainingScheduleComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInWeek: Date[] = [];
  timeSlots: string[] = [
    '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];
  sessions: TrainingSession[] = [];

  constructor(
    private datePipe: DatePipe,
    private trainingSessionService: TrainingSessionService
  ) {}

  ngOnInit(): void {
    this.generateWeekDays();
    this.loadSessions();
  }

  generateWeekDays(): void {
    this.daysInWeek = [];
    const currentDate = new Date(this.currentMonth);

    // Find the previous Monday (or today if it's Monday)
    const dayOfWeek = currentDate.getDay();
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is Sunday
    const monday = new Date(currentDate.setDate(diff));

    // Generate 7 days starting from Monday
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      this.daysInWeek.push(date);
    }
  }

  getWeekRange(): string {
    if (this.daysInWeek.length < 7) return '';
    const firstDay = this.datePipe.transform(this.daysInWeek[0], 'MMM d');
    const lastDay = this.datePipe.transform(this.daysInWeek[6], 'MMM d, y');
    return `${firstDay} - ${lastDay}`;
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      this.currentMonth.getDate() - 7
    );
    this.generateWeekDays();
    this.loadSessions();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      this.currentMonth.getDate() + 7
    );
    this.generateWeekDays();
    this.loadSessions();
  }

  hasSession(day: Date, timeSlot: string): boolean {
    const dayStr = this.datePipe.transform(day, 'yyyy-MM-dd') || '';
    return this.sessions.some(session =>
      session.date === dayStr &&
      session.startTime <= timeSlot &&
      session.endTime >= timeSlot
    );
  }

  getSession(day: Date, timeSlot: string): TrainingSession {
    const dayStr = this.datePipe.transform(day, 'yyyy-MM-dd') || '';
    return this.sessions.find(session =>
      session.date === dayStr &&
      session.startTime <= timeSlot &&
      session.endTime >= timeSlot
    ) as TrainingSession;
  }

  loadSessions(): void {
    if (this.daysInWeek.length < 7) return;

    const startDate = this.daysInWeek[0];
    const endDate = new Date(this.daysInWeek[6]);
    endDate.setDate(endDate.getDate() + 1); // Include all of the last day

    this.trainingSessionService.getSessionsByDateRange(startDate, endDate)
      .subscribe({
        next: (sessions) => {
          this.sessions = sessions;
        },
        error: (err) => {
          console.error('Error loading sessions:', err);
        }
      });
  }
}
