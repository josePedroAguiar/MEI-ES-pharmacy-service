import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { getMeds , deleteMeds } from '../../actions/medicamentos';

export class Medicamentos extends Component {
  
    static propTypes = {
        medicamentos: PropTypes.array.isRequired,
        getMeds: PropTypes.func.isRequired,
        deleteMeds: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getMeds();
    }


  render() {
    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4">
        <h2 className="py-3 text-3xl font-bold">Medicamentos</h2>
        
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody >
            {this.props.medicamentos.map(medicamento => (
              <tr key={medicamento.id}>
                <td>{medicamento.id}</td>
                <td>{medicamento.name}</td>
                <td>{medicamento.manufacturer}</td>
                <td>{medicamento.price}</td>
                <td>{medicamento.selectedAmount}</td>
                <td><button className="btn btn-outline btn-error" onClick={this.props.deleteMeds.bind(this, medicamento.id)} >
                  Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Fragment>
       
    )
  }
} 

const mapStateToProps = state => ({
    medicamentos: state.medicamentos.medicamentos
});

export default connect(mapStateToProps, {getMeds, deleteMeds}) (Medicamentos);
