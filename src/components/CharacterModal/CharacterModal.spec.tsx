import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildCharacter } from '../../helpers/testUtils';
import { NO_DESCRIPTION_MESSAGE } from '../../i18n';
import { Character } from '../../models';
import { CharacterModal, CharacterModalProps, CLOSE_CHARACTER_MODAL_LABEL } from './CharacterModal';

let mockCachedData: Character[] = []

jest.mock('react-query', () => {
  return {
    ...jest.requireActual('react-query'),
    useQueryClient: () => {
      return {
        getQueryData: () => ({
          data: {
            data: {
              results: mockCachedData
            }
          }
        })
      }
    }
  }
});

describe('CharacterModal', () => {
  let props: CharacterModalProps;

  beforeEach(() => {
    const id = faker.datatype.number()
    mockCachedData = [buildCharacter({ id })]
    props = {
      id,
      onClose: jest.fn()
    }
  })

  it('should not render if id is null', () => {
    props = {
      id: null,
      onClose: jest.fn()
    }
    render(<CharacterModal {...props} />)

    expect(screen.queryByRole('heading', {
      level: 5,
    })).not.toBeInTheDocument()
  })

  it('should render detail modal title', () => {
    render(<CharacterModal {...props} />)

    expect(screen.getByRole('heading', {
      level: 5,
      name: mockCachedData[0].name
    })).toBeInTheDocument()
  })

  it('should call onClose on close button click', async () => {
    const id = faker.datatype.number()
    mockCachedData = [buildCharacter({ id })]
    props = {
      id,
      onClose: jest.fn()
    }

    render(<CharacterModal {...props} />)

    const modalCloseButton = screen.getByLabelText(CLOSE_CHARACTER_MODAL_LABEL)

    userEvent.click(modalCloseButton)

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1)
    });
  })

  it('should display fallback description', () => {
    const id = faker.datatype.number()
    const description = ''
    mockCachedData = [buildCharacter({ id, description })]
    props = {
      id,
      onClose: jest.fn()
    }

    render(<CharacterModal {...props} />)

    expect(screen.getByText(NO_DESCRIPTION_MESSAGE)).toBeInTheDocument()
  })
})