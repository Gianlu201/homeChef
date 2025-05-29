import { ChefHat } from 'lucide-react';

const HeroComponent = () => {
  return (
    <div className='relative max-h-[450px] overflow-hidden flex items-center rounded-xl'>
      <img
        src='/img/hero-image-xl-CIL-dgLT.png'
        alt='hero background'
        className='w-full'
      />

      <div className='absolute w-1/2 h-full flex flex-col justify-center top-0 left-1/2'>
        <div className='flex items-end mb-2 lg:mb-10'>
          <ChefHat className='text-white fill-gray-700 stroke-1 w-6 md:w-12 h-6 md:h-12' />
          <span className='text-xs sm:text-base font-bold pb-1 text-primary'>
            HomeChef
          </span>
        </div>
        <h1 className='relative w-2/3 text-base xs:text-2xl md:text-5xl lg:text-7xl font-semibold text-primary flex flex-col lg:gap-4'>
          <span className='max-xs:leading-2'>Chefs</span>
          <span className='inline-block ml-10 lg:ml-34'>Academy</span>
          <span className='max-xs:leading-2'>Secrets</span>
          <p className='absolute hidden lg:block left-1/2 top-6 w-[150px] text-xs font-medium'>
            🕰️ New recipe for you to try out, let's cook!
          </p>
        </h1>
      </div>
    </div>
  );
};

export default HeroComponent;
