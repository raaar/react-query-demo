import { FC, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { GET_CHARACTERS_ID } from '../../request';
import { AxiosResponse } from 'axios';
import { Character } from '../../models';
import { useQueryClient } from "react-query";
import { formatFileUrl } from '../../helpers';
import { NO_DESCRIPTION_MESSAGE } from '../../i18n';

export const CLOSE_CHARACTER_MODAL_LABEL = 'Close character modal';

export type CharacterModalProps = {
	id: number | null;
	onClose: () => void;
}

const getDescription = (message: string) => {
	if (message.length <= 0) {
		return NO_DESCRIPTION_MESSAGE;
	}

	return message
}


export const CharacterModal: FC<CharacterModalProps> = (props) => {
	const { id, onClose } = props;
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();

	const data = queryClient.getQueryData<AxiosResponse<any>>([GET_CHARACTERS_ID]);
	const marvelResults: Character[] = data?.data.data.results

	useEffect(() => setIsOpen(true), [])

	const currentCharacter =
		marvelResults.find((item: Character) =>
			item.id === id)

	if (!currentCharacter) {
		return null
	}

	return (
		<Modal isOpen={isOpen} toggle={() => setIsOpen(false)} onClosed={onClose}>
			<ModalHeader toggle={() => setIsOpen(false)}
				closeAriaLabel={CLOSE_CHARACTER_MODAL_LABEL}
			>
				{currentCharacter.name}
			</ModalHeader>
			<ModalBody>
				<img className="w-100" src={formatFileUrl(currentCharacter.thumbnail)} alt={currentCharacter.name} />
				<p>{getDescription(currentCharacter.description)}</p>
			</ModalBody>
		</Modal>
	)
}