import { getCharacter, GET_CHARACTERS_ID, LIMIT } from '../request';
import { AxiosError, AxiosResponse } from 'axios';
import { Character, MarvelResponse, GetCharacterQueryParams } from '../models';
import { useInfiniteQuery } from 'react-query';

export const useGetCharacters = (params: GetCharacterQueryParams) =>
  useInfiniteQuery<AxiosResponse<MarvelResponse<Character[]>>, AxiosError>
    ([GET_CHARACTERS_ID, params],
      ({ pageParam = 0 }) =>
        getCharacter({ ...params, offset: pageParam })
      ,
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length * LIMIT
          const results = lastPage.data.data.results;

          return results.length > 0 ? nextPage : undefined
        }
      }
    )