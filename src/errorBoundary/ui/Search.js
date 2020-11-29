import React, {
  useMemo,
  useRef,
  useState
} from 'react';

import _ from 'lodash';

import {
  AppError 
} from '../AppError';

import {
  ErrorHandler 
} from '../ErrorHandler';

// ...

const QueryFail = 'fail';

function SearchFallback() {
  return 'A search error occurred';
}

function SearchEngine({ query }) {
  if (!query) {
    return null;
  }

  if (query.toLowerCase() === QueryFail) {
    // TODO: Pass a boundaryId to AppError to have it propagate to the application top-level error boundary.
    throw new AppError('Search failed for query "' + query + '"', '');
  }

  return `Search: ${query}`;
}

export function Search() {
  const [query, setQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () => _.debounce(
      value => setQuery(value),
      400
    ),
    []
  );

  const inputRef = useRef();
    
  return (
    <div>
      <input 
        ref={inputRef}
        placeholder="Search"
        onChange={() => debouncedSetQuery(inputRef.current.value)}
      />

      <div style={{
        marginTop: 50
      }}>
        {/* TODO: Add an error boundary with a SearchFallback */}
        <SearchEngine query={query} />
      </div>
    </div>
  )
}