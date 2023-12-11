import { RoomType } from '../enums/room-type.enum';
import { Id } from './id.interface';

export interface Room extends Id {
  name: string;
  type: RoomType;
}
