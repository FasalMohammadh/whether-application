import React from 'react';

import toShortDate from '@/Utils/toShortDate';
import toShortWeekDay from '@/Utils/toShortWeekDay';

import { FollowingWhether } from '@/Page/Hooks/useMainPage';

type WhetherCardExpandedProps = {
  whether: FollowingWhether;
};

const WhetherCardExpanded = (props: WhetherCardExpandedProps) => (
  <div className='grid grid-cols-6 bg-card-blue bg-opacity-40 rounded place-items-center p-2 '>
    <div>
      <p>{toShortWeekDay(props.whether.date)}</p>
      <p className='text-sm text-gray-300 text-opacity-80'>
        {toShortDate(props.whether.date)}
      </p>
    </div>
    <div>
      <img
        className='aspect-square rounded'
        src='https://picsum.photos/300'
        alt='Whether State'
        width={80}
        height={80}
      />
    </div>
    <div>
      <p>{props.whether.temperature.low}&deg;</p>
      <p className='text-sm text-gray-300 text-opacity-80'>Low</p>
    </div>
    <div>
      <p>{props.whether.temperature.high}&deg;</p>
      <p className='text-sm text-gray-300 text-opacity-80'>High</p>
    </div>
    <div>
      <p>{props.whether.windSpeed}mph</p>
      <p className='text-sm text-gray-300 text-opacity-80'>Wind</p>
    </div>
    <div>
      <p>{props.whether.rain}%</p>
      <p className='text-sm text-gray-300 text-opacity-80'>Rain</p>
    </div>
  </div>
);

export default React.memo(WhetherCardExpanded);
