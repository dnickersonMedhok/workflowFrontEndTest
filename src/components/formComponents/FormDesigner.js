import React, { Component } from 'react';
import FormElementDesigner  from './formElementDesigner'
import Popup from "reactjs-popup";
import FormPreview from './formPreview';

class FormDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.getSelectedField = this.getSelectedField.bind(this);
  }

  getSelectedField() {
    let previewField = this.props.getSelectedFieldPreview();
    if(previewField) {
      return <div> 
        field name: {previewField.name}<br />
        field type: {previewField.type}
      </div>
    }
  }
  render() {
    return (<div>
              <div className="App">
                <h1><b>The Form Designer</b></h1> 
                <center><FormElementDesigner  setFormJson={this.props.setFormJson} getFormJson={this.props.getFormJson}
                getSelectedFieldPreview={this.props.getSelectedFieldPreview} setSelectedFieldPreview={this.props.setSelectedFieldPreview}
                closeMenu={this.props.closeMenu}/></center>
              </div>,
              <div className="rightBar">
                form name: { this.props.getFormJson().sections[0].subsections[0].title } 
                { this.getSelectedField() } 
              <br />
              <Popup className="modal-dialog" trigger={<button> preview</button>} modal closeOnDocumentClick><center>
                <FormPreview setFormJson={this.props.setFormJson} getFormJson={this.props.getFormJson}/>
                </center>
              </Popup>
              </div>
            </div>
    );
  }
}

export default FormDesigner
