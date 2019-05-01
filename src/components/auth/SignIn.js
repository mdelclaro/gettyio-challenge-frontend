import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../store/actions";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { isAuth, authError } = this.props.auth;
    if (isAuth) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleOnSubmit} className="white" noValidate>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleOnChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">
              {authError && <p>{authError}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  signIn: (email, password) => signIn(email, password)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
