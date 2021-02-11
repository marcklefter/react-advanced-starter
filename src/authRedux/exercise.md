# Exercise: authRedux
In this exercise you will implement the global authentication state using Redux (instead of React Context).

## Part 1 - Setup Redux

### Reducers
The Redux (initial) state in this part of the exercise has the following shape:

```
{
  auth: {
    user: null,
    loginError: false
  }
}
```

This state thus contains a single slice, which is handled by the matching `authReducer` in `reducers.js`. 

Implement the `authReducer` by handling the following action types:

*   auth/loginSuccess
*   auth/loginFailure
*   auth/logout

Think about what action payload may (or may not) be needed when handling these action types.

### Actions
Add action creators in `actions.js` for each of the aforementioned action types. Add any action payloads that may be needed by your implementation of `authReducer`.

### Store
In `App.jsx`: 

*   Get a store instance and pass the initial state as depicted above.

*   In the App component, wrap the rendering in the Provider component imported from `react-redux`.

Verify in the Redux Devtools that the Redux state has been properly initialized.

## Part 2 - Connect Components
At this point, we're ready to connect relevant components to Redux.

Remember to add the following import in files with components to connect:

```
import {
  connect
} from 'react-redux';
```

### components/RouteGuard
Pass the `auth.user` state to the RouteGuard component as a `user` prop.

### pages/Login
Connect the Login page component and pass state and action creators that match the component's props.

Then, dispatch the actions marked as _TODO_ in the `login` helper method. 

### components/Navigation
Pass the `auth.user` state as a `user` prop, as well as the `authLogout` action creator.

## Optional - Store Loaded Data in Redux
The list of users is currently being fetched and stored in the Users page component. As part of the application's requirements, we'd now like to store the loaded data in Redux, in order to make to it available to components other than the Users component.

Not only that, we'll also extract the data fetching logic _from_ the Users component and put it in a special so-called _async action creator_. 

Follow the sections below.

### Reducer
The Redux state will now have the following shape (also the initial state):

```
{
  auth: {
    user: null,
    loginError: false
  },
  users: {
    data: null,
    status: 'idle' // idle | loading | success
  }
}
```

As is evident from this state object, you must add an additional reducer to handle the `users` slice of the state.

Add a reducer named `usersReducer` in `reducers.js` and combine it with the existing `authReducer`.

The `usersReducer` must handle the following action types:

*   users/request // sets status to 'loading'
*   users/success // sets data to the fetched users array and status to 'success'

### Actions
Add action creators for the following action types (with any suitable payloads):

*   users/request
*   users/success

_Do not export_ these action creators however! Instead, they will be used in conjunction with an _async action creator_ we'll create for fetching users.

#### Async Action Creator
An _async action creator_ does not return an action object, rather it returns a function, also called a _thunk_. 

When we dispatch a thunk instead of a regular object, a special kind of Redux _middleware_ called `redux-thunk` will intercept and call it, which in our case triggers data fetching. It's the responsibility of the thunk to dispatch any _regular_ actions in order to update the Redux state appropriately.

An async action creator typically has the following signature:

```
export const usersFetch = () => {
  return async (dispatch, getState) => {
    // perform any async task, such as fetching data, and use the dispatch method to manually dispatch regular actions to the store. The getState method returns the entire current Redux state.

    // TODO: Fetch users data.
  }
}
```

Add the above async action creator to `actions.js` and implement it to support fetching users (use the existing fetching logic with `axios` in the Users component); remember to manually dispatch the `users/request` and `users/success` actions accordingly.

### Users Component
Remove all the existing data fetching code and 

*   Connect the Users component to Redux.

*   Pass the `users.data` state as a `users` prop, and the `users.status` state as a `status` prop, to Users.

*   Pass the `usersFetch` async action creator as a prop to Users.

*   Use the `status` prop to show a `Loading users...` message, if the status is `idle` or `loading`.

*   Add a useEffect that dispatches the `usersFetch` async action creator:

    ```
    useEffect(() => {
      usersFetch();
    }, [usersFetch])
    ```