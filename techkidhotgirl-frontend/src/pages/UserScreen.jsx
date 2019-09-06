import React, { Component } from 'react';

class UserScreen extends Component {
  state = {
    signin: false,
    email: "",
    username: "",
    id: "",
  }

  componentWillMount() {
    fetch(`http://localhost:3001/users/test`, { credentials: 'include' })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          this.setState({
            email: data.data.email,
            username: data.data.fullName,
            id: data.data._id,
            signin: true,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  logout = (event)=>{
    fetch(`http://localhost:3001/users/logout`, { credentials: 'include' })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.signin) {
      return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">{this.state.username}</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <span className="nav-item nav-link">{this.state.email}</span>
            <span className="nav-item nav-link">{this.state.id}</span>
            <button className="nav-item nav-link btn btn-light btn-md" onClick={this.logout}>Log out</button>
          </div>
        </div>
      </div>
      )
    }
    else {
      return (
        <div>
          <a href="/login"><button className="btn btn-info btn-md">Login</button></a>
        </div>
      )
    }
  }
}

export default UserScreen;