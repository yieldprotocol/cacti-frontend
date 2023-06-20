import { Widget } from '../MessageTranslator_';

interface ListContainerProps {
  items: Widget[];
  limitCols?: number;
  showCase?: boolean;
}

const ListContainer = ({ items, limitCols, showCase }: ListContainerProps) => {
  return (
    <div
      className={`grid grid-cols-1  gap-4 ${
        limitCols
          ? `grid-cols-${limitCols}`
          : 'md:grid-cols-2 lg:grid-cols-3'
      } `}
    >
      {items.map((widget, i: number) => <Widget key={'i' + i} widget={widget} />) || null}
    </div>
  );
};

export default ListContainer;
