import React from 'react';

import SunImage from '@/Assets/Images/sun.png';

type Time = 'pm' | 'am';

interface WhetherCardProps {
  whether: {
    temperature: number;
    time: `${string}${Time}`;
  };
  className?: string;
}

const WhetherCard = (props: WhetherCardProps) => (
  <div
    className={`flex flex-col items-center gap-2 backdrop-blur-sm bg-card-blue bg-opacity-40 rounded-lg py-2 px-4 min-w-fit ${props.className}`}
  >
    <p className='font-poppins text-sm'>{props.whether.time}</p>
    <img
      src={SunImage}
      alt='Whether'
      width={50}
      height={50}
      className='aspect-square'
    />
    <p className='font-poppins text-sm'>{props.whether.temperature}&deg;</p>
  </div>
);

export default React.memo(WhetherCard);
