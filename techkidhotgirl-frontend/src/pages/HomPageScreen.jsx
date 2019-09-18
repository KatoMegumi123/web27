import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

const pageSize = 6;

class HomPageScreen extends Component {
  state = {
    email: "",
    username: "",
    data: [],
    total: 0,
    currentPageNumber: 1,
    detailModalVisible: false,
    selectedPost: undefined,
  }

  getData = async (pageNumber) => {
    try {
      const result = await fetch(`http://localhost:3001/posts/get/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => { return res.json(); })
      this.setState({
        data: result.data.data,
        total: result.data.total,
      });
      console.log(result);
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  componentWillMount() {
    this.setState({
      email: window.localStorage.getItem('currentEmail'),
      username: window.localStorage.getItem('username'),
    });
    this.getData(this.state.currentPageNumber);
  }

  handlePageChange = (newPageNumber) => {
    this.getData(newPageNumber);
    this.setState({
      currentPageNumber: newPageNumber
    });
    window.scrollTo({ top: 0 });
  }

  handlePreviosClick = () => {
    if (this.state.currentPageNumber <= 1)
      return;
    this.getData(this.state.currentPageNumber - 1);
    this.setState({
      currentPageNumber: this.state.currentPageNumber - 1,
    })
    window.scrollTo({ top: 0 });
  }

  handleNextClick = () => {
    if (this.state.currentPageNumber >= Math.ceil(this.state.total / pageSize))
      return;
    this.getData(this.state.currentPageNumber + 1);
    this.setState({
      currentPageNumber: this.state.currentPageNumber + 1,
    })
    window.scrollTo({ top: 0 });
  }

  handlePostClick = (selectedStory) => {
    this.setState({
      detailModalVisible: true,
      selectedPost: selectedStory,
    })
  }

  closeDetailModel = () => {
    this.setState({
      detailModalVisible: false,
    })
  }

  logout = (event) => {
    fetch(`http://localhost:3001/users/logout`, { credentials: 'include' })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        window.localStorage.removeItem('currentEmail');
        window.localStorage.removeItem('username');
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var maxPageNumber = Math.ceil(this.state.total / pageSize)
    var paginations = [];
    for (let i = 0; i < maxPageNumber; i++) {
      paginations.push(i + 1);
    }
    return (
      <div>
        <div>
          {(this.state.email) ?
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
            :
            <div className="navbar navbar-expand-lg navbar-light bg-light">
              <a href='/' className="navbar-brand">Tech Kid Hot Girl</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ">
                  <span className="nav-item nav-link">{this.state.email}</span>
                  <a href='/login'><button className="nav-item nav-link btn btn-light btn-md">Log in</button></a>
                  <a href='/signup'><button className="nav-item nav-link btn btn-light btn-md">Sign up</button></a>
                </div>
              </div>
            </div>
          }
        </div>
        <div className='container'>
          <div className='row'>
            {this.state.data.map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-10" key={value._id}>
                  <div className="card">
                    <img src={`http://localhost:3001${value.imageUrl}`} className="card-img-top img-thumbnail" alt="Some image"></img>
                    <div className="card-body">
                      <h5 className="card-title">{value.author.fullName}</h5>
                      <p className="card-text"
                        style={{
                          height: '50px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}>{value.content}</p>
                      <a className="btn btn-primary" onClick={() => {
                        this.handlePostClick(value);
                      }}>More Detail</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <nav aria-label="Page navigation example" style={{ float: 'right' }}>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handlePreviosClick} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {paginations.map((value, index) => {
                return (<li className={`page-item ${value === this.state.currentPageNumber ? 'active' : ''}`}>
                  <a class="page-link" onClick={() => { this.handlePageChange(value) }}>{value}</a>
                </li>)
              })}
              <li className="page-item">
                <a className="page-link" aria-label="Next" onClick={this.handleNextClick}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          {this.state.detailModalVisible ?
            <div className="modal fade show"
              id="exampleModal"
              tabindex='-1'
              role="dialog"
              style={{
                display: 'block',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              onClick={this.closeDetailModel}>
              <div className="modal-dialog" role="document" >
                <div className="modal-content" onClick={(event)=>{event.stopPropagation();}}>
                  <div className="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeDetailModel}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h1>{this.state.selectedPost.author.fullName}</h1>
                  </div>
                  <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeDetailModel}>Close</button>
                  </div>
                </div>
              </div>
            </div> : null}

        </div>
      </div>
    );
  }
}

export default HomPageScreen;