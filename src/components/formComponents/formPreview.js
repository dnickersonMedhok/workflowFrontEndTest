import React, { Component } from 'react';
import { FormEngine, Form } from "react-json-form-engine";


class FormPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formJson: null,
            formInstance: null
        };

        this.setFormEngine = this.setFormEngine.bind(this);

    }

    setFormEngine() {
        this.setState((state, props) => ({
          formInstance: new FormEngine(this.state.formJson)
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
    //TODO: get this from the DB 
        this.setState((state, props) => ({
          formJson: {
            id: "login_form",
            title: "Welcome to Foo!",
            sections: [
              {
                id: "section_1",
                title: "Login Section",
                subsections: [
                  {
                    id: "subsection_1",
                    title: "Test form",
                    subtitle: "This is just a test form.",
                    fields: [
                      {
                        id: "user_name",
                        title: "field 1",
                        type: "string"
                      },
                      {
                        id: "user_pass",
                        title: "field 2",
                        type: "string"
                      },
                      {
                        id: "remember_me",
                        title: "just some random checkbox",
                        type: "boolean"
                      },
                    {
                      "id": "bool3",
                      "type": "boolean",
                      "title": "just some random radio buttons",
                      "inline": false,
                      "options": [
                        {
                          "title": "Yes"
                        },
                        {
                          "title": "No"
                        }
                      ]
                    }
                    ]
                  }
                ]
              }
            ],
            decorators: {
              "user_pass": {
                component: {
                  type: "password"
                }
              }
            }
          },
          formInstance: new FormEngine(this.state.formJson)        
      }));
      }

      componentDidMount() {
        this.setFormEngine();
      }

}

export default FormPreview;