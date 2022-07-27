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
  const [characterDetail, setCharacterDetail] = useState<Character | null>(null);
  const openModal = (character: Character) => setCharacterDetail(character);
  const closeModal = () => setCharacterDetail(null);

  return (
    <>
      {data.length <= 0 && <Message text={DATA_UNAVAILABLE} />}

      <ul className='grid'>
        {data.map(item => (
          <CharacterCard data={item} key={item.id} onClick={() => openModal(item)} />)
        )}
      </ul>

      {!!characterDetail &&
        <CharacterModal data={characterDetail} onClose={closeModal} />
      }
    </>
  )
}