import { getMaterialByUser } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const profileTemplate = (materials, userData) => html` <sectionid="my-posts-page">
  <h1 class="title">My Posts</h1>

  ${materials.length == 0
    ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
    : materials.map(materialCard)}
</section>`;

const materialCard = (material) => html`<div class="my-posts">
  <div class="post">
    <h2 class="post-title">${material.title}</h2>
    <img class="post-image" src=${material.imageUrl} alt="Material Image" />
    <div class="btn-wrapper">
      <a href="/dashboard/${material._id}" class="details-btn btn">Details</a>
    </div>
  </div>
</div>`;

export async function profileView(ctx) {
  const userData = getUserData();
  const materials = await getMaterialByUser(userData.id);
  ctx.render(profileTemplate(materials, userData));
}
