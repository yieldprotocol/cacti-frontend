import { Fragment } from "react";
import { Widget } from "../MessageTranslator_";



/**
 * Aggregator display containers
 * */
export const ListContainer = (props: any) => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {JSON.parse(props.items).items.map((item: { name: string; params: any }, i: number) => (
          <Fragment key={`i${i}`}>
            <Widget key={item.name} widget={{ name: item.name, args: item.params }} />{' '}
          </Fragment>
        )) || null}
      </div>
    );
  };