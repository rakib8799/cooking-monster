const handleFoodSearching = function () {
	fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
		.then(res => res.json())
		.then(data => {
			const { meals } = data;
			const foodSearch = document.getElementById('food-search').value;
			let count = 0;
			meals.find(meal => {
				if (meal.strCategory.toLowerCase() === foodSearch.toLowerCase()) {
					handleFoodCategoryName(foodSearch);
					++count;
				}
			});
			if (!count) {
				alert('Nothing Found!Please try again later...');
			}
		});
};
const handleFoodCategoryName = function (category) {
	fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
		.then(res => res.json())
		.then(data => handleFoods(data.meals));
};
const handleFoods = function (foods) {
	foods.map(food => {
		const { strMeal, strMealThumb } = food;
		const cookingFood = document.getElementById('cooking-food');
		const foodItems = document.createElement('div');
		foodItems.className = 'food-items card shadow-lg  mb-5 rounded';
		const items = `
                        <img src=${strMealThumb} class='img-fluid rounded thumb-img' >
                        <h4 class='text-height d-flex align-items-center justify-content-center text-main'>${strMeal}</h4>
                `;
		foodItems.innerHTML = items;
		cookingFood.appendChild(foodItems);
		foodItems.addEventListener('click', function () {
			fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`)
				.then(res => res.json())
				.then(data => handleFoodDetails(data.meals[0]));
		});
	});
};
const handleFoodDetails = function (details) {
	const {
		strMeal,
		strMealThumb,
		strMeasure1,
		strMeasure2,
		strMeasure3,
		strMeasure4,
		strMeasure5,
		strMeasure6,
		strIngredient1,
		strIngredient2,
		strIngredient3,
		strIngredient4,
		strIngredient5,
		strIngredient6,
	} = details;
	const modalSection = document.getElementById('modal-section');
	document.getElementById('food-search-bar').style.display = 'none';
	document.getElementById('cooking-food').style.opacity = '0.2';
	const modal = document.createElement('div');
	modal.className = 'card elements rounded w-50 shadow-lg mb-5 m-auto';
	const modalItem = `
                <img src=${strMealThumb} class='img-fluid img-height rounded'>
                <h3 class='pt-3 px-4 text-main'>${strMeal}</h3> 
                <h5 class='py-2 px-4'>Ingredients</h5>
                <ul class='text-lead lists''>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure1} ${strIngredient1}</li>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure2} ${strIngredient2}</li>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure3} ${strIngredient3}</li>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure4} ${strIngredient4}</li>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure5} ${strIngredient5}</li>
                        <li><i class="fas fa-check-square me-2 text-main"></i>${strMeasure6} ${strIngredient6}</li>
                </ul>
        `;
	modal.innerHTML = modalItem;
	modalSection.appendChild(modal);
};
