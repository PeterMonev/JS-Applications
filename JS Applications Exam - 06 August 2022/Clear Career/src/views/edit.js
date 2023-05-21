import { getById, editOffer } from "../api/data.js";
import { html, render } from "../lib.js";


const editTemplate = (offer, onSubmit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form class="edit-form" @submit=${onSubmit}>
      <input type="text" name="title" id="job-title" .value="${offer.title}" />
      <input type="text" name="imageUrl" id="job-logo" .value="${offer.imageUrl}" />
      <input
        type="text"
        name="category"
        id="job-category"
        .value="${offer.category}"
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        .value=${offer.description}
      >
</textarea
      >
      <textarea id="job-requirements" name="requirements" rows="4" cols="50" .value=${offer.requirements}>
</textarea
      >
      <input
        type="text"
        name="salary"
        id="job-salary"
        value="${offer.salary}"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editPage(ctx) {
  const offerId = ctx.params.id;

  const offer = await getById(offerId);
  ctx.render(editTemplate(offer, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editOffers = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      requirements: formData.get("requirements").trim(),
      salary: formData.get("salary").trim(),
    };

    if (Object.values(editOffers).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editOffer(offerId, editOffers);
    event.target.reset();
    ctx.page.redirect(`/details/${offerId}`);
  }
}