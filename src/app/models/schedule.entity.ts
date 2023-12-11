import { Id } from './id.interface';
import { Order } from '../enums/order.enum';
import { Day } from '../enums/day.enum';

export interface Schedule extends Id {
  teacherId: number;
  subjectId: number;
  groupId: number;
  roomId: number;
  day: Day;
  order: Order;
}
