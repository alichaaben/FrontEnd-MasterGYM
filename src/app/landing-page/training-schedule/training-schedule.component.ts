import { Component } from '@angular/core';

@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent {
  scheduleData = {
    dateRange: "1-7 APRIL, 2019",
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    timeSlots: [
      {
        time: '9-00',
        sessions: [
          { day: 'monday', title: 'body bulding', timeRange: '9-00 – 11:00', instructor: 'Mark Klark' },
          { day: 'thursday', title: 'boxing', timeRange: '9-00 – 11:00', instructor: 'Mark Klark' },
          { day: 'sunday', title: 'boxing', timeRange: '9-00 – 11:00', instructor: 'Mark Klark' }
        ]
      },
      {
        time: '10-00',
        sessions: [
          { day: 'tuesday', title: 'yoga', timeRange: '10-00 – 12:00', instructor: 'Mark Klark' },
          { day: 'friday', title: 'body bulding', timeRange: '10-00 – 12:00', instructor: 'Mark Klark' }
        ]
      },
      {
        time: '11-00',
        sessions: [
          { day: 'thursday', title: 'body bulding', timeRange: '11-00 – 12:00', instructor: 'Mark Klark' },
          { day: 'saturday', title: 'body bulding', timeRange: '11-00 – 12:00', instructor: 'Mark Klark' }
        ]
      },
      {
        time: '12-00',
        sessions: [
          { day: 'monday', title: 'body bulding', timeRange: '12-00 – 13:00', instructor: 'Mark Klark' },
          { day: 'wednesday', title: 'karate', timeRange: '12-00 – 13:00', instructor: 'Mark Klark' },
          { day: 'sunday', title: 'karate', timeRange: '12-00 – 13:00', instructor: 'Mark Klark' }
        ]
      },
      {
        time: '13-00',
        sessions: [
          { day: 'tuesday', title: 'body bulding', timeRange: '13-00 – 14:00', instructor: 'Mark Klark' },
          { day: 'friday', title: 'body bulding', timeRange: '13-00 – 14:00', instructor: 'Mark Klark' }
        ]
      }
    ]
  };

  hasSession(day: string, timeSlot: any): boolean {
    return timeSlot.sessions.some((session: any) => session.day === day);
  }

  getSession(day: string, timeSlot: any): any {
    return timeSlot.sessions.find((session: any) => session.day === day);
  }
}
