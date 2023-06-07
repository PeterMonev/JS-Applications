import { showRegister } from './views/register.js';
import { page, render } from './lib.js';
import { loginView } from './views/login.js';
import { logout } from './api/users.js';
import { getUserData } from './util.js';
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { profileView } from './views/profile.js';
import { editView } from './views/edit.js';

const main = document.getElementById('main-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext)
// page('/dashboard',dashboardView);
page('/', dashboardView);
page('/dashboard',dashboardView);
page('/dashboard/:id',detailsView);
page('/profile',profileView);
page('/create',createView);
page('/login',loginView);
page('/register',showRegister);
page('/edit/:id',editView);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}

function renderMain(templateResult){
  render(templateResult,main);
}

export function updateNav(){
  const userData = getUserData();
 
  if(userData){
    document.getElementById('user').style.display = 'block';
    document.getElementById('guest').style.display = 'none';
  }else {
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'block';
  }
}

function onLogout(){
   logout();
   updateNav()
   page.redirect('/dashboard');
}