/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { Alert } from 'reactstrap';
import { Enums, Translator } from './../../../../../Shared/index.js';
import { NOTIFICATIONS_ACTIONS } from './../../../../App/index.js';






class Notification extends React.Component {

    constructor() {
        super();

    }


    onDismiss(event) {
        console.log(event.currentTarget)
        this.props.removeNotification(event.currentTarget.getAttribute('data-tag'));
    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    }
    closeAll() {
        this.props.notification.map((item, index) => {
            this.props.removeNotification(this.props.removeNotification.length - 1);
        });

    }
    render() {
        this.init();

        let body = <div></div>;
        if (this.props.notification.length > 0) {
            //<div className="background-alert" onClick={this.closeAll.bind(this)}></div>
            body = (<div>



                <div className="g-pos-abs g-right-15 g-width-360 g-top-35  g-width-360" style={{ zIndex: 5000, top: "50px" }} >
                    <CSSTransitionGroup transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={500}

                    >
                        {this.props.notification.map((item, index) => {
                            let color = '';

                            let icon = '';
                            let header = '';
                            let className = '';
                            if (item.type == Enums.CODE.ERROR_GLOBAL) {
                                color = "danger";
                                icon = "fa fa-minus-circle";
                               // header = 'ERROR';
                            } else if (item.type == Enums.CODE.INFO_GLOBAL) {
                                color = "info";
                                icon = "fa fa-info-circle";
                               // header = 'INFO';
                            }
                            else if (item.type == Enums.CODE.WARNING_GLOBAL) {
                                color = "warning ";
                                icon = "fa fa-exclamation-triangle";
                                //header = 'WARNING';
                            }
                            else if (item.type == Enums.CODE.SUCCESS_GLOBAL) {
                                color = "success ";
                                icon = "fa fa-check-circle-o";
                               // header = 'SUCCESS';
                                className = "g-bg-teal-opacity-0_9 g-color-white"
                            }
                            return (<Alert color={color} data-tag={item.guid} className={" g-mb-10 rounded-0 g-brd-none text-center g-cursor-pointer d-block u-block-hover u-block-hover--scale-down " + className} key={index} onClick={this.onDismiss.bind(this)} >
                                <button data-tag={item.guid} type="button" class="close u-alert-close--light" aria-label="Close">
                                    <span data-tag={item.guid} aria-hidden="true">×</span>
                                </button>
                                <div class="media" data-tag={item.guid} >
                                    <span class="d-flex g-mr-10 g-mt-5">
                                        <i class={icon}></i>
                                    </span>
                                    <span class="media-body text-left g-letter-spacing-2">
                                        <strong>{header}</strong>{" " + item.message}
                                    </span>
                                </div>


                            </Alert>)
                        })}
                    </CSSTransitionGroup>
                </div>

            </div >);
        }
        return body



    }
}
// class="alert alert-danger alert-dismissible fade show alert-absolute text-center  u-shadow-v11 pointer rounded-0" data-dismiss="alert" role="alert" key={index}>
const mapStateToProps = (state) => {

    return {

        lang: state.LanguageReducer,
        codeDict: state.DictionaryReducer,
        notification: state.NotificationReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification: (data) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL,
                notification: data
            });

        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);