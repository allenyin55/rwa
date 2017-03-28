import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import styles from './component.scss';
import CSSModules from 'react-css-modules';

const NavBar = ({ profile, logOut, menuBtn } ) => {

  if (window.location.pathname === '/login') return <div />;

  return (
    <header styleName="nav_bar">
      <div styleName="nav_bar_row">
        <Icon name="sidebar"
              size="large"
              onClick={menuBtn}/>
        <Link styleName="styleless_link" to="/">
          <h2 className="col">
          Reading with Annie
          </h2>
        </Link>
        <div className="col" styleName="nav_bar_right">
          <div styleName="same_line">Welcome, {profile.given_name}</div>
          <Link to="/profile">
            <img styleName='headShot' src={profile.picture_large} />
          </Link>
          <div styleName="same_line">
            <Button bsStyle="danger" onClick={logOut}>Logout</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default  CSSModules(NavBar, styles);
