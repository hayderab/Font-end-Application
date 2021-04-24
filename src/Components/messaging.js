import React, { Component } from "react";
import { MDBBadge, MDBIcon } from "mdbreact";
import { Avatar, Image, Card, Icon, Form, List, Row, Col, Input, Button } from 'antd';
import "./ChatPage.css";
import "../App.css"
import { LoadingOutlined, DeleteOutlined} from '@ant-design/icons';

const { TextArea } = Input;


class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      value: "",
      id: null,
      messageid: null,
      friends: [
        {
          name: "Employee",
          message: "Click to send message...",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          id: ""
        }
      ],
      messages: [
        {
          author: "Brad Pitt",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          when: "12 mins ago",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua."
        },
        {
          author: "Lara Croft",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          when: "13 mins ago",
          message:
            " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        },
        {
          author: "Brad Pitt",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          when: "14 mins ago",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua."
        }
      ]
    };

  }
  handleChange = e => {

    this.setState({
      value: e.target.value,
    });
  }
  participents = () => {
    // console.log(this.state.id)
    this.setState({
      id: "6070d30102d9053060a0998d"
    })
  }

  handleSubmit = () => {
    console.log(this.state.id)
    var msg = { "topic": "breed", "text": this.state.value }
    console.log(msg)
    const url = "http://localhost:5000/api/message/createmessage/?id=6070d30102d9053060a0998d";
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
    const url = "http://localhost:5000/api/message/getMessage/?id=6070d30102d9053060a0998d"
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
  // componentDidUpdate(){
  //   this.getMessage();
  // }




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
       <Card style={{ marginTop: 16,  marginLeft: "20%",  marginRight:16,marginBottom: 30, width:"55%",backgroundColor: "#D3D3D3" }} colour="grey" hoverable>
          <Row className="px-lg-2 px-2">
            <Col>
              <h6 className="font-weight-bold mb-3 text-lg-left">Member</h6>
              <div className="white z-depth-1 p-3" >
                <Card className="friend-list" onClick={this.participents}>
                  {this.state.friends.map(friend => (
                    <Friend key={friend.name} friend={friend} />
                  ))}
                </Card>
              </div>
              {/* </ScrollArea> */}
            </Col >
            <Col style={{ width: 50 }}/>
            <Col>
              <div style={{ overflow: "auto", width: "500px", height: "500px", display:"bottom" }}>
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

const Friend = ({
  friend: { name, avatar, message, when, toRespond, seen, active }
}) => (
  <List.Item
    href="#!"
    className="d-flex justify-content-between p-2 border-light"
    style={{ backgroundColor: active ? "#eeeeee" : "" }}
  >
    <Avatar
      tag="img"
      src={avatar}
      alt="avatar"
      circle
      className="mr-2 z-depth-1"
    />
    <div style={{ fontSize: "0.95rem" }}>
      <strong>{name}</strong>
      <p className="text-muted">{message}</p>
    </div>
    <div>
      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        {when}
      </p>
      {seen ? (
        <span className="text-muted float-right">
          <MDBIcon className="fa-check" aria-hidden="true" />
        </span>
      ) : toRespond ? (
        <MDBBadge color="danger" className="float-right">
          {toRespond}
        </MDBBadge>
      ) : (
        <span className="text-muted float-right">
          <MDBIcon icon="reply" aria-hidden="true" />
        </span>
      )}
    </div>
  </List.Item>
);




export default ChatPage;


class Messaging extends Component {

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
              style={{ width: 450}}
              actions={[
                <DeleteOutlined key="del"  onClick={this.delMessage}/>
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
