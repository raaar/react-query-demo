import { FC, ReactNode } from 'react';
import { formatFileUrl } from '../../helpers';
import { Character } from '../../models';
import { Thumbnail } from '../Thumbnail';

export type CharacterCardProps = {
	children?: ReactNode;
	data: Character
	onClick: (id: number) => void
}

export const THUMBNAIL_BUTTON_TEST_ID = 'THUMBNAIL_BUTTON_TEST_ID';
export const TITLE_BUTTON_TEST_ID = 'TITLE_BUTTON_TEST_ID';

export const CharacterCard: FC<CharacterCardProps> = ({ data, onClick }) => {
	const src = formatFileUrl(data.thumbnail)

	const handleOpenModal = () => onClick(data.id);
	const itemDate = new Date(data.modified).toLocaleDateString('en-US');

	return (
		<li className='character-card'>
			<button className="btn-no-style" onClick={handleOpenModal} data-testid={THUMBNAIL_BUTTON_TEST_ID}>
				<Thumbnail src={src} alt={data.name} />
			</button>

			<button onClick={handleOpenModal} data-testid={TITLE_BUTTON_TEST_ID} className="character-card__title">
				{data.name}
				<div className="character-card__subtitle">{itemDate}</div>
			</button>

		</li>
	)
}
