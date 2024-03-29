import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearFormErrors, createProject } from '../../actions/projectActions';
import Form from '../formElements/Form';
import extractStatePropertiesFromObject from '../helper/filterStateProperties';
import ProjectFormFields from './ProjectFormFields';

class AddProject extends Component {
  initialState = {
    projectName: '',
    projectIdentifier: '',
    description: '',
    start_date: '',
    end_date: '',
    errors: {},
  };

  state = this.initialState;

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  //   console.log(nextProps.errors);
  // }

  // solves componentWillReceiveProps deprication warning
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        ...state,
        errors: props.errors,
      };
    }

    return null;
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const newProject = extractStatePropertiesFromObject(this.state);

    // the first param is used as a string to construct the success message
    this.props.createProject('create', newProject, this.props.history);
  };

  onFormReset = () => {
    this.props.clearFormErrors();
    this.setState(this.initialState);
  };

  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-5 text-center">Create Project</h5>
              <hr />
              <Form
                onFormSubmit={this.onFormSubmit}
                onFormReset={this.onFormReset}
              >
                <ProjectFormFields
                  fieldData={this.state}
                  onInputChange={this.onInputChange}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  clearFormErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

// Maps state which exist in the redux store to this component's props
// which makes this component rerender itself
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject, clearFormErrors })(
  AddProject
);
