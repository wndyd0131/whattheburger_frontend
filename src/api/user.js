import api from "../utils/api";

export const signUp = (body) => 
  api.post("/signup", body)
    .then(res => res.data);

export const fetchUser = () => 
  api.get("/users")
    .then(res => res.data);