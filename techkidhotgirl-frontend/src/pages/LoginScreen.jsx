import React, { Component } from 'react';

class LoginScreen extends Component {
  state = {
    username: "",
    password: "",
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

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
      fail_message: "",
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      this.setState({
        fail_message: "Please fill it all"
      });
      return;
    }
    this.setState({
      loading: true,
      fail_message: "",
    });

    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.username,
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
          this.setState({ loading: false, });
          window.localStorage.setItem('currentEmail',data.data.email);
          window.localStorage.setItem('username',data.data.fullName);
          window.location.href='/current-user';
        }
        else {
          console.log(data);
          this.setState({
            loading: false,
            fail_message: data.message,
          })
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          fail_message: error.message,
        });
      });
  }

  render() {
    return (
      <div id="login">
        <div className="container" style={{ marginTop: '80px' }}>
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form">
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">Username:</label><br></br>
                    <input type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.handleUserNameChange}></input>
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
                  {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
                  {
                    (!this.state.loading)
                      ?
                      <div className="d-flex justify-content-around row">
                        <button className="btn btn-info btn-md" onClick={this.handleSubmit}>Login</button>
                        <div><a href="/signup">Sign up here</a></div>
                      </div>
                      :
                      <div className="d-flex justify-content-around row">
                        <div className="spinner-border " role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;