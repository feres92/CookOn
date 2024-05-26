document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value.split('\n');
    const instructions = document.getElementById('instructions').value;
    const difficulty = document.getElementById('difficulty').value;
    const prepTime = document.getElementById('prepTime').value;
    const cookTime = document.getElementById('cookTime').value;
    const recipeImage = document.getElementById('recipeImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const newRecipe = { name: recipeName, ingredients, instructions, difficulty, prepTime, cookTime, imageUrl };
        saveRecipe(newRecipe);
        addRecipeToList(newRecipe);
    };
    reader.readAsDataURL(recipeImage);
});

function addRecipeToList(recipe) {
    const list = document.getElementById('recipeList');
    const item = document.createElement('a');
    item.className = 'col-md-3 recipe-card';
    item.href = `recette.html?name=${encodeURIComponent(recipe.name)}&ingredients=${encodeURIComponent(JSON.stringify(recipe.ingredients))}&instructions=${encodeURIComponent(recipe.instructions)}&difficulty=${encodeURIComponent(recipe.difficulty)}&prepTime=${encodeURIComponent(recipe.prepTime)}&cookTime=${encodeURIComponent(recipe.cookTime)}&imageUrl=${encodeURIComponent(recipe.imageUrl)}`;
    item.innerHTML = `
        <img src="${recipe.imageUrl}" class="img-fluid" alt="${recipe.name}">
        <div class="recipe-card-content">
            <h3>${recipe.name}</h3>
            <p><strong>Ingrédients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Temps de préparation:</strong> ${recipe.prepTime}</p>
            <p><strong>Temps de cuisson:</strong> ${recipe.cookTime}</p>
            <span class="difficulty">${recipe.difficulty}</span>
        </div>
    `;
    list.appendChild(item);
}

function saveRecipe(recipe) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [
        { name: "Tarte aux pommes", ingredients: ["Pommes", "Pâte brisée", "Sucre"], instructions: "Préchauffez le four, préparez la pâte...", difficulty: "Facile", prepTime: "15min", cookTime: "30min", imageUrl: "images/tarte-aux-pommes.jpg" },
        { name: "Quiche lorraine", ingredients: ["Lardons", "Crème fraîche", "Œufs", "Pâte"], instructions: "Mélangez les ingrédients, versez sur la pâte, cuisez...", difficulty: "Moyen", prepTime: "20min", cookTime: "40min", imageUrl: "images/quiche-lorraine.jpg" },
        { name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Œufs", "Pancetta", "Parmesan"], instructions: "Cuisez les spaghetti, préparez la sauce, mélangez...", difficulty: "Facile", prepTime: "10min", cookTime: "20min", imageUrl: "images/spaghetti-carbonara.jpg" },
        { name: "Salade César", ingredients: ["Laitue", "Poulet", "Croutons", "Parmesan", "Sauce César"], instructions: "Mélangez les ingrédients, ajoutez la sauce...", difficulty: "Facile", prepTime: "15min", cookTime: "0min", imageUrl: "images/salade-cesar.jpg" },
        { name: "Bœuf Bourguignon", ingredients: ["Bœuf", "Vin rouge", "Carottes", "Champignons", "Oignons"], instructions: "Cuisez le bœuf, ajoutez les légumes, mijotez...", difficulty: "Difficile", prepTime: "30min", cookTime: "2h", imageUrl: "images/boeuf-bourguignon.jpg" },
        { name: "Poulet Curry", ingredients: ["Poulet", "Curry", "Lait de coco", "Oignons", "Ail"], instructions: "Cuisez le poulet, préparez la sauce, mélangez...", difficulty: "Moyen", prepTime: "20min", cookTime: "40min", imageUrl: "images/poulet-curry.jpg" },
        { name: "Pizza Margherita", ingredients: ["Pâte à pizza", "Tomates", "Mozzarella", "Basilic"], instructions: "Préparez la pâte, ajoutez les ingrédients, cuisez...", difficulty: "Moyen", prepTime: "30min", cookTime: "15min", imageUrl: "images/pizza-margherita.jpg" },
        { name: "Crêpes", ingredients: ["Farine", "Lait", "Œufs", "Beurre"], instructions: "Mélangez les ingrédients, cuisez les crêpes...", difficulty: "Facile", prepTime: "10min", cookTime: "20min", imageUrl: "images/crepes.jpg" },
        { name: "Soupe à l'oignon", ingredients: ["Oignons", "Beurre", "Bouillon", "Pain", "Fromage"], instructions: "Cuisez les oignons, ajoutez le bouillon, servez...", difficulty: "Facile", prepTime: "15min", cookTime: "30min", imageUrl: "images/soupe-oignon.jpg" },
        { name: "Ratatouille", ingredients: ["Tomates", "Aubergines", "Courgettes", "Poivrons"], instructions: "Cuisez les légumes, mijotez...", difficulty: "Facile", prepTime: "20min", cookTime: "40min", imageUrl: "images/ratatouille.jpg" },
        { name: "Gratin Dauphinois", ingredients: ["Pommes de terre", "Crème", "Lait", "Ail"], instructions: "Préparez les pommes de terre, cuisez le gratin...", difficulty: "Moyen", prepTime: "20min", cookTime: "1h", imageUrl: "images/gratin-dauphinois.jpg" },
        { name: "Moules Marinières", ingredients: ["Moules", "Vin blanc", "Échalotes", "Persil"], instructions: "Cuisez les moules, préparez la sauce, servez...", difficulty: "Facile", prepTime: "10min", cookTime: "15min", imageUrl: "images/moules-mariniere.jpg" },
        { name: "Gaufres", ingredients: ["Farine", "Lait", "Œufs", "Sucre"], instructions: "Mélangez les ingrédients, cuisez les gaufres...", difficulty: "Facile", prepTime: "10min", cookTime: "15min", imageUrl: "images/gaufres.jpg" },
        { name: "Tiramisu", ingredients: ["Mascarpone", "Œufs", "Sucre", "Café", "Biscuits"], instructions: "Préparez la crème, trempez les biscuits, assemblez...", difficulty: "Moyen", prepTime: "30min", cookTime: "0min", imageUrl: "images/tiramisu.jpg" },
        { name: "Clafoutis aux cerises", ingredients: ["Cerises", "Farine", "Sucre", "Lait", "Œufs"], instructions: "Préparez la pâte, ajoutez les cerises, cuisez...", difficulty: "Facile", prepTime: "15min", cookTime: "30min", imageUrl: "images/clafoutis-cerises.jpg" }
    ];

    recipes.forEach(recipe => {
        addRecipeToList(recipe);
    });
}

document.addEventListener('DOMContentLoaded', loadRecipes);
