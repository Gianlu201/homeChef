import { ChefHat, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const NavbarComponent = () => {
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto pt-10 flex justify-between items-center mb-9'>
      <div
        className='flex justify-start items-end cursor-pointer'
        onClick={() => navigate('/')}
      >
        <ChefHat className='text-primary fill-white stroke-1 w-10 h-10 xs:w-12 xs:h-12' />
        <span className='text-white text-sm inline-block pb-1'>HomeChef</span>
      </div>

      <button
        className='text-primary bg-white text-xs xs:text-lg font-bold rounded-full ps-3 xs:ps-4 pe-5 xs:pe-6 py-1 xs:py-2 flex justify-center items-center md:gap-2 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <ChevronLeft />
        <span>Back to categories</span>
      </button>
    </div>
  );
};

export default NavbarComponent;
