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
  [IconType.FORWARD, <ArrowSmallRightIcon />],
  [IconType.BACK, <ArrowSmallLeftIcon />],
  [IconType.PLUS, <PlusIcon />],
  [IconType.MINUS, <MinusIcon />],
  [IconType.EXCHANGE, <ArrowsRightLeftIcon />],
]);

/**
 * Icon element from limited Set
 * Includes: icon, color, size
 */
export const IconResponse = (props: any) => {
  const icon = IconSet.has(props.icon) ? IconSet.get(props.icon) : null;
  return <>{icon && <div className="h-[24px] w-[24px] text-white text-opacity-70 ">{icon}</div>}</>;
};