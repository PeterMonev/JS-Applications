export async function showDetailsView(id){
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');

    const recipe = await getByid(id);

    document.getElementById('details-view').style.display = 'block';

    displayRecipe(recipe);
}

 async function getByid(id){
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

 function displayRecipe(recipe){
    document.getElementById('recipe-title').textContent = recipe.name;

    const ingredientsFragment = document.createDocumentFragment();
    for(let ingredient of recipe.ingredients){
        const element = document.createElement('li');
        element.textContent = ingredient;
        ingredientsFragment.appendChild(element); 
    }
    document.getElementById("recipe-Ingredients").replaceChildren(ingredientsFragment);

    const stepsFragment = document.createDocumentFragment();
    for(let step of recipe.steps){
        const element = document.createElement('li');
        element.textContent = step;
        stepsFragment.appendChild(element); 
    }
    document.getElementById("recipe-steps").replaceChildren(stepsFragment);
}