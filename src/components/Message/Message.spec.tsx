import { render, screen } from '@testing-library/react';
import { Message } from './Message';
import { faker } from '@faker-js/faker';

describe('Thumbnail', () => {
	it('renders image src', () => {
		const text = faker.lorem.sentence()

		render(<Message text={text} />)

		expect(screen.getByText(text)).toBeInTheDocument()
	})
})