import React, { Component } from 'react';
import '../styles/MainView.scss';
import { Button, Drawer } from '@material-ui/core';
import Room from './Room';

class MainView extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.rooms)
    }

    render() {
        return (
            <div className="room-container">
                {Object.keys(this.props.rooms).map((item, i) => {
                    return <Room
                        key={i}
                        data={this.props.rooms[item]}
                        outsideTemperature={4.3}
                    />;
                })}
            </div>
        )
    }
}

export default MainView
