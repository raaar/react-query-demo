
import { render, screen } from '@testing-library/react';
import { FILTER_BY_INPUT_PLACEHOLDER, FILTER_DATE_LABEL } from '../../i18n';
import { SORT_FILTER } from '../../models';
import { Navigation, NavigationProps, SEARCH_DEBOUNCE } from './Navigation'
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

describe('Navigation', () => {
  let props: NavigationProps;

  beforeEach(() => {
    props = {
      sortByValue: SORT_FILTER.BY_TITLE,
      filterValue: '',
      onFilterChange: jest.fn(),
      onSortChange: jest.fn()
    }
  });

  jest.useFakeTimers();

  it('Should call onFilterChange on input filter change', async () => {
    const mockText = faker.lorem.word();

    render(<Navigation {...props} />)

    const inputElement = screen.getByPlaceholderText(FILTER_BY_INPUT_PLACEHOLDER)

    userEvent.paste(inputElement, mockText)

    jest.advanceTimersByTime(SEARCH_DEBOUNCE);

    expect(props.onFilterChange).toHaveBeenCalledWith(mockText)
  });

  it('Should call onSortChange on sort button click', () => {
    render(<Navigation {...props} />);

    userEvent.click(screen.getByRole('button', {
      name: FILTER_DATE_LABEL
    }))

    expect(props.onSortChange).toHaveBeenCalledWith(SORT_FILTER.BY_DATE);
  });
})