import { getSearch } from "../api/data.js";
import { html, render } from "../lib.js";
import { getUserData } from "../util.js";

const itemCard = (item,hasUser) => html` <li class="card">
<img src=${item.imageUrl} alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${item.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${item.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${item.value}</span>$</p>

${hasUser ? html` <a class="details-btn" href="/catalog/${item._id}">Details</a>`:''}

</li>`

const seachTemplate = (onSubmit,items,hasUser) => html`  <section id="search">
<h2>Search by Brand</h2>

<form @submit=${onSubmit}="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
  />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>

<div id="search-container">
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
     ${items.length === 0 ? html` <h2>There are no results found.</h2>`: items.map(items => itemCard(items,hasUser))}
  </ul>`;

 


export async function searchView(ctx){
    let items= []
    

    ctx.render(seachTemplate(onSubmit,items))

   

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('search')
        event.target.reset();
        const userData = sessionStorage.getItem('userData')
        const hasUser = Boolean(userData)
         items = await getSearch(query);
         ctx.render(seachTemplate(onSubmit,items,hasUser))
        
    }


}