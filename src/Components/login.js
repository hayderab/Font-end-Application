import React from 'react';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Form, Input, Button } from 'antd';
import UserContext from '../contexts/user';
import {Redirect } from 'react-router-dom'

 


// add some layout to keep the form organised on different screen sizes
// const formItemLayout = {
//   labelCol: { xs: { span: 24 }, sm: { span: 6 } },
//   wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
// };
// const tailFormItemLayout = {
//   wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
// };

// // define validation rules for the form fields
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];


const passwordRules = [
    { required: true, message: 'Please input your password!' }
];


// const usernameRules = [
//     { required: true, message: 'Please input your username!', whitespace: true }
// ]

const useStyles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1444212477490-ca407925329e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.login  = this.login.bind(this);
  }

  state = {redirect: null}

   static contextType = UserContext;

    login(values) {
    // console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    // console.log(`logging in email: ${email}`)

    fetch('http://localhost:5000/api/users/login',{
      credentials: 'include',
      method: 'POST',
      body:JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
      }
    })
    // .then(response => response.status())
    // .then(response => response.json())
    .then(user => {
        // window.location.assign('/')
        if(user.status === 400){
          alert("invalide credientials")
        }
        else{
          this.setState({redirect:'/'});
          // console.log(user.sigupcode);
          this.context.login(user);
        }
    })
    .catch(error => {
        // TODO: show nicely formatted error message
        console.log('Login failed');
    });
  };


  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
      }  
    return (
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Login
          </Typography>
              <Form {...formItemLayout} name="register" className={classes.form} onFinish={this.login} scrollToFirstError >

          <Form.Item name="email" label="E-mail" rules={emailRules} >
              <Input />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
              <Input.Password />
          </Form.Item>
      

          {/* <Form.Item name="username" label="Username" rules={usernameRules} >
              <Input />
          </Form.Item> */}

          <Form.Item {...tailFormItemLayout} >
              <Button type="primary"  htmlType="submit">
                  Login
              </Button>
          </Form.Item>
        </Form>
        </div>
      </Grid>
    </Grid>
    );
  };
};
export default withStyles(useStyles)(LoginForm) ;