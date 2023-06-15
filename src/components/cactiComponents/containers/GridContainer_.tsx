import { Fragment } from 'react';
import Grid from '@/components/Grid';

interface ListContainerProps {
  items: Widget[];
}
const GridContainer = ({ items }: ListContainerProps) => {
  return (
    <div className="text-black">
      <Grid>
        {items?.map(({ name, args }: { name: string; args: string }, i: number) => (
          <Fragment key={`i${i}`}>
            {/* // {Widgetize({ fnName: name, args: JSON.stringify(params) })} */}
          </Fragment>
        )) || ''}
      </Grid>
    </div>
  );
};
export default GridContainer;
