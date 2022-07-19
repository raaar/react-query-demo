import axios from "axios";

const API_KEY = '4e3d0073da1758c3a9a8485a5f2b6b69';
const API_URL = `https://gateway.marvel.com:443/v1/public`;

export const GET_CHARACTERS_URL = `${API_URL}/characters?apikey=${API_KEY}`;
export const GET_CHARACTERS_ID = 'GET_CHARACTERS';

export const getCharacter = () => {
	return axios.get(GET_CHARACTERS_URL)
}