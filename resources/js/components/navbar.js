import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


class Nav extends Component {

    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/logout')
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClick(e) {

        e.preventDefault();
        this.props.history.push('/');

    }
    render() {
        
        if (this.props.link) {
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" onClick={this.handleClick.bind(this)}>Basic Authentication</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    {this.props.location.state.user}<span className="caret"></span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item"
                                        onClick={this.logout.bind(this)} >
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.handleClick.bind(this)}>Basic Authentication</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>


                </div>
            </nav>

        );
    }

}

export default withRouter(Nav);
