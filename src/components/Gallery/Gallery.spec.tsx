import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildCharacter } from '../../helpers/testUtils';
import { Character } from '../../models';
import { CharacterModalProps } from '../CharacterModal/CharacterModal';
import { Gallery } from './Gallery';

let mockIsError = false;
let mockIsLoading = false;
let mockError = {
	message: ''
};
let mockResults: Character[] = []

jest.mock('../../hooks', () => {
	return {
		useGetCharacters: () => ({
			isLoading: mockIsLoading,
			isError: mockIsError,
			error: mockError,
			data: {
				data: {
					data: {
						results: mockResults
					}
				}
			}
		})
	}
})

const MODAL_MOCK_ID = 'MODAL_MOCK_ID';
jest.mock('../CharacterModal', () => {
	const modalMock = (props: CharacterModalProps) =>
		<button onClick={props.onClose}>{MODAL_MOCK_ID}</button>;

	return { CharacterModal: modalMock }
})

describe('Coverage', () => {
	beforeEach(() => {
		mockIsError = false;
		mockIsLoading = false;
		mockError = {
			message: ''
		};
		mockResults = []
	})

	it('should display loading spinner', () => {
		mockIsLoading = true;

		render(<Gallery />)

		expect(screen.getByRole('status')).toBeInTheDocument()
	});

	it('should display error', () => {
		mockIsError = true;
		mockError = {
			message: faker.lorem.words()
		}

		render(<Gallery />)

		expect(screen.getByText(mockError.message)).toBeInTheDocument();
	});

	const MOCK_NAME = 'mockTitle';

	it('should display grid with data', () => {
		mockResults = [
			buildCharacter({ name: `${MOCK_NAME}-1` }),
			buildCharacter({ name: `${MOCK_NAME}-2` })
		]

		render(<Gallery />)

		mockResults.forEach(item => {
			expect(screen.getByText(item.name)).toBeInTheDocument()
		})
	});

	it('should open modal with details', () => {
		mockResults = [buildCharacter(), buildCharacter()]

		render(<Gallery />)

		userEvent.click(screen.getByText(mockResults[0].name))

		expect(screen.getByText(MODAL_MOCK_ID)).toBeInTheDocument()
	});

	it('should close modal onClose', () => {
		mockResults = [buildCharacter(), buildCharacter()]

		render(<Gallery />)

		userEvent.click(screen.getByText(mockResults[0].name))
		userEvent.click(screen.getByText(MODAL_MOCK_ID))

		expect(screen.queryByText(MODAL_MOCK_ID)).not.toBeInTheDocument()
	})
})