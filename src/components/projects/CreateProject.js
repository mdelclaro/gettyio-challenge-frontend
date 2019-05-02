import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
        <ProjectForm
          pageTitle="Create"
          error={projectError}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
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
