import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {Link} from "react-router-dom";

export class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
         <li className="nav-item font-bold text-3xl" style={{ display: 'inline-block', marginRight: '50px'  }}>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}!!` : ''}</strong>
        </span>
        </li>
        <li className="nav-item" style={{ display: 'inline-block' }}>
          <button className="btn btn-primary" onClick={this.props.logout} >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item font-bold text-2xl" style={{ display: 'inline-block', marginRight: '30px'  }}>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item font-bold text-2xl" style={{ display: 'inline-block' }}>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className='container'>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <a className="navbar-brand py-4 text-5xl font-bold" href="#"style={{ textAlign: 'right' }}>Modern Pharmacy</a>
            
          </div>
          {isAuthenticated ? authLinks : guestLinks}
          </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header);
