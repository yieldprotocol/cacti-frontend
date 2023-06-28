import { Widget } from '../MessageTranslator_';

interface ListContainerProps {
  items: Widget[];
  limitCols?: number;
  showcaseFirst?: boolean;
}

const ListContainer = ({ items, limitCols, showcaseFirst = true }: ListContainerProps) => {
  /* If showcaseFirst is true, we will show the first item in the list as a showcase item */
  const itemsToShow = showcaseFirst ? items.slice(1) : items;

  return (
    <>
      {showcaseFirst && (
        <div className="pb-2">
          <Widget key={'showcaseItem'} widget={{ ...items[0], variant: 'showcase' }} />
        </div>
      )}
      <div
        className={`grid grid-cols-1 gap-2 ${
          limitCols ? `grid-cols-${limitCols}` : 'md:grid-cols-2 lg:grid-cols-3'
        } `}
      >
        {itemsToShow.map((widget, idx: number) => (
          <Widget key={idx} widget={{ ...widget }} />
        ))}
      </div>
    </>
  );
};

export default ListContainer;
