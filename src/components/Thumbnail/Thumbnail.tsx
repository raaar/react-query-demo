import { FC } from 'react';

type ThumbnailProps = {
  src: string;
  alt: string;
}

export const Thumbnail: FC<ThumbnailProps> = ({ src, alt }) => {
  return (
    <div className="thumbnail">
      <img src={src} alt={alt} />
    </div>)
}

