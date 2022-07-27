import { FC, SetStateAction, useEffect, useState } from 'react';
import { FILTER_BY_INPUT_PLACEHOLDER, FILTER_DATE_LABEL, FILTER_TITLE_LABEL } from '../../i18n';
import { Button, ButtonGroup, Input, Label, Navbar } from 'reactstrap';
import { SORT_FILTER } from '../../models';

export const FILTER_BY_TITLE_ID = 'filter-by-title-id';
export const FILTER_BY_DATE_ID = 'filter-by-date-id'
export const SEARCH_DEBOUNCE = 1000;

export type NavigationProps = {
  sortByValue: SORT_FILTER;
  filterValue: string;
  onFilterChange: (filterValue: string) => void;
  onSortChange: (sortFilter: SORT_FILTER) => void;
}

export const Navigation: FC<NavigationProps> = ({ sortByValue, filterValue, onFilterChange, onSortChange }) => {
  const isSortByTitle = sortByValue === SORT_FILTER.BY_TITLE;
  const isSortByDate = sortByValue === SORT_FILTER.BY_DATE;
  const [name, setName] = useState(filterValue);

  const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setName(e.target.value);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange(name);
    }, SEARCH_DEBOUNCE);

    return () => clearTimeout(delayDebounceFn)
  }, [name, onFilterChange])

  return (
    <Navbar className='mb-2 d-flex navbar navbar-light bg-light justify-content-start'>
      <div className='form-inline mr-4'>
        <Input
          aria-label={FILTER_BY_INPUT_PLACEHOLDER}
          placeholder={FILTER_BY_INPUT_PLACEHOLDER}
          onChange={handleFilterChange}
          value={name}
        />
      </div>
      <div className='form-inline'>
        <Label className='mr-3'>Sort by:</Label>
        <ButtonGroup>
          <Button
            onClick={() => onSortChange(SORT_FILTER.BY_TITLE)}
            name={FILTER_BY_TITLE_ID}
            active={isSortByTitle}>
            {FILTER_TITLE_LABEL}
          </Button>
          <Button
            onClick={() => onSortChange(SORT_FILTER.BY_DATE)}
            name={FILTER_BY_DATE_ID}
            active={isSortByDate}>
            {FILTER_DATE_LABEL}
          </Button>
        </ButtonGroup>
      </div>
    </Navbar>
  )
}