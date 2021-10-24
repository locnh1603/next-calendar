import { DefaultColors } from '@src/app/enum/color.enum';
import { ItemStatuses } from '@src/app/enum/menu.enum';

export class CalendarItem {
  id: string;
  title: string;
  content: string;
  date: number;
  createdDate: number;
  color: string;
  status: ItemStatuses;
  email: string;

  constructor(defaultValue?: Partial<CalendarItem>) {
    this.id = defaultValue?.id || '';
    this.color = defaultValue?.color || DefaultColors.White;
    this.title = defaultValue?.title || '';
    this.content = defaultValue?.content || '';
    this.date = defaultValue?.date || new Date().getTime();
    this.createdDate = defaultValue?.createdDate || new Date().getTime();
    this.status = defaultValue?.status || ItemStatuses.ToDo;
    this.email = defaultValue?.email || '';
  }
}