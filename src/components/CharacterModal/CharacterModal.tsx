import { FC, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Character } from '../../models';
import { formatFileUrl } from '../../helpers';
import { NO_DESCRIPTION_MESSAGE } from '../../i18n';

export const CLOSE_CHARACTER_MODAL_LABEL = 'Close character modal';

export type CharacterModalProps = {
  data: Character;
  onClose: () => void;
}

const getDescription = (message: string) => {
  if (message.length <= 0) {
    return NO_DESCRIPTION_MESSAGE;
  }

  return message
}


export const CharacterModal: FC<CharacterModalProps> = ({ data, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), [])

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} onClosed={onClose}>
      <ModalHeader toggle={() => setIsOpen(false)}
        closeAriaLabel={CLOSE_CHARACTER_MODAL_LABEL}
      >
        {data.name}
      </ModalHeader>
      <ModalBody>
        <img className="w-100" src={formatFileUrl(data.thumbnail)} alt={data.name} />
        <p>{getDescription(data.description)}</p>
      </ModalBody>
    </Modal>
  )
}