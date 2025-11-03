import { API_URL } from ".";

export const API_BASE = API_URL + "/api";

export const API_COUPONS = API_BASE + "/coupons";

export const API_COUPONS_CREATE = `${API_COUPONS}`; // POST
export const API_COUPONS_GET_PAGINATED = `${API_COUPONS}`; // GET
export const API_COUPONS_GET_BY_ID = `${API_COUPONS}/`; // GET + [id]
export const API_COUPONS_UPDATE_BY_ID = `${API_COUPONS}/`; // PATCH + [id]
export const API_COUPONS_DELETE_BY_ID = `${API_COUPONS}/`; // DELETE + [id]
