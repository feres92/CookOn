document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const ingredients = JSON.parse(urlParams.get('ingredients'));
    const instructions = urlParams.get('instructions');
    const difficulty = urlParams.get('difficulty');
    const prepTime = urlParams.get('prepTime');
    const cookTime = urlParams.get('cookTime');
    const imageUrl = urlParams.get('imageUrl');

    document.getElementById('recipeTitle').textContent = name;
    document.getElementById('recipeNameDetail').textContent = name;
    document.getElementById('recipeInstructions').textContent = instructions;
    document.getElementById('recipeDifficulty').textContent = difficulty;
    document.getElementById('recipePrepTime').textContent = prepTime;
    document.getElementById('recipeCookTime').textContent = cookTime;
    document.getElementById('recipeImage').src = imageUrl;

    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = '';  // Clear existing ingredients
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = ingredient;
        ingredientList.appendChild(li);
    });
});
