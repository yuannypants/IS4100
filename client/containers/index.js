import React, {Component} from 'react';
import Helmet from 'react-helmet'
import {hot} from 'react-hot-loader';
import classNames from 'classnames';
import { ScrollPanel } from 'primereact/scrollpanel'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../assets/css/layout.scss';
import { Topbar } from '../components/common/Topbar';
import { Footer } from '../components/common/Footer';
import { InlineProfile } from '../components/common/InlineProfile';
import { Menu } from '../components/common/Menu';
import RootClientRouter from '../routers';

const localStorage = window.localStorage;

class RootContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuActive: false,
      mobileMenuActive: false
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (!this.menuClick)
      this.setState({mobileMenuActive: false});
    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (window.innerWidth > 1024) { // If a desktop is detected
      this.setState({menuActive: !this.state.menuActive});
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({mobileMenuActive: !mobileMenuActive});
    }
    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
    setTimeout(() => this.layoutMenuScroller.moveBar(), 500);
  }

  onMenuItemClick(event) {
    if (!event.item.items)
      this.setState({mobileMenuActive: false})
  }

  createMenu() {
    this.menu = [];

    this.menu.push({
      label: 'Homepage', icon: 'pi pi-fw pi-list',
      items: [
        {label: 'Settings', icon: 'pi pi-fw pi-chevron-circle-right',
          command: () => { window.location = "Settings"} },
        {label: 'Page', icon: 'pi pi-fw pi-chevron-circle-right',
          command: () => { window.location = "Page"} },
        {label: 'Tasks', icon: 'pi pi-fw pi-chevron-circle-right',
          command: () => { window.location = "Tasks"} },
         {label: 'Resource Management', icon: 'pi pi-fw pi-chevron-circle-right',
          command: () => { window.location = "ResourceManagement"} },
      ]
    });
    this.menu.push({
      label: 'Log out', icon: 'pi pi-fw pi-sign-out',
      command: () => {
        localStorage.clear();
        this.setState({menuActive: false,mobileMenuActive: false});
        window.location.href='/Login';
      }
    });
  }

  addClass(element, className) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }

  removeClass(element, className) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden');
    else
      this.removeClass(document.body, 'body-overflow-hidden');
  }

  render() {
    let wrapperClass = classNames('layout-wrapper', 'layout-static', {
      'layout-static-sidebar-inactive': !this.state.menuActive,
      'layout-mobile-sidebar-active': this.state.mobileMenuActive
    });
    let sidebarClassName = classNames('layout-sidebar');

    return (
      <div>
        <Helmet
          titleTemplate="%s - IS4100"
          defaultTitle="IS4100"
        >
          <meta name="description" content="IS4100" />
        </Helmet>
        <div className={wrapperClass} onClick={this.onWrapperClick}>
          <Topbar onToggleMenu={this.onToggleMenu}/>

          <div ref={el => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
            <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'100%'}}>
              <div className="layout-sidebar-scroll-content" >
                <InlineProfile />
                <Menu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
              </div>
            </ScrollPanel>
          </div>

          <div className="layout-main">
            <RootClientRouter />
          </div>

          <Footer />

          <div className="layout-mask"> </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(RootContainer);
