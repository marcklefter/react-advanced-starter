# Exercise: Error boundaries

In this exercise you will utilize React's error handling mechanism - __error boundaries__ - to improve the _fault tolerance_ of an example application.

> See the [introduction to error boundaries](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries) chapter in the React documentation.

## ErrorBoundary component

The _ErrorBoundary_ class component implements an error boundary with the following features:

* It accepts a _Fallback_ prop, a component to be used in rendering a fallback UI when an error occurs.

* It renders its child component tree in a React Context (via the `ErrorProvider` component in `errorContext.js`), through which error handling methods are provided to components to handle errors that arise _outside_ the render.

  > Error boundaries by default do not catch errors in e.g. event handlers or asynchronous code (such as useEffect).

  E.g., if a component needs to catch and handle an error in an event handler:

  ```javascript
  // use the custom useError hook (from errorContext.js) to access error handling methods from the parent ErrorBoundary component, provided via a React Context.
  const {
    capture
  } = useError()

  const handleClick = async () => {
    // perform an asynchronous operation in an event handler, and catch errors if they occur.
    try {
      await doAsyncOp();
    } catch (error) {
      // handle the error using the (centralized) error handling logic available in the ErrorBoundary component.
      capture(error);
    }
  }
  ```

## Part 1: Application errors

Implement the sections marked with _TODO_ in the following files:

* `Profile.js`

* `Feed.js`

* `Search.js`

  (searching with the phrase "fail" results in an error; the error boundary resets itself immediately when entering new text)

Next, complete the _TODO_ sections in `App.js` and `ErrorBoundary.js` to allow the user to retry rendering the component tree (such as when profile data cannot be fetched).

## Part 2: Code splitting (optional)

Components can be loaded on-demand; e.g., if the user never clicks the Search tab, the code for the Search component does not have to be requested initially. _Code splitting_ allows for granular control of what is to be loaded eagerly vs lazily.

Read the section about [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) in the React documentation.

In `Content.js`, add code splitting using _React.Suspense_ for the Search component, with the _ErrorBoundary_ component for handling errors.

Open Chrome Devtools and verify that a separate bundle is loaded when clicking the Search tab; also simulate a component loading error to ensure that it's caught by your error boundary.
