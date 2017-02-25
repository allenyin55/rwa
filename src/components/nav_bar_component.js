import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './component.scss';
import CSSModules from 'react-css-modules';

const NavBar = ({ profile, logOut }) => {

  if (window.location.pathname === '/login') return <div />;

  return (
    <header styleName="nav_bar" className="container">
      <div className="row" style={{display: "flex"}}>
        <Link styleName="styleless_link" to="/">
        <h2 styleName="nav_bar_brand" className="col">
        Reading with Annie
        </h2>
        </Link>
        <div className="col" style={{ textAlign: 'right' }}>
          <div style={{ display: 'inline-block' }}>Welcome, {profile.given_name}</div>
          <Link to="/profile">
            <img styleName='headShot' src={profile.picture_large} />
          </Link>
          <div style={{ display: 'inline-block' }}>
            <Button bsStyle="danger" onClick={logOut}>Logout</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default  CSSModules(NavBar, styles);
