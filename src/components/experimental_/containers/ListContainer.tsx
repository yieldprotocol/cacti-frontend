import { Widget } from '../MessageTranslator_';

interface ListContainerProps {
  widgets: Widget[];
}

const ListContainer = ({ widgets }: ListContainerProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {widgets.map((widget, i: number) => <Widget key={i} widget={widget} />) || null}
    </div>
  );
};

export default ListContainer;
