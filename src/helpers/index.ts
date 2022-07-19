import { AxiosResponse } from "axios";
import { MarvelResponse, ThumbnailModel } from "../models";

export const formatFileUrl = ({ path, extension }: ThumbnailModel) => `${path}.${extension}`;


// 'AxiosResponse<MarvelResponse<Character[]>, any> | undefined'
// is not assignable to parameter of type
// 'AxiosResponse<MarvelResponse<Character[]>, any>'.
//   Type 'undefined' is not assignable to type 'AxiosResponse<MarvelResponse<Character[]>, any>'
export const getMarvelResults = <T>(data?: AxiosResponse<MarvelResponse<T>>): T | undefined =>
	data?.data?.data?.results