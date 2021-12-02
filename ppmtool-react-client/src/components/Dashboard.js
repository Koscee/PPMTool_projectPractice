import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "../actions/projectActions";
import CreateProjectButton from "./project/CreateProjectButton";
import ProjectItem from "./project/ProjectItem";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  renderProjectItems(projectList) {
    if (projectList.length > 0) {
      return projectList.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ));
    } else {
      return (
        <h6 className="text-center text-secondary">No project in your list!</h6>
      );
    }
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {this.renderProjectItems(projects)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
