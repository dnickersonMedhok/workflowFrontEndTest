import React, {
    Component
  } from 'react';
  import '../../css/App.css'

  class FieldElementPreview extends Component {
    constructor(props) {
        super(props);
  
        this.handleClick = this.handleClick.bind(this);
        this.getRenderByType = this.getRenderByType.bind(this);
    }

    getRenderByType() {
        if(this.props.type === "string") {
           return  <div className="formElementPreview">
                name: {this.props.name} <br />
                type: {this.props.type}
        </div>
        } else if(this.props.type === "boolean") {
            return <div className="formElementPreview">
                    <form>
                        <label>{this.props.name}
                            <input type="checkbox" />
                        </label>
                    </form>
            </div>
        }
    }

    handleClick(e) {
        let elementPreview = {
            name: this.props.name,
            type: this.props.type
        }
        this.props.setSelectedFieldPreview(elementPreview);
        this.props.closeMenu();
    }
    render() {
        return <div className="formElementPreview" onClick={this.handleClick}>
                    name: {this.props.name} <br />
                    type: {this.props.type}
                </div>
      }
}

export default FieldElementPreview