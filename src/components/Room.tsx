import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import '../styles/Room.scss'

class Room extends Component {
    private hoursUntilOccupied: number = 0;
    private optimalTemperature: number = 21;

    constructor(props) {
        super(props)
        this.state = {
            settingsVisible: false,
            occupied: this.isOccupied(this.props.data.occupiedFrom, this.props.data.occupiedTo)
        };
        console.log(this.props.data);
    }

    componentDidMount() {
        this.approximateGoalTemperature();
    }

    isOccupied(startDate, endDate) {
        if (!startDate || !endDate) return 1;
        const currentDate = Date.now();
        const dateFrom = new Date(startDate).getTime();
        const dateTo = new Date(endDate).getTime();
        if (currentDate > dateFrom && currentDate < dateTo) {
            return 2;
        }
        this.hoursUntilOccupied = Math.abs(dateFrom - dateTo) / 36e5;
        return 3;
    }

    openSettings = () => {
        this.setState({
            settingsVisible: true,
        });
    };

    closeSettings = () => {
        this.setState({
            settingsVisible: false,
        });
    };

    setTemperature = (event, value) => {
        this.setState({
            goalTemperature: value
        })
    }

    getOccupancyState = () => {
        if (this.state.occupied === 2) {
            return (<p>{"Reserved until " + this.props.data.occupiedTo}</p>)
        } else if (this.state.occupied === 3) {
            return (<p> {"Reserved from " + this.props.data.occupiedFrom}</p >)
        }
        return (<p>Not reserved</p>)
    }

    approximateGoalTemperature = () => {
        if (!this.props.data.roomTemperature) {
            this.setState({isThermostatOn: false});
            return;
        }
        this.setState({goalTemperature: 20.5});
        if (this.state.occupied === 3
            && this.hoursUntilOccupied >= 0
            && this.hoursUntilOccupied * 2 < Math.abs(this.optimalTemperature - this.props.data.roomTemperature)) {
            if (this.props.outsideTemperature > this.optimalTemperature
                && this.props.data.roomTemperature > this.optimalTemperature) {
                    this.setState({goalTemperature: this.optimalTemperature
                    - Math.min(this.props.data.roomTemperature, (this.hoursUntilOccupied / 2))});
                    this.setState({isThermostatOn: true});
            } else if (this.props.outsideTemperature <= this.optimalTemperature
                && this.props.data.roomTemperature < this.optimalTemperature) {
                    this.setState({goalTemperature: this.optimalTemperature
                    - Math.min(0, this.optimalTemperature + (this.hoursUntilOccupied / 2))});
                    this.setState({isThermostatOn: true});
            } else {
                this.setState({isThermostatOn: false});
            }
        } else if (this.state.occupied === 2) {
            this.setState({isThermostatOn: true});
        } else {
            this.setState({isThermostatOn: false});
        }
    }

    render() {
        return (
            <div>
                <div className="room"
                    onClick={this.openSettings}>
                    <h4>{"Room " + this.props.data.id}</h4>
                </div>
                <Drawer
                    className="settings-drawer"
                    open={this.state.settingsVisible}
                    anchor="bottom"
                    onClose={this.closeSettings}
                    color="secondary"
                >
                    <div
                        className="settings-container"
                    >
                        <h2>{"Room " + this.props.data.id}</h2>
                        <div className="data-container">
                            {this.getOccupancyState()}
                            <p>{"Temperature: " + this.props.data.roomTemperature + " C"}</p>
                            <p>{"Goal Temperature: " + this.state.goalTemperature + " C"}</p>
                        </div>
                        <div className="slider-container">
                            <Slider
                                className="temperature-slider"
                                value={this.state.goalTemperature}
                                onChange={this.setTemperature}
                                disabled={true}
                            />
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Room
