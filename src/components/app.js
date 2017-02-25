import React, { PropTypes as T } from 'react';
import NavBar from '../components/nav_bar_component';

export default class App extends React.Component {

  static contextTypes = {
    router: T.object
  };

  logout(){
    this.props.route.auth.logout();
    this.context.router.push('/login');
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        logOut: this.logout.bind(this),
        auth: this.props.route.auth, //sends auth instance to children
        profile:this.props.route.auth.getProfile()
      })
    }

    return (
      <div>
        <NavBar profile={this.props.route.auth.getProfile()} logOut={this.logout.bind(this)}/>
        {children}
      </div>
    )
  }
}
