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
  componentDidMount() {

  }
  render() {
    return (<CSSTransitionGroup transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      <section class="g-min-height-80vh g-flex-centered g-bg-cover g-bg-pos-top-center  g-bg-black-opacity-0_5--after" style={{ backgroundImage: `url(${foto})`, backgroundSize: 'cover', }}>

        <div class="container g-z-index-1 g-py-40 g-opacity-0_8">
          <div class="row ">
            <div class="col-md-6 col-lg-5 align-self-center">
              <div class="g-bg-white g-rounded-0 g-pa-50 g-pa-30--md">
                <h3 class="h6 g-color-black g-font-weight-600 text-uppercase text-center g-mb-25">Calculate shipping cost</h3>

                <form>
                  <div class="form-group g-mb-20 g-mb-20--md">
                    <input class="form-control h-100 g-pa-15  form-control rounded-0 form-control" type="text" placeholder="Book/CD/Vinyl" />
                  </div>
                  <div class="form-group g-mb-40 g-mb-40--md">
                    <input class="form-control h-100 g-pa-15  form-control rounded-0 form-control" type="text" placeholder="City" />
                  </div>

                  <button class="btn btn-md btn-block text-uppercase u-btn-primary g-font-weight-700 g-font-size-12 g-brd-none g-rounded-0 g-py-12 g-px-15" type="submit">Search</button>
                </form>
              </div>
            </div>

            <div class="col-md-6 col-lg-7 g-hidden-sm-down align-self-center g-color-white">
              <h2 class="text-uppercase g-line-height-1 g-font-weight-700 g-font-size-40 g-font-size-56--md g-color-white g-mb-30">Planning
                  <br/> Shiping</h2>
                <h3 class="text-uppercase g-font-weight-700 g-font-size-18 g-color-white g-mb-20">Delivering anything to anywhere</h3>
                <p class="g-font-size-default g-color-white-opacity-0_8 g-mb-35">Maecenas lacus magna, pretium in congue a, pharetra at lacus. Nulla neque justo, sodales vitae dui non, imperdiet luctus libero.</p>
                <a class="btn btn-md text-uppercase u-btn-primary g-font-weight-700 g-font-size-12 g-brd-none g-rounded-4 g-py-12 g-px-25" href="#">Learn more</a>
              </div>
            </div>
          </div>
      </section>
    </CSSTransitionGroup>
      );
    }
  }
