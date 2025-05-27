import { useEffect, useState } from 'react';
import HeroComponent from '../components/HeroComponent';
import { Search } from 'lucide-react';
import type { Category, Recipe } from '../interfaces/interfaces';
import MealsListComponent from '../components/MealsListComponent';

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foundedMeals, setFoundedMeals] = useState<Recipe[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getAllCategories = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      } else {
        throw new Error();
      }
    } catch {
      console.error('Error');
    }
  };

  const getAllMealsByCategory = async (category: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response.ok) {
        const data = await response.json();
        setFoundedMeals(data.meals);
      } else {
        throw new Error();
      }
    } catch {
      console.error('Error');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== '') {
      getAllMealsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <>
      <HeroComponent />

      <div className='max-w-7xl mx-auto grid grid-cols-4 gap-10 pt-6'>
        <div>
          <h2 className='text-white text-2xl font-medium mb-6'>Categories</h2>

          <div>
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  key={category.idCategory}
                  className={`relative border border-gray-400/40 rounded-xl py-3 overflow-hidden mb-4 cursor-pointer ${
                    selectedCategory == category.strCategory
                      ? 'bg-amber-400 text-primary'
                      : 'text-white'
                  }`}
                  onClick={() => handleCategoryClick(category.strCategory)}
                >
                  <span className='text-sm font-semibold ms-16'>
                    {category.strCategory}
                  </span>
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className='absolute -left-8 top-1/2 -translate-y-1/2 w-20'
                  />
                </div>
              ))}
          </div>
        </div>

        <div className='col-span-3'>
          <div className='flex justify-between items-center mb-8'>
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

          <MealsListComponent meals={foundedMeals} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
