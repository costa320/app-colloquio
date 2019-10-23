import React, {Component} from 'react';
/* REDUX */

/* Styles */
import App_less from '../assets/styles/less/app.less';
import App_css from '../assets/styles/css/app.css';

export default class App extends Component {

    render() {
        return (
            <div>
                <span className={App_less.color_blue}>HELLO from LESS!
                </span><br/>
                <span className={App_css.color_red}>HELLO from normal CSS3!
                </span>
            </div>

        );
    }
}