import { FC, useCallback, useRef, useState, useEffect } from 'react';
import { Character, GetCharacterPrams, GetCharacterQueryParams, SORT_FILTER } from '../../models';
import { useGetCharacters } from '../../hooks';
import { Col, Row, Spinner } from 'reactstrap';
import { Message } from '../Message';
import { Navigation } from '../Navigation';
import { Gallery } from '../Gallery';

const MIN_NAME_QUERY_LENGTH = 1;
const makeQueryParams = ({ orderBy, nameStartsWith }: GetCharacterPrams): GetCharacterQueryParams => {
  return {
    orderBy,
    ...(nameStartsWith.length >= MIN_NAME_QUERY_LENGTH && { nameStartsWith }),
  }
}

export const Layout: FC = () => {
  const [nameStartsWith, setFilterByTitle] = useState('');
  const [orderBy, setOrderBy] = useState<SORT_FILTER>(SORT_FILTER.BY_TITLE);
  const queryParams = makeQueryParams({ orderBy, nameStartsWith })
  const endOfLayout = useRef<HTMLDivElement>(null)

  const {
    isSuccess,
    isLoading,
    isError,
    data, error,
    hasNextPage,
    isFetching,
    fetchNextPage
  } =
    useGetCharacters(queryParams);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries
    if (target.isIntersecting) {
      fetchNextPage()
    }
  }, [fetchNextPage]);

  useEffect(() => {
    const element = endOfLayout.current
    const option = { threshold: 0 }

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver])


  const pages = data?.pages || []
  const galleryData = pages.reduce<Character[]>((a, b) =>
    a.concat(b.data.data.results), []);

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
            filterValue={nameStartsWith}
            sortByValue={orderBy}
            onFilterChange={setFilterByTitle}
            onSortChange={setOrderBy}
          />

          {isSuccess && <Gallery data={galleryData} />}

          <div className='center-content' ref={endOfLayout}>
            {(isLoading || isFetching) && <Spinner role="status" />}
          </div>
        </Col>
      </Row>
    </div>
  )
}
