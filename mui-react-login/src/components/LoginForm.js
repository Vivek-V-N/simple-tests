import React, { Component } from 'react'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import { browserHistory } from 'react-router'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import LoginCarousel from './LoginCarousel'
import '../css/login.css'

export default class LoginForm extends Component {

  handleNameFieldChange(e) {
    this.username = e.target.value;
  }

  handlePasswordFieldChange(e) {
    this.password = e.target.value;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  handleLogin(e) {
    this.props.handleLogin(this.getUsername(), this.getPassword());
    e.preventDefault();
  }

  handleGoogleLogin() {
    browserHistory.push("http://localhost:8080/auth/google");
  }

  renderForm() {
    console.log(this.props.user);
    return (
      <Container fluid={true} className="login-main">
        <img alt="sitetrax" className="login-logo" />
        <Row className="login-row">
          <Col md="5" md-offset="1">
            <LoginCarousel />
          </Col>
          <Col md="3" md-offset="2">
            <Form className="login-form">
              <legend className="mui--text-center">Sign in</legend>
              <Input ref="username" hint="Username" onChange={this.handleNameFieldChange.bind(this)}/>
              <Input ref="password" hint="Password" type="password" onChange={this.handlePasswordFieldChange.bind(this)}/>
              <Button color="primary" className="mui--text-center login-button" onClick={this.handleLogin.bind(this)} size="large" variant="raised">
                Submit
              </Button>
              <div className="social-bar">
                <div className="social-bar-content">
                  <div>
                    <a href="http://localhost:8080/auth/google">
                      <i className="fa fa-google-plus-square social-icon" aria-hidden="true"></i>
                    </a>
                    <i className="fa fa-facebook-square social-icon" aria-hidden="true"></i>
                    <i className="fa fa-twitter-square social-icon" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}
