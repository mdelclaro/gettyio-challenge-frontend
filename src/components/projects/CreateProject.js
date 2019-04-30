import React, { Component } from "react";
import { connect } from "react-redux";

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

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.createProject({ ...this.state, userId: this.props.userId });
  };

  render() {
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
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

const mapDispatchToProps = {
  createProject: project => createProject(project)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
