import {
  connect
} from 'react-redux';

import {
  update,
  setIncBy
} from './actions';

// ...

function Counter({ value, incBy, update }) {
  const handleChange = e => {
    // TODO: Dispatch action to set incBy state.
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
    update
  }
)(Counter);

export { Counter };