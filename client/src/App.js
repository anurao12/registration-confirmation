import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'
import Landing from './components/Landing'
import Confirm from './components/Confirm'
import Spinner from './components/Spinner'
import { API_URL } from './config'
import './App.css'

export default class App extends Component {
 
  state = {
    loading: true
  }
  
  componentDidMount = () => {
    fetch(`${API_URL}/wake-up`)
      .then(res => res.json())
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(err => console.log(err))
  }
  
  render = () => {

    const content = () => {
      
      // The server is still asleep, so provide a visual cue with the <Spinner /> 
      // component to give the user that feedback.
      if (this.state.loading) {
        return <Spinner size='8x' spinning='spinning' />
      }

      return (
        <BrowserRouter>  
          <Switch>
            {/* 
              the ':id' in this route will be the unique id the database 
              creates and is available on 'this.props' inside the <Confirm />
              component at this.props.match.params.id
            */}
            <Route exact path='/confirm/:id' component={Confirm} />
            <Route exact path='/' component={Landing} />
            <Redirect from='*' to='/'/>
          </Switch>
        </BrowserRouter>
      )
    }

    return (
      // The 'container' class uses flexbox to position and center its three 
      // children: <Notifications />, <main>
      <div className='container fadein'>
        {/* 
          <Notifications > component from 'react-notify-toast'. This is the 
          placeholder on the dom that will hold all the feedback toast messages 
          whenever notify.show('My Message!') is called.
        */}
        <Notifications />
        <main>
          {content()}
        </main>
      </div>
    )
  }
}