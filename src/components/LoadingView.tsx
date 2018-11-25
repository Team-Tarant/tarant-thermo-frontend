import React, { Component } from 'react';
import '../styles/LoadingView.scss';

class LoadingView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.error)
        return (
            <div className="main-container">
                <p>Loading</p>
                {this.props.error && (<p>{this.props.error.message}</p>)}
            </div>
        )
    }
}

export default LoadingView
