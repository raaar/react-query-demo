import axios from "axios";
import { GetCharacterQueryParams } from "../models";

const API_KEY = '4e3d0073da1758c3a9a8485a5f2b6b69';
const API_URL = `https://gateway.marvel.com:443/v1/public`;
export const LIMIT = 32;

export const GET_CHARACTERS_URL = `${API_URL}/characters`
export const GET_CHARACTERS_ID = 'GET_CHARACTERS';



export const getCharacter = (params: GetCharacterQueryParams) =>
  axios.get(GET_CHARACTERS_URL, {
    params: {
      ...params,
      apikey: API_KEY,
      limit: LIMIT
    }
  })
