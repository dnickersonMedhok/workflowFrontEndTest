import React, { Component } from 'react';
import { FormEngine, Form } from "react-json-form-engine";


class FormPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formInstance: null
        };

        this.setFormEngine = this.setFormEngine.bind(this);

    }

    setFormEngine() {
        this.setState((state, props) => ({
          formInstance: new FormEngine(this.props.getFormJson())
        }));
      }

      render() {

            return <Form 
                        hideTitle
                        submitButtonLabel="submit"
                        instance={ this.state.formInstance }
                        onSubmit={() => {
                                console.log(this.state.formInstance.getModelValues()); // Get form responses
                                console.log(this.state.formInstance.serializeModel()); // Serialize form responses
                            }
                        }
                    />

            }


  componentWillMount() {
    this.setState( {formInstance: new FormEngine(this.props.getFormJson()) });
  }

  componentDidMount() {
    this.setFormEngine();
  }

}

export default FormPreview;