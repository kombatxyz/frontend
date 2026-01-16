import React from 'react';

interface SVGProps {
  className?: string;
  transform?: string;
}

export const CornerSVGTopLeft: React.FC<SVGProps> = ({
  className,
  transform,
}) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.86805e-07 0L0 9L1.5 7L1.5 1.5L7 1.5L9 7.86805e-07L7.86805e-07 0Z"
      fill="#D9D9D9"
    />
  </svg>
);

export const CornerSVGBottomRight: React.FC<SVGProps> = ({
  className,
  transform,
}) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M9 9L9 0L7.5 2L7.5 7.5L2 7.5L-7.86805e-07 9L9 9Z" fill="#D9D9D9" />
  </svg>
);

export const CornerSVGTopRight: React.FC<SVGProps> = ({
  className,
  transform,
}) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9 0L9 9L7.5 7L7.5 1.5L2 1.5L-7.86805e-07 7.86805e-07L9 0Z"
      fill="#D9D9D9"
    />
  </svg>
);

export const CornerSVGBottomLeft: React.FC<SVGProps> = ({
  className,
  transform,
}) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.86805e-07 9L0 0L1.5 2L1.5 7.5L7 7.5L9 9L7.86805e-07 9Z"
      fill="#D9D9D9"
    />
  </svg>
);

export const RectangleRightSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    width="3"
    height="138"
    viewBox="0 0 3 138"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <g opacity="0.6">
      <path
        d="M2.40389 137.343C2.46309 137.707 3 137.664 3 137.295L3 0.906416C3 0.538299 2.46493 0.493805 2.40412 0.856865L0.677672 11.1654C0.66853 11.2199 0.663936 11.2752 0.663936 11.3305L0.663935 126.558C0.663935 126.612 0.668268 126.666 0.676891 126.719L2.40389 137.343Z"
        fill="white"
      />
      <path
        d="M2.40389 137.343C2.46309 137.707 3 137.664 3 137.295L3 0.906416C3 0.538299 2.46493 0.493805 2.40412 0.856865L0.677672 11.1654C0.66853 11.2199 0.663936 11.2752 0.663936 11.3305L0.663935 126.558C0.663935 126.612 0.668268 126.666 0.676891 126.719L2.40389 137.343Z"
        fill="url(#pattern0_1877_349273)"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_1877_349273"
        patternContentUnits="objectBoundingBox"
        width="0.0313128"
        height="1.92632"
      >
        <use
          xlinkHref="#image0_1877_349273"
          transform="scale(0.0034792 0.214035)"
        />
      </pattern>
      <image
        id="image0_1877_349273"
        width="9"
        height="9"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAiSURBVHgB3dCxAQAACMKw8v/P4gfKTOdMFXcmAK4Hgv/FLGnkEPHOzzMnAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

export const RectangleLeftSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    width="3"
    height="122"
    viewBox="0 0 3 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <g opacity="0.6">
      <path
        d="M1.98704 120.786C1.78969 122 -2.88384e-07 121.856 -3.20184e-07 120.626L-3.40458e-06 1.32391C-3.4363e-06 0.0968498 1.78358 -0.0514698 1.98626 1.15873L2.32233 3.16535C2.33147 3.21994 2.33606 3.27518 2.33606 3.33053L2.33606 118.558C2.33606 118.612 2.33173 118.666 2.32311 118.719L1.98704 120.786Z"
        fill="white"
      />
      <path
        d="M1.98704 120.786C1.78969 122 -2.88384e-07 121.856 -3.20184e-07 120.626L-3.40458e-06 1.32391C-3.4363e-06 0.0968498 1.78358 -0.0514698 1.98626 1.15873L2.32233 3.16535C2.33147 3.21994 2.33606 3.27518 2.33606 3.33053L2.33606 118.558C2.33606 118.612 2.33173 118.666 2.32311 118.719L1.98704 120.786Z"
        fill="url(#pattern0_1877_349274)"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_1877_349274"
        patternContentUnits="objectBoundingBox"
        width="0.0313128"
        height="1.92632"
      >
        <use
          xlinkHref="#image0_1877_349274"
          transform="scale(0.0034792 0.214035)"
        />
      </pattern>
      <image
        id="image0_1877_349274"
        width="9"
        height="9"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAiSURBVHgB3dCxAQAACMKw8v/P4gfKTOdMFXcmAK4Hgv/FLGnkEPHOzzMnAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

export const StatBgOverview: React.FC<SVGProps> = ({ className }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 211 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMax slice"
    className={className}
  >
    <g filter="url(#filter0_b_40_599041)">
      <path
        d="M0 0H211V112.735L198.14 130H0V0Z"
        fill="#0F121A"
        fillOpacity="0.75"
      />
      <path
        d="M0.5 0.5H210.5V112.569L197.889 129.5H0.5V0.5Z"
        stroke="white"
        strokeOpacity="0.09"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_40_599041"
        x="-4"
        y="-4"
        width="219"
        height="138"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_40_599041"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_40_599041"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

interface SvgProps {
  className?: string;
  transform?: string;
}
export const PlusIcon: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_75_49018)">
      <path
        d="M14 7.99805H9V12.998C9 13.2633 8.89464 13.5176 8.70711 13.7052C8.51957 13.8927 8.26522 13.998 8 13.998C7.73478 13.998 7.48043 13.8927 7.29289 13.7052C7.10536 13.5176 7 13.2633 7 12.998V7.99805H2C1.73478 7.99805 1.48043 7.89269 1.29289 7.70515C1.10536 7.51762 1 7.26326 1 6.99805C1 6.73283 1.10536 6.47848 1.29289 6.29094C1.48043 6.1034 1.73478 5.99805 2 5.99805H7V0.998047C7 0.73283 7.10536 0.478476 7.29289 0.29094C7.48043 0.103403 7.73478 -0.00195313 8 -0.00195312C8.26522 -0.00195313 8.51957 0.103403 8.70711 0.29094C8.89464 0.478476 9 0.73283 9 0.998047V5.99805H14C14.2652 5.99805 14.5196 6.1034 14.7071 6.29094C14.8946 6.47848 15 6.73283 15 6.99805C15 7.26326 14.8946 7.51762 14.7071 7.70515C14.5196 7.89269 14.2652 7.99805 14 7.99805Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_75_49018"
        x="0.5"
        y="-0.00195312"
        width="14.5"
        height="14.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-0.5" dy="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_75_49018"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_75_49018"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const ButtonBg: React.FC = () => (
  <svg
    width="344"
    height="232"
    viewBox="0 0 344 232"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_dddddd_1827_48618)">
      <mask id="path-1-inside-1_1827_48618" fill="white">
        <path d="M98.8243 1.70945C100.234 0.602002 101.974 0 103.767 0H256C260.418 0 264 3.58172 264 8V32.0378C264 34.5345 262.834 36.8881 260.848 38.4013L245.148 50.3635C243.755 51.4251 242.051 52 240.3 52H88C83.5817 52 80 48.4183 80 44V20.3883C80 17.9334 81.1271 15.6144 83.0574 14.0977L98.8243 1.70945Z" />
      </mask>
      <path
        d="M98.8243 1.70945C100.234 0.602002 101.974 0 103.767 0H256C260.418 0 264 3.58172 264 8V32.0378C264 34.5345 262.834 36.8881 260.848 38.4013L245.148 50.3635C243.755 51.4251 242.051 52 240.3 52H88C83.5817 52 80 48.4183 80 44V20.3883C80 17.9334 81.1271 15.6144 83.0574 14.0977L98.8243 1.70945Z"
        fill="url(#paint0_linear_1827_48618)"
      />
      <path
        d="M260.848 38.4013L261.454 39.1967L260.848 38.4013ZM245.148 50.3635L244.542 49.568L245.148 50.3635ZM103.767 1H256V-1H103.767V1ZM240.3 51H88V53H240.3V51ZM81 44V20.3883H79V44H81ZM83.6752 14.8841L99.4422 2.49577L98.2065 0.923136L82.4396 13.3114L83.6752 14.8841ZM263 8V32.0378H265V8H263ZM260.242 37.6058L244.542 49.568L245.754 51.1589L261.454 39.1967L260.242 37.6058ZM263 32.0378C263 34.2225 261.98 36.2818 260.242 37.6058L261.454 39.1967C263.689 37.4944 265 34.8466 265 32.0378H263ZM81 20.3883C81 18.2403 81.9862 16.2112 83.6752 14.8841L82.4396 13.3114C80.268 15.0177 79 17.6265 79 20.3883H81ZM88 51C84.134 51 81 47.866 81 44H79C79 48.9706 83.0294 53 88 53V51ZM240.3 53C242.27 53 244.186 52.3532 245.754 51.1589L244.542 49.568C243.323 50.4969 241.832 51 240.3 51V53ZM256 1C259.866 1 263 4.13401 263 8H265C265 3.02944 260.971 -1 256 -1V1ZM103.767 -1C101.75 -1 99.7922 -0.322747 98.2065 0.923136L99.4422 2.49577C100.675 1.52675 102.198 1 103.767 1V-1Z"
        fill="white"
        fillOpacity="0.3"
        mask="url(#path-1-inside-1_1827_48618)"
      />
    </g>
    <defs>
      <filter
        id="filter0_dddddd_1827_48618"
        x="0"
        y="0"
        width="344"
        height="232"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.76726" />
        <feGaussianBlur stdDeviation="1.1069" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1827_48618"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="6.6501" />
        <feGaussianBlur stdDeviation="2.66004" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.186902 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_1827_48618"
          result="effect2_dropShadow_1827_48618"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="12.5216" />
        <feGaussianBlur stdDeviation="5.00862" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.154988 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_dropShadow_1827_48618"
          result="effect3_dropShadow_1827_48618"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="22.3363" />
        <feGaussianBlur stdDeviation="8.93452" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
        />
        <feBlend
          mode="normal"
          in2="effect3_dropShadow_1827_48618"
          result="effect4_dropShadow_1827_48618"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="41.7776" />
        <feGaussianBlur stdDeviation="16.711" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.105012 0"
        />
        <feBlend
          mode="normal"
          in2="effect4_dropShadow_1827_48618"
          result="effect5_dropShadow_1827_48618"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="100" />
        <feGaussianBlur stdDeviation="40" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0730979 0"
        />
        <feBlend
          mode="normal"
          in2="effect5_dropShadow_1827_48618"
          result="effect6_dropShadow_1827_48618"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect6_dropShadow_1827_48618"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1827_48618"
        x1="172"
        y1="0"
        x2="172"
        y2="52"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F46F0F" />
        <stop offset="1" stopColor="#C1272D" />
      </linearGradient>
    </defs>
  </svg>
);

export const LiveBetBgMobile: React.FC = () => (
  <svg
    width="100%"
    height="259"
    viewBox="0 0 364 259"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_1956_135680)">
      <path
        d="M0 42.2648C0 34.562 3.69717 27.3273 9.93967 22.8147L35.206 4.54988C39.2976 1.59213 44.2177 0 49.2663 0H340C353.255 0 364 10.7452 364 24V217.534C364 222.148 362.67 226.665 360.169 230.542L348.905 248.008C344.485 254.86 336.889 259 328.736 259H24C10.7452 259 0 248.255 0 235V42.2648Z"
        fill="#0F121A"
        fillOpacity="0.75"
      />
    </g>
    <path
      d="M328.736 258.322H24C11.1194 258.322 0.677725 247.881 0.677725 235V42.2648C0.677725 34.7796 4.2705 27.7492 10.3367 23.3639L35.603 5.09912C39.5791 2.2249 44.3602 0.677725 49.2663 0.677725H340C352.881 0.677725 363.322 11.1195 363.322 24V217.534C363.322 222.018 362.03 226.407 359.599 230.175L348.335 247.641C344.04 254.299 336.659 258.322 328.736 258.322Z"
      stroke="white"
      strokeOpacity="0.1"
      strokeWidth="1.35545"
    />
    <defs>
      <filter
        id="filter0_i_1956_135680"
        x="0"
        y="0"
        width="564"
        height="359"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="8" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1956_135680"
        />
      </filter>
    </defs>
  </svg>
);

export const ArrowIcon: React.FC = () => (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.166341 4.33325L0.166341 5.66659L8.16634 5.66659L8.16634 6.99992L9.49967 6.99992L9.49967 5.66658L10.833 5.66658L10.833 4.33325L9.49967 4.33325L9.49967 2.99992L8.16634 2.99992L8.16634 4.33325L0.166341 4.33325ZM6.83301 1.66659L8.16634 1.66659L8.16634 2.99992L6.83301 2.99992L6.83301 1.66659ZM6.83301 1.66659L5.49967 1.66659L5.49967 0.333252L6.83301 0.333252L6.83301 1.66659ZM6.83301 8.33325L8.16634 8.33325L8.16634 6.99992L6.83301 6.99992L6.83301 8.33325ZM6.83301 8.33325L5.49967 8.33325L5.49967 9.66658L6.83301 9.66658L6.83301 8.33325Z"
      fill="black"
    />
  </svg>
);

export const VSIcon: React.FC = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.8898 2.72998L30.1304 3.79873L33.6554 6.29623L34.4148 5.22373L30.8898 2.72998ZM22.6398 3.20248L24.9085 7.45498L25.0773 7.57592L26.4648 3.79217L22.6398 3.20248ZM28.0398 4.38654L26.5023 8.58654L30.3179 11.2875L33.6273 8.33061C33.5429 8.27623 33.4491 8.21904 33.3648 8.1581L28.0398 4.38654ZM5.6082 4.55248L6.62445 8.84904L9.40227 9.09279L9.65539 6.31498L5.6082 4.55248ZM44.146 7.06967C43.621 7.51123 43.0023 7.87498 42.3179 8.17029C42.7866 12.525 40.9398 15.9937 38.0804 18.4594C35.596 20.6062 32.371 22.0594 29.1741 22.95C28.9398 23.4 28.7054 23.8125 28.4804 24.1781C32.371 24.6844 37.2179 22.1906 40.5929 18.5531C42.4491 16.5562 43.8554 14.25 44.446 12.0656C44.9335 10.2469 44.8866 8.55748 44.146 7.06967ZM11.2116 7.88623L10.9304 10.9312L7.89758 10.6594L29.1366 36.0656L31.0116 34.5L32.446 33.3L11.2116 7.88623ZM40.6866 8.72717C40.2929 8.82092 39.8898 8.91467 39.4866 8.98029C38.0898 9.21467 36.6648 9.27092 35.4085 9.00842L31.5648 12.4406C31.9398 13.0969 32.0335 13.9125 31.9866 14.7375C31.9304 15.9187 31.5835 17.2406 31.1148 18.5719C30.8335 19.35 30.5241 20.1281 30.1866 20.8781C32.7085 20.0156 35.1179 18.7875 36.9835 17.1844C39.4398 15.0469 40.9679 12.3469 40.6866 8.72717ZM25.6866 10.0687L20.8866 16.8375L23.7554 20.2594L29.2116 12.5625L25.6866 10.0687ZM16.2929 23.325L3.23633 41.7375L6.75477 44.2312L19.1523 26.7469L16.2929 23.325ZM38.1366 30.75L25.621 41.2031L27.421 43.3687L39.9366 32.9062L38.1366 30.75ZM36.421 38.0531L33.1116 40.8094L36.8335 45.2719L40.1429 42.5156L36.421 38.0531Z"
      fill="white"
    />
  </svg>
);
