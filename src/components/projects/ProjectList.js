import React from "react";
import { Link } from "react-router-dom";

import ProjectSummary from "./ProjectSummary";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects.length > 0 ? (
        projects.map(project => {
          return (
            <Link to={`/project/${project._id}`} key={project._id}>
              <ProjectSummary project={project} />
            </Link>
          );
        })
      ) : (
        <div className="container">
          <p>No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
