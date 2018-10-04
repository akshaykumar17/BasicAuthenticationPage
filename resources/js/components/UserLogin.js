// UserLogin.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './navbar';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            err:false
        };

    }
    forgotPass(e) {
        e.preventDefault();
        this.props.history.push('/password/email');
    }
    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        axios.post('http://localhost:8000/login/userAuth', {
            email,
            password
        }).then(response => {
            console.log(response.data);
            if (response.data !== ['Wrong Credentials!!']) {
                this.setState({ err: false });
                sessionStorage.setItem('userData', response);
                axios.get('http://localhost:8000/password/email').then(res => {
                    this.props.history.push({
                        pathname: '/userhome',
                        search: `?username=${response.data}`,
                        state: { user: response.data }
                    });
                });
            }
            else
                this.state({ err: true });
        })
            .catch(error => {
                this.state({ err: true });
                console.log(error.response);
            });
    }
    render() {
        let err = this.state.err;
        let msg = !err ? ((this.props.location.state !== undefined) ? 'Registered Successfully,' : '') + ' Provide Credentials to Login ' : 'Oops! , Wrong Credentials!!';
        let name = !err ? 'alert alert-success' : 'alert alert-danger';
        return (
            <div>
                <Nav userProfile={this.state.email} />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header" >Login</div>
                                {err !== undefined && <div className={name} role="alert">{msg}</div>}
                                <div className="card-body">
                                    <form method="POST" onSubmit={this.onSubmit.bind(this)}>


                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control{(err) ? ' is-invalid' : '' }}" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required autoFocus />

                                                {(err) ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>{}</strong>
                                                    </span>
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control{(err) ? ' is-invalid' : '' }" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />


                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{}</strong>
                                                </span>

                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-6 offset-md-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                                    <label className="form-check-label" >
                                                        Remember Me
                                                        </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-8 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                    </button>

                                                <a className="btn btn-link" href="#" onClick={this.forgotPass.bind(this)}>
                                                    Forgot Your Password?
                                                    </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>

        );
    }
}
export default UserLogin;
