import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  styleProps?: string;
  disabled?: boolean;
}

const ScrollButton = ({ direction, onClick, styleProps, disabled }: ScrollButtonProps) => {
  return (
    <button
      className={`${
        styleProps ?? ''
      } h-8 w-8 rounded-full bg-gray-700/50 p-1 text-gray-200 hover:bg-gray-800/50 disabled:bg-gray-700/20`}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </button>
  );
};

const Carousel = ({ styleProps, children }: { styleProps?: string; children: ReactNode }) => {
  const [arrowLeftDisabled, setArrowLeftDisabled] = useState(false);
  const [arrowRightDisabled, setArrowRightDisabled] = useState(false);
  const [hasScoll, setHasScroll] = useState(false);

  const slider = useRef<HTMLUListElement>(null);
  const sliderWrap = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!slider.current) return;

    let { scrollLeft, scrollWidth, offsetWidth } = slider.current;

    if (direction === 'left') {
      scrollLeft -= 200;
    } else {
      scrollLeft += 200;
    }

    scrollLeft <= 0 ? setArrowLeftDisabled(true) : setArrowLeftDisabled(false);
    scrollLeft >= scrollWidth - offsetWidth
      ? setArrowRightDisabled(true)
      : setArrowRightDisabled(false);
  };

  useEffect(() => {
    if (!slider.current || !sliderWrap.current) return;

    const outerWidth = sliderWrap.current.getClientRects();
    console.log('🦄 ~ file: Carousel.tsx:54 ~ useEffect ~ outerWidth:', outerWidth);
    const scrollWidth = slider.current.getClientRects();
    console.log('🦄 ~ file: Carousel.tsx:56 ~ useEffect ~ scrollWidth:', scrollWidth);

    // check if the slider has scroll
    setTimeout(() => {
      if (outerWidth < scrollWidth) {
        setHasScroll(true);
      }
    }, 1000); // wait for the slider to render
  }, [slider, sliderWrap]);

  return (
    <div className="mb-2 w-full">
      {hasScoll && (
        <div className="flex justify-start gap-2">
          <ScrollButton
            direction="left"
            onClick={() => handleScroll('left')}
            styleProps={arrowLeftDisabled ? 'disabled disabled:hover:cursor-not-allowed' : ''}
            disabled={arrowLeftDisabled}
          />
          <ScrollButton
            direction="right"
            onClick={() => handleScroll('right')}
            styleProps={arrowRightDisabled ? 'disabled disabled:hover:cursor-not-allowed' : ''}
            disabled={arrowRightDisabled}
          />
        </div>
      )}
      <div ref={sliderWrap}>
        <ul
          role="list"
          className={`no-scrollbar flex gap-4 overflow-x-auto scroll-smooth ${styleProps ?? ''}`}
          ref={slider}
        >
          {children}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
