import {
  Fragment as F
} from 'react';

import {
  Link
} from 'react-router-dom';

let Navigation = ({ user, authLogout, links, style }) => {
  return (
    <nav style={style}>
      {links.map(({ href, name }, i) => (
        <F key={i}>
          <Link to={href}>{name}</Link>
          {(i !== links.length - 1) && ' '}
        </F>
      ))}
      {user && (
        <button
          onClick={authLogout}
          style={{
            marginLeft: 20
          }}
        >
          Logout
        </button>
      )}
    </nav>
  )
}

export { Navigation }