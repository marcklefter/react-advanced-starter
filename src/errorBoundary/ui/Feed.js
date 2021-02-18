import {
  AppError
} from '../AppError';

import {
  ErrorBoundary
} from '../ErrorBoundary';

import {
  useError
} from '../errorContext';

import {
  FeedItem 
} from './FeedItem';

// ...

const items = [
  {
    title: 'first item',
    image: 'http://via.placeholder.com/350x150'
  },
  {
    title: 'second item',
    image: 'http://via.placeholder.com/350x150'
  },
  {
    // by commenting out the title property, an error will occur in the FeedItem component that receives it.
    title: 'third item',
    image: 'http://via.placeholder.com/350x150'
  }
];

// ...

function FeedItemFallback() {
  return (
    <FeedItem
      title="Oops, an error occurred!"
      image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
    />
  )
}

export function Feed() {
  const onRefresh = () => {
    // TODO: trace() this (simulated) error.
    throw new AppError('Could not refresh feed');
  }

  return (
    <>
      <button onClick={onRefresh}>Refresh</button>
      {/* TODO: Ensure that if a specific feed item fails, the others will still be shown. Use the FeedItemFallback above. */}
      {items.map((item, i) => (
        <FeedItem key={i} {...item} />
      ))}
    </>
  )
}