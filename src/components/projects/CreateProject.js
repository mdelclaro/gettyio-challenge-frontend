import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createProject } from "../../store/actions";

class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };

  handleOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    await this.props.createProject({
      ...this.state,
      userId: this.props.auth.userId
    });
    this.props.history.push("/");
  };

  render() {
    const { projectError, auth } = this.props;
    if (!auth.isAuth) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleOnSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>

          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleOnChange} />
          </div>

          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleOnChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
            <div className="red-text center">
              {projectError && <p>{projectError}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    projectError: state.project.projectError
  };
};

const mapDispatchToProps = {
  createProject: project => createProject(project)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
