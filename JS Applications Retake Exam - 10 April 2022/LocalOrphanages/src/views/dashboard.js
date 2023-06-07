import { getAllMaterials } from "../api/data.js";
import { html, render } from "../lib.js";

const dashboardTemplate = (material) => html` <section id="dashboard-page">
  <h1 class="title">All Posts</h1>

  <!-- Display a div with information about every post (if any)-->
  <div class="all-posts">
    ${material.length == 0
      ? html`<h1 class="title no-posts-title">No posts yet!</h1>`
      : material.map(materialCard)};
  </div>
</section>`;

const materialCard = (material) => html` <div class="post">
  <h2 class="post-title">${material.title}</h2>
  <img class="post-image" src=${material.imageUrl} alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/dashboard/${material._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

export async function dashboardView(ctx) {
  const materials = await getAllMaterials();

  ctx.render(dashboardTemplate(materials));
}
