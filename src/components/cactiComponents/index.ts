import { ActionResponse } from './ActionResponse';
import { HeaderResponse } from './HeaderResponse';
import { IconResponse } from './IconResponse';
import { ImageResponse } from './ImageResponse';
// import { InlineChip } from './InlineChip';
import { ListResponse } from './ListResponse';
import { SingleLineResponse } from './SingleLineResponse';
import { TextResponse } from './TextResponse';
import { ActionStepper } from './ActionStepper';

export enum CactiResponse {
  // InlineChip = 'InlineChip', // should not be needed - this is more of an internal component
  TextResponse = 'TextResponse',
  HeaderResponse = 'HeaderResponse',
  SingleLineResponse = 'SingleLineResponse',
  IconResponse = 'IconResponse',
  ListResponse = 'ListResponse',
  ActionResponse = 'ActionResponse',
  ImageResponse = 'ImageResponse',
}

export {
  TextResponse,
  HeaderResponse,
  SingleLineResponse,
  IconResponse,
  ListResponse,
  ActionResponse,
  ImageResponse,
  ActionStepper,
};
