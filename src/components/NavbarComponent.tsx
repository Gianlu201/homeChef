import { ChefHat, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const NavbarComponent = () => {
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto pt-10 flex justify-between items-center'>
      <div
        className='flex justify-start items-end cursor-pointer'
        onClick={() => navigate('/')}
      >
        <ChefHat className='text-primary fill-white stroke-1 w-12 h-12' />
        <span className='text-white text-sm inline-block pb-1'>HomeChef</span>
      </div>

      <button
        className='text-primary bg-white text-lg font-bold rounded-full ps-4 pe-6 py-2 flex justify-center items-center gap-2 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <ChevronLeft />
        <span>Back to categories</span>
      </button>
    </div>
  );
};

export default NavbarComponent;
