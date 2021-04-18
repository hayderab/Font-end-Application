// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { EditOutlined, SettingOutlined , DeleteOutlined} from '@ant-design/icons';
import DeleteIcon from '@material-ui/icons/Favorite';
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
// import UserContext from '../contexts/user';

import React, { useState, Context } from 'react';

const { Meta } = Card;


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class FavCard extends React.Component {
    state = { visible: false };
    constructor() {
        super();
        this.state = {
            show: false,
        };
    }

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
                            src="https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" />
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




