import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import Cookies from "universal-cookie";

import { connect } from "react-redux";
import { setLogin, setLoginData, setLoginAuth } from "../redux/loginAction";

import axios from "axios";

// Material-UI Import
import {
  Box,
  IconButton,
  TextField,
  Badge,
  Avatar,
  Menu as DropDown,
  MenuItem as DropDownItem,
  // Link as Links, // 라우터랑 Link 컴포넌트 이름이 겹쳐 Links 로 변경
} from "@material-ui/core";

// Drawer Import
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

// 아이콘 Import
import { IconContext } from "react-icons";
import { AiOutlineMenuFold } from "react-icons/ai";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

// Web 컴포넌트 Import
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SearchIcon from "@material-ui/icons/Search";

function Header() {
  return (
    <Box
      width={1}
      display="flex"
      justifyContent="center"
      style={{
        // borderBottom: "1px solid black",
        padding: "0.2rem 0em",
        top: 0,
        backgroundColor: "#ffeebb",
      }}
      position="fixed"
      margin="0px auto"
      className="Header">
      <HeaderContainer />
    </Box>
  );
}

function HeaderContainer(props) {
  return (
    <Box width={9.5 / 10} display="flex" justifyContent="space-around">
      <LeftHeader />
      <RightHeader />
    </Box>
  );
}

function LeftHeader(props) {
  return (
    <>
      <Title />
      <LeftMenu />
    </>
  );
}

function Title(props) {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <Logo />
      </Link>
    </>
  );
}

function Logo(props) {
  return (
    <>
      <Box style={{}} display={boxShownBySize(["xs"])}>
        <h1>LOGO</h1> {/*추후 이미지 ( <img /> ) 로 변경 필요*/}
      </Box>
      <Box style={{}} display={boxShownBySize(["sm"])}>
        <h1>LOGO with sm</h1> {/*추후 이미지 ( <img /> ) 로 변경 필요*/}
      </Box>
      <Box style={{}} display={boxShownBySize(["md"])}>
        <h1>LOGO with md</h1> {/*추후 이미지 ( <img /> ) 로 변경 필요*/}
      </Box>
      <Box style={{}} display={boxShownBySize(["lg"])}>
        <h1>LOGO with lg</h1> {/*추후 이미지 ( <img /> ) 로 변경 필요*/}
      </Box>
      <Box style={{}} display={boxShownBySize(["xl"])}>
        <h1>LOGO with xl</h1> {/*추후 이미지 ( <img /> ) 로 변경 필요*/}
      </Box>
    </>
  );
}

function LeftMenu(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          marginLeft: "3rem",
        }}>
        <LeftMenuItems name={"Link1"} />
        <LeftMenuItems name={"Link2"} />
        <LeftMenuItems name={"Link3"} />
      </div>
    </>
  );
}

function LeftMenuItems(props) {
  return (
    <>
      <Box display={boxShownBySize(["sm", "md", "lg", "xl"])}>
        <span
          style={{
            marginRight: "1em",
            fontWeight: "bold",
            fontSize: "150%",
            marginTop: "10px",
          }}>
          <Link
            to={`/${props.name.toLowerCase()}`}
            style={{ textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.cursor = "cursor";
              e.target.style.textDecoration = "none";
            }}
            // onClickStart={(e) => {
            //   e.target.style.color = "black";
            // }}
          >
            {props.name}
          </Link>
        </span>
      </Box>
    </>
  );
}

function RightHeader(props) {
  return (
    <>
      <Box alignItems="center" display="flex" marginLeft="auto">
        {/* 모바일 메뉴 */}
        <Box display={boxShownBySize(["xs", "sm"])}>
          <ConnectedMobileMenu />
        </Box>

        {/* 웹 메뉴 */}
        <Box display={boxShownBySize(["md", "lg", "xl"])}>
          <ConnectedWebMenu />
        </Box>
      </Box>
    </>
  );
}

function MobileMenu(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const cookies = new Cookies();

  function handleLogoutClick() {
    setIsLogin(false);
    props.setIsLogin(false);
    cookies.remove("loginInfo");
    history.push("/");
    console.log("cookie Deleted");
  }

  useEffect(() => {
    const loginCookieData = cookies.get("loginInfo");
    console.log(loginCookieData);
    if (loginCookieData !== undefined) {
      setIsLogin(true);
      props.setIsLogin(true);
      props.setLoginData(loginCookieData);
    }
  }, []);

  useEffect(() => {
    setIsLogin(props.login.isLogin);
    console.log(props.login.isLogin);
  }, [props.login.isLogin]);

  function toggleDrawerClose() {
    setIsOpen(false);
  }

  function toggleDrawerOpen() {
    setIsOpen(true);
  }

  // Return All Drawer List
  function drawerList() {
    // Return List Items
    function ListItemObject(props) {
      function handleDrawerItemClick() {
        // toggleDrawerClose();
        if (props.path === "logout") {
          handleLogoutClick();
          history.push("/");
        } else {
          console.log(`/${props.path}`);
          history.push(`/${props.path}`);
        }
      }

      return (
        <Box onClick={toggleDrawerClose}>
          <div onClick={handleDrawerItemClick}>
            <ListItem button>
              {props.listIcon ? (
                <ListItemIcon>{props.listIcon}</ListItemIcon>
              ) : null}
              {props.listText ? (
                <ListItemText primary={props.listText} />
              ) : null}
            </ListItem>
          </div>
        </Box>
      );
    }

    //Return List by login status
    function DrawerByLogin() {
      return isLogin ? (
        <Box>
          <List>
            <ListItemObject
              listIcon={<Avatar variant="rounded">J</Avatar>}
              listText="프로필"
              path={"profile"}
            />
            <ListItemObject listIcon={null} listText="Link1" path={"link1"} />
            <ListItemObject listIcon={null} listText="Link2" path={"link2"} />
            <ListItemObject listIcon={null} listText="Link3" path={"link3"} />
            <ListItemObject
              listIcon={<BiLogOutCircle />}
              listText={"로그아웃"}
              path={"logout"}
              isBottom={true}
            />
          </List>
        </Box>
      ) : (
        <Box>
          <List>
            <ListItemObject listText="Link1" path={"link1"} menu />
            <ListItemObject listText="Link2" path={"Link2"} menu />
            <ListItemObject listText="Link3" path={"link3"} menu />
            <ListItemObject
              listIcon={<BiLogInCircle />}
              listText={"로그인/가입"}
              path={"login"}
              isBottom={true}
            />
          </List>
        </Box>
      );
    }

    return (
      <>
        <DrawerByLogin />
      </>
    );
  }

  return (
    <>
      {/* 아이콘 랜더링 */}
      <Box>
        <IconContext.Provider value={{ color: "black", size: "2.5em" }}>
          <Box
            onClick={() => {
              toggleDrawerOpen();
            }}>
            <AiOutlineMenuFold />
          </Box>
        </IconContext.Provider>
      </Box>

      {/* Drawer 랜더링 */}
      <Box>
        <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawerClose}>
          {drawerList()}
        </Drawer>
      </Box>
    </>
  );
}

function WebMenu(props) {
  const cookies = new Cookies();
  const [isLogin, setIsLogin] = useState(false);

  const history = useHistory();

  const handleLogoutClick = () => {
    props.setIsLogin(false);
    props.setLoginData(null);
    props.setLoginAuth(false);
    cookies.remove("loginInfo");
  };

  const fetchAuthValid = async (data) => {
    const authData = {
      key: data.key,
      userName: data.userName,
    };
    const response = await axios.post(
      "http://localhost:8080/api/authUser",
      authData,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    return response;
  };

  useEffect(() => {
    const loginCookieData = cookies.get("loginInfo");
    console.log(loginCookieData);
    if (loginCookieData !== undefined || null) {
      setIsLogin(true);
      props.setIsLogin(true);
      props.setLoginData(loginCookieData);
    }
  }, []);

  useEffect(() => {
    // console.log(props);
    if (isLogin === true && props.login.didLoginAuth !== true) {
      const loginInfo = cookies.get("loginInfo");
      fetchAuthValid(loginInfo)
        .then((value) => {
          console.log(value);
          return value;
        })
        .then((value) => {
          if (value.data.isValid !== true) {
            props.setIsLogin(false);
            props.setLoginData(null);
            props.setLoginAuth(false);
            console.warn("Login Key is not Valid!!");
          } else {
            props.setLoginAuth(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLogin]);

  useEffect(() => {
    setIsLogin(props.login.isLogin);
    console.log(props.login.isLogin);
  }, [props.login.isLogin]);

  // 추후 로그인 여부 확인한 다음 isLogin 로직 수정 필요
  function SearchBox(props) {
    const [text, setText] = useState("");

    function handleChange(event) {
      setText(event.target.value);
    }

    function handleSubmit(event) {
      event.preventDefault();
      if (text.length > 0) {
        alert("You Searched " + text + "!");
        setText("");
      }
    }
    return (
      <Box display="flex" alignItems="center">
        <form>
          <TextField
            type="text"
            value={text}
            onChange={handleChange}
            label="검색"
            variant="standard"
            size="small"
          />
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={text.length > 0 ? false : true}
            type="submit">
            <SearchIcon />
          </IconButton>
        </form>
      </Box>
    );
  }

  function NotiIcon(noti) {
    const [isOver, setIsOver] = useState(false);
    switch (noti) {
      case true:
        return (
          <Box
            onMouseEnter={(event) => {
              setIsOver(true);
            }}
            onMouseLeave={(event) => {
              setIsOver(false);
            }}
            onMouseOver={(event) => {
              event.target.style.cursor = "pointer";
            }}>
            {isOver ? (
              <Badge color="secondary" variant="dot">
                <NotificationsActiveIcon fontSize="large" />
              </Badge>
            ) : (
              <Badge color="secondary" variant="dot">
                <NotificationsNoneIcon fontSize="large" />
              </Badge>
            )}
          </Box>
        );
      case false:
        return (
          <Box
            onMouseEnter={(event) => {
              setIsOver(true);
            }}
            onMouseLeave={(event) => {
              setIsOver(false);
            }}
            onMouseOver={(event) => {
              event.target.style.cursor = "pointer";
            }}>
            {isOver ? (
              <NotificationsActiveIcon fontSize="large" />
            ) : (
              <NotificationsNoneIcon fontSize="large" />
            )}
          </Box>
        );
      default:
        break;
    }
  }

  function Profile(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
    function handleClose() {
      setAnchorEl(null);
    }

    function DropDownItemWrapper(props) {
      function handleDropDownClick() {
        // alert("You Clicked Drop Down Item!");
        if (props.path === "/logout") {
          handleLogoutClick();
          history.push("/");
        } else {
          history.push(props.path);
        }
        setAnchorEl(null);
      }
      return (
        <DropDownItem onClick={handleDropDownClick}>{props.text}</DropDownItem>
      );
    }
    return (
      <>
        <DropDown
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          keepMounted
          onClose={handleClose}>
          <DropDownItemWrapper path={"/profile"} text={"프로필"} />
          <DropDownItemWrapper path={"/account"} text={"내 계정"} />
          <DropDownItemWrapper path={"/logout"} text={"로그아웃"} />
        </DropDown>
        <Box onClick={handleClick}>
          <Avatar variant="rounded">J</Avatar>
        </Box>
      </>
    );
  }

  function Login(props) {
    const history = useHistory();
    function handleLoginClick() {
      history.push("/login");
    }
    return (
      <Box
        fontWeight="bold"
        cursor="pointer"
        onMouseEnter={(event) => {
          event.target.style.color = "blue";
          event.target.style.backgroundColor = "#F0F8FF";
        }}
        onMouseLeave={(event) => {
          event.target.style.color = "black";
          event.target.style.backgroundColor = "white";
          event.target.style.border = null;
        }}
        onMouseOver={(event) => {
          event.target.style.cursor = "pointer";
        }}
        style={{
          color: "black",
          padding: "10px",

          borderRadius: "5px",
          backgroundColor: "white",
        }}
        onClick={handleLoginClick}>
        로그인/가입
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center">
      {/* 검색창 */}
      <Box marginRight="10px" padding="10px">
        <SearchBox />
      </Box>
      {/* 알림 */}
      {/* 추후 NotiIcon 에 들어갈 값 동적으로 작업 필요 */}
      <Box marginRight="10px" padding="10px">
        {NotiIcon(true)}
      </Box>
      {/* 프로필 */}
      <Box margin="0px 20px">{isLogin ? <Profile /> : <Login />}</Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin: (bool) => {
      dispatch(setLogin(bool));
    },
    setLoginData: (data) => {
      dispatch(setLoginData(data));
    },
    setLoginAuth: (bool) => {
      dispatch(setLoginAuth(bool));
    },
  };
};
const ConnectedWebMenu = connect(mapStateToProps, mapDispatchToProps)(WebMenu);
const ConnectedMobileMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu);

// 배열을 받아 배열 안의 사이즈들은 block 이 외는 none
function boxShownBySize(sizeArray) {
  return {
    xs: () => {
      return sizeArray.includes("xs") ? "block" : "none";
    },
    sm: () => {
      return sizeArray.includes("sm") ? "block" : "none";
    },
    md: () => {
      return sizeArray.includes("md") ? "block" : "none";
    },
    lg: () => {
      return sizeArray.includes("lg") ? "block" : "none";
    },
    xl: () => {
      return sizeArray.includes("xl") ? "block" : "none";
    },
  };
}

export default Header;
