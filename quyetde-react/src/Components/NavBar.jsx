import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Quyết đê!!!</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/creat-question">Hỏi nhanh <span
              className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="/">Đáp gọn</a>
            <a className="nav-item nav-link" href="/search">Tìm kiếm</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;