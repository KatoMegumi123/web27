import React, { Component } from 'react';

const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;

class UploadScreen extends Component {
  state = {
    content: "",
    loading: false,
    fail_message: "",
    file: undefined,
    imageUrl: "",
  }

  componentWillMount() {
    this.setState({
      email: window.localStorage.getItem('currentEmail'),
      username: window.localStorage.getItem('username'),
    })
  }

  handleInputChange = (type, newValue) => {
    this.setState({
      [type]: newValue,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.file) {
      this.setState({
        fail_message: 'No content'
      });
      return;
    }
    if (!this.state.content) {
      this.setState({
        fail_message: 'No image'
      });
      return;
    }
    this.setState({
      loading: true,
      fail_message: ''
    });
    try {
      const formData = new FormData();
      formData.append('image', this.state.file)
      const upLoadResult = await fetch('http://localhost:3001/uploads/photos', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
        .then((res) => { return res.json() });
      console.log(upLoadResult);
      const newStory = await fetch('http://localhost:3001/posts/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: this.state.content,
          imageUrl: upLoadResult.data,
        })
      }).then((res) => { return res.json() });
      if (newStory.success) {
        this.setState({
          loading: false,
        },()=>{window.location.href='/current-user';})
        
      }
      else {
        this.setState({
          loading: false,
          fail_message: newStory.message,
        })
      }
    }
    catch (error) {
      this.setState({
        loading: false,
        fail_message: error.message,
      })
    }
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

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file)
      return;
    if (!imageFileRegex.test(file.name)) {
      this.setState({
        fail_message: 'Invalid image file'
      });
      return;
    }
    if (file.size > maxFileSize) {
      this.setState({
        fail_message: 'File must be less then 5MB'
      });
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.setState({
        fail_message: '',
        file: file,
        imageUrl: fileReader.result,
      });
    }
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
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="validatedCustomFile"
                  required={true}
                  onChange={this.handleFileChange}></input>
                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
              </div>
              {this.state.imageUrl ?
                (<div style={{
                  backgroundImage: `url(${this.state.imageUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '400px',
                }}>

                </div>)
                :
                (<div></div>)}
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Content</label>
                <textarea className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={this.state.content}
                  onChange={(event) => {
                    this.handleInputChange("content", event.target.value);
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