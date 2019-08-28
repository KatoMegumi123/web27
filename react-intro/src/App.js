import React from 'react';
import VideoItem from './components/VideoItem'
import './App.css';

// const App = (props)=>{
//   return(
//   <div>Hello world</div>
//   );
// };

class App extends React.Component {
  state = {
    inputValue: '',
    keyword: '',
    pageToken: '',
    videos: [],
    loading: false,
  };

  componentDidMount(){
    window.addEventListener('scroll',this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      keyword: this.state.inputValue,
      nextPageToken: '',
      loading: true,
      videos: []
    })
    var keyword = this.state.inputValue;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.items);
        let newVideos = [];
        for (let item of data.items) {
          let newVideo = {};
          newVideo.id = item.id.videoId;
          newVideo.thumbnail = item.snippet.thumbnails.medium.url;
          newVideo.title = item.snippet.title;
          newVideo.description = item.snippet.description;
          newVideos.push(newVideo);
        };
        this.setState(
          {
            pageToken: data.nextPageToken,
            videos: [...this.state.videos, ...newVideos],
            loading: false,
          }
        )
        console.log(this.state.videos);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      inputValue: newValue,
    });
  };

  handleScroll = (event) =>{
    if((document.documentElement.offsetHeight-window.innerHeight-window.scrollY<=200)){
      console.log('shit');
      let nextPageToken = this.state.nextPageToken;
      var keyword = this.state.keyword;
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        let newVideos = [];
        for (let item of data.items) {
          let newVideo = {};
          newVideo.id = item.id.videoId;
          newVideo.thumbnail = item.snippet.thumbnails.medium.url;
          newVideo.title = item.snippet.title;
          newVideo.description = item.snippet.description;
          newVideos.push(newVideo);
        };
        this.setState(
          {
            pageToken: data.nextPageToken,
            videos: [...this.state.videos, ...newVideos],
            loading: false,
          }
        )
      })
      .catch()
    }
  }

  render() {
    return (
      <div className='container' onScroll={this.handleScroll}>
        <div className='todo-form' onSubmit={this.handleSubmit}>
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="input-to-do" className="sr-only">To do</label>
              <input
                type="text"
                className="form-control"
                id="input-to-do"
                placeholder="What to do..."
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Add this sh*t</button>
          </form>
        </div>
        <div className='result'>
          {this.state.videos.map((value, index) => {
            return (
              <VideoItem id={value.id} thumbnail={value.thumbnail} title={value.title} description={value.description} key={index} />
            );
          })}
          {(this.loading) ? (<div>Loading...</div>) : <div></div>}
        </div>
      </div>
    );
  }
}

export default App;
