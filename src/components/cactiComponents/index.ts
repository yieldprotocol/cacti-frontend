import { ActionResponse } from './ActionResponse';
import { DoubleLineResponse } from './DoubleLineResponse';
import { HeaderResponse } from './HeaderResponse';
import { IconResponse } from './IconResponse';
import { ImageResponse } from './ImageResponse';
import { ListResponse } from './ListResponse';
import { SingleLineResponse } from './SingleLineResponse';
import { TextResponse } from './TextResponse';

export enum CactiResponse {
  TextResponse = 'TextResponse',
  HeaderResponse = 'HeaderResponse',
  SingleLineResponse = 'SingleLineResponse',
  IconResponse = 'IconResponse',
  ListResponse = 'ListResponse',
  ActionResponse = 'ActionResponse',
  ImageResponse = 'ImageResponse',
  DoubleLineResponse = 'DoubleLineResponse',
  // ActionStepper = 'ActionStepper',
  // InlineChip = 'InlineChip',
}

export {
  TextResponse,
  HeaderResponse,
  SingleLineResponse,
  DoubleLineResponse,
  IconResponse,
  ListResponse,
  ActionResponse,
  ImageResponse,
};
