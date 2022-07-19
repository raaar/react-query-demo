import { render, screen } from '@testing-library/react';
import {
	CharacterCard,
	CharacterCardProps,
	THUMBNAIL_BUTTON_TEST_ID,
	TITLE_BUTTON_TEST_ID
} from './CharacterCard';
import { buildCharacter } from '../../helpers/testUtils';
import userEvent from '@testing-library/user-event';

export { }

describe('CharacterCard', () => {
	let props: CharacterCardProps;

	beforeEach(() => {
		props = {
			data: buildCharacter(),
			onClick: jest.fn()
		}
	})

	it.each([TITLE_BUTTON_TEST_ID, THUMBNAIL_BUTTON_TEST_ID])
		('should toggle modal %s', (testId) => {
			render(<CharacterCard {...props} />)

			const titleButton = screen.getByTestId(TITLE_BUTTON_TEST_ID)

			userEvent.click(titleButton)

			expect(props.onClick).toHaveBeenCalledWith(props.data.id);
		})
})