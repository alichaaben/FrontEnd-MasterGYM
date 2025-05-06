export interface TrainingSession {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: 'INDIVIDUAL' | 'GROUP' | 'WORKSHOP';
  maxParticipants: number;
  instructor: string;
  sportName: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  sessions: TrainingSession[];
}
