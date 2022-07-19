import { getCharacter, GET_CHARACTERS_ID } from '../request';
import { AxiosError, AxiosResponse } from 'axios';
import { Character, MarvelResponse } from '../models';
import { useQuery } from 'react-query';

export const useGetCharacters = () =>
	useQuery<AxiosResponse<MarvelResponse<Character[]>>, AxiosError>
		([GET_CHARACTERS_ID], getCharacter)