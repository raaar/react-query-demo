import { useState } from 'react';
import { Character } from '../../models';
import { CharacterCard } from '../CharacterCard';
import { CharacterModal } from '../CharacterModal';
import { useGetCharacters } from '../../hooks';
import { DATA_UNAVAILABLE } from '../../i18n';
import { getMarvelResults } from '../../helpers';
import { Spinner } from 'reactstrap';


export const Gallery = () => {
	const { isLoading, isError, data, error } = useGetCharacters();
	const marvelResults = getMarvelResults<Character[]>(data)

	const [characterDetailId, setCharacterDetailId] = useState<number | null>(null);

	const openModal = (id: number) => {
		setCharacterDetailId(id)
	}

	const closeModal = () => {
		setCharacterDetailId(null)
	}

	if (isLoading) {
		return <Spinner role="status" />
	}

	if (isError) {
		return <span>{error.message}</span>
	}

	if (!marvelResults) {
		return <span>{DATA_UNAVAILABLE}</span>
	}

	return (
		<>
			{!!characterDetailId && <CharacterModal id={characterDetailId} onClose={closeModal} />}

			<ul className='grid'>
				{
					marvelResults.map((item: Character) =>
						<CharacterCard data={item} key={item.id} onClick={() => openModal(item.id)} />)
				}
			</ul>
		</>
	)
}
