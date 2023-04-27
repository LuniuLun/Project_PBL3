import React, { Component } from 'react';

class warningBox extends Component {
    render() {
        return (
            <div className={this.props.name_class}>
                {this.props.content}
            </div>
        );
    }
}
export default warningBox;