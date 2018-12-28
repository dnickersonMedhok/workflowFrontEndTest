import React, { Component } from 'react';
import '../../css/App.css'

class FieldElementButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  render() {
    return <button className = "button"
              onClick = {this.handleClick} >
              {this.props.name} 
          </button>
  }
//Add this field to the global formJson
  handleClick() {
    var thisType;
    if(this.props.type === "text") {
      thisType = "string";
    } else if (this.props.type === "boolean") {
      thisType = "boolean"
    }

    let thisField = {
      id: this.props.name,
      title: this.props.name,
      type: thisType
    };
    let formJson = this.props.getFormJson();
    if(formJson) {
      //TODO: find the correct section and subsection instead of
      //supporting only one section and subsection
      formJson.sections[0].subsections[0].fields.push(thisField);
      this.props.setFormJson(formJson);
    }
  }
}

export default FieldElementButton
