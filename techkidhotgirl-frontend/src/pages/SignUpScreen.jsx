import React, { Component } from 'react';



class SignUpScreen extends Component {
  state = {
    username: "",
    displayname: "",
    password: "",
    confirm_password: "",
    fail_message: "",
    loading: false,
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
    // eslint-disable-next-line
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
    if (!emailRegex.test(this.state.username)) {
      this.setState({
        fail_message: "Invalid email address"
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        fail_message: "Password must be at least 6 characters"
      });
      return;
    }
    this.setState({
      loading: true,
    })
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
          this.setState({
            loading: false,
          });
          window.location.href = `/login`;
        }
        else {
          this.setState({
            fail_message: data.message,
            loading: false,
          })
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          fail_message: error.message,
          loading: false,
        })
      });
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: '80px' }}>
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form">
                  <h3 className="text-center text-info">Sign Up</h3>
                  <div className="form-group">
                    <label htmlFor="email" className="text-info">Email:</label><br></br>
                    <input type="text"
                      name="username"
                      id="email"
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
                    <input type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="form-control"
                      autoComplete="off"
                      value={this.state.confirm_password}
                      onChange={this.handleConfirmPasswordChange}></input>
                  </div>
                  {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
                  <div className='row d-flex justify-content-center'>
                    {(!this.state.loading)
                      ?
                      <div className="form-group justify-content-center flex">
                        <button className="btn btn-info btn-md"
                          onClick={this.handleSubmit}>Sign up</button>
                      </div>
                      :
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    }
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