import React, { Component } from 'react';
import '../styles/MainView.scss';
import { Button, Drawer } from '@material-ui/core';
import Room from './Room';
import axios from 'axios';
import { serverUrl } from '../utils/env'

class MainView extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.rooms)
    }

    resetDemo = () => {
        try {
            axios.get(serverUrl + '/api/rooms/reset');
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <div className="room-container">
                    {Object.keys(this.props.rooms).map((item, i) => {
                        return <Room
                            key={i}
                            data={this.props.rooms[item]}
                            outsideTemperature={4.3}
                        />;
                    })}
                </div>
                <Button
                    className="reset-button"
                    onClick={this.resetDemo}>
                    Reset</Button>
            </div>
        )
    }
}

export default MainView
