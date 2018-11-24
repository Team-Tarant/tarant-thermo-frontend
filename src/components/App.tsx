import React, { Component } from 'react';
import { Counter } from './Counter';
import { Hello } from './Hello';
import LoadingView from './LoadingView';
import SetupView from './SetupView';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isFirstLaunch: false
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.state.isLoading) {
      return(
        <LoadingView>
        </LoadingView>
      )
    }
    if (this.state.isFirstLaunch) {
      return(
        <SetupView>
        </SetupView>
      )
    }
    return (
      <>
        <Hello name={'djfaaffflksfdjfadsl'} />
        <Counter />
      </>
    )
  }
}

export default App
