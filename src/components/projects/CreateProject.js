import React, { Component } from "react";
import { connect } from "react-redux";

import { createProject } from "../../store/actions";

import ProjectForm from "./ProjectForm";

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
        <ProjectForm
          pageTitle="Create"
          error={this.props.projectsError}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    projectsError: state.project.projectsError
  };
};

const mapDispatchToProps = {
  createProject: project => createProject(project)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
