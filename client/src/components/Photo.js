import React, { Component } from 'react';
// import logo from './logo.svg';
import './Header.css';
import axios from 'axios';
import Fire from './Fire';
// import ReactDOM from 'react-dom';
// import ImageUploader from 'react-image-upload';

class Photo extends Component {
  constructor(props){
    super()
  this.state = {
    selectedFile: null,
      url: []
  }
}

  componentDidMount() {
    console.log(Fire.storage());
    var fireStorage = Fire.storage();
    var fireReference = fireStorage.ref();
    
    var pictureReference = fireReference.child('photo');
    console.log(pictureReference);
    pictureReference.child('Screen Shot 2018-02-14 at 12.10.32 PM.png').getDownloadURL().then(url => {
        let urls = []
        urls.push(url);
        console.log(urls);
      this.setState({ url: urls })
        console.log(this.state.url);
    })
  }

  fileSelectedHandler = event => {
    // console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    console.log(Fire.storage());
    var fireStorage = Fire.storage();
    var fireReference = fireStorage.ref();
    
    var pictureReference = fireReference.child('photo');
    console.log(this.state.selectedFile);
    pictureReference.put(this.state.selectedFile).then(res => {
      console.log(res.downloadURL);
      let current = this.state.url
      current.push(res.downloadURL);
      this.setState({ url: current })
      
    })
    // const fd = new FormData();
    // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    // axios.post('https://us-central1-photo-upload-79725.cloudfunctions.net/uploadFile', fd, {
    //   onUploadProgress: progressEvent => {
    //     console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
    //   }
    // })
    //   .then(res => {
    //     console.log(res);
    //   });
  }

  // fileGetHandler = () => {
  //   var docRef = db.collection("photo_upload");

  //   docRef.get().then(function(doc) {
  //       if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //       } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //       }
  //   }).catch(function(error) {
  //       console.log("Error getting document:", error);
  //   });
 
  // }

  // componentDidMount = () => {
  //   this.fileGetHandler ();
  // }

  render() {

    let urlArray = this.state.url.map((url, i) => {
      console.log(url);
      return(
        <img key={i} src={url} alt="project_image"/>
      )
    })

    return (
    <div id="bg">  
        <div className="App">
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>

        </div>
        <div>
          {urlArray}
          </div>
    </div>
    );
    
}
}


// ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));


export default Photo;

