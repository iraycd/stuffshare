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
import ForgotPasswordRedirect from './User/Scenes/ForgotPasswordRedirect/index.jsx';
import AuthorizeUser from './User/Scenes/AuthorizeUser/index.jsx';
import UserAccount from './User/Components/UserAccount/index.jsx';
import ImageLightbox from '../Components/ImageLightbox/index.jsx';
import RouterAuth from '../Components/RouterAuth/index.jsx';
import SignInModal from './User/Components/SignInModal/index.jsx';
import VerifyImage from './Blob/Component/VerifyImage/index.jsx';
import BodyLoader from '../Components/Loader/BodyLoader/index.jsx';
import Item from './Items/Components/Item/index.jsx';
import NewItem from './Items/Components/NewItem/index.jsx';
import Categories from './Categories/index.jsx';


class App extends React.Component {

  constructor() {
    super();

  }
  render() {
    let body = <div></div>;
    let loader = <div></div>;
    if (this.props.loader.INITIAL_ACTION_LOADING == true) {
      loader = (<BodyLoader withImg={true} zIndex={3} heightClass=" g-min-height-100vh" height="100vh" size="130px" progress={50} />);

      /*
      loader = (<div id="loading-wrapper">
        <img src={logo} class="position-absolute" />
        <div id="loading-text">LOADING...</div>
        <div id="loading-content" className="loading-content"></div>
      </div>);*/
    } else {

      body = (<div>
        <Notification />
        <ImageLightbox />

        <Header />

        <Switch>
          <Route exact path={"/"} component={Home} />
          <RouterAuth path={"/dictionary"} component={Dictionary} />
          <RouterAuth path={"/categories"} component={Categories} />
          <Route path={"/forgot_password/:uid"} component={ForgotPasswordRedirect} />
          <Route path={"/authorize/:uid"} component={AuthorizeUser} />
          <RouterAuth path={"/userAccount"} component={UserAccount} />
          <RouterAuth path={"/user/:id"} component={UserAccount} />
          <Route path={"/login/"} component={SignInModal} />
          <RouterAuth path={"/verifyImage"} component={VerifyImage} />
          <RouterAuth exact={true} path={"/item/new"} component={NewItem} />
          <Route path={"/item/:id"} component={Item} />

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