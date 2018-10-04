import React, { Component } from 'react';
import Nav from './navbar';


class Home extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        if (sessionStorage.getItem('userData')) {
            console.log('');
        }
    }
    render() {
        console.log(this.props);
      return (
          <div>
              <Nav link="Logout" />
              <div className="container text-center title">
                  <h1>Hey,{this.props.location.state.user} You are logged in !</h1>
              </div>
          </div>
      );
  }
}

export default Home;
