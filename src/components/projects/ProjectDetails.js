import React, { Component } from "react";
import { connect } from "react-redux";

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
    return (
      project && (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">
                {project.title} - {id}
              </span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by Someone</div>
              <div>2nd September, 2am</div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapDispathToProps = {
  getProject: id => getProject(id)
};

export default connect(
  null,
  mapDispathToProps
)(ProjectDetails);
