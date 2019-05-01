import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../../store/actions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { isAuth, authError } = this.props.auth;
    if (isAuth) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleOnSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>

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
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleOnChange} />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleOnChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
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
  signUp: data => signUp(data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
