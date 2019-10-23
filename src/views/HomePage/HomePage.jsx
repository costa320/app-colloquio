import React, {Component} from 'react';
/* COMPONENTS */

/* Styles */
import L, {mainContainer} from '../../assets/styles/less/views/HomePage.less';
import '../../assets/styles/sass/homePage.scss';
import '../../assets/styles/sass/homePage1.scss';

export default class HomePage extends Component {

    render() {
        return (
            <div className="">

                <span className={mainContainer + ''}>Colore Verde -less</span>

                <div id='COMPONENT'>
                    <span className={'mainContainer_ '}>Colore rosso -scss file 1</span>
                </div>
                <span className={'mainContainer_ '}>Colore Verde -scss file 2</span>
            </div>
        );
    }
}