import { useNavigate } from 'react-router';
import type { Recipe } from '../interfaces/interfaces';

interface MealCardProps {
  meal: Recipe;
}

const MealCardComponent = ({ meal }: MealCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='bg-gray-300 rounded-2xl overflow-hidden pb-4 cursor-pointer'
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <div className='mx-3 mt-3 rounded-lg overflow-hidden'>
        <img src={meal.strMealThumb} alt={meal.strMeal} className='' />
      </div>

      <h4 className='font-semibold px-4 pt-2 text-center line-clamp-2'>
        {meal.strMeal}
      </h4>
    </div>
  );
};

export default MealCardComponent;
