import { get, put, post, del } from "./api.js";

export async function getAll() {
  return get(`/data/games?sortBy=_createdOn%20desc`);
}
