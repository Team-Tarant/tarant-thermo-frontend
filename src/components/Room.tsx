import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import '../styles/Room.scss'
import ReserverRoomForm from './ReserveRoomForm'

class Room extends Component {
    private hoursUntilOccupied: number = 0;
    private optimalTemperature: number = 21;

    constructor(props) {
        super(props)
        this.state = {
            settingsVisible: false,
            occupied: this.isOccupied(this.props.data.occupiedFrom, this.props.data.occupiedTo),
            goalTemperature: 20.5,
            occupancyState: "Not Reserved"
        };
        console.log(this.props.data);
    }

    componentDidMount() {
        this.updateStats();
    }

    isOccupied(startDate, endDate) {
        if (!startDate || !endDate) return 1;
        const currentDate = Date.now();
        const dateFrom = new Date(startDate).getTime();
        const dateTo = new Date(endDate).getTime();
        if (currentDate > dateFrom && currentDate < dateTo) {
            return 2;
        }
        this.hoursUntilOccupied = Math.abs(currentDate - dateFrom) / 36e5;
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
            this.setState({occupancyState: (<p>{"Reserved until " + this.props.data.occupiedTo}</p>)})
        } else if (this.state.occupied === 3) {
            this.setState({occupancyState: (<p>{"Reserved from " + this.props.data.occupiedFrom}</p>)})
        }
        this.setState({occupancyState: (<p>Not reserved</p>)})
    }

    updateStats = () => {
        this.getOccupancyState();
        this.approximateGoalTemperature();
    }

    getGoalTemperatureState = () => {
        if (this.state.isThermostatOn) {
            return (<p>{"Goal Temperature: " + this.state.goalTemperature + " C"}</p>)
        }
        return (<p>{"Thermostat Turned Off"}</p >)
    }

    temperatureError = () => {
        if (Math.abs(this.state.goalTemperature - this.props.data.roomTemperature) > 5) {
            return true
        }
        return false
    }

    approximateGoalTemperature = () => {
        console.log("test")
        if (!this.props.data.roomTemperature) {
            this.setState({ isThermostatOn: false });
            return;
        }
        this.setState({ goalTemperature: 20.5 });
        if (this.state.occupied === 3
            && this.hoursUntilOccupied >= 0
            && this.hoursUntilOccupied / 2 < Math.abs(this.optimalTemperature - this.props.data.roomTemperature)) {
            console.log(this.props.data.id)
            if (this.props.outsideTemperature > this.optimalTemperature
                && this.props.data.roomTemperature > this.optimalTemperature) {
                this.setState({
                    goalTemperature: Math.min(this.optimalTemperature
                        + (this.hoursUntilOccupied / 2), this.props.outsideTemperature)
                });
                this.setState({ isThermostatOn: true });
            } else if (this.props.outsideTemperature <= this.optimalTemperature
                && this.props.data.roomTemperature < this.optimalTemperature) {
                this.setState({
                    goalTemperature: Math.max(this.optimalTemperature
                        - (this.hoursUntilOccupied / 2), this.props.outsideTemperature)
                });
                this.setState({ isThermostatOn: true });
            } else {
                this.setState({ isThermostatOn: false });
            }
        } else if (this.state.occupied === 2) {
            this.setState({ isThermostatOn: true });
        } else {
            this.setState({ isThermostatOn: false });
        }
    }

    render() {
        return (
            <div>
                <div className="room"
                    onClick={this.openSettings}>
                    <h4>{"Room " + this.props.data.id}</h4>
                    <div className="temperature-box">
                        <h5>{this.props.data.roomTemperature + " C"}</h5>
                    </div>
                    {this.temperatureError() && (<h1>!!</h1>)}
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
                            {this.state.occupancyState}
                            <p>{"Temperature: " + this.props.data.roomTemperature + " C"}</p>
                            <p>{this.state.isThermostatOn && ("Goal Temperature " + this.state.goalTemperature + " C")}</p>
                            <p>{!this.state.isThermostatOn && ("Thermostat Off")}</p>
                        </div>
                        <div className="slider-container">
                            <Slider
                                className="temperature-slider"
                                value={this.state.goalTemperature}
                                onChange={this.setTemperature}
                                disabled={true}
                            />
                        </div>
                        <ReserverRoomForm 
                            roomId={this.props.data.id}
                            updateTemperature={() => this.updateStats()}
                        />
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Room
