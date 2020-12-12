import React, { Component } from 'react';
import './scrollableTabs.css';
import Tab from './Tab';
import Dragula from 'react-dragula';
import Modal from './Modal';

export default class ScrollableTabs extends Component {
  tabId = 0;    // tab id base index 
  tabGroupElment = null;    // parent dom with all tabs as child node

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      tabs: this.createDefaultTabs(),
      leftChevronHidden: true,
      rightChevronHidden: true,
      modal: {},
    }
  }

  componentDidMount() {
    // this.createDefaultTabs();
    this.tabGroupElment = document.querySelector('#tabGroup');
    this.tabGroupElment.addEventListener('scroll', () => {
      // updates the chevron vasibility after scroll
      this.checkChevronVisiblility();
    });

    window.addEventListener('resize', () => {
      // updates the chevron vasibility after window resize
      this.checkChevronVisiblility();
    });

    this.createModalRoot();
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };

  createDefaultTabs = () => {
    // creates default tabs
    let tempTabs = [];

    for (let i = 0; i < this.props.defaultTabCounts; i++) {
      if (i === 0) {
        // making first tab active by default
        tempTabs.push(this.createNewTab(undefined, true));
      } else {
        tempTabs.push(this.createNewTab());
      }
    }

    return [...tempTabs];
  }

  createNewTab = (title = '', isActive = false) => {
    // creates new tab
    return {
      id: ++this.tabId,
      title: title ? title : `Tab${this.tabId}`,
      isActive: isActive,
      removeTab: this.removeTab
    }
  }

  removeTab = (id) => {
    // remove selected tab component from the tabs list
    if (this.state.tabs.length > 1) {

      this.onOpenModal(
        'Are you sure you want to remove this tab?',
        () => {
          // passing callback function on click ok
          this.state.tabs.splice(this.state.tabs.findIndex(tab => tab.id === id), 1);
          this.setState({
            tabs: [...this.state.tabs],
          }, () => {
            this.checkChevronVisiblility();
          });
        },
      );
    } else {
      this.onOpenModal('This is the last tab and can not be removed');
    }

  }

  addNewTab = () => {
    // adds new tab to the scrollable tab 

    if (this.state.tabs.length < this.props.maxTabCounts) {
      this.setState({
        tabs: [...this.state.tabs, this.createNewTab()],
      }, () => {
        this.checkChevronVisiblility();
      });
    } else {
      this.onOpenModal(`Tabs max limit is ${this.props.maxTabCounts}`);
    }
  }

  createModalRoot = () => {
    // creating <div id="modal-root"></div> in body

    if (!document.querySelector("#scrollableTab-modal-root")) {
      let modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'scrollableTab-modal-root');
      document.querySelector('body').appendChild(modalRoot);

      // setting model state
      this.setState({
        modal: {
          open: false,
          title: '',
          description: '',
        }
      });
    }
  }

  scrollLeft = () => {
    // scrolling the tabs to left 
    this.tabGroupElment.scroll({ left: this.tabGroupElment.scrollLeft - this.props.defaultTabWidth, behavior: 'smooth' });

    // on click on next cheveron btn, active tab is move to the nex tab in the tab group
    // and making previous active tab inactive
    let prevActiveTabNodeIndex = this.state.tabs.findIndex(tab => tab.isActive === true);
    let nextTabIndex = [...this.tabGroupElment.childNodes].findIndex((tabNode) => tabNode.classList.contains('tabActive'));
    nextTabIndex = this.tabGroupElment.childNodes[nextTabIndex - 1];

    if (!nextTabIndex) {
      // doing nothing if there is no next tab
      return;
    }
    nextTabIndex = this.state.tabs.findIndex(tab => tab.id === parseInt(nextTabIndex.getAttribute('data-id')));
    this.switchActiveTab(prevActiveTabNodeIndex, nextTabIndex);
  }

  scrollRight = () => {
    // scrolling the tabs to right 
    this.tabGroupElment.scroll({ left: this.tabGroupElment.scrollLeft + this.props.defaultTabWidth, behavior: 'smooth' });

    // on click on previous cheveron btn, active tab is move to the front tab in the tab group
    // and making previous active tab inactive
    let prevActiveTabNodeIndex = this.state.tabs.findIndex(tab => tab.isActive === true);
    let nextTabIndex = [...this.tabGroupElment.childNodes].findIndex((tabNode) => tabNode.classList.contains('tabActive'));
    nextTabIndex = this.tabGroupElment.childNodes[nextTabIndex + 1];

    if (!nextTabIndex) {
      // doing nothing if there is no next tab
      return;
    }

    nextTabIndex = this.state.tabs.findIndex(tab => tab.id === parseInt(nextTabIndex.getAttribute('data-id')));
    this.switchActiveTab(prevActiveTabNodeIndex, nextTabIndex);
  }

  checkChevronVisiblility = () => {
    // checks left and right visibility condition and sets required behaviour
    this.setState({
      leftChevronHidden: this.setLeftChevronVisibility(),
      rightChevronHidden: this.setRightChevronVisibility(),
    });
  }

  setLeftChevronVisibility = () => {
    // hide left chevron btns if tab's are not exceding the scrollalble bar width
    // and first tab is visible
    if (this.tabGroupElment.scrollLeft > 0) {
      return false;
    } else {
      return true;
    }
  }

  setRightChevronVisibility = () => {
    // hide right chevron btns if tab's are not exceding the scrollalble bar width
    // and last tab is visible
    if (this.tabGroupElment.scrollWidth > this.tabGroupElment.clientWidth) {
      if (Math.ceil(this.tabGroupElment.scrollLeft + this.tabGroupElment.clientWidth) >= this.tabGroupElment.scrollWidth) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onOpenModal = (description = '', okCallbackFunc = null, cancleCallbackFunc = null) => {
    this.setState({
      modal: {
        open: true,
        title: '',
        description: description,
        onOk: () => this.modalOnOk(okCallbackFunc),
        onCancle: () => this.modalOnCancle(cancleCallbackFunc),
      },
    });
  }

  modalOnOk = (callbackFucn) => {
    console.log('on modal ok');
    this.setState({
      modal: {
        open: false,
        title: '',
        description: '',
      },
    }, () => {
      if (callbackFucn) {
        callbackFucn();
      }
    });
  }

  modalOnCancle = (callbackFunc) => {
    console.log('on modal cancle');
    this.setState({
      modal: {
        open: false,
        title: '',
        description: '',
      },
    }, () => {
      if (callbackFunc) {
        callbackFunc();
      }
    });
  }

  onClickTab = (tabId) => {
    // on tab selection, the selected tab is making active
    // and making inactive the previous selected
    let previousActiveTabIndex = this.state.tabs.findIndex(tab => tab.isActive === true);
    let selectedTabIndex = this.state.tabs.findIndex(tab => tab.id === tabId);

    if (previousActiveTabIndex === selectedTabIndex) {
      // doing nothing on active tab is clicked again
      return;
    }

    this.switchActiveTab(previousActiveTabIndex, selectedTabIndex);
  }

  switchActiveTab = (oldActiveIndex, newActiveIndex) => {
    // switch the active tab from old to new tab index

    let tempTabs = [...this.state.tabs];

    if (oldActiveIndex >= 0 && newActiveIndex >= 0) {
      tempTabs[oldActiveIndex].isActive = false;
      tempTabs[newActiveIndex].isActive = true;
    }

    this.setState({
      tabs: tempTabs,
    });
  }

  render() {
    return (
      <div className={'scrollableTab'} style={this.props.defaultStyle}>

        {/* left cheveron button icon */}
        <span className={`btnIcons ${this.state.leftChevronHidden ? 'hidden' : ''}`} onClick={this.scrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>

        {/* tabs group */}
        <div className={'tabs'} id="tabGroup" ref={this.dragulaDecorator}>
          {this.state.tabs.map((tab, index) => <Tab onClick={this.onClickTab} key={`Tab${index}`} tabInfo={tab} defaultStyle={{ minWidth: this.props.defaultTabWidth, maxWidth: this.props.defaultTabWidth }} />)}
        </div>

        {/* right cheveron button icon */}
        <span className={`btnIcons ${this.state.rightChevronHidden ? 'hidden' : ''}`} onClick={this.scrollRight}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>

        {/* add buton icon */}
        <span className={'btnIcons'} onClick={this.addNewTab}>
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>

        {this.state.modal && this.state.modal.open && <Modal modalDetial={this.state.modal} onOk={this.modalOnOk} onCancle={this.modalOnCancle} />}
      </div>
    )
  }
}
