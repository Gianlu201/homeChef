import type { Recipe } from '../interfaces/interfaces';
import MealCardComponent from './MealCardComponent';

interface MealsListProps {
  meals: Recipe[];
}

const MealsListComponent = ({ meals }: MealsListProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {meals.map((meal) => (
        <MealCardComponent key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default MealsListComponent;
