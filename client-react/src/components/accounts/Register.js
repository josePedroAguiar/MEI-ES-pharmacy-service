import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {

    state ={
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
      };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
          this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          const newUser = {
            username,
            password,
            email,
          };
          this.props.register(newUser);
        }
      };

      onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {

    if (this.props.isAuthenticated) {
        return <Redirect to="/login" />;
      }

    const { username, email, password, password2 } = this.state;

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Modern Pharmacy Service!</h1>
                <p className="py-6 text-4xl font-bold">Register</p>
            </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl  bg-base-100">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-control py-2">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-control py-2">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-control py-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-control py-2">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-control py-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps, { register, createMessage })(Register);
