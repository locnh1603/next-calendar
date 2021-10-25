import { CalendarItem } from '@src/app/model/calendar-item.model';
import { ContrastColor, hexToRgb } from '@src/app/utility/color';
import { NextPage } from 'next';
const CalendarItemCard: NextPage<{ id: string, key: number, item: CalendarItem, onClick: (e: any) => void }> = (props) => {
  const color = hexToRgb(props.item.color) || { r: 0, g: 0, b: 0 };
  const textColor = ContrastColor(color);
  return (
    <div className="calendar-item-card" id={props.id} onClick={props.onClick} style={{ backgroundColor: props.item.color, color: textColor }}>
      <div className="card-title row" id={props.id}>
        <div className="col">{props.item.title}</div>
      </div>
      <div className="card-content" id={props.id}>{props.item.content}</div>
    </div>
  );
};

export default CalendarItemCard;