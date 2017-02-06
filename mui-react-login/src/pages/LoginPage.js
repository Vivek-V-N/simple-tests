import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../actions'

const doLogin = (username, password) => {
  console.log(username + " : " + password);
  loginUser(username, password)
}

class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.string,
    loginUser: PropTypes.func.isRequired
  }

  componentWillMount() {
    //To do things on start
  }

  componentWillReceiveProps(nextProps) {
    //To dynamically update on prop update
  }

  handleLogin(username, password) {
    this.props.loginUser(username, password);
  }

  render() {
    return (
      <LoginForm user={"test"} handleLogin={this.handleLogin.bind(this)}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const user = localStorage.getItem('user');
  const isLoading = state.isLoggingIn?state.isLoggingIn:false;

  return {
    user
  }
}

export default connect(mapStateToProps, {
  loginUser
})(LoginPage)
