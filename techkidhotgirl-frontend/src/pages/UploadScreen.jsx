import React, { Component } from 'react';

class UploadScreen extends Component {
  state = {
    title: "",
    content: "",
    loading: false,
    fail_message: "",
  }

  componentWillMount() {
    this.setState({
      email: window.localStorage.getItem('currentEmail'),
      username: window.localStorage.getItem('username'),
      id: window.localStorage.getItem('id'),
    })
  }

  handleInputChange = (type, newValue) => {
    this.setState({
      [type]: newValue,
    });
  };

  handleSubmit = (event) => {
    this.setState({
      loading: true,
    })
    fetch('http://localhost:3001/users/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
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
          window.location.href = `/current-user`;
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
              </div>
            </div>
          </div>
          <div className='container'>
            <h1 className='text-center'>New Story</h1>
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="..."
                  onChange={(event) => {
                    this.handleInputChange("title", event.target.value);
                  }}></input>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Content</label>
                <textarea class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(event) => {
                    this.handleInputChange("title", event.target.value);
                  }}></textarea>
              </div>
              {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
              <div className='row d-flex justify-content-center'>
                {(!this.state.loading)
                  ?
                  <div className="form-group justify-content-center flex">
                    <button className="btn btn-info btn-primary"
                      onClick={this.handleSubmit}>Submit</button>
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

export default UploadScreen;