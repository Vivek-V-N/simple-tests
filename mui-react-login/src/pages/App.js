import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Appbar from 'muicss/lib/react/appbar'
import { loginUser, setActiveTab } from '../actions'
import Container from 'muicss/lib/react/container';
import LoginPage from './LoginPage'

const doLogin = ({ user, password}) => {
  loginUser(user, password)
}

class App extends Component {
  static propTypes = {
    user: PropTypes.string,
    activeTab: PropTypes.string,
    loginUser: PropTypes.func.isRequired,
    children: PropTypes.node,
    setActiveTab: PropTypes.func.isRequired,
    isLoading: PropTypes.bool

  }

  handleTabChange = e => {
    console.log("Changing tab");
    browserHistory.push('/'+this.props.user+'/'+e.tab);
  }

  renderChildren = children => {
    console.log("STATE IS LOADING: " + this.props.isLoading);
    if(this.props.isLoading === false)
      return children;
    else return (
      <div className="cssload-box-loading">
      </div>
    );
  }

  componentWillReceiveProps( nextProps ) {
//    if (this.props.user === null && nextProps.user !== null)
//      browserHistory.push('/'+this.props.user+'/dashboard');
  }

  renderMain() {
    let s1 = {verticalAlign: 'middle'};
    let s2 = {textAlign: 'right'};
    const { children } = this.props;
    return(
      <Container fluid={true} className="app-main">
        <Appbar className="appbar">
        </Appbar>
        <div className="content">
          {this.renderChildren(children)}
        </div>
      </Container>
    );
  }


  componentWillMount() {
    //To do things on start
  }

  componentWillReceiveProps(nextProps) {
    //To dynamically update on prop update
  }

  render() {
    console.log("USER: " +this.props.user);
    if(this.props.activeTab.indexOf('login')>-1 )
      return <LoginPage />
    else
      return this.renderMain();
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const user = state.profile === null? null:state.profile._id;
  const activeTab = state.activeTab;
  const isLoading = state.isLoading?state.isLoading:false;

  return {
    user,
    activeTab: ownProps.location.pathname.substring(ownProps.location.pathname.lastIndexOf('/')+1),
    isLoading
  }
}

export default connect(mapStateToProps, {
  loginUser,
  setActiveTab
})(App)
