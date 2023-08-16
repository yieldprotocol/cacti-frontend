import { FunctionComponent, ReactNode } from 'react';
import { ActionResponse, ActionResponseProps } from './ActionResponse';
import { DoubleLineResponse } from './DoubleLineResponse';
import { HeaderResponse } from './HeaderResponse';
import { IconResponse } from './IconResponse';
import { ImageResponse, ImageResponseProps } from './ImageResponse';
import { ListResponse } from './ListResponse';
import { SingleLineResponse } from './SingleLineResponse';
import { TextResponse } from './TextResponse';
import { ErrorResponse } from './ErrorResponse';

export enum CactiResponse {
  TextResponse = 'TextResponse',
  HeaderResponse = 'HeaderResponse',
  SingleLineResponse = 'SingleLineResponse',
  IconResponse = 'IconResponse',
  ListResponse = 'ListResponse',
  ActionResponse = 'ActionResponse',
  ImageResponse = 'ImageResponse',
  DoubleLineResponse = 'DoubleLineResponse',
  ErrorResponse = 'ErrorResponse',
  // ActionStepper = 'ActionStepper',
  // InlineChip = 'InlineChip',
}

export type CactiResponseProps = ImageResponseProps | ActionResponseProps | any;

export const cactiComponentMap = new Map<string, FunctionComponent<CactiResponseProps>>([
  [CactiResponse.TextResponse as const, TextResponse],
  [CactiResponse.HeaderResponse as const, HeaderResponse],
  [CactiResponse.ListResponse as const, ListResponse],
  [CactiResponse.SingleLineResponse as const, SingleLineResponse],
  [CactiResponse.DoubleLineResponse as const, DoubleLineResponse],
  [CactiResponse.IconResponse as const, IconResponse],
  [CactiResponse.ActionResponse as const, ActionResponse],
  [CactiResponse.ImageResponse as const, ImageResponse],
  [CactiResponse.ErrorResponse as const, ErrorResponse],
]);

export {
  TextResponse,
  HeaderResponse,
  SingleLineResponse,
  DoubleLineResponse,
  IconResponse,
  ListResponse,
  ActionResponse,
  ImageResponse,
  ErrorResponse
};
