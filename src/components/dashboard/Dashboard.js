import React, { Component } from "react";
import { connect } from "react-redux";

import { getProjects } from "../../store/actions";

import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getProjects();
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.projects
  };
};

const mapDispatchToProps = {
  getProjects: () => getProjects()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
