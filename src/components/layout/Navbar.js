import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignOutLinks";

const Navbar = ({ auth }) => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Projects
        </Link>
        {auth.isAuth ? <SignedInLinks /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Navbar);
