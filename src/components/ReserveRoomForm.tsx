import React from 'react'
import axios from 'axios'
import { serverUrl, axiosConfig } from '../utils/env';


export default class ReserverRoomForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      occupacyStart: '',
      occupacyEnd: ''
    }
  }

  render() {
    
    return (
      <form onSubmit={e => this.onFormSubmit(e)}>
        <input type="text" onChange={e => this.handleOccupacyStartChange(e)}></input>
        <input type="text" onChange={e => this.handleOccupacyEndChange(e)}></input>
        <input type="submit"></input>
      </form>
    )
    
  }

  handleOccupacyStartChange(e) {
    e.preventDefault()
    this.setState({
      occupacyStart: e.target.value
    })
  }


  handleOccupacyEndChange(e) {
    e.preventDefault()
    this.setState({
      occupacyEnd: e.target.value
    })
  }

  onFormSubmit(e) {

    /*{
	"occupiedFrom": "2018-11-25T13:40:26.326Z",
	"occupiedTo": "2019-07-18T21:58:26.326Z"
}*/
    e.preventDefault()
    console.log(this.state.occupacyStart, this.state.occupacyEnd)
    axios.patch(serverUrl + '/api/rooms/' + this.props.roomId, JSON.stringify({
      occupiedFrom: this.state.occupacyStart,
      occupiedTo: this.state.occupacyEnd
    }), {headers: {'content-type': 'application/json'}})
    .then(() => console.log('Added reservation'))
    .catch(e => console.error(e))
  }
}