import React, {
  Component
} from 'react';
import '../../css/App.css'


class FieldElement extends Component {
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

  handleClick() {
    let thisField = {
      id: this.props.name,
      title: this.props.name,
      type: "string"
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

export default FieldElement
