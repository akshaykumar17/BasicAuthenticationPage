// UserLogin.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './navbar';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            passowrd: ''
        };
        
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
                conosle.log(response.json());
            })
            .catch(error => {
               
                console.log(error.response);
            });
    }
    render() {
        return (
            <div className="container">
                <Nav />
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">LogIn</div>
                            <div className="panel-body">
                                <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                   
                                </div>
                                <form className="form-horizontal" role="form" method="POST" onSubmit={this.onSubmit.bind(this)}>

                                    <div className="form-group">
                                        <label name="email" className="col-md-4 control-label">User Name</label>

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
            
        );
    }
}
export default UserLogin;
