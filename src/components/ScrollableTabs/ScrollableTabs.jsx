import React, { Component } from 'react';
import './scrollableTabs.css';
import Tab from './Tab';
import add from './../../assets/icons/add.svg';

export default class ScrollableTabs extends Component {
  tabId = 0;    // tab id base index 
  tabGroupElment = null;    // parent dom with all tabs as child node

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      tabs: this.createDefaultTabs(),
      chevronHidden: true,
    }
  }

  componentDidMount() {
    // this.createDefaultTabs();
    this.tabGroupElment = document.querySelector('#tabGroup');
    this.createModalRoot();
  }

  createDefaultTabs = () => {
    // creates default tabs
    let tempTabs = [];

    for (let i = 0; i < this.props.defaultTabCounts; i++) {
      tempTabs.push(this.createNewTab());
    }

    return [...tempTabs];
  }

  createNewTab = (title = '') => {
    // creates new tab
    return {
      id: ++this.tabId,
      title: title ? title : `Tab${this.tabId}`,
      removeTab: this.removeTab
    }
  }

  removeTab = (id) => {
    // remove selected tab component from the tabs list
    if (this.state.tabs.length > 1) {

      if (window.confirm('Are you sure you want to remove this tab?')) {
        this.state.tabs.splice(this.state.tabs.findIndex(tab => tab.id === id), 1);
        this.setState({
          tabs: [...this.state.tabs],
        }, () => {
          this.setState({
            chevronHidden: this.setChevronVisibility(),
          });
        });

      }

    } else {
      alert('This is the last tab and can not be removed');
    }

  }

  addNewTab = () => {
    // adds new tab to the scrollable tab 

    if (this.state.tabs.length < this.props.maxTabCounts) {
      this.setState({
        tabs: [...this.state.tabs, this.createNewTab()],
      }, () => {
        this.setState({
          chevronHidden: this.setChevronVisibility(),
        });
      });
    } else {
      alert(`Tabs max limit is ${this.props.maxTabCounts}`);
    }

  }

  createModalRoot = () => {
    // creating <div id="modal-root"></div> in body

    if (!document.querySelector("#scrollableTab-modal-root")) {
      let modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'scrollableTab-modal-root');
      document.querySelector('body').appendChild(modalRoot);
    }
  }

  scrollLeft = () => {
    // 
    this.tabGroupElment.scroll({ left: this.tabGroupElment.scrollLeft - this.props.defaultTabWidth, behavior: 'smooth' });
  }

  scrollRight = () => {
    this.tabGroupElment.scroll({ left: this.tabGroupElment.scrollLeft + this.props.defaultTabWidth, behavior: 'smooth' });
  }

  setChevronVisibility = () => {
    // hide chevron btns if tab's are not exceding the scrollalble bar width
    if (this.tabGroupElment.scrollWidth <= this.tabGroupElment.clientWidth) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className={'scrollableTab'} style={this.props.defaultStyle}>
        <span className={`btnIcons ${this.state.chevronHidden ? 'hidden' : ''}`} onClick={this.scrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>

        <div className={'tabs'} id="tabGroup">
          {this.state.tabs.map((tab, index) => <Tab key={`Tab${index}`} tabInfo={tab} defaultStyle={{ minWidth: this.props.defaultTabWidth, maxWidth: this.props.defaultTabWidth }} />)}
        </div>

        <span className={`btnIcons ${this.state.chevronHidden ? 'hidden' : ''}`} onClick={this.scrollRight}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
        <span className={'btnIcons'} onClick={this.addNewTab}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
      </div>
    )
  }
}
