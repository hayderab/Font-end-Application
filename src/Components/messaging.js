import React, { Component } from "react";
import {Card, Form, List, Row, Col, Input, Button } from 'antd';
// import "./ChatPage.css";
import "../App.css"
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';

const { TextArea } = Input;


class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      value: "",
      reciverid: null,
      messageid: null,
      friends: [
        {
          name: "Employee",
          message: "Click to send message...",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          id: "A"
        },
      ],

    };

  }


  handleChange = e => {

    this.setState({
      value: e.target.value,
    });
  }
  // participents = () => {
  //   // console.log(this.state.id)
  //   alert(this.friend.name)
  //   this.setState({
  //     id: "6070d30102d9053060a0998d"
  //   })
  // }

  handleSubmit = () => {
    console.log(this.state.id)
    var msg = { "topic": "breed", "text": this.state.value }
    console.log(msg)
    const url = "https://fast-couple-5000.codio-box.uk/api/message/createmessage/?id=6070d30102d9053060a0998d";
    fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .catch(err => console.log("Error sending message... "));
    if (!this.state.value) {
      return;
    }
  }


  getMessage() {
    // const url = "http://localhost:5000/api/message/getMessage/?id=6070d30102d9053060a0998d"
    const url = "https://fast-couple-5000.codio-box.uk/api/message/getMessage/"
    fetch(url, {
      credentials: "include",
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ posts: data })
      })
      .catch(err => console.log("Error fetching dogs"));
  }


  componentDidMount() {
    this.getMessage();
  }
  componentDidUpdate() {
    this.getMessage();
  }




  render() {
    if (!this.state.posts.length) {
      return <LoadingOutlined />
    }

    const messagesList = this.state.posts
      .map(post => {
        return (
          <div style={{ padding: "10px" }} key={post._id}>
            <Col span={2}>
              <Messaging {...post} />
            </Col>
          </div>
        )
      });
    return (
      <Card style={{ marginTop: 16, marginLeft: "20%", marginRight: 16, marginBottom: 30, width: "55%", backgroundColor: "#D3D3D3" }} colour="grey" hoverable>
        <Row className="px-lg-2 px-2">
          <Col>
            <h6 className="font-weight-bold mb-3 text-lg-left">Member</h6>
            <div className="white z-depth-1 p-3" >
              {this.state.friends.map(friend => (
                // <Friend key={friend.name} friend={friend} />
                <Card className="friend-list" onClick={this.participents = () => {
                  this.setState({
                    reciverid: friend.id
                  })
                  alert(this.state.reciverid)
                }}>
                  {friend.name}
                </Card>
              ))}
            </div>
            {/* </ScrollArea> */}
          </Col >
          <Col style={{ width: 50 }} />
          <Col>
            <div style={{ overflow: "auto", width: "500px", height: "500px", display: "bottom" }}>
              <Col>
                {messagesList}
              </Col>
            </div>
            <br></br>
            <div className="form-group basic-textarea">
              <Form.Item>
                <TextArea rows={4}
                  onChange={this.handleChange} value={this.state.value}
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" onClick={this.handleSubmit}>
                  Send Message
                          </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Card>

    );
  }
}


export default ChatPage;


class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  static contextType = UserContext;

  componentDidMount() {
    const sigupCode = this.context.user.sigupcode;
    if (sigupCode === true) {
      this.setState({
        visible: true
      })
    }
  }
  delMessage = () => {

    // console.log(this.props._id)
    const url = 'http://localhost:5000/api/message/delete?id=' + this.props._id;
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
    alert(this.props._id + " has been deleted!");
  }


  render() {
    return (
      <div>
        <List className="list-unstyled pl-3">
          <>
            <Card type="inner"
              hoverable title={this.props.sender.firstName}
              bordered={false}
              style={{ width: 450 }}
              actions={[
                this.state.visible ?
                  <DeleteOutlined key="del" onClick={this.delMessage} /> : null,
              ]}>
              <p>{this.props.text}</p>
              <p>{this.props.createdAt}</p>
            </Card>
            <br>
            </br>
          </>
        </List>
      </div>
    )
  }
}
// export default Messaging;
