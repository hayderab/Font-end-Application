import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import { Button } from 'antd';
import { Menu, Layout } from 'antd';
import 'antd/dist/antd.css';
import UserContext from '../../contexts/user';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

const { Header } = Layout;

const Navbar = (props) => {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  console.log("checking if user logged ... ", loggedIn)
  const sigupCode = context.user.sigupcode;

  let LoginNav;
  if (!loggedIn) {
    return (
      LoginNav = (
        <div>
          <>
            <Nav>
              <NavLink to='/'>
                <img height="80px" width="80px" src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
              </NavLink>
              <Bars />
              <NavMenu>
                <NavLink to='/sign-up' activeStyle>
                  Sign Up
          </NavLink>
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
              </NavMenu>
              <NavBtn>
                <NavBtnLink to='/signin'>Sign In</NavBtnLink>
              </NavBtn>
            </Nav>
          </>
        </div>)
    )
  }
  else if (loggedIn == true && sigupCode == true) {
    LoginNav = (
      <>
        {/* <NavLink to="/add" activeStyle>
              <Button size="1px" type="dashed" ghost>Add Dog</Button>
            </NavLink>
            <NavLink to="/" onClick={context.logout} activeStyle>
              logout
          </NavLink> */}
        <Header style={{ float: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" onClick={context.logout} style={{ float: 'right' }}>
              <Link to="/">
                logout
          </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: "transparent" }}>
              <Link to="/add">
                <Button size="1px" type="dashed" ghost>Add Dog</Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: "transparent" }}>
              <Link to="/message">
               Message
              </Link>
            </Menu.Item>
          </Menu>
          
        </Header>
      </>
    )
  }
  else {
    // if loged in show button for log out and add dogs...
    LoginNav = (
      <>
      <Header style={{ float: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" onClick={context.logout} style={{ float: 'right' }}>
              <Link to="/">
                logout
            </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: "transparent" }}>
              <Link to="/favourite">
               Favourite
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: "transparent" }}>
              <Link to="/message">
               Message
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </>
    )
  }
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img height="80px" width="80px" src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
        </NavLink>
        {LoginNav}
      </Nav>
    </>

  );
};

export default Navbar;





// import React from 'react';
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';
// import { Button } from 'antd';
// import 'antd/dist/antd.css';
// import UserContext from '../../contexts/user';
// import { useContext } from 'react';


// const Navbar = (props) => {
//   const context = useContext(UserContext);
//   const loggedIn = context.user.loggedIn;
//   console.log(context);
//   let LoginNav;
//   if (!LoginNav) {
//     return (
//       <div>
//         <>
//           <Nav>
//             <NavLink to='/'>
//               <img height="80px" width="80px" src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
//             </NavLink>
//             <Bars />
//             <NavMenu>
//               <NavLink to='/about' activeStyle>
//                 About
//           </NavLink>
//               <NavLink to='/services' activeStyle>
//                 Services
//           </NavLink>
//               <NavLink to='/contact-us' activeStyle>
//                 Contact Us
//           </NavLink>
//               <NavLink to="/add" activeStyle>
//                 <Button size="30px" type="dashed" ghost>Add Dog</Button>
//               </NavLink>
//               <NavLink to='/sign-up' activeStyle>
//                 Sign Up
//           </NavLink>
//               <NavLink to="/" onClick={context.logout} activeStyle>
//                 logout
//           </NavLink>
//               {/* Second Nav */}
//               {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//             </NavMenu>
//             <NavBtn>
//               <NavBtnLink to='/signin'>Sign In</NavBtnLink>
//             </NavBtn>
//           </Nav>
//         </>
//       </div>
//     );
//   } else {
//     // if loged in show button for log out and add dogs...
//     LoginNav = (
//       <>
//         <Nav>
//           <NavLink to='/'>
//             <img height="80px" width="80px" src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
//           </NavLink>
//           <Bars />
//           <NavMenu>
//             <NavLink to="/add" activeStyle>
//               <Button size="30px" type="dashed" ghost>Add Dog</Button>
//             </NavLink>
//             <NavLink to="/" onClick={context.logout} activeStyle>
//               logout
//           </NavLink>
//           </NavMenu>
//         </Nav>
//       </>
//     )
//   }
//   return (
//     <>
//       <Nav>
//         <NavLink to='/'>
//           <img height="80px" width="80px" src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
//         </NavLink>
//         <Bars />
//         <NavMenu>
//           <NavLink to='/about' activeStyle>
//             About
//           </NavLink>
//           <NavLink to='/services' activeStyle>
//             Services
//           </NavLink>
//           <NavLink to='/contact-us' activeStyle>
//             Contact Us
//           </NavLink>
//           <NavLink to="/add" activeStyle>
//             <Button size="30px" type="dashed" ghost>Add Dog</Button>
//           </NavLink>
//           <NavLink to='/sign-up' activeStyle>
//             Sign Up
//           </NavLink>
//           <NavLink to="/" onClick={context.logout} activeStyle>
//             logout
//           </NavLink>
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to='/signin'>Sign In</NavBtnLink>
//         </NavBtn>
//       </Nav>
//     </>
//   );
// };

// export default Navbar;
// class Navbar extends React.Component{
//   state = {
//      visible: false
//   }; 
//   static context = UserContext
//   render() {
//   return (
//     <UserContext.Consumer>
//        {({logout}) => (
//     <>
//       <Nav>
//         <NavLink to='/'>
//         <img height="80px" width="80px"src="https://cdn.discordapp.com/attachments/819987762735218810/828438480891674684/test003.png" alt='logo' />
//         </NavLink>
//         <Bars />
//         <NavMenu>
//           <NavLink to='/about' activeStyle>
//             About
//           </NavLink>
//           <NavLink to='/services' activeStyle>
//             Services
//           </NavLink>
//           <NavLink to='/contact-us' activeStyle>
//             Contact Us
//           </NavLink>
//           {/* <NavLink to="/add" activeStyle>
//           <Button size="30px" type="dashed" ghost>Add Dog</Button>
//           </NavLink> */}
//           <NavLink to='/sign-up' activeStyle>
//             Sign Up
//           </NavLink>
//           {/* <NavLink onClick={this.context.logout} activeStyle>
//             Logout
//           </NavLink> */}
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to='/signin'>Sign In</NavBtnLink>
//         </NavBtn>
//       </Nav>
//     </>
//      )}
//     </UserContext.Consumer>
//   );}
// };

// export default Navbar;