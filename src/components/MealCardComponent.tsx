import type { Meal } from '../interfaces/interfaces';

interface MealCardProps {
  meal: Meal;
}

const MealCardComponent = ({ meal }: MealCardProps) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden pb-4'>
      <div>
        <img src={meal.strMealThumb} alt={meal.strMeal} className='' />
      </div>

      <h4 className='font-semibold px-4 pt-2 text-center'>{meal.strMeal}</h4>
    </div>
  );
};

export default MealCardComponent;
