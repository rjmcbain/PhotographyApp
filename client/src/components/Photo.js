import React, { Component } from 'react';
// import logo from './logo.svg';
import './Header.css';
import axios from 'axios';
// import ReactDOM from 'react-dom';
// import ImageUploader from 'react-image-upload';

class Photo extends Component {
  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    // console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('https://us-central1-photo-upload-79725.cloudfunctions.net/uploadFile', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
    <div id="bg">  
        <div className="App">
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
    </div>
    );
    
}
}


// ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));


export default Photo;

