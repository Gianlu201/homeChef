import { useEffect, useState } from 'react';
import HeroComponent from '../components/HeroComponent';
import { Search } from 'lucide-react';
import type { Category, Recipe } from '../interfaces/interfaces';
import MealsListComponent from '../components/MealsListComponent';
import type { RootState, AppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedCategory, setSearchQuery } from '../features/features';

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foundedMeals, setFoundedMeals] = useState<Recipe[]>([]);
  const [filteredFoundedMelas, setFilteredFoundedMelas] = useState<Recipe[]>(
    []
  );
  const [sortBy, setSortBy] = useState<string>('name');

  // const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const selectedCategory = useSelector(
    (state: RootState) => state.globalState.selectedCategory
  );
  const searchQuery = useSelector(
    (state: RootState) => state.globalState.searchQuery
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
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

        filterMeals(data.meals, searchQuery);
      } else {
        throw new Error();
      }
    } catch {
      console.error('Error');
    }
  };

  const filterMeals = (meals: Recipe[], query: string) => {
    const filteredArray = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLocaleLowerCase())
    );

    if (sortBy === 'id') {
      filteredArray.sort((a, b) => a.idMeal - b.idMeal);
    } else {
      filteredArray.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    }

    setFilteredFoundedMelas(filteredArray);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== '') {
      getAllMealsByCategory(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    filterMeals(foundedMeals, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy]);

  return (
    <>
      <HeroComponent />

      <div className='max-w-7xl mx-auto grid grid-cols-4 gap-10 pt-6 pb-20'>
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
                  dispatch(setSearchQuery(e.target.value));
                }}
              />
              <Search className='absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6' />
            </div>

            <div className='bg-white text-lg text-primary font-bold rounded-full py-2 px-5'>
              <label htmlFor='sort'>Sort by: </label>
              <select
                id='sort'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='focus:outline-none focus:ring-0'
              >
                <option value='name'>Name</option>
                <option value='id'>Id</option>
              </select>
            </div>
          </div>

          <div>
            {filteredFoundedMelas.length > 0 ? (
              <MealsListComponent meals={filteredFoundedMelas} />
            ) : (
              <h3 className='text-gray-300 text-2xl text-center pt-10'>
                No recipes found..
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
