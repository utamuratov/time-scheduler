import { Order } from '../enums/order.enum';
import { Day } from '../enums/day.enum';

export interface ISchedule {
  teacherId: number;
  subjectId: number;
  groupId: number;
  roomId: number;
  day: Day;
  order: Order;
}

export interface GroupSchedules {
  id: number; // groupId;
  schedules: ISchedule[];
}
