import { apply, deleteById, getAll, getApply, getById, getOwnApply } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, isOwner,onDelete,hasUser,applyCount,onApply,canApply) => html`  
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${offer.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${applyCount}</strong></p>

  ${isOwner ? html`  <div id="action-buttons">
  <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
  <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
</div>`: html`${hasUser && canApply ? html` <div id="action-buttons">
<a href="" @click=${onApply} id="apply-btn">Apply</a>
</div>`:''}` }

</div>
</section>`;

export async function detailsView(ctx) {
  const  offer = await getById(ctx.params.id);
  const userData = getUserData();
  const isOwner = userData?._id == offer._ownerId; 
  const hasUser = Boolean(userData)
  const test = await getOwnApply(offer._id,userData._id)
  let canApply = true;
 if(test > 0){
    canApply = false
 }
  const applyCount = await getApply(offer._id)
  
  ctx.render(detailsTemplate(offer,isOwner,onDelete,hasUser,applyCount,onApply,canApply));

  async function onDelete(){
     const choice = confirm('Are you sure?');

     if(choice){
        await deleteById(ctx.params.id);
        ctx.page.redirect('/catalog')
     }
  }

  async function onApply(){
   await apply(offer._id)
  }


}
