/*
    ./client/components/App.jsx
*/

import React from 'react';

import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Row, Container, Col } from 'reactstrap';

import { Translator } from './../../../../../Shared/index.js';
import UserModal from './../../User/index.modal.jsx';
import UserHeader from './../../User/index.jsx';

import './../../../assets/js/helpers/hs.hamburgers.js';
import './../../../assets/js/components/hs.header.js';
import './../../../assets/js/components/hs.go-to.js';
import './../../../assets/vendor/typedjs/typed.min.js';
import './../../../assets/vendor/hs-megamenu/src/hs.megamenu.js';
import './../../../assets/js/components/hs.popup.js';
import './../../../assets/js/components/hs.dropdown.js';
import logo from './../../../assets/img/logo/logo-1.png';
import { LANGUAGE_ACTIONS,USER_ACTIONS } from './../../../../App/index.js';
import { Link } from 'react-router-dom';




class Header extends React.Component {

  constructor() {
    super();
    this.state = { open: false }
    setTimeout(() => {
      $.HSCore.components.HSHeader.init($('#js-header'));
      $.HSCore.helpers.HSHamburgers.init('.hamburger');

      // Initialization of HSMegaMenu plugin
      $('.js-mega-menu').HSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 991
      });
      $.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {

      });
      // Initialization of masonry.js

      $.HSCore.components.HSGoTo.init('.js-go-to');
    }, 1000);

  }


  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    this.open = false;
    switch (this.props.lang) {
      case 'us': this.language = this.tran.translate('LANG_ENGLISH_LABEL'); break;
      case 'pl': this.language = this.tran.translate('LANG_POLISH_LABEL'); break;
      default: return 'brak';

    }
  }

  render() {
    this.init();
    console.log(this.state);
    return (
      <header id="js-header" className="u-header u-header--static u-header--toggle"
        data-header-fix-moment="500"
        data-header-fix-effect="slide">
        <div className="u-header__section u-header__section--hidden u-header__section--dark g-bg-black g-transition-0_3 g-py-10">
          <Container>
            <Row className=" flex-column flex-sm-row justify-content-between align-items-center text-uppercase g-font-weight-600 g-color-white g-font-size-12 g-mx-0--lg">
              <Col xs="auto" >
                <ul className="list-inline g-overflow-hidden g-pt-1 g-mx-minus-4 mb-0">

                </ul>
              </Col>
             <UserHeader></UserHeader>
            </Row>
          </Container>
        </div>
        <div className="u-header__section u-header__section--light g-bg-white g-transition-0_3 "
          data-header-fix-moment-exclude="g-bg-white g-py-10"
          data-header-fix-moment-classes="g-bg-white-opacity-0_9 u-shadow-v18 g-py-3">
          <nav className="js-mega-menu navbar navbar-toggleable-md ">
            <div className="container">
              <button className="navbar-toggler navbar-toggler-right btn g-line-height-1 g-brd-none g-pa-0 g-pos-abs g-right-0" type="button"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navBar"
                data-toggle="collapse"
                data-target="#navBar">
                <span class="hamburger hamburger--slider">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </span>
              </button>
              <a href="/" className="navbar-brand">
                <img src={logo} alt="Image Description" />
              </a>
              <div className="collapse navbar-collapse align-items-center flex-sm-row g-pt-10 g-pt-5--lg g-mr-40--lg" id="navBar">
                <ul className="navbar-nav text-uppercase g-font-weight-400 ml-auto">
                  <li className="nav-item g-mx-10--lg g-mx-15--xl">
                    <Link to="/" className=" g-color-primary--hover nav-link g-py-7 g-px-0 ">{this.tran.translate('LANG_HOME_LINK_LABEL')}</Link>
                  </li>

                  <li class="nav-item hs-has-sub-menu g-mx-10--lg g-mx-15--xl  hs-event-prevented">
                    <a id="nav-link--home" class="nav-link g-py-7 g-px-0 g-color-primary--hover  " href="#" aria-haspopup="true" aria-expanded="false" aria-controls="nav-submenu--home">{this.tran.translate('ADMIN_LINK_LABEL')}</a>

                   
                    <ul class=" u-shadow-v11 nav-link hs-sub-menu list-unstyled g-brd-top g-brd-primary g-brd-top-2  g-min-width-220 g-py-7 g-mt-9 g-mt-15--lg--scrolling animated display-none" id="nav-submenu--home" aria-labelledby="nav-link--home"  >
                      <li class="dropdown-item "><Link to="/dictionary" className=" nav-link g-py-1 g-px-0  g-font-size-12 g-color-primary--hover">{this.tran.translate('DICTIONARY_LINK_LABEL')}</Link></li>
                      <li class="dropdown-item "><Link to="/dictionary" className=" nav-link g-py-1 g-px-0  g-font-size-12 g-color-primary--hover">{this.tran.translate('CATEGORY_LINK_LABEL')}</Link></li>

                    </ul>

                  </li>
                  <li class="hs-has-mega-menu nav-item g-mx-10--lg g-mx-15--xl"
                    data-animation-in="fadeIn"
                    data-animation-out="fadeOut"
                    data-position="right">
                    <a id="mega-menu-shortcodes" className="g-color-primary--hover nav-link g-py-7 g-px-0" href="#" aria-haspopup="true" aria-expanded="false">Search <i class="hs-icon hs-icon-arrow-bottom g-font-size-11 g-ml-7"></i></a>

                    <div class="w-100 hs-mega-menu u-shadow-v11 font-weight-normal g-brd-top g-brd-primary g-brd-top-2 g-bg-white g-mt-0 g-mt-3--lg--scrolling" aria-labelledby="mega-menu-shortcodes">
                      <ul class="nav justify-content-center u-nav-v5-1 u-nav-primary g-font-weight-600 g-brd-bottom--md g-brd-gray-light-v4"
                        data-tabs-mobile-type="slide-up-down"
                        data-destroy-res="768"
                        data-btn-classes="btn btn-md btn-block u-btn-outline-black">
                        <li class="nav-item">
                          <a class="nav-link g-color-primary--hover active g-py-10--md g-px-15--md" href="#tab-blocks"
                            role="tab"
                            data-toggle="tab">Books</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link g-color-primary--hover g-py-10--md g-px-15--md" href="#tab-bases"
                            role="tab"
                            data-toggle="tab">Music</a>
                        </li>
                      </ul>

                      <div class="tab-content">
                        <div class="tab-pane fade in active show" id="tab-blocks"
                          role="tabpanel">
                          <div class="row align-items-stretch no-gutters">
                            <div class="col-md-6 col-lg-3">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/headers/index.html" class="nav-link">Headers</a></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/promo/shortcode-blocks-promo.html" class="nav-link">Promo</a></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/footers/shortcode-blocks-footer-classic.html" class="nav-link">Footer classic</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/footers/shortcode-blocks-footer-contact-forms.html" class="nav-link">Footer contact forms</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/footers/shortcode-blocks-footer-maps.html" class="nav-link">Footer maps</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/footers/shortcode-blocks-footer-modern.html" class="nav-link">Footer modern</a></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-banners.html" class="nav-link">Banners</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-clients.html" class="nav-link">Clients</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-comments.html" class="nav-link">Comments</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-countdowns.html" class="nav-link">Countdowns</a></li>
                              </ul>
                            </div>

                            <div class="col-md-6 col-lg-3 g-brd-left--lg g-brd-gray-light-v5">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-counters.html" class="nav-link">Counters</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-cta-boxed.html" class="nav-link">CTA (boxed)</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-cta-full-width.html" class="nav-link">CTA (full width)</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-gallery.html" class="nav-link">Gallery</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-hero-info.html" class="nav-link">Hero info</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-hero-blocks.html" class="nav-link">Hero blocks</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-hero-content.html" class="nav-link">Hero content</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-icons.html" class="nav-link">Icons</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-icons-app.html" class="nav-link">Icons app</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-icons-interactive.html" class="nav-link">Icons interactive</a></li>
                              </ul>
                            </div>

                            <div class="col-md-6 col-lg-3 g-brd-left--lg g-brd-gray-light-v5">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-info-blocks.html" class="nav-link">Info blocks</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-news.html" class="nav-link">News</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-news-image.html" class="nav-link">News image</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-news-no-images.html" class="nav-link">News no images</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-news-small.html" class="nav-link">News small</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-tables.html" class="nav-link">Tables</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-pricing-plans.html" class="nav-link">Pricing plans</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-pricing-sections.html" class="nav-link">Pricing sections</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-pricing-table.html" class="nav-link">Pricing table</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-products.html" class="nav-link">Products</a></li>
                              </ul>
                            </div>

                            <div class="col-md-6 col-lg-3 g-brd-left--lg g-brd-gray-light-v5">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-products-advanced.html" class="nav-link">Products advanced</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-products-list.html" class="nav-link">Products list</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-products-overlay.html" class="nav-link">Products overlay</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-team.html" class="nav-link">Team</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-team-advanced.html" class="nav-link">Team advanced</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-testimonials.html" class="nav-link">Testimonials</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-testimonials-advanced.html" class="nav-link">Testimonials advanced</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-timelines.html" class="nav-link">Timelines</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-blocks-users.html" class="nav-link">Users</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div class="tab-pane fade in" id="tab-bases"
                          role="tabpanel">
                          <div class="row align-items-stretch no-gutters">
                            <div class="col-md-4">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-accrodions.html" class="nav-link">Accrodions</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-alerts.html" class="nav-link">Alerts</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-badges.html" class="nav-link">Badges</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-blockquotes.html" class="nav-link">Blockquotes</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-box-shadow.html" class="nav-link">Box shadow</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-breadcrumbs.html" class="nav-link">Breadcrumbs</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-buttons.html" class="nav-link">Buttons</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-dividers.html" class="nav-link">Dividers</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-dynamic-process-blocks-1.html" class="nav-link">Dynamic process blocks 1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-lightbox.html" class="nav-link">Lightbox</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-modals.html" class="nav-link">Modals</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-gallery-grid.html" class="nav-link">Gallery grid</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-gradient-backgrounds.html" class="nav-link">Gradient backgrounds</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-labels.html" class="nav-link">Labels</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-lists-group.html" class="nav-link">Lists group</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-media-audios.html" class="nav-link">Media audios</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-media-images.html" class="nav-link">Media images</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-media-videos.html" class="nav-link">Media videos</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-onscroll-animations.html" class="nav-link">Onscroll animations</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-paginations.html" class="nav-link">Paginations</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-panels.html" class="nav-link">Panels</a></li>
                              </ul>
                            </div>

                            <div class="col-md-4 g-brd-left--lg g-brd-gray-light-v5">
                              <ul class="list-unstyled g-py-7">
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-progress-bars.html" class="nav-link">Progress bars</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-static-process-blocks-1.html" class="nav-link">Static process blocks 1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-tables.html" class="nav-link">Tables</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-taglines.html" class="nav-link">Taglines</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-tags.html" class="nav-link">Tags</a></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-headings.html" class="nav-link">Headings</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-typography.html" class="nav-link">Typography</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-dropcaps.html" class="nav-link">Dropcaps</a></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-google-maps.html" class="nav-link">Google maps</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-vector-maps.html" class="nav-link">Vector maps</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/shortcode-base-maps-with-pins.html" class="nav-link">Maps with pins</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-bootstrap.html" class="nav-link">Forms bootstrap</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-unify.html" class="nav-link">Forms unify</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-horizontal-unify.html" class="nav-link">Forms horizontal unify</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-disabled-states-unify.html" class="nav-link">Forms disabled states unify</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-success-states-unify.html" class="nav-link">Forms success states unify</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/forms/shortcode-base-forms-error-states-unify.html" class="nav-link">Forms error states unify</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icons.html" class="nav-link">Icons</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-hovers.html" class="nav-link">Icon hovers</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-sizes.html" class="nav-link">Icon sizes</a></li>
                              </ul>
                            </div>

                            <div class="col-md-4 g-brd-left--lg g-brd-gray-light-v5">
                              <ul class="list-unstyled g-py-7">

                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-social-icons.html" class="nav-link">Social icons</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-fontawesome.html" class="nav-link">Icon fontawesome</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-line-icons-pro-1.html" class="nav-link">Icon line icons pro 1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-line-icons-pro-2.html" class="nav-link">Icon line icons pro 2</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-simple-line-icons.html" class="nav-link">Icon simple line icons</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/icons/shortcode-base-icon-et-line-icon.html" class="nav-link">Icon et line icon</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-1-1.html" class="nav-link">Tabs 1-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-1-2.html" class="nav-link">Tabs 1-2</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-2-1.html" class="nav-link">Tabs 2-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-2-2.html" class="nav-link">Tabs 2-2</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-3-1.html" class="nav-link">Tabs 3-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-4-1.html" class="nav-link">Tabs 4-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-5-1.html" class="nav-link">Tabs 5-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-5-2.html" class="nav-link">Tabs 5-2</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-5-3.html" class="nav-link">Tabs 5-3</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-6-1.html" class="nav-link">Tabs 6-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-7-1.html" class="nav-link">Tabs 7-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-8-1.html" class="nav-link">Tabs 8-1</a></li>
                                <li class="dropdown-item"><a href="unify-main/shortcodes/tabs/shortcode-base-tabs-8-2.html" class="nav-link">Tabs 8-2</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
        </div>

      </header>);
  }
}

const mapStateToProps = (state) => {

  return {

    lang: state.LanguageReducer,
    codeDict: state.DictionaryReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);