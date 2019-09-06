import React, { Component } from 'react';

class SignUpScreen extends Component {
  state = {
    username: "",
    displayname: "",
    password: "",
    confirm_password: "",
    fail_message: "",
  }

  handleUserNameChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      username: newValue,
      fail_message: "",
    });
  };

  handleDisplayNameChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      displayname: newValue,
      fail_message: "",
    });
  };

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
      fail_message: "",
    })
  }

  handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      confirm_password: newValue,
      fail_message: "",
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username || !this.state.displayname || !this.state.password || !this.state.confirm_password) {
      this.setState({
        fail_message: "Please fill it all"
      });
      return;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        fail_message: "Password and Confirm password must be the same"
      });
      return;
    }
    fetch('http://localhost:3001/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.username,
        fullName: this.state.displayname,
        password: this.state.password,
      }),
    })
      .then((response) => {
        // response.json() only when server reponse with json
        // response.text() only when server response with string
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          window.location.href = `/login`;
        }
        else {
          this.setState({
            fail_message: data.message,
          })
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }

  render() {
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">SignUp form</h3>
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form">
                  <h3 className="text-center text-info">Sign Up</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">Email:</label><br></br>
                    <input type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.handleUserNameChange}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="displayname" className="text-info">Username:</label><br></br>
                    <input type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={this.state.displayname}
                      onChange={this.handleDisplayNameChange}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">Password:</label><br></br>
                    <input type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      autoComplete="off"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">Confirm Password:</label><br></br>
                    <input type="text"
                      name="confirm-password"
                      id="confirm-password"
                      className="form-control"
                      autoComplete="off"
                      value={this.state.confirm_password}
                      onChange={this.handleConfirmPasswordChange}></input>
                  </div>
                  {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
                  <div className="form-group">
                    <button className="btn btn-info btn-md"
                      onClick={this.handleSubmit}>Sign up</button>
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

export default SignUpScreen;