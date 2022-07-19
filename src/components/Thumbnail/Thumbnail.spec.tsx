import { render, screen } from '@testing-library/react';
import { Thumbnail } from './Thumbnail';
import { faker } from '@faker-js/faker';

describe('Thumbnail', () => {
	it('renders image src', () => {
		const alt = faker.lorem.sentence()
		const src = faker.internet.url();

		render(<Thumbnail src={src} alt={alt} />)

		const image = screen.getByAltText(alt);

		expect(image).toHaveAttribute('src', src)
	})
})