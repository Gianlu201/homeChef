import type { Meal } from '../interfaces/interfaces';
import MealCardComponent from './MealCardComponent';

interface MealsListProps {
  meals: Meal[];
}

const MealsListComponent = ({ meals }: MealsListProps) => {
  return (
    <div className='grid grid-cols-4 gap-8'>
      {meals.map((meal) => (
        <MealCardComponent key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default MealsListComponent;
