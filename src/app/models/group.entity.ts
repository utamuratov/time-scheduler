import { Id } from './id.interface';

export interface Group extends Id {
  name: string;
  roomId?: number;
}
