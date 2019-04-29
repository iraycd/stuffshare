/*
    ./client/components/App.jsx
*/

import React from 'react';

import { CSSTransitionGroup } from 'react-transition-group';
import foto from './stock-photo-retro-music-hero-header-596721026.jpg';
export default class Home extends React.Component {

  constructor() {
    super();
    console.log(this)

  }
  componentDidMount()
  {
  
  }
  render() {
    return (<CSSTransitionGroup transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      <section class="g-min-height-100vh g-flex-centered g-bg-cover g-bg-pos-top-center  g-bg-black-opacity-0_5--after" style={{backgroundImage: `url(${foto})`, backgroundSize: 'cover', }}>
     
        <div class="container g-color-white text-center g-z-index-1 g-py-100">

          <div class="g-mb-80">
          
          
          </div>

         
        
        </div>
      </section>
    </CSSTransitionGroup>
    );
  }
}
