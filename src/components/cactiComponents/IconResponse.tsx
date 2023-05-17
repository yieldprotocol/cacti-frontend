import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowsRightLeftIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export enum IconType {
  FORWARD = 'forward',
  BACK = 'back',
  PLUS = 'plus',
  MINUS = 'minus',
  EXCHANGE = 'exchange',
}

const IconSet: Map<IconType, React.ReactElement> = new Map([
  [IconType.FORWARD, <ArrowSmallRightIcon className="stroke-2" key={'for'} />],
  [IconType.BACK, <ArrowSmallLeftIcon className="stroke-2" key={'bac'} />],
  [IconType.PLUS, <PlusIcon className="stroke-2" key={'plu'} />],
  [IconType.MINUS, <MinusIcon className="stroke-2" key={'min'} />],
  [IconType.EXCHANGE, <ArrowsRightLeftIcon className="stroke-2" key={'exc'} />],
]);

/**
 * Icon element from limited Set
 * Includes: icon, color, size
 */
export const IconResponse = (props: any) => {
  const icon = IconSet.has(props.icon) ? IconSet.get(props.icon) : null;
  return <>{icon && <div className="h-[24px] w-[24px] text-white text-opacity-70">{icon}</div>}</>;
};
