import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getProjects } from "../../store/actions";

import ProjectList from "../projects/ProjectList";

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getProjects();
  }

  render() {
    const { projects, isAuth } = this.props;

    if (!isAuth) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        {/* <div className="row"> */}
        {/* <div className="col s12 m6"> */}
        <ProjectList projects={projects} />
        {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.projects,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = {
  getProjects: () => getProjects()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
