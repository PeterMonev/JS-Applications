
export async function showCataloView(){
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById("catalog-view").style.display = 'block';

    const recipes = await getAllRecipes(); 
    displayRecipes(recipes);
}

 async function getAllRecipes(){
    const response = await fetch('http://localhost:3030/data/recipes?select=' + encodeURIComponent('_id,name')); 
    const recipes = await response.json(); 

    return recipes; 
}

 function displayRecipes(recipes) {
    const cards = recipes.map(createRecipeCard);

    const fragment = document.createDocumentFragment();
    for(let item of cards){
        fragment.appendChild(item);
    }

    const list = document.getElementById("recipe-list");
    list.replaceChildren(fragment);
}

function createRecipeCard(recipe){
    const element = document.createElement('li');
    element.textContent = recipe.name;

    return element;
}