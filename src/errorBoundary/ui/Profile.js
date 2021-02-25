import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  AppError
} from '../AppError';

import {
  useError
} from '../errorContext';

export function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      // TODO:
      //
      // capture() error that may occur during profile fetching; simulate this by testing with a faulty URL.
      const result = await axios('https://randomuser.me/api/');

      setProfile(result.data.results[0]);
    }

    fetchProfile();
  }, []);

  const onEditDetails = () => {
    // TODO: 
    //
    // trace() this (simulated) error.
    throw new AppError('Could not edit user details');
  };

  // ...

  if (!profile) {
    return null;
  }

  const {
    name,
    picture
  } = profile;

  return (
    <>
      <p>{name.first} {name.last}</p>
      <div style={{ marginBottom: 50 }}>
        <img src={picture.large} alt="" />
      </div>
      <button onClick={onEditDetails}>Edit Details</button>
    </>
  )
}