import React from 'react';

import SunImage from '@/Assets/Images/sun.png';

import { Temperature } from '@/Page/Hooks/useMainPage';

type WhetherCardMobileProps = {
  className?: string;
  whether: {
    weekDay: string;
    temperature: Temperature;
  };
};

const WhetherCardMobile = ({ className, ...props }: WhetherCardMobileProps) => (
  <div
    className={`flex flex-col items-center gap-2 backdrop-blur-sm bg-card-blue bg-opacity-40 rounded-lg py-2 px-4 min-w-fit ${className}`}
  >
    <p className='font-poppins text-sm'>{props.whether.weekDay}</p>
    <img
      src={SunImage}
      alt='Whether'
      width={50}
      height={50}
      className='aspect-square'
    />
    <p className='font-poppins text-sm'>
      {props.whether.temperature.low}-{props.whether.temperature.high}&deg;
    </p>
  </div>
);

export default React.memo(WhetherCardMobile);
