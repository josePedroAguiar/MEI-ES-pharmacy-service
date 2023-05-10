import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeds } from '../../actions/medicamentos';
import PropTypes from 'prop-types';

export class Form extends Component {
    state = {
        name: '',
        type: ''
    }

static propTypes = {
    addMeds: PropTypes.func.isRequired
}

onChange = (e) => this.setState({ [e.target.name]: e.target.value });

onSubmit = (e) =>{
    e.preventDefault();
    const { name, type} = this.state;
    const medicamento = {name,type};
    this.props.addMeds(medicamento);
    this.setState({
      name: "",
      type: ""
    });
}

  render() {
    const { name, type} = this.state;
    return (
        <div className="card card-body mt-4 mb-4">
        <h2 className="py-3 text-3xl font-bold">Add Medicamentos</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-control py-2">
            <label>Name</label>
            <input
              
              type="text"
              className="input input-bordered"
              placeholder="Name"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-control py-1">
            <label>Type</label>
            <input
              className="input input-bordered"
              placeholder="Type"
              type="integer"
              name="type"
              onChange={this.onChange}
              value={type}
            />
          </div>
          <div className="form-group py-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { addMeds })(Form);