import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li className="log"><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return <li className="log"><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        // console.log(this.props);
        return (
            <nav>
                <div id="nav" className="nav-wrapper green">
                <Link id="logo" to={this.props.auth ? '/photo' : '/'}
                className="left brand-logo" >RJ McBain</Link>
                <ul className="right">
                    {this.renderContent()}
                    {/* <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li> */}
                </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);