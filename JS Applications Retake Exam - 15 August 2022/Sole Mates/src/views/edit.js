import { getById, editItem } from "../api/data.js";
import { html, render } from "../lib.js";


const editTemplate = (shoe, onSubmit) => html`        <section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${shoe.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${shoe.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${shoe.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${shoe.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${shoe.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${shoe.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editPage(ctx) {
  const shoeId = ctx.params.id;

  const shoe = await getById(shoeId);
  ctx.render(editTemplate(shoe, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editShoe = {
      brand: formData.get("brand").trim(),
      model: formData.get("model").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      release: formData.get("release").trim(),
      designer: formData.get("designer").trim(),
      value: formData.get("value").trim(),
    };

    if (Object.values(editShoe).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editItem(shoeId, editShoe);
    event.target.reset();
    ctx.page.redirect(`/catalog/${shoeId}`);
  }
}