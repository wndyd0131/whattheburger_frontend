import api from "../utils/api"

export const fetchStores = () =>
  api.get("/store")
    .then(res => res.data);

export const fetchNearByStores = (lon, lat, radiusMeter) =>
  api.get(`/store/nearby?lon=${lon}&lat=${lat}&radiusMeter=${radiusMeter}`)
    .then(res => res.data);