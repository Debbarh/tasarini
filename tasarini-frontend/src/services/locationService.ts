import api from '@/services/api';   // wrapper axios/fetch que tu utilises déjà

export const getCountries = () => api.get('/countries/');
export const addCountry   = (payload) => api.post('/countries/', payload);
export const updateCountry = (id, payload) => api.put(`/countries/${id}/`, payload);
export const deleteCountry = (id) => api.delete(`/countries/${id}/`);

export const getCities = (countryId) =>
  api.get(`/countries/${countryId}/cities/`);
export const addCity = (countryId, payload) =>
  api.post(`/countries/${countryId}/cities/`, payload);