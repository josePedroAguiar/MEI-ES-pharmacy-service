import React, { Component } from 'react'
import {Redirect, Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export class Login extends Component {

    state ={
        username: '',
        password: '',
        
    }

    static propTypes ={
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
      };

      onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {

    if(this.props.isAuthenticated){
        return <Redirect to="/" />;
    }
    
    const { username, password } = this.state;

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Modern Pharmacy Service!</h1>
                <p className="py-6 text-4xl font-bold">Login</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                 <form onSubmit={this.onSubmit}>
                    <div className="form-control">
                        <label className="label">
                           Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            
                            
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            
                            
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary">
                            <div style={{ fontSize: "16px" }}>
                                Login
                            </div>
                        </button>
                    </div>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login}) (Login);
