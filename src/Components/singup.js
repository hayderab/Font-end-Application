import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Form, Input, Button, Select } from 'antd';
import { Redirect } from 'react-router-dom'

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

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};
/**
 * Reference: Validation code is used from labs along
 *  with other stracture then build everthing upon that
 */
const emailRules = [
  { type: 'email', message: 'The input is not valid E-mail!' },
  { required: true, message: 'Please input your E-mail!' }
];

const firstName = [
  { required: true, message: 'First Name' }
];
const lastName = [
  { required: true, message: 'Last Name' }
];
const passwordRules = [
  { required: true, message: 'Please input your password!' }
];
const sigupCode = [
  { message: 'Employee Only' }
];
const confirmRules = [
  { required: true, message: 'Please confirm your password!' },
  // rules can include function handlers in which you can apply additional logic
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords that you entered do not match!');
    }
  })
];


/**
 * deals with creating user account, send post request to users, 
 * 
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  state = {redirect: null}

  onFinish = (values) => {

    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('http://localhost:5000/api/users', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),

    }).then(response => response.json())
      .then(data => {
        // TODO: display success message and/or redirect
        this.setState({ redirect: '/signin' });
        // /window.location.assign('/signin')
        alert("User added")
      })
      .catch(error => {
        // TODO: show nicely formatted error message and clear form
        alert(`Error: error}`);
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
              Register
          </Typography>
            <Form {...formItemLayout} className={classes.form} name="register" onFinish={this.onFinish} scrollToFirstError >
              <Form.Item name="firstName" label="First Name" rules={firstName} >
                <Input />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name" rules={lastName} >
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
              <Form.Item name="email" label="E-mail" rules={emailRules} >
                <Input />
              </Form.Item>
              <Form.Item name="sigupcode" label="Sign-up Code">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
              </Form.Item>
              {<Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
                hasFeedback rules={confirmRules}>
                <Input.Password />
              </Form.Item>}
              <Form.Item {...tailFormItemLayout} >
                <Button type="primary" htmlType="submit">
                  Register
              </Button>
              </Form.Item>
            </Form>
          </div>
        </Grid>
      </Grid>
    );
  }


}
export default withStyles(useStyles)(Login);
