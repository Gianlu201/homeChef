import { useEffect, useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import type { Meal, Params } from '../interfaces/interfaces';
import { useParams } from 'react-router';

const DetailsPage = () => {
  const [recipe, setRecipe] = useState<Meal>();
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const params = useParams<Params>();

  const getRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );

      if (response.ok) {
        const data = await response.json();
        console.info(data.meals[0]);
        setRecipe(data.meals[0]);
        getIngredientsList(data.meals[0]);
      } else {
        throw new Error();
      }
    } catch {
      console.error('Error');
    }
  };

  const getIngredientsList = (meal: Meal) => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure ?? ''} ${ingredient}`.trim());
      }
    }

    setIngredientsList(ingredients);
  };

  const getYoutubeEmbedUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
  };

  useEffect(() => {
    if (params.recipeId) {
      getRecipe(params.recipeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavbarComponent />

      <div className='max-md:px-4 max-w-2xl mx-auto flex flex-col items-center text-white'>
        {recipe && (
          <>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className='w-full aspect-8/5 object-cover rounded-xl'
            />

            <h1 className='text-4xl font-bold mt-10 mb-6 self-start'>
              {recipe.strMeal}
            </h1>

            <div className='self-start flex justify-start items-center gap-4 mb-8'>
              <p className='text-sm xs:text-base bg-gray-700 px-3 py-1.5 rounded-full'>
                Category:{' '}
                <span className='font-bold'>{recipe.strCategory}</span>
              </p>

              <p className='text-sm xs:text-base bg-gray-700 px-3 py-1.5 rounded-full'>
                Area: <span className='font-bold'>{recipe.strArea}</span>
              </p>
            </div>

            {/* Ingredients */}
            <div className='self-start flex justify-start items-center gap-2 mb-4'>
              <span className='inline-block bg-amber-500 w-3 h-7 rounded-full'></span>
              <h3 className='text-lg font-bold'>Ingredients</h3>
            </div>

            <ul className='self-start mb-14'>
              {ingredientsList.map((ingredient, i) => (
                <li
                  key={i}
                  className='text-sm xs:text-base list-disc ms-10 mb-1'
                >
                  {ingredient}
                </li>
              ))}
            </ul>

            {/* Instruction */}
            <div className='self-start flex justify-start items-center gap-2 mb-4'>
              <span className='inline-block bg-indigo-500 w-3 h-7 rounded-full'></span>
              <h3 className='text-lg font-bold'>Instructions</h3>
            </div>

            <div className='text-pretty mb-10'>
              {recipe.strInstructions.split('\r\n').map((phrase, i) => (
                <p key={i} className='text-sm xs:text-base mb-4'>
                  {phrase}
                </p>
              ))}
            </div>

            {/* YouTube tutorial */}
            <iframe
              src={getYoutubeEmbedUrl(recipe.strYoutube)}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
              className='rounded-2xl mb-30 w-full aspect-16/9 max-w-[560px] max-h-[315h]'
            ></iframe>

            <h4 className='text-xs xs:text-sm mb-6'>
              Discover more about:{' '}
              <a
                href={recipe.strSource}
                className='text-blue-400'
                target='_blank'
              >
                click here!
              </a>
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
