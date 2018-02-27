import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Photo from './Photo';
// const Dashboard = () => <h2>Dashboard</h2> 
const PhotoNew = () => <h2>PhotoNew</h2> 


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/photo" component={Photo}/>
                    <Route path="/photo/new" component={PhotoNew}/>
                </div>
            </BrowserRouter>
        </div>
      );
   }
};

export default connect(null, actions) (App);