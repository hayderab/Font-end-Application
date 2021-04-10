// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import React, { useState } from 'react';

const { Meta } = Card;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    string: '${label} is not a valid email!',
    string: '${label} is not a valid number!',
  },

};


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Promise((resolve, reject) => {
      return reject(response);
    });
  }
}

class CardView extends React.Component {
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

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props._id !== prevProps._id) {
  //     console.log(this.props._id)
  //   }
  // }

  onFinish = values => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    const url = 'http://localhost:5000/api/dogs/update/' + this.props._id;
    fetch(url, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // .then(function(data) {
      //   console.log(".................",data.status);
      //   if (data.stus  == 403){alert("permission Denied")}
      //   return data.json();
      // })
      // .then(response => response.JSON(message)})
      .then(data => {
        // TODO: display success message and/or redirect
        console.log(data.status);
        if (data.status === 403) {
          alert("permission denied")
        } else {
          alert("Dogs updated")
        }


      })
      .catch(error => {
        alert(`Error: error}`);
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
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={this.showModal} />,
            <FavoriteIcon key="fav" />

            // <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <h1>{this.props.name}</h1>
          <p>{this.props.type}</p>
          <p>{this.props.location}</p>
          <p>{this.props.avilable.toString()}</p>
          <p>{this.props.dateUpdated}</p>

          <>
            <Modal title="Update Dogs" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
              <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ type: "string" }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="location" label="Select">
                  <Select>
                    <Select.Option value="Coventry">Coventry</Select.Option>
                    <Select.Option value="London">London</Select.Option>
                    <Select.Option value="Birmingham">Birmingham</Select.Option>
                    <Select.Option value="Luton">Luton</Select.Option>
                    <Select.Option value="Bradford">Bradford</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="avilable" label="Avilable" rules={[{ type: "string" }]}>
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit"  >
                    Submit
        </Button>
                </Form.Item>
              </Form>
            </Modal>
          </>
        </Card>
      </div>

    );
  }

}


export default CardView;




