import { useEffect, useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import type { Meal, Params } from '../interfaces/interfaces';
import { useParams } from 'react-router';

const DetailsPage = () => {
  const params = useParams<Params>();

  const [recipe, setRecipe] = useState<Meal>();

  const getRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );

      if (response.ok) {
        const data = await response.json();
        setRecipe(data.meals[0]);
        console.log(data.meals[0]);
      } else {
        throw new Error();
      }
    } catch {
      console.error('Error');
    }
  };

  useEffect(() => {
    if (params.recipeId) {
      getRecipe(params.recipeId);
    }
  }, [params.recipeId]);

  return (
    <div>
      <NavbarComponent />

      {recipe && <img src={recipe.strMealThumb} alt={recipe.strMeal} />}
    </div>
  );
};

export default DetailsPage;
