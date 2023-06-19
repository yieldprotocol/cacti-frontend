import { Widget } from '../MessageTranslator_';

interface ListContainerProps {
  items: { name: string; params: object }[];
}

const ListContainer = ({ items }: ListContainerProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i: number) => (
        <Widget key={i + item.name} widget={{ name: item.name, args: item.params }} />
      )) || null}
    </div>
  );
};

export default ListContainer;
