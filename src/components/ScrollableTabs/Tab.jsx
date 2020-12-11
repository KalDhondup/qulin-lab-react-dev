import React from 'react';
import './tab.css';

function Tab(props) {
  console.log(props);
  return (
    <div className={'tab'} style={props.defaultStyle}>
      {props.tabInfo.title}

      <span className={'removeBtn'} onClick={() => props.tabInfo.removeTab(props.tabInfo.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
    </div>
  )
}

export default Tab;