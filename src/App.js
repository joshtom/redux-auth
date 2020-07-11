import React, { useState, useRef } from 'react';
import { userLoggingAction } from "./redux/actions/userActions";
import { connect } from "react-redux";
import './App.css';

function App(props) {
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const { email, password } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state, [ name ]: value
    })
  }

  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
    props.userLoggingAction(state)
  }
  const errorMessage = useRef(null);




  const HideNotification = () => {
    setTimeout(() => {
      errorMessage.current.style.display = "none";
      setState({
        email: "",
        password: ""
      })
    }, 4000)
  }


  
  return (
    <div className="App">
      <div className="login">
        { 
        props.isFailure && 
        (<div ref={errorMessage} className="error-message">
          Oppsss something is wrong, Please try again. { HideNotification() }
        </div>) 
         }
        
      <h1>Redux example</h1>
      <form method="post">
          <input type="text" name="email" value={email} onChange={handleChange} placeholder="Username" required="required" />
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required="required" />
          <button 
          type="submit" 
          className="btn btn-primary btn-block btn-large"
          onClick={handleSubmit}
          >
            {
              props.loader ? "Please Wait..." : "Let me in."
            }
            </button>
      </form>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLoggingAction: (payload) => dispatch(userLoggingAction(payload))
  }
}

const mapStateToProps = (state) => {
  const { loader, isFailure } = state.user
  return {
    loader,
    isFailure
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
