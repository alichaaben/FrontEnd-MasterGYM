import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  sessions: TrainingSession[];
}

interface TrainingSession {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: 'INDIVIDUAL' | 'GROUP' | 'WORKSHOP';
  maxParticipants: number;
}

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.css'],
  providers: [DatePipe]
})
export class ScheduleCalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  calendarDays: CalendarDay[] = [];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  selectedDate: Date | null = null;
  showSessionModal = false;
  editingSession: TrainingSession | null = null;
  totalSessions = 0;

  // Sample data for demonstration
  sampleSessions: TrainingSession[] = [
    {
      id: '1',
      date: this.formatDate(new Date()),
      startTime: '09:00',
      endTime: '10:30',
      sessionType: 'INDIVIDUAL',
      maxParticipants: 1
    },
    {
      id: '2',
      date: this.formatDate(new Date(new Date().setDate(new Date().getDate() + 2))),
      startTime: '14:00',
      endTime: '16:00',
      sessionType: 'GROUP',
      maxParticipants: 8
    }
  ];

  sessionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.sessionForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['09:00', Validators.required],
      endTime: ['10:00', Validators.required],
      sessionType: ['INDIVIDUAL', Validators.required],
      maxParticipants: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadSampleSessions();
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const today = new Date();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    // Days from next month to show
    const nextMonthDays = 6 - lastDay.getDay();

    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        isSelected: this.isSelected(date),
        sessions: []
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        isSelected: this.isSelected(date),
        sessions: []
      });
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        isSelected: this.isSelected(date),
        sessions: []
      });
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return this.isSameDay(date, this.selectedDate);
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar();
    this.loadSampleSessions();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar();
    this.loadSampleSessions();
  }

  selectDay(day: CalendarDay): void {
    this.selectedDate = day.date;
    this.generateCalendar();
  }

  getDayClasses(day: CalendarDay): string {
    let classes = 'border rounded-md transition-colors duration-200';

    if (day.isSelected) {
      classes += ' border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    } else if (day.isToday) {
      classes += ' border-green-500';
    } else if (!day.isCurrentMonth) {
      classes += ' bg-gray-50 text-gray-400 dark:bg-gray-700 dark:text-gray-500';
    } else {
      classes += ' border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700';
    }

    return classes;
  }

  getDateNumberClasses(day: CalendarDay): string {
    let classes = 'font-medium';

    if (day.isSelected) {
      classes += ' text-blue-600 dark:text-blue-300';
    } else if (day.isToday) {
      classes += ' text-green-600 dark:text-green-300';
    } else if (!day.isCurrentMonth) {
      classes += ' text-gray-400 dark:text-gray-500';
    } else {
      classes += ' text-gray-900 dark:text-white';
    }

    return classes;
  }

  getSessionClasses(session: TrainingSession): string {
    switch (session.sessionType) {
      case 'INDIVIDUAL':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50';
      case 'GROUP':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50';
      case 'WORKSHOP':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
    }
  }

  openAddSessionModal(date?: Date): void {
    this.editingSession = null;
    this.sessionForm.reset({
      date: date ? this.formatDate(date) : this.formatDate(this.selectedDate || new Date()),
      startTime: '09:00',
      endTime: '10:00',
      sessionType: 'INDIVIDUAL',
      maxParticipants: 1
    });
    this.showSessionModal = true;
  }

  openEditSessionModal(session: TrainingSession): void {
    this.editingSession = session;
    this.sessionForm.patchValue({
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      sessionType: session.sessionType,
      maxParticipants: session.maxParticipants
    });
    this.showSessionModal = true;
  }

  closeSessionModal(): void {
    this.showSessionModal = false;
    this.editingSession = null;
  }

  saveSession(): void {
    if (this.sessionForm.invalid) return;

    const sessionData: TrainingSession = {
      ...this.sessionForm.value,
      id: this.editingSession?.id || this.generateId()
    };

    if (this.editingSession) {
      // Update in sample data
      const index = this.sampleSessions.findIndex(s => s.id === this.editingSession?.id);
      if (index !== -1) {
        this.sampleSessions[index] = sessionData;
      }
    } else {
      // Add to sample data
      this.sampleSessions.push(sessionData);
    }

    this.loadSampleSessions();
    this.closeSessionModal();
  }

  deleteSession(): void {
    if (!this.editingSession?.id) return;

    if (confirm('Are you sure you want to delete this session?')) {
      this.sampleSessions = this.sampleSessions.filter(s => s.id !== this.editingSession?.id);
      this.loadSampleSessions();
      this.closeSessionModal();
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  loadSampleSessions(): void {
    this.calendarDays.forEach(day => {
      const dayStr = this.formatDate(day.date);
      day.sessions = this.sampleSessions.filter(session => session.date === dayStr);
    });
    this.totalSessions = this.sampleSessions.length;
  }
}
