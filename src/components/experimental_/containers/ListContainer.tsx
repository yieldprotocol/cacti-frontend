import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { Widget } from '../MessageTranslator_';

interface ListContainerProps {
  items: Widget[] | JSX.Element[];
  limitCols?: number;
  showcaseFirst?: boolean;
}

const ListContainer = ({ items, limitCols, showcaseFirst = true }: ListContainerProps) => {
  /* If showcaseFirst is true, we will show the first item in the list as a showcase item */
  const itemsToShow = showcaseFirst ? items.slice(1) : items;

  const isWidget = (item: Widget | JSX.Element): item is Widget => {
    // TODO : maybe find a better way to check
    return (item as Widget).name !== undefined && (item as Widget).params !== undefined;
  };

  return (
    <>
      {showcaseFirst && (
        <div className="pb-2">
          {isWidget(items[0]) ? (
            <Widget key={'showcaseItem'} widget={{ ...items[0], variant: ImageVariant.SHOWCASE }} />
          ) : (
            items[0]
          )}
        </div>
      )}
      <div
        className={`grid grid-cols-1 gap-2 ${
          limitCols ? `grid-cols-${limitCols}` : 'md:grid-cols-2 lg:grid-cols-3'
        } `}
      >
        {itemsToShow.map((item, idx: number) =>
          isWidget(item) ? (
            <Widget key={idx} widget={{ ...item, variant: ImageVariant.DEFAULT }} />
          ) : (
            item
          )
        )}
      </div>
    </>
  );
};

export default ListContainer;
