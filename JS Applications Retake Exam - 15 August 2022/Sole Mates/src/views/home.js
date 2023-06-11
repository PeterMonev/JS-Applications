import { html,render } from "../lib.js";
import { getUserData } from "../util.js";

const homeTemplate = () => html`     <section id="home">
<h1>Welcome to Sole Mates</h1>
<img src="./images/home.jpg" alt="home" />
<h2>Browse through the shoe collectibles of our users</h2>
<h3>Add or manage your items</h3>
</section>
`;

export function homeView(ctx){
    if(getUserData()){
        ctx.page.redirect('/catalog')
    } else {
        ctx.render(homeTemplate());
    }
}