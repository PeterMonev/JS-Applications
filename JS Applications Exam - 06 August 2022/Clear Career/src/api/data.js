import { get, del, post,put } from "./api.js";

export async function getAll() {
  return get("/data/offers?sortBy=_createdOn%20desc");
}

export async function getById(id){
    return get('/data/offers/' + id);
}

export async function deleteById(id){
    return del('/data/offers/' + id); 
}

export async function createOffer(offerData){
  return post('/data/offers', offerData);
}

export async function editOffer(id, offer){
  return put('/data/offers/' + id, offer);
}

export async function apply(offerId){
  return post('/data/applications',{ offerId})
}

export async function getApply(offerId){
  return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function getOwnApply(offerId,userId){
  return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}