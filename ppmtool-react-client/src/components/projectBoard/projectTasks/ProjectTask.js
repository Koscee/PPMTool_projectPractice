import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProjectTask } from '../../../actions/backlogActions';
import taskPriority from './projectTaskPriority';

class ProjectTask extends Component {
  onProjectTaskDelete = (backlog_id, pt_id) => {
    this.props.deleteProjectTask(backlog_id, pt_id);
  };

  render() {
    const {
      projectIdentifier,
      projectSequence,
      summary,
      priority,
      acceptanceCriteria,
    } = this.props.projectTask;

    const { styleClass: priorityClass, text: priorityText } =
      taskPriority[`${priority}`];

    return (
      <div className="card mb-2 bg-white shadow-sm task-card">
        <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
          <h6 className="fw-normal text-secondary mb-0">
            ID: {projectSequence}
          </h6>
          <div
            data-bs-placement="top"
            data-bs-toggle="tooltip"
            title={priorityText + ' Priority'}
          >
            <i className={`bi bi-flag-fill ${priorityClass}`}></i>
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title fs-5">{summary}</h5>
          <p className="text-muted text-truncate h6">{acceptanceCriteria}</p>
          <div className="text-end">
            <Link
              to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`}
              className="d-inline-block"
              data-bs-placement="auto"
              data-bs-toggle="tooltip"
              title="View / Update"
            >
              <i className="bi bi-eye-fill fs-6 text-secondary"></i>
            </Link>
            <span
              className="ms-3 d-inline-block"
              data-bs-placement="auto"
              data-bs-toggle="tooltip"
              title="Delete"
              onClick={() =>
                this.onProjectTaskDelete(projectIdentifier, projectSequence)
              }
            >
              <i className="bi bi-trash fs-6 red"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTask);
