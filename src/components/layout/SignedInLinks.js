import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions";

const SignedInLinks = props => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New project</NavLink>
      </li>
      <li>
        <a href="/" onClick={props.logout}>
          Log Out
        </a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          M
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = {
  logout: () => logout()
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
