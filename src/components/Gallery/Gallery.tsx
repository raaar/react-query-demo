import { FC, useState } from 'react';
import { DATA_UNAVAILABLE } from "../../i18n";
import { Character } from "../../models";
import { CharacterCard } from "../CharacterCard";
import { CharacterModal } from '../CharacterModal';
import { Message } from "../Message";

type GalleryProps = {
  data: Character[]
}

export const Gallery: FC<GalleryProps> = ({ data }) => {
  const [characterDetailId, setCharacterDetailId] = useState<number | null>(null);
  const openModal = (id: number) => setCharacterDetailId(id);
  const closeModal = () => setCharacterDetailId(null);

  return (
    <>
      {data.length <= 0 && <Message text={DATA_UNAVAILABLE} />}

      < ul className='grid' >
        {
          data.map((item: Character) =>
            <CharacterCard data={item} key={item.id} onClick={() => openModal(item.id)} />)
        }
      </ul>

      {!!characterDetailId &&
        <CharacterModal id={characterDetailId} onClose={closeModal} />
      }
    </>
  )
}