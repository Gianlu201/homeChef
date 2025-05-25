import { useState } from 'react';
import HeroComponent from '../components/HeroComponent';
import { Search } from 'lucide-react';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuOptions = [
    {
      id: 1,
      name: 'Beef',
      img: '/img/beef.png',
    },
    {
      id: 2,
      name: 'Chicken',
      img: '/img/chicken.png',
    },
    {
      id: 3,
      name: 'Dessert',
      img: '/img/dessert.png',
    },
    {
      id: 4,
      name: 'Lamb',
      img: '/img/lamb.png',
    },
    {
      id: 5,
      name: 'Miscellaneous',
      img: '/img/miscellaneous.png',
    },
    {
      id: 6,
      name: 'Pasta',
      img: '/img/pasta.png',
    },
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <HeroComponent />

      <div className='max-w-7xl mx-auto grid grid-cols-4 gap-10 pt-6'>
        <div>
          <h2 className='text-white text-2xl font-medium mb-6'>Categories</h2>

          <div>
            {menuOptions.map((option) => (
              <div
                key={option.id}
                className={`relative border border-gray-400/40 rounded-xl py-3 overflow-hidden mb-4 cursor-pointer ${
                  selectedCategory == option.name
                    ? 'bg-amber-400 text-primary'
                    : 'text-white'
                }`}
                onClick={() => handleCategoryClick(option.name)}
              >
                <span className='text-sm font-semibold ms-16'>
                  {option.name}
                </span>
                <img
                  src={option.img}
                  alt={option.name}
                  className='absolute -left-8 top-1/2 -translate-y-1/2 w-20'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='col-span-3'>
          <div className='flex justify-between items-center'>
            <div className='relative text-gray-400 w-1/2'>
              <input
                type='text'
                placeholder='Search recipes and more'
                className='border border-gray-400/40 rounded-full w-full focus:outline-none focus:ring-0 focus:border-white py-3 ps-16'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Search className='absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6' />
            </div>

            <div className='bg-white text-lg text-primary font-bold rounded-full py-2 px-5'>
              <span>Sort by: </span>
              <select name='' id=''></select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
