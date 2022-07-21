import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildCharacter } from '../../helpers/testUtils';
import { FILTER_BY_INPUT_PLACEHOLDER, FILTER_DATE_LABEL } from '../../i18n';
import { Character } from '../../models';
import { Layout } from '../Layout';

let mockIsSuccess = false;
let mockIsError = false;
let mockIsLoading = false;
let mockError = {
	message: ''
};
let mockResults: Character[] = []

jest.mock('../../hooks', () => {
	return {
		useGetCharacters: () => ({
			isSuccess: mockIsSuccess,
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
});


describe("Layout", () => {
	beforeEach(() => {
		mockIsError = false;
		mockIsLoading = false;
		mockIsSuccess = false;
		mockError = {
			message: ''
		};
		mockResults = []
	})


	it('should display loading spinner', () => {
		mockIsLoading = true;

		render(<Layout />)

		expect(screen.getByRole('status')).toBeInTheDocument()
	});

	it('should display error', () => {
		mockIsError = true;
		mockError = {
			message: faker.lorem.words()
		}

		render(<Layout />)

		expect(screen.getByText(mockError.message)).toBeInTheDocument();
	});

	const MOCK_NAME = 'mockTitle';

	it('should display grid with data', () => {
		mockIsSuccess = true;
		mockResults = [
			buildCharacter({ name: `${MOCK_NAME}-1` }),
			buildCharacter({ name: `${MOCK_NAME}-2` })
		]

		render(<Layout />)

		mockResults.forEach(item => {
			expect(screen.getByText(item.name)).toBeInTheDocument()
		})
	});


	it('Should filter data by name', async () => {
		const mockTitle = `${MOCK_NAME}-1`;

		mockIsSuccess = true;
		mockResults = [
			buildCharacter({ name: mockTitle }),
			buildCharacter()
		]

		render(<Layout />);

		const inputElement = screen.getByPlaceholderText(FILTER_BY_INPUT_PLACEHOLDER)

		userEvent.paste(inputElement, MOCK_NAME)

		const thumbnailButtons = await screen.findAllByRole('button', {
			name: FILTER_DATE_LABEL
		})

		expect(thumbnailButtons).toHaveLength(1)
	});
});