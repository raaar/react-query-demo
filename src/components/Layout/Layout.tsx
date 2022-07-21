import { FC, useState, } from 'react';
import { Character, SORT_FILTER } from '../../models';
import { useGetCharacters } from '../../hooks';
import { Col, Row, Spinner } from 'reactstrap';
import { Message } from '../Message';
import { Navigation } from '../Navigation';
import { Gallery } from '../Gallery';

export const Layout: FC = () => {
  const { isSuccess, isLoading, isError, data, error } = useGetCharacters();
  const marvelResults: Character[] = data?.data.data.results || [];
  const [filterValue, setFilterByTitle] = useState('');
  const [sortBy, setSortBy] = useState<SORT_FILTER>(SORT_FILTER.BY_TITLE)

  const filterItemsByTerm = (item: Character) => {
    if (!filterValue) return true

    return item.name.toLowerCase().includes(filterValue.toLowerCase());
  }

  const sortItemsByValue = (a: Character, b: Character) => {
    if (sortBy === SORT_FILTER.BY_TITLE) {
      return a.name > b.name ? 1 : -1
    }

    return a.modified > b.modified ? 1 : -1
  }

  const filteredResults = marvelResults?.filter(filterItemsByTerm).sort(sortItemsByValue)

  if (isLoading) {
    return (
      <div className='center-content'>
        <Spinner role="status" />
      </div>
    )
  }

  if (isError) {
    return (
      <Message text={error.message} />
    )
  }

  return (
    <div className="container">
      <Row>
        <Col>
          <Navigation
            filterValue={filterValue}
            sortByValue={sortBy}
            onFilterChange={setFilterByTitle}
            onSortChange={setSortBy}
          />

          {isSuccess && <Gallery data={filteredResults} />}
        </Col>
      </Row>
    </div>
  )
}
