import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './navbar';
import axios from 'axios';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            emailDup: false
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { name, email, password, password_confirmation } = this.state;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        axios.post('http://localhost:8000/register/users', {
            name,
            email,
            password
        })
            .then(response => {
                this.setState({ err: false, emailDup: false });
                this.props.history.push({
                    pathname: '/login',
                    state: { message: Registered }
                });
            })
            .catch(error => {
                this.refs.name.value = "";
                this.refs.password.value = "";
                this.refs.email.value = "";
                this.refs.confirm.value = "";
                this.setState({ err: true });
                if (error.response.data.message.includes('Integrity constraint violation: 1062 Duplicate entry')) {
                    this.setState({ emailDup: true });
                }

            });
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        let err = this.state.err;
        let msg = (!err) ? 'Registered Successfully' : 'Oops! , Something went wrong.';
        msg = (!this.state.emailDup && !err) ? `${msg}` : `Oops!, Email Duplicate entry User already exists.`;
        let name = (!err) ? 'alert alert-success' : 'alert alert-danger';

        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Register</div>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {err !== undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>
                                    <form className="form-horizontal" role="form" method="POST" action="/users" onSubmit={this.onSubmit.bind(this)}>
                                        @csrf
                                        <div className="form-group">
                                            <label name="name" className="col-md-4 control-label">Name</label>

                                            <div className="col-md-6">
                                                <input id="name" type="text" className="form-control" ref="name" name="name" onChange={this.onChange.bind(this)} required autoFocus />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label name="email" className="col-md-4 control-label">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" ref="email" name="email" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label name="password" className="col-md-4 control-label">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control" ref="password" name="password" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label name="password-confirm" className="col-md-4 control-label">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className="form-control" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
