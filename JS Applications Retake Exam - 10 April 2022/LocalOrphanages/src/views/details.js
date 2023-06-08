import { deleteMaterial, getById} from "../api/data.js";
import { html} from "../lib.js";
import { getUserData } from "../util.js";
import { donate,getDonations, getOwnDonation } from "../api/donation.js";

const detailsTemplate = (material,donations ,hasUser,canDonate, isOwner,onDelete,onDonate)=> html`     <section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src=${material.image}>
        </div>
        <div class="info">
            <h2 class="title post-title">${material.title}</h2>
            <p class="post-description">Description: ${material.description}</p>
            <p class="post-address">Address: ${material.address}</p>
            <p class="post-number">Phone number: ${material.phone}</p>
            <p class="donate-Item">Donate Materials: ${donations}</p>


            ${ materialControl(material ,hasUser,canDonate, isOwner,onDelete,onDonate) }

        </div>
    </div>
</div>
</section>`

function materialControl(material ,hasUser,canDonate, isOwner,onDelete,onDonate) {
    if(hasUser == false){
        return '';
      }

      if(canDonate){
        return html`<a  @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
      }

      if(isOwner){
        return     html `  <div class="btns">
        <a href="/edit/${material._id}" class="edit-btn btn">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>
        </div>`
      }
}

export async function detailsView(ctx){
   const id = ctx.params.id;
   const userData = getUserData();

   const hasUser = Boolean(userData);

   
   const requests = [
    getById(id),
    getDonations(id)
   ]

   if(hasUser) {
    requests.push(getOwnDonation(id,userData.id))
  };

  

  const [material,donations,hasDonation] = await Promise.all(requests);

  console.log(material)
    const isOwner = hasUser && userData.id === material._ownerId;
    const canDonate = !isOwner && hasDonation == 0;
    ctx.render(detailsTemplate(material,donations  ,hasUser,canDonate, isOwner,onDelete,onDonate));

    async function onDelete(event){
        event.preventDefault();
        const choice = confirm('Are you sure?');

        if(choice){
            await deleteMaterial(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onDonate(event){
        event.preventDefault();
        await donate(id)
        ctx.page.redirect('/dashboard/' + id);
      }
}