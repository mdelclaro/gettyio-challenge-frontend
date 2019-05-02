import React from "react";

const ProjectForm = props => {
  return (
    <form onSubmit={props.handleOnSubmit} className="white">
      <h5 className="grey-text text-darken-3">{props.pageTitle} project</h5>

      <div className="input-field">
        <label htmlFor="title" className={props.title ? "active" : ""}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={props.title}
          onChange={props.handleOnChange}
        />
      </div>

      <div className="input-field">
        <label htmlFor="content" className={props.content ? "active" : ""}>
          Project Content
        </label>
        <textarea
          id="content"
          className="materialize-textarea"
          value={props.content}
          onChange={props.handleOnChange}
        />
      </div>

      <div className="input-field">
        <button className="btn pink lighten-1 z-depth-0">
          {props.pageTitle}
        </button>
        <div className="red-text center">
          {props.error && <p>{props.error}</p>}
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
