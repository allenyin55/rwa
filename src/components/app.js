import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import NavBar from '../components/nav_bar_component';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import CSSModules from 'react-css-modules';
import styles from '../app.scss'

class App extends React.Component {

  static contextTypes = {
    router: T.object
  };

  state = { visible: false }

  toggleVisibility(){
    this.setState({ visible: !this.state.visible })
  }

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

    const { visible } = this.state;

    return (
      <div>
        <NavBar profile={this.props.route.auth.getProfile()} 
                logOut={this.logout.bind(this)}
                menuBtn={this.toggleVisibility.bind(this)}
                />
        <div styleName="app_container">
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='slide along' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Link to="/">
                  <Icon name='home' />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Link to="/profile">
                  <Icon name='book' />
                  Book Shelf
                </Link>
              </Menu.Item>
              <Menu.Item name='camera'>
                <Link to="/">
                  <Icon name='camera' />
                  Channels
                </Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                {children}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles);
