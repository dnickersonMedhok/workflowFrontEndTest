import React, { Component } from 'react';
import FormPreview from './formPreview';


class FormDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  render() {
    return (<div>
              <div className="App">
                <h1><b>The Form Designer</b></h1> 
                <center><FormPreview setFormJson={this.props.setFormJson} getFormJson={this.props.getFormJson}/></center>
              </div>,
              <div className="rightBar">
                form name: { this.props.getFormJson().sections[0].subsections[0].title } 
              </div>
            </div>
);
  }

  componentDidMount() {

   
  }
}

export default FormDesigner
