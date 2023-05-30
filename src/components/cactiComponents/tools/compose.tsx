import { createElement } from 'react';
import * as cactiComponents from '@/components/cactiComponents';
import { CactiResponse } from '..';
import { ResponseRow } from '../helpers/layout';

type CactiStringComponent = {
  response: CactiResponse;
  props?: any;
  children?: any;
};

/**
 * Create a bundled set of react components from a string describing the components.
 * @param inputString string `[{"componentType":"TextResponses", "props": {"text":"Hello World" } }]`
 * @returns React.ReactElement
 */
export const composeFromString = (inputString: string): React.ReactElement => {
  try {

    console.log(inputString); 
    
    // Parse the array of strings describing each component.
    const parsedItems = JSON.parse(inputString) as CactiStringComponent[];

   
    // Create a component for each component desciption in the array
    const components = parsedItems.map((parsedItem: CactiStringComponent) => {
      // Case 1: If we have a component that matches a cactiComponent type, create a component with it
      if (cactiComponents[parsedItem.response]) {
        return createElement(cactiComponents[parsedItem.response], parsedItem.props);
      }
      // Case 2: If we have a nested array of components, create single line of components including all those elements
      if (Array.isArray(parsedItem)) {
        const singleLineOfComponents = parsedItem.map((item) => {
          return createElement(cactiComponents[item.response as CactiResponse], {
            ...item.props,
          });
        });
        return <ResponseRow>{singleLineOfComponents}</ResponseRow>;
      }
      // Case 3: If not a cactiComponent resort to default: a text response with the item as the input
      return createElement(cactiComponents[CactiResponse.TextResponse], {
        text: 'Unknown Response Component',
      });
    });
    return <>{components}</>;
  } catch (error) {
    console.log('Error parsing Input string');
    // Case Not JSON:  a text response with the item as the input
    return createElement(cactiComponents[CactiResponse.TextResponse], { text: inputString });
  }
};
