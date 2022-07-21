import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildCharacter } from '../../helpers/testUtils';
import { DATA_UNAVAILABLE } from '../../i18n';
import { Character } from '../../models';
import { CharacterModalProps } from '../CharacterModal/CharacterModal';
import { Gallery } from '../Gallery';

// let mockIsSuccess = false;
// let mockIsError = false;
// let mockIsLoading = false;
// let mockError = {
// 	message: ''
// };
// let mockResults: Character[] = []

// jest.mock('../../hooks', () => {
// 	return {
// 		useGetCharacters: () => ({
// 			isSuccess: mockIsSuccess,
// 			isLoading: mockIsLoading,
// 			isError: mockIsError,
// 			error: mockError,
// 			data: {
// 				data: {
// 					data: {
// 						results: mockResults
// 					}
// 				}
// 			}
// 		})
// 	}
// })

const MODAL_MOCK_ID = 'MODAL_MOCK_ID';
jest.mock('../CharacterModal', () => {
	const modalMock = (props: CharacterModalProps) =>
		<button onClick={props.onClose}>{MODAL_MOCK_ID}</button>;

	return { CharacterModal: modalMock }
})

describe('Gallery', () => {
	let data: Character[];
	beforeEach(() => {
		data = [buildCharacter()];
	})

	it('should display no data message', () => {
		render(<Gallery data={[]} />)

		expect(screen.getByText(DATA_UNAVAILABLE)).toBeInTheDocument()
	})

	it('should open modal with details', () => {
		render(<Gallery data={data} />)

		userEvent.click(screen.getByText(data[0].name))

		expect(screen.getByText(MODAL_MOCK_ID)).toBeInTheDocument()
	});

	it('should close modal onClose', () => {
		render(<Gallery data={data} />)

		userEvent.click(screen.getByText(data[0].name))
		userEvent.click(screen.getByText(MODAL_MOCK_ID))

		expect(screen.queryByText(MODAL_MOCK_ID)).not.toBeInTheDocument()
	});
})