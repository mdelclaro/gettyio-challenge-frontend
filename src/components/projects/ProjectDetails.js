import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Redirect } from "react-router-dom";

import { getProject } from "../../store/actions";

class ProjectDetails extends Component {
  state = {
    project: null
  };

  async componentDidMount() {
    const { getProject, match } = this.props;
    const project = await getProject(match.params.id);
    this.setState({ project });
  }

  render() {
    const id = this.props.match.params.id;
    const { project } = this.state;
    const { isAuth } = this.props;
    if (!isAuth) return <Redirect to="/signin" />;
    return project ? (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">
              {project.title} - {id}
            </span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {project.createdBy.firstName}{" "}
              {project.createdBy.lastName}
            </div>
            <div>
              {moment(project.createdAt).format("dddd, MMMM Do YYYY. h:mm a")}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

const mapDispathToProps = {
  getProject: id => getProject(id)
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ProjectDetails);
