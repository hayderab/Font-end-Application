// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
// import UserContext from '../contexts/user';

import React from 'react';


/**
 * Shows the user favourites. Gets data from favGrid 
 * as prop and maps on multiple cards.
 */

class FavCard extends React.Component {
    state = { visible: false };
    constructor() {
        super();
        this.state = {
            show: false,
        };
    }
   /**
    * show or hide component.
    */
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    clickCard = () => {
        alert(this.props._id);
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div className="site-card-border-less-wrapper">
                <Card title="Card title" hoverable bordered={false}

                    style={{ width: 300 }}
                    cover={
                        <img
                            onClick={this.clickCard}
                            alt="example"
                            src={`https://fast-couple-5000.codio-box.uk/${this.props.imageUrl}`} />
                    }
                    actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" onClick={this.showModal} />,
                        <DeleteOutlined key="fav" DeleteOutlined  />
                    ]}
                >
                    <h1>{this.props.name}</h1>
                    <p>{this.props.type}</p>
                    <p>{this.props.location}</p>
                    <p>{this.props.avilable.toString()}</p>
                    <p>{this.props.dateUpdated}</p>
                </Card>
            </div>

        );
    }

}

export default FavCard;




