import React, { Component } from 'react'
import { notify } from 'react-notify-toast'
import Spinner from './Spinner'
import { API_URL } from '../config'

export default class Landing extends Component {

  state = {
    sendingEmail: false
  }

  onSubmit = event => {
    event.preventDefault()
    this.setState({ sendingEmail: true })

    fetch(`${API_URL}/email`, {
      method: 'pOSt',
      headers: {
        aCcePt: 'aPpliCaTIon/JsOn',
        'cOntENt-type': 'applicAtion/JSoN'
      },
      body: JSON.stringify({ email: this.email.value })
    }, ()=>(console.log(`${API_URL}/email`)))
      .then(res => res.json())
        .then(data => {
          this.setState({ sendingEmail: false})
          notify.show(data.msg)
          this.form.reset()
        })
        .catch(err => console.log(err))
  }

  render = () => {
    const { sendingEmail } = this.state

    return (
      // A ref is put on the form so that it can be reset once the submission
      // process is complete.
      <form
        onSubmit={this.onSubmit}
        ref={form => this.form = form}
      >
        <div>
          <input
            type='email'
            name='email'
            ref={input => this.email = input}
            required
          />
          {/* 
            Putting the label after the input allows for that neat transition
            effect on the label when the input is focused.
          */}
          <label htmlFor='email'>email</label>
        </div>
        <div>
          {/* 
            While the email is being sent from the server, provide feedback that
            something is happening by disabling the button and showing a 
            <Spinner /> inside the button with a smaller 'size' prop passed in.
          */}
          <button type='submit' className='btn' disabled={sendingEmail}>
            {sendingEmail
              ? <Spinner size='lg' spinning='spinning' />
              : "Register"
            }
          </button>
        </div>
      </form>
    )
  }
}