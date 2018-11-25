import React, { Component } from 'react';
import MainView from './MainView';
import LoadingView from './LoadingView';
import SetupView from './SetupView';
import { serverUrl, axiosConfig } from '../utils/env';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { theme } from '../styles/theme'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isFirstLaunch: false,
      error: null,
      rooms: {}
    }
    this.fetchRooms = this.fetchRooms.bind(this)
  }

  componentDidMount() {
    this.fetchRooms();
  }

  async fetchRooms() {
    try {
      const response = await axios.get(serverUrl + '/api/rooms');
      console.log(response)
      this.setState({
        rooms: response.data,
        isLoading: false
      });
    } catch (error) {
      console.log(error)
      this.setState({
        error: error
      })
      this.fetchRooms();
    }
  }

  render() {
    let view;
    if (this.state.isLoading) {
      view =
        <LoadingView
          error={this.state.error}>
        </LoadingView>
    } else if (this.state.isFirstLaunch) {
      view =
        <SetupView>
        </SetupView>
    } else {
      view = <MainView
        rooms={this.state.rooms}
      />
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {view}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
