// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { EditOutlined, SettingOutlined,EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
import { Modal, Button, Form, Select, Input} from 'antd';
import UserContext from '../contexts/user';

import React from 'react';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    string: '${label} is not a valid email!',
  },

};

class CardView extends React.Component {
  state = { visible: false };

  constructor() {
    super();
    this.state = {
      show: false,
      fileSelected: null

    };
  }

  static contextType = UserContext;


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
   
  info = () =>{
    Modal({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };
   
  SelectFile = event => {
    this.setState({
      fileSelected: event.target.files[0]
    });
  }
  addFav = () => {
    alert(this.props._id);
    fetch(`http://localhost:5000/api/users/addtofav/${this.props._id}`,
      {
        method: 'POST',
        credentials: "include"
      })
      .then(data => {
        // TODO: display success message and/or redirect
        console.log(data.status);
        if (data.status === 403) {
          alert("permission denied")
        } else {
          alert("Dog added to favourite")
        }
      })
      .catch(error => {
        alert(`Error: error}`);
      });
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props._id !== prevProps._id) {
  //     console.log(this.props._id)
  //   }
  // }

  onDeleteClick = () => {
    //DELETE using /api/v1/dogs/:id
    const url = 'http://localhost:5000/api/dogs/delete/' + this.props._id;
    const response = fetch(url, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    // Store response in json format
    console.log(response);
    alert(this.props.name + " has been deleted!");
    window.location.href = "/";
  }



  onFinish = values => {
    console.log('Received values of form: ', values);

    const fd = new FormData();
    fd.append("_id", this.props._id)
    fd.append("name", values.name)
    fd.append("type", values.type)
    fd.append("location", values.location)
    fd.append("avilable", values.avilable)
    fd.append("imageUrl", this.state.fileSelected)
    const url = 'http://localhost:5000/api/dogs/update/' + this.props._id;
    fetch(url, {
      credentials: 'include',
      method: 'PUT',
      // body: JSON.stringify(data),
      body: fd
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
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
    const loggedIn = this.context.user.loggedIn;
    const sigupCode = this.context.user.sigupcode;

    if (!loggedIn) {
      return (
        <div className="site-card-border-less-wrapper">
          <Card title="Card title" hoverable bordered={false}
            style={{ width: 300 }}
            cover={
              <img
                onClick={this.clickCard}
                alt="example"
                src={`http://localhost:5000/${this.props.imageUrl}`}
                // src="https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" 
                />
            }
          >
            <h1>{this.props.name}</h1>
            <p>Type:                {this.props.type}</p>
            <p>Location:            {this.props.location}</p>
            <p>Avilable:            {this.props.avilable.toString()}</p>
            <p>Dog Updated:         {this.props.dateUpdated}</p>
          </Card>
        </div>
      );
    } else if (loggedIn === true && sigupCode === true) {
      return (
        <div className="site-card-border-less-wrapper">
          <Card title="Card title" hoverable bordered={false}

            style={{ width: 300 }}
            cover={
              <img
                onClick={this.clickCard}
                alt="example"
                // src="http://localhost:5000/uploads/1618693523270dogs.jpg" 
                src={`http://localhost:5000/${this.props.imageUrl}`}

              />
            }
            actions={[
              <EditOutlined key="edit" onClick={this.showModal} />,
              <DeleteOutlined key="delete" DeleteOutlined onClick={this.onDeleteClick} />,
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
                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} encType="multipart/form-data">
                  <Form.Item name="name" label="Name" rules={[{ required: true }]} >
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
                  <Form.Item >
                    <input
                      type="file"
                      fileName="imgeUrl"
                      onChange={this.SelectFile}
                      className="form-control-file"
                    />
                    {/* <Button onClick={this.fileUpload}>test</Button> */}
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
    return (
      <div className="site-card-border-less-wrapper">
        <Card title="Card title" hoverable bordered={false}

          style={{ width: 300 }}
          cover={
            <img
              onClick={this.clickCard}
              alt="example"
              src={`http://localhost:5000/${this.props.imageUrl}`}
              // src="https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
               />

          }
          actions={[
            <EllipsisOutlined key="setting" />,
            <FavoriteIcon key="fav" onClick={this.addFav} />
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


export default CardView;




