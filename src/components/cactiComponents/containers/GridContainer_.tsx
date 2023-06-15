import { Fragment } from 'react';
import Grid from '@/components/Grid';
import { ListItem } from '@/contexts/SharedStateContext';

interface ListContainerProps {
  items: ListItem[];
}
const GridContainer = ({ items }: ListContainerProps) => {
  return (
    <div className="text-black">
      <Grid>
        {items?.map(({ name, params }: { name: string; params: string }, i: number) => (
          <Fragment key={`i${i}`}>
            {/* // {Widgetize({ fnName: name, args: JSON.stringify(params) })} */}
          </Fragment>
        )) || ''}
      </Grid>
    </div>
  );
};
export default GridContainer;
