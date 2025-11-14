// src/services/api.js
import axios from 'axios';

// JSON Server
export const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// Endpoints
export const EP = {
  USERS: '/users',
  ACCOUNTS: '/accounts',   // để phòng khi đổi tên
  MOVIES: '/movies',       // không dùng, giữ nguyên pattern cũ của bạn
  EXPENSES: '/expenses',
};

// CRUD helpers
const list   = (ep, params = {})   => API.get(ep, { params }).then(r => r.data);
const getOne = (ep, id)            => API.get(`${ep}/${id}`).then(r => r.data);
const create = (ep, payload)       => API.post(ep, payload).then(r => r.data);
const update = (ep, id, payload)   => API.put(`${ep}/${id}`, payload).then(r => r.data);
const patch  = (ep, id, partial)   => API.patch(`${ep}/${id}`, partial).then(r => r.data);
const remove = (ep, id)            => API.delete(`${ep}/${id}`).then(r => r.data);

// Factory
export const makeResource = (endpoint) => ({
  list:    (params)  => list(endpoint, params),
  getById: (id)      => getOne(endpoint, id),
  create:  (payload) => create(endpoint, payload),
  update:  (id, p)   => update(endpoint, id, p),
  patch:   (id, p)   => patch(endpoint, id, p),
  remove:  (id)      => remove(endpoint, id),
});

// Login helpers
async function fetchAllAccounts() {
  try { return await list(EP.USERS); }
  catch { return await list(EP.ACCOUNTS); }
}

export async function findAccount({ identifier, usernameOrEmail, password }) {
  const ident = String(identifier ?? usernameOrEmail ?? '').trim().toLowerCase();
  const pwd   = String(password ?? '');
  const accs  = await fetchAllAccounts();

  return (
    accs.find(a =>
      (
        String(a?.username || '').toLowerCase() === ident
        // nếu sau này có email thì vẫn ok:
        || String(a?.email || '').toLowerCase() === ident
      )
      && String(a?.password || '') === pwd
    ) || null
  );
}
