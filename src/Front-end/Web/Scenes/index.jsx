/*
    ./client/components/App.jsx
*/

import React from 'react';
import Header from './Layout/Header/index.jsx';
import Footer from './Layout/Footer/index.jsx';
import Home from './Layout/Home/index.jsx';
import Dictionary from './Dictionary/index.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './../assets/img/logo/logo-2.png';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import Notification from './Layout/Notifications/index.jsx';
class App extends React.Component {

  constructor() {
    super();

  }
  render() {
    let body = null;
    let loader = null;
    if (this.props.loader.INITIAL_PROGRESS < 100) {
      loader = (<div id="loading-wrapper">
        <img src={logo} class="position-absolute" />
        <div id="loading-text">LOADING <br />{this.props.loader.INITIAL_PROGRESS + "%"}</div>
        <div id="loading-content"></div>
      </div>);
    } else {

      body = (<div>
        <Notification />
        <Header />

        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/dictionary"} component={Dictionary} />
        </Switch>
        <Footer />
      </div>);

    }
    return (
      <CSSTransitionGroup transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {body}{loader}

      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    loader: state.LoaderReducer,

  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
/*  <div id="loading-wrapper">
                <img src={logo} className="position-absolute" />
                <div id="loading-text">LOADING <br/>{loader+"%"}</div>
                <div id="loading-content"></div>
            </div>
*/