import { useState } from 'react';
import './card.css';

const DisplayCard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipy, setRecipy] = useState('');
    const [mealName, setMealName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!searchTerm) {
            setError('Please enter a search term.');
            return;
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`, {
                method: 'GET'
            });

            if (!response.ok) {
                setError('An error occurred while fetching data.');
                return;
            }

            const data = await response.json();

            if (!data.meals || !data.meals.length) {
                setError('No data found for the given search term.');
                return;
            }

            const mealName = data.meals[0].strMeal;
            const recipy = data.meals[0].strInstructions;
            const img = data.meals[0].strMealThumb;
            setMealName(mealName);
            setRecipy(recipy)
            setThumbnail(img);
            setError('');
        } catch (error) {
            setError('An error occurred while fetching data.');
            console.log(error);
        }
    };
    

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <input type="search" name="searchmealbyname" value={searchTerm} onChange={handleChange} />
                <img src={thumbnail} alt="meal thumbnail"></img>
                <h3>Meal Name: {mealName}</h3>
                <p>Recipe: {recipy} </p>
                {error && <p className="error">{error}</p>}
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default DisplayCard;
