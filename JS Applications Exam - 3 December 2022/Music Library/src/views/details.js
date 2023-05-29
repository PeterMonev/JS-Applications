import { deleteById, getById, getLikes, getOwnLikes, like } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album,isOwner,onDelete,hasUser,likeCount,onLike,canLike) => html`   <section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${likeCount}</span></div>
  <div id="action-buttons">
  ${isOwner ? html`  

  <a href="/edit/${album._id}" id="edit-btn">Edit</a>
  <a href="javascript:void(0)" @click=${onDelete}  id="delete-btn">Delete</a>
`: html`${hasUser && canLike ? html `<a href="" @click=${onLike} id="like-btn">Like</a>`:''}`}
</div>
</div>
</section>`;



export async function detailsView(ctx) {
  const id = ctx.params.id
  const album = await getById(id);
  const userData = getUserData();
  const isOwner = userData?._id == album._ownerId;
  const hasUser = Boolean(userData)
  const result = await getOwnLikes(album._id,userData._id)
  let canLike = true;
  if(result > 0){
    canLike = false
 }

 const likeCount = await getLikes(album._id)

  ctx.render(detailsTemplate(album,isOwner,onDelete,hasUser,likeCount,onLike,canLike));
  
  async function onDelete(){
    const choice = confirm('Are you sure?');

    if(choice){
        await deleteById(id);
        ctx.page.redirect('/catalog');
    }
  }

  async function onLike(){
    await like(album._id)
   }
}