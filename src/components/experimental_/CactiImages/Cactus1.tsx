import * as React from 'react';

const Cactus1 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 300 300"
    fill="none"
    {...props}
  >
    <g filter="url(#a)" transform="translate(0,0)">
      <path
        fill="#fff"
        d="M156.975 14.525c4.225 1.275 5.625 5.925 8.125 9.15 1.8-2.45 2.425-6.775 6.1-7.075 2.975 4.8 3.45 10.625 3.575 16.15 1.45-1.425 3.025-2.85 5.2-3 .45 2.1.825 4.2 1.15 6.325 1.55-.95 3.025-2.175 4.9-2.5 2.55 1.875.75 4.975.25 7.425-2.25 8.275-8.375 15.35-16.6 18.025 5.45-1.35 11.075-2.7 16.725-1.475 4.525 1.25 9.05-.375 13.625-.5-.075 2.375-.35 4.75-.4 7.15a38.846 38.846 0 0 0 5.075 8.025c7.325 5.5 14.75 11.525 18.925 19.875 2.9 1.9 8.85 2.125 8.85 6.475-2.2 3.325-5.325 5.925-7.55 9.25-1.825 7.8-3.925 15.575-7.25 22.9 7 .3 15.4-.825 21.175 3.9 5.6 11.7 9.55 24.175 12.3 36.825 9.15 42.05 10.05 75.85-39.675 93.65-2.2 5.35-6.675 9.4-12 11.55-17.9 7.4-37.575 9.575-56.8 8.6-33.675-1.125-41.875-6.625-45.75-19.475-22.125-6.95-50.25-11.225-52.8-59.575-1-23.2 6.625-45.675 15.75-66.675 1.825-5.45 22.5-7.925 27.6-8.55 2.025-7.075-1.425-14.1-.5-21.25.875-20.25 14.275-37.3 29.05-50.05 4.025-2.475 2.175-7.85 4.325-11.45 1.575-1.5 3.675.05 5.325.575 4.575 2.25 9.65 3.05 14.475 4.7-2.25-3-3.9-6.4-4.15-10.175 2.6-.2 5.2-.325 7.825-.4-2.35-3.475-6.9-9.525-1.75-12.6-.05-2.975-1.075-6.125.225-8.95 4.1.325 7.6 2.7 11.125 4.55A26.49 26.49 0 0 1 157 14.5m1.15 5.875a67.931 67.931 0 0 0-.975 8.975c2.525-1.8 4.925-.75 6.75 1.45-1.45-3.7-3.3-7.275-5.775-10.425Zm9.05 9.875c1.275.4 2.575.825 3.9 1.25-.325-2.6-.675-5.175-1.15-7.725-1.075 2.1-2 4.25-2.75 6.475Zm-21.85-4.075a47.69 47.69 0 0 0 2.325 9.475c1.15-2.25 2.275-4.525 3.4-6.8a195.9 195.9 0 0 0-5.725-2.675Zm6.375 9.75c-1.1 5.45 3.775 8.675 8.425 9.625-2.275-3.5-4.425-7.9-8.425-9.625Zm9.475 1.325c4.075.45-2.175 3.525 0 0Zm14.9-.05c-1.7 1-2.825 3.525-2.175 5.425 2.05.225 4.025-4.475 2.175-5.425Zm-30.65 1.225c-.525 1.725.075 2.35 1.825 1.925.5-1.75-.1-2.375-1.825-1.925ZM165.8 48.7c2.375-2.025 3.025-5.125 3.3-8.1a26.337 26.337 0 0 0-3.3 8.1Zm2.175 5.6c7.075-.2 10.925-6.9 13.8-12.45-4 4.825-9 8.5-13.8 12.45Zm-26.65-7.25c4.9 4.9 12.15 7.05 18.775 4.6-5.175-4.475-12.125-6.025-18.775-4.6Zm-18.15 4.875c-.375 1.375-.675 2.8-1 4.2 1.3.525 2.65 1.05 4 1.55-.05-1.5-.075-3.025-.075-4.525-1-.4-1.975-.825-2.925-1.225Zm6.75 2.65c-.05 1.375-.075 4.1-.125 5.45 4.225-1.075 8.575-1.7 12.95-1.5-4.25-1.425-8.5-2.875-12.825-3.95Zm19.45 2.225c-1.225 1.475 1.475 2.925 2.5 1.625 1.225-1.525-1.525-2.95-2.5-1.625Zm10.05 3.45c1.025 1.425 2.1 2.85 3.2 4.275 1.45-1.2 2.9-2.425 4.4-3.625-1.8-1.3-3.575-2.6-5.35-3.875-.75 1.075-1.525 2.125-2.25 3.225Zm-49.1 10.475c1.15-.3 2.325-.575 3.5-.85 3.5-3.025 7.475-5.45 11.4-7.925-.825-1.15-2.475-1.3-3.575-1.975a97.953 97.953 0 0 0-11.325 10.75Zm54.775-3.25c14.675 21.625 18.125 48.85 15.65 74.35 9.025-.4 18.1-.75 27.1-1.85 4.9-26.225-2.175-58.875-10.35-71.825-2.6 1.4-5.275 2.875-8.25 3.2-.7-3.5.325-8.875-3.975-10.25-7.325-1.725-14.85 1.375-20.175 6.375ZM116.025 73.5c.55 2 1.125 4.025 1.7 6.05l-6.2 1.3c-2.775 14.075.25 28.4 3.025 42.2 8.325-20.725 15.125-43.275 31.625-59.2-10.85-4.75-22.45 2.275-30.15 9.65ZM154.5 61.8c-10.95 25.375-11.65 54.65-2.8 80.75 3.375-.025 6.775-.125 10.2-.3.575-7.175.05-14.4.95-21.55-2.35-2.775-6.075-4.85-7.025-8.525 1.75-3 5.125-4.575 7.525-7-.8-13.05-3.15-25.95-6.05-38.675-.2-1.925-1.675-3.25-2.8-4.7Zm37.65.125c.075 1.4.2 2.825.325 4.225.875-.35 1.75-.725 2.65-1.075.225-.95.725-2.875.975-3.825-.975.175-2.95.525-3.95.675ZM118.875 123.7c9.725-9.825 18.15-21.15 23.775-33.825 1.775-7.375 2.975-14.9 5.425-22.1-15.575 14.8-23.4 35.7-29.2 55.925Zm48.525-16.75c1.925 1.5 3.875 3 5.825 4.475.05.75.125 2.25.175 3-2.65 2.6-7.25 4.45-7 8.8-.725 6.325-.1 12.725-.75 19.05 3.75 0 7.5-.125 11.25-.45 2.275-24.075-.425-49.875-14.075-70.475 1.6 11.85 3.825 23.625 4.575 35.6Zm-56.975-32.6c-1.925 1.35.725 4 2.375 2.675 1.9-1.4-.75-4-2.375-2.675ZM91.85 122.975a161.18 161.18 0 0 1 8.875 2.45c-.375 2.025-.725 4.1-1.075 6.15 3.725 4 7.925 7.6 12.8 10.15.375-17.45-6.7-34.175-5.75-51.7-.275-4.9 2.675-10.3-.925-14.55-11.175 12.85-18.15 30.45-13.925 47.5ZM206.825 78.6c4.7 17.125 7.2 34.925 6.325 52.7 13.4-30.975 9.675-39.075-6.325-52.7ZM225.3 97.5c-.675 2.075-.05 2.75 1.95 2.025.65-2.05-.025-2.725-1.95-2.025Zm-99.175 24.325c-2.95 3.725-7.1 6.35-9.85 10.225-.875 3.65.05 7.35.85 10.95 10.15.3 20.3-.175 30.45-.55a126.726 126.726 0 0 1-5.675-41.925c-4.925 7.375-9.65 14.9-15.775 21.3Zm33.9-8.8c1.5 1.175 3 2.425 4.65 3.475 1.625-.975 3.075-2.175 4.6-3.3a270.66 270.66 0 0 1-5.075-3.875c-1.4 1.225-2.775 2.45-4.175 3.7ZM92.075 127c-.325 1.325-.65 2.65-.925 4 2.175-.25 4.65-.4 5.575-2.75-1.55-.425-3.1-.85-4.65-1.25Zm-23.15 12.3c12.325 3.1 25.15 3.55 37.825 3.825-3.975-2.5-7.05-6.075-10.75-8.875-9.2.625-18.475 1.75-27.075 5.05Zm146.8-4.85c-.85 1.65-1.675 3.325-2.5 5 6.3-.75 12.675-1.45 18.85-3.1-5.325-1.45-10.85-1.925-16.35-1.9Zm-53.55 11.675c-33.125.125-66.725 3.525-99.4-3.725-13.75 32.525-25.025 72.625-2.95 100.45 6.2 7.575 15.375 11.95 24.475 15.025 23.725 7.125 48 15.175 73.125 13.25 62.675-4.325 103.55-21.325 93.175-82.55-2.875-16.725-6.675-33.45-13.775-48.95-24.55 4.975-49.675 6.075-74.65 6.5Zm-61.05 120.9c2.525 7.65 10.65 10.875 18 11.9 21.175 3 43.1 4.375 64.05-.9 8.3-2.025 17.65-3.95 23.125-11.15-54.9 13.2-72.9 8.775-105.175.15Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={445.696}
        height={504.683}
        x={-72.82}
        y={-102.357}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        transform="translate(0,0)"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1.391} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3_21" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2.782} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="effect1_dropShadow_3_21" result="effect2_dropShadow_3_21" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={9.738} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="effect2_dropShadow_3_21" result="effect3_dropShadow_3_21" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={19.476} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="effect3_dropShadow_3_21" result="effect4_dropShadow_3_21" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={33.388} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="effect4_dropShadow_3_21" result="effect5_dropShadow_3_21" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={58.428} />
        <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.00784314 0 0 0 0 0.00784314 0 0 0 1 0" />
        <feBlend in2="effect5_dropShadow_3_21" result="effect6_dropShadow_3_21" />
        <feBlend in="SourceGraphic" in2="effect6_dropShadow_3_21" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default Cactus1;
