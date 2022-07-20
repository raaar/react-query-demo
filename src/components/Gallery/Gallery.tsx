import { useState } from 'react';
import { Character } from '../../models';
import { CharacterCard } from '../CharacterCard';
import { CharacterModal } from '../CharacterModal';
import { useGetCharacters } from '../../hooks';
import { DATA_UNAVAILABLE } from '../../i18n';
import { Spinner } from 'reactstrap';
import { Message } from '../Message';


export const Gallery = () => {
	const { isSuccess, isLoading, isError, data, error } = useGetCharacters();
	const marvelResults: Character[] | undefined = data?.data.data.results

	const [characterDetailId, setCharacterDetailId] = useState<number | null>(null);

	const openModal = (id: number) => {
		setCharacterDetailId(id)
	}

	const closeModal = () => {
		setCharacterDetailId(null)
	}

	if (isLoading) {
		return (
			<div className='center-content'>
				<Spinner role="status" />
			</div>
		)
	}

	if (isError) {
		return (
			<Message text={error.message} />
		)
	}

	if (!marvelResults) {
		return (
			<Message text={DATA_UNAVAILABLE} />
		)
	}

	return (
		<>
			{!!characterDetailId && <CharacterModal id={characterDetailId} onClose={closeModal} />}

			<ul className='grid'>
				{
					isSuccess && marvelResults.map((item: Character) =>
						<CharacterCard data={item} key={item.id} onClick={() => openModal(item.id)} />)
				}
			</ul>
		</>
	)
}
