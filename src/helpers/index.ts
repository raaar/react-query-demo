import { ThumbnailModel } from "../models";

export const formatFileUrl = ({ path, extension }: ThumbnailModel) => `${path}.${extension}`;