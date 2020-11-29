import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';

import axios from 'axios';

// ...

export function fetchUser(id, delayMs = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          resolve((await axios(`http://jsonplaceholder.typicode.com/users/${id}`)).data);
        } catch (error) {
          reject(error);
        }
      },
      delayMs
    );
  });
}

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

function useFetch(fetcher, options) {
  const [fetchState, setFetchState] = useState({
    loading: false,
    data: null,
    error: null
  });

  const setState = partialState => {
    setFetchState(prevState => ({
      ...prevState,
      ...partialState
    }));
  };

  // TODO:
  // 
  // Uncomment the code below when you're ready to test your passed in fetcher and options parameters.
  // 
  // useEffect(() => {
  //   setState({
  //     loading: true,
  //     data: null
  //   });

  //   fetcher()
  //     .then(result => setState({
  //       loading: false,
  //       data: result
  //     }))
  //     .catch(error => setState({
  //       loading: false,
  //       error
  //     }));
  // }, [fetcher, options]);

  return fetchState;
}

// ...

function Input({ setUser }) {
  const [userId, setUserId] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();

    setUser(userId);
  };

  const handleChange = e => {
    setUserId(+e.target.value);
  };

  return (
    <div style={inputStyle}>
      <form onSubmit={handleSubmit}>
        <input
          value={userId}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export function App() {
  const [user, setUser] = useState(1);

  const {
    loading,
    data,
    error
  } = useFetch(
    // TODO:
    //
    // Pass a fetcher function that is bound to the user.
    // Pass an options object.
    //
    // Use the useCallback and useMemo hooks to ensure that the custom useFetch hook doesn't enter an infinite loop!
  );

  return (
    <>
      <Input setUser={setUser} />
      <div style={baseStyle}>
        {loading && 'Loading...'}
        {error && `${error}`}
        {data && (
          <p>Name: {data.name}</p>
        )}
      </div>
    </>
  )
}