import { showView } from "./util.js";


const homeSection = document.getElementById('home-page');
const catalogUl = document.getElementById('movies-list');


export function homePage(){
    debugger
    document.getElementById('movie').style.display = 'block';
    showView(homeSection);
    displayMovies();
}

async function displayMovies(){
    const movies = await getMovies();
    catalogUl.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie){
    const li = document.createElement('li');
    
    let img = document.createElement('img');
    img.src = movie.img;
    li.appendChild(img);

    const h4 = document.createElement('h4');
    h4.textContent = movie.title;
    li.appendChild(h4);

    const a = document.createElement('a');
    a.setAttribute = 'data';
    a.data = movie._id
  
    return li;

}


async function getMovies(){
    const response = await fetch('http://localhost:3030/data/movies');
    const data = response.json();

    return data;
}

