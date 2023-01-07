import SunImage from '@/Assets/Images/sun.png';

import WhetherCard from '@/Page/Components/WhetherCard';
import WhetherCardMobile from '@/Page/Components/WhetherCardMobile';
import WhetherCardExpanded from '@/Page/Components/WhetherCardExpanded';

import to24HourTimeFormat from '@/Utils/to24HourTimeFormat';

import useMainPage from '@/Page/Hooks/useMainPage';

const WhetherPage = () => {
  const { currentWhether, followingWhether } = useMainPage();

  return (
    <div className='bg-gradient-to-b from-bg-start to-bg-end min-w-full min-h-screen'>
      <main className='mx-auto px-4 py-8 lg:max-w-3xl '>
        <h1 className='text-3xl font-mont font-medium'>
          {currentWhether?.city}, {currentWhether?.country}
        </h1>
        <p className='text-sm font-poppins'>
          {new Date().toLocaleDateString('en-uk', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })}
        </p>

        <div className='mt-5 lg:flex lg:gap-5'>
          <div className='flex justify-center items-center gap-8 lg:basis-1/2'>
            <img
              className='w-auto min-w-0 aspect-square'
              src={SunImage}
              alt='Sun'
              width={100}
              height={100}
            />
            <div>
              <p className='text-8xl font-mont'>
                {currentWhether?.currentTemperature}&deg;
              </p>
              <p className='text-1xl font-mont font-light'>Mostly Sunny</p>
            </div>
          </div>

          <div className='hidden lg:block lg:border-r-2 lg:flex-1 lg:w-0 ' />
          <hr className='mt-5 lg:hidden' />

          <div className='grid grid-cols-3 grid-rows-2 py-4 gap-y-4 gap-x-2 lg:basis-1/2'>
            <div className='text-center'>
              <p className='font-mont'>
                {currentWhether?.temperature.high}&deg;
              </p>
              <p className='font-mont text-sm'>High</p>
            </div>

            <div className='text-center'>
              <p className='font-mont'>{currentWhether?.windSpeed}mph</p>
              <p className='font-mont text-sm'>Wind</p>
            </div>

            <div className='text-center'>
              <p className='font-mont'>
                {currentWhether && to24HourTimeFormat(currentWhether.sunrise)}
              </p>
              <p className='font-mont text-sm'>Sunrise</p>
            </div>

            <div className='text-center'>
              <p className='font-mont'>
                {currentWhether?.temperature.low}&deg;
              </p>
              <p className='font-mont text-sm'>Low</p>
            </div>
            <div className='text-center'>
              <p className='font-mont'>{currentWhether?.rain}%</p>
              <p className='font-mont text-sm'>Rain</p>
            </div>

            <div className='text-center'>
              <p className='font-mont'>
                {currentWhether && to24HourTimeFormat(currentWhether.sunset)}
              </p>
              <p className='font-mont text-sm'>Sunset</p>
            </div>
          </div>
        </div>

        <hr className='mt-3 lg:hidden' />

        <section className='mt-5'>
          <h2 className='font-mont mb-2'>Todays Whether</h2>
          <div className='flex gap-2 overflow-x-auto py-2'>
            {currentWhether?.hourly.map(hourlyWhether => (
              <WhetherCard
                key={hourlyWhether.time}
                whether={hourlyWhether}
                className='flex-grow'
              />
            ))}
          </div>
        </section>

        <section className='mt-5'>
          <h2 className='font-mont mb-2'>Next 5 Days</h2>
          <div className='flex flex-col gap-2'>
            {followingWhether?.map(whetherInfo => (
              <WhetherCardExpanded
                key={whetherInfo.date.valueOf()}
                whether={whetherInfo}
              />
            ))}
          </div>
        </section>

        <section className='lg:hidden'>
          <h2 className='mt-3 font-mont text-sm mb-2'>Next 5 Days</h2>
          <div className=' flex gap-2 overflow-x-auto'>
            <WhetherCardMobile
              className='flex-1'
              whether={{
                weekDay: 'tue',
                temperature: { high: 1, low: 2 },
              }}
            />
            <WhetherCardMobile
              className='flex-1'
              whether={{
                weekDay: 'tue',
                temperature: { high: 1, low: 2 },
              }}
            />
            <WhetherCardMobile
              className='flex-1'
              whether={{
                weekDay: 'tue',
                temperature: { high: 1, low: 2 },
              }}
            />
            <WhetherCardMobile
              className='flex-1'
              whether={{
                weekDay: 'tue',
                temperature: { high: 1, low: 2 },
              }}
            />
            <WhetherCardMobile
              className='flex-1'
              whether={{
                weekDay: 'tue',
                temperature: { high: 1, low: 2 },
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default WhetherPage;
