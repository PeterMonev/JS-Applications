const views = [...document.querySelectorAll('section')]

function hideAll(){
    views.forEach(s => s.style.display = 'none');
}

export function showView(section){
    hideAll();
    section.style.display = 'block';
    document.getElementById('movie').style.display = 'block';
    document.getElementById('add-movie-button').style.display = 'block'
}

