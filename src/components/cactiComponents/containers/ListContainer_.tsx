import Grid from "@/components/Grid";
import { ListItem } from "@/contexts/SharedStateContext";
import { Fragment } from "react";

interface ListContainerProps {
    items: JSX.Element[];
  }

const ListContainer = ({ items }: ListContainerProps) => {
    return (
      <div className="w-full">
          {items?.map(( item, i: number) => (
            <Fragment key={`i${i}`}>
              {item}
            </Fragment>
          )) || null}
      </div>
    );
  };
export default ListContainer;