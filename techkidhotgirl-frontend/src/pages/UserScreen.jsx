import React, { Component } from 'react';

class UserScreen extends Component {
  state = {
    email: "",
    username: "",
    stories: [],
  }

  componentWillMount() {
    this.setState({
      email: window.localStorage.getItem('currentEmail'),
      username: window.localStorage.getItem('username'),
    });
  }

  logout = (event) => {
    fetch(`http://localhost:3001/users/logout`, { credentials: 'include' })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        window.localStorage.removeItem('currentEmail');
        window.localStorage.removeItem('username');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  upload = (event)=>{
    window.location.href = '/upload';
  }

  render() {
    if (this.state.email) {
      return (
        <div>
          <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a href='/current-user' className="navbar-brand">{this.state.username}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ">
                <span className="nav-item nav-link">{this.state.email}</span>
                <button className="nav-item nav-link btn btn-light btn-md" onClick={this.logout}>Log out</button>
                <button className="nav-item nav-link btn btn-light btn-md" onClick={this.upload}>New Story</button>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row d-flex justify-content-around'>
              {this.state.stories.map((value, index) => {
                return (
                  <div className="card col-3">
                    <img src="..." className="card-img-top" style={{ width: "100%" }} alt="..."></img>
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>
                      <p className="card-text">{value.content}</p>
                      <button className="btn btn-primary">Go somewhere</button>
                    </div>
                  </div>)
              })}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <p className="text-center align-middle">You are not logged in. To log in click <span><a href="/login">Login</a></span></p>
        </div>
      )
    }
  }
}

export default UserScreen;