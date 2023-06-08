import { getById, updateMaterial } from "../api/data.js";
import { html, render } from "../lib.js";

const editTemplate = (material,onSubmit)=> html`        <section id="edit-page" class="auth">
<form @submit=${onSubmit} id="edit">
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" .value=${material.title}>
    </article>

    <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" .value=${material.description}>
    </article>

    <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" .value=${material.imageUrl}>
    </article>

    <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" .value=${material.address}>
    </article>

    <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" .value=${material.phone}>
    </article>

    <input type="submit" class="btn submit" value="Edit Post">
</form>
</section>`;

export async function editView(ctx){
    const material = await getById(ctx.params.id);
    ctx.render(editTemplate(material,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
   
        const material = {
            title: formData.get('title'),
            description: formData.get('description'),
            image: formData.get('imageUrl'),
            address: formData.get('address'),
            phone: formData.get('phone')
        };
        console.log(material);
        if(material.title == '' || material.description == '' || material.image == '' || material.address == '' || material.phone == ''){
            return alert('All fields needs required!');
        }

        await updateMaterial(ctx.params.id, material);
        event.target.reset();
        ctx.page.redirect('/dashboard/' + ctx.params.id)


    }
}