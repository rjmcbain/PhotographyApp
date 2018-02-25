import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
              <a className="brand-logo">RJ McBain</a>
              <ul className="right">
                <li>
                    <a>Login With Google</a>
                </li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
              </ul>
            </div>
        </nav>
    </div>
        );
    }
}

export default Header;