import React, { Component } from 'react'
import FieldElementPreview from './fieldElementPreview'


class FormElementDesigner extends Component {
    constructor(props) {
        super(props);
        this.getFields = this.getFields.bind(this);
      }

    getFields() {
        var fields = [];
        let formJsonModel = this.props.getFormJson();
        if(formJsonModel) {
            let theseFields = formJsonModel.sections[0].subsections[0].fields;
            for(var i = 0; i < theseFields.length; i++) {
                fields.push(theseFields[i]);
                console.log(JSON.stringify(theseFields[i]))
            }
        }
        return fields;
    }

    render() { 
        return <div className="formElementDesigner">
            {
                this.getFields().map((item) => {
                    return <div><FieldElementPreview name={item.title} type={item.type}
                    getSelectedFieldPreview={this.props.getSelectedFieldPreview} setSelectedFieldPreview={this.props.setSelectedFieldPreview}
                    closeMenu={this.props.closeMenu}/></div>
                })
            } 
        </div>

    }
}

export default FormElementDesigner