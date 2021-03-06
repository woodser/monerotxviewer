import React from 'react';
import ReactDOM from 'react-dom';
import './widgets.css';

import loadingAnimation from '../img/loadingAnimation.gif';

export function Progress_Bar(props) {
  const progressStyle = {
    width: `${props.progress}%`
  }
  return(
    <div className="progress_bar_container">
      <div className="progress_bar" style={progressStyle}></div>
      <div className="progress_percentage">{`${Math.trunc(props.progress)}%`}</div>
    </div>
  );
}

// A generic container for the common "box format" of most of the home sub-pages
export function Page_Box(props) {
  return (
    <div className={"page_box " + props.className}>
      {props.children}
    </div>
  );
}

export function getLoadingAnimationFile(){
  return loadingAnimation;
}

export function Loading_Animation(props) {
  
  // Remove the "onLoad" attribute if no notification function is provided - this will avoid errors
  let className = props.hide === true ? " loading_animation hidden" : "";
  let imgElement = null;
  if(props.notifySpinnerLoaded) {
    imgElement = <img className={"loading_animation" + className} src={loadingAnimation} onLoad={props.notifySpinnerLoaded} alt="Spinny wheel animation"></img>;
  } else {
    imgElement = <img className={"loading_animation" + className} src={loadingAnimation} alt="Spinny wheel animation"></img>
  }
  return ( 
    <div className={"loading_animation_container"}>
      {imgElement}
    </div>
  );

}

export function Page_Text_Box(props) {
  return(
    <textarea className="text_box save_phrase_box main_content active_border" value={props.box_text} disabled />
  );
}

/*
 * props.isDefault: Denotes whether the box contains the intial, unedited text;
 *   if so, set a css class to use gray text instead of black.
 * props.value:
 */
export class Page_Text_Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isDefault: true,
      enteredPhrase: this.props.value
    }
  }

  handleChange(e){
    this.setState({
      enteredPhrase: e.target.value,
      isDefault: e.target.value === "" ? true : false
    });
    this.props.handleTextChange(e.target.value);
  }

  render() {
    
    let className = this.props.className + 
      " text_box" + 
      ((this.state.isDefault) ? " default_value" : " new_value") +
      ((this.props.isValid ? " active_border" : " inactive_border"));
    let element = null;
    
    if (this.props.isSingleLineEntry){
      element = (
        <input
          type="text"
          className={className}
          onChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder}
          disabled={!this.props.isactive}
        />
      );
    } else {
      element = (
        <textarea
          className={className}
          value={this.state.enteredPhrase}
          onChange={this.handleChange.bind(this)} 
          placeholder={this.props.placeholder}
          disabled={!this.props.isactive}
        />
      );
    }
    
    return (
      element
    );
  }
}

export function Main_Content(props) {
  return(
    <div className="main_content">
      {props.children}
    </div>
  );
}

export function Header(props) {
  return (
    <div className="header">
      <div className="header_text">
        {props.text}
      </div>

      <div className="header_bottom_margin">
        {props.margin_content}
      </div>
    </div>
  );
}
