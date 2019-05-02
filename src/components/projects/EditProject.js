import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProject, getProject } from "../../store/actions";

import ProjectForm from "./ProjectForm";

class EditProject extends Component {
  state = {
    title: "",
    content: ""
  };

  async componentDidMount() {
    const { getProject, match } = this.props;
    const project = await getProject(match.params.id);
    await this.setState({ title: project.title, content: project.content });
  }

  handleOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    const exec = await this.props.updateProject({
      ...this.state,
      userId: this.props.userId,
      projectId: this.props.match.params.id
    });
    if (exec) this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <ProjectForm
          pageTitle="Edit"
          error={this.props.projectsError}
          title={this.state.title}
          content={this.state.content}
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
  updateProject: project => updateProject(project),
  getProject: id => getProject(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProject);
