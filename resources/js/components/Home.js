import React, { Component } from 'react';
import Nav from './navbar';


class Home extends Component {
    constructor(props) {
        super(props);

    }

  render() {
      return (
          <div>
              
              <Nav link="Logout" />
              <div className="container text-center title">
                  <h1>Hey, You are logged in !</h1>
              </div>
          </div>
      );
  }
}

export default Home;
