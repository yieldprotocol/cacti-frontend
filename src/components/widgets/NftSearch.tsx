import { useEffect, useRef, useState } from 'react';
import { useCollectionSearch } from '@center-inc/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import { NftCollectionContainer } from './NftCollectionContainer';

interface Result {
  id: any;
  address: any;
  relevance: any;
  name: any;
  previewImageUrl: any;
}

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  styleProps?: string;
  disabled?: boolean;
}

const ScrollButton = ({ direction, onClick, styleProps, disabled }: ScrollButtonProps) => {
  return (
    <button
      className={`${styleProps} h-8 w-8 rounded-full bg-gray-700/50 p-1 text-gray-200 hover:bg-gray-800/50 disabled:bg-gray-700/20`}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </button>
  );
};

export const NftSearch = ({ query }) => {
  const { results, loading, error } = useCollectionSearch({
    query,
  });

  const [arrowLeftDisabled, setArrowLeftDisabled] = useState(false);
  const [arrowRightDisabled, setArrowRightDisabled] = useState(false);
  const [hasScoll, setHasScroll] = useState(false);

  const slider = useRef<HTMLUListElement>();
  const sliderWrap = useRef<HTMLDivElement>();

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      slider.current.scrollLeft -= 200;
    } else {
      slider.current.scrollLeft += 200;
    }

    slider.current.scrollLeft <= 0 ? setArrowLeftDisabled(true) : setArrowLeftDisabled(false);
    slider.current.scrollLeft >= slider.current.scrollWidth - slider.current.offsetWidth
      ? setArrowRightDisabled(true)
      : setArrowRightDisabled(false);
  };

  useEffect(() => {
    // check if the slider has scroll
    setTimeout(() => {
      if (slider.current.clientWidth < slider.current.scrollWidth) {
        setHasScroll(true);
      }
    }, 100); // wait for the slider to render
  }, [slider]);

  return (
    <div className="mt-4 w-[100%]">
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
      <div className="mt-4 flex w-[100%] justify-center text-black" ref={sliderWrap}>
        {loading && <span>Results loading</span>}
        <ul
          role="list"
          className="no-scrollbar flex w-[100%] gap-4 overflow-x-auto scroll-smooth"
          ref={slider}
        >
          {results?.map(({ id, ...props }: Result) => {
            if (props.previewImageUrl) {
              return <NftCollectionContainer key={id} network={ETHEREUM_NETWORK} {...props} />;
            }
          }) || ''}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </div>
  );
};
