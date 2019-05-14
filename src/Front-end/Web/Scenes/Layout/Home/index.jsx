/*
    ./client/components/App.jsx
*/

import React from 'react';

import { CSSTransitionGroup } from 'react-transition-group';
import foto from './stock-photo-retro-music-hero-header-596721026.jpg';
import SearchFreetext from '../../Search/Scenes/SearchFreetext/index.jsx';
import WrapperAuth from '../../../Components/WrapperAuth/index.jsx';
import Login from '../../User/Scenes/Login/index.jsx';
import Register from '../../User/Scenes/Register/index.jsx';


export default class Home extends React.Component {

  constructor() {
    super();
    console.log(this)

  }
  componentDidMount() {

  }
  render() {
    
    return (<CSSTransitionGroup transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      <section class="g-min-height-80vh g-flex-centered g-bg-cover g-bg-pos-top-center  g-bg-black-opacity-0_5--after" style={{ backgroundImage: `url(${foto})`, backgroundSize: 'cover', }}>
        <WrapperAuth>
          <SearchFreetext></SearchFreetext>
        </WrapperAuth>
        <WrapperAuth isLogged={false}>
          <div class=" w-100  g-flex-centered  g-z-index-1 g-py-40 ">
            <div class=" g-bg-white-opacity-0_9 g-flex-centered align-self-center g-mx-20">
              <div class=" align-self-center g-pa-10">
                <Login  borderClass="1"></Login>

              </div>
            </div>
            <div class=" g-bg-white-opacity-0_9 g-flex-centered align-self-center  g-mx-20 g-width-560">
              <div class=" align-self-center g-pa-10 w-100">
                <Register borderClass="1"></Register>

              </div>
            </div>
          </div>
        </WrapperAuth>

      </section>
    </CSSTransitionGroup>
    );
  }
}
