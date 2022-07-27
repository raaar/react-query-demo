import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildCharacter } from '../../helpers/testUtils';
import { NO_DESCRIPTION_MESSAGE } from '../../i18n';
import { Character } from '../../models';
import { CharacterModal, CharacterModalProps, CLOSE_CHARACTER_MODAL_LABEL } from './CharacterModal';


describe('CharacterModal', () => {
  let props: CharacterModalProps;
  let mockData: Character;

  beforeEach(() => {
    const id = faker.datatype.number()
    mockData = buildCharacter({ id });
    props = {
      onClose: jest.fn(),
      data: mockData
    }
  })


  it('should render detail modal title', () => {
    render(<CharacterModal {...props} />)

    expect(screen.getByRole('heading', {
      level: 5,
      name: mockData.name
    })).toBeInTheDocument()
  })

  it('should call onClose on close button click', async () => {
    render(<CharacterModal {...props} />)

    const modalCloseButton = screen.getByLabelText(CLOSE_CHARACTER_MODAL_LABEL)

    userEvent.click(modalCloseButton)

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1)
    });
  })

  it('should display fallback description', () => {
    const description = ''
    const data = buildCharacter({ description })
    props = {
      data,
      onClose: jest.fn(),
    }

    render(<CharacterModal {...props} />)

    expect(screen.getByText(NO_DESCRIPTION_MESSAGE)).toBeInTheDocument()
  })
})