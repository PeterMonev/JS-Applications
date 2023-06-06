import { get,post,del,put } from './api.js';

export async function getAllMaterials() {
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export async function createMaterial(data){
    return post('/data/posts', data);
}

export async function getById(id){
    return get('/data/posts/'+ id)
}

export async function deleteMaterial(id){
    return del('/data/posts/'+ id)
}

export async function getMaterialByUser(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function updateMaterial(id,material){
    return put('/data/posts/'+ id,material);
}