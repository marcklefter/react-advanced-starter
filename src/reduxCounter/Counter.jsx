import {
  connect
} from 'react-redux';

import {
  update
} from './actions';

// ...

function Counter({ value, incBy, update }) {
  const handleChange = e => {
    // TODO: Dispatch action for setting incBy state.
  };

  return (
    <>
      <input
        type="number"
        onChange={handleChange}
        value={incBy}
      />
      <button onClick={update}>Update</button>
      <p>Value is {value}</p>
    </>
  );
}

// connect Counter to Redux.
export default connect(
  // mapStateToProps
  state => ({
    value: state.counter.value,
    incBy: state.counter.incBy
  }),
  // mapDispatchToProps
  {
    update,

    // TODO: Include action creator for setting incBy state.
  }
)(Counter);

export { Counter };