import * as React from "react";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// import image1 from"./Images/sidedrawer/book-open-02.svg";
// import image2 from"./Images/sidedrawer/book-open-02.svg";
// import image3 from "./Images/sidedrawer/book-open-02.svg";
import image1 from "../../assest/sidedrawer/Frame 1707486702.svg";
import image2 from "../../assest/sidedrawer/Group.svg";
import image3 from "../../assest/sidedrawer/Frame 1707486230.svg";
import image4 from "../../assest/sidedrawer/book-open-02.svg";
import image5 from "../../assest/sidedrawer/fi_10103871.svg";
import image6 from "../../assest/sidedrawer/fi_1555670.svg";
import image7 from "../../assest/sidedrawer/fi_2040504.svg";
import image8 from "../../assest/sidedrawer/fi_6681125.svg";
import image9 from "../../assest/sidedrawer/fi_9498809.svg";
import image10 from "../../assest/sidedrawer/headphones-02.svg";
import image11 from "../../assest/sidedrawer/home-smile.svg";
import image12 from "../../assest/sidedrawer/log-out-03.svg";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useRef } from "react";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";

const images = [
  image11,
  image2,
  image4, // Example: repeating images
  image9,
  image6,
  image1,
  image8,
  image5,
  image10,
  image5,
  image3,
  image7,
];

const items = [
  "Dashboard",
  "Referral - Affiliate",
  "Wealth Academy",
  "Signals",
  "FX Auto Trading",
  "Strike Bot",
  "Gamification",
  "Web3",
];
const items2 = ["Help", "Terms of Service", "Updates", "Settings"];

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100%",
    overflowX: "hidden",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      fontFamily: "Montserrat",
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  padding: "26px 24px",
  borderBottom: "none",
  zIndex: "2",
}));

// const themeMui = createTheme({
//   typography: {
//     fontFamily: "Montserrat-Medium",
//     fontWeight: "500",
//     fontSize: "14px",
//     color: "#BcBfCC",
//   },
// });

export default function ReuseableSideDrawer({ showSidebar, children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 1064px)",
  });
  const [mobileOpen, setMobileOpen] = React.useState(true);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);
  const drawerRef = useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen); // Toggle for mobile screens
    } else {
      setOpen(!open); // For larger screens
    }
  };

  const openNotifcations = Boolean(anchorElNotification);
  const opens = Boolean(anchorEl);
  const messages = false;
  const isIPhone = /iPhone|iPod/.test(navigator.userAgent);

  return (
    // <ThemeProvider theme={themeMui}>
    // {showSidebar && (
    <Box
      sx={{
        paddingLeft: open
          ? isMobile
            ? "0px" // Padding when the drawer is open on mobile
            : `${drawerWidth}px ` // Padding when the drawer is open on larger screens
          : isMobile
          ? "0px" // Padding when the drawer is closed on mobile
          : "8px", // Padding when the drawer is closed on larger screens
        transition: "padding-left 0.3s ease", // Smooth transition when opening/closing drawer
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="#0000"
            aria-label="open drawer"
            onClick={isMobile ? handleDrawerToggle : handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              position: "absolute",
              zIndex: 999,
              margin: 0,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Social Profile
          </Typography>
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Drawer
          // sx={{
          //   width: drawerWidth,
          //   flexShrink: 0,
          //   "& .MuiDrawer-paper": {
          //     width: drawerWidth,
          //     boxSizing: "border-box",
          //     // margin: "15px",
          //     borderRadius: "25px",
          //     border: "1px solid #E6E6E6",
          //     // padding:"24px"
          //     position: "fixed", // Make it overlay on top of content
          //     top: 0,
          //     left: 0,
          //     zIndex: 1200,
          //   },
          // }}
          // variant="persistent"
          // anchor="left"
          // open={open}
          PaperProps={{
            sx: {
              backgroundColor: " #ffffff70",
              borderRight: "2px solid #BCBFCC99",
              display: "flex",
              justifyContent: "space-between",
              backdropFilter: "blur(10px)",
              scrollbarWidth: "none",
            },
          }}
          style={{ zIndex: 1, position: "relative" }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          ref={drawerRef}
        >
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px 0px 30px",
            }}
          >
            <img src="./Images/Logo (1).svg" className="ms-3" />
            <div
              onClick={handleDrawerClose}
              style={{
                height: "26px",
                width: "26px",
                position: "absolute",
                top: "40px",
                right: "12px",
                boxShadow: "none",
              }}
            >
              {theme.direction === "ltr" ? (
                <img
                  src="/Images/SideDrawer/SideIcon.png"
                  alt=""
                  className="sideIcon"
                />
              ) : (
                <img
                  src="/Images/SideDrawer/arrow-drawer.png"
                  style={{ height: "48px", width: "48px" }}
                  alt=""
                />
              )}
            </div>
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton> */}
          </DrawerHeader>
          {/* <Divider /> */}
          <div className="side-drawer-header">
            <img src="./Images/plus-circle.svg" />
            <p>xMAG Redeems</p>
          </div>
          <List sx={{ padding: "0px 24px 40px" }}>
            {items.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={images[index]} // Assign each item a specific image based on its index
                      alt={text}
                      style={{ width: 24, height: 24 }} // Adjust the size as needed
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ padding: "40px 24px 2px" }}>
            {items2.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={images[index + 8]} // Assign each item a specific image based on its index
                      alt={text}
                      style={{ width: 24, height: 24 }} // Adjust the size as needed
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ padding: "40px 24px 2px" }}>
            {/* {["Logout"].map( */}
            {/* // (text, index) => ( */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={image12} />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
            {/* ) */}
            {/* //   )} */}
          </List>
        </Drawer>
      )}
      {isMobile && (
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              scrollbarWidth: "none",
            },
          }}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ref={drawerRef}
          // sx={{
          //   width: drawerWidth,
          //   flexShrink: 0,
          //   "& .MuiDrawer-paper": {
          //     width: drawerWidth,
          //     boxSizing: "border-box",
          //     // margin: "15px",
          //     borderRadius: "25px",
          //     border: "1px solid #E6E6E6",
          //     // padding:"24px"
          //     position: "fixed", // Make it overlay on top of content
          //     top: 0,
          //     left: 0,
          //     zIndex: 1200,
          //   },
          // }}
          // variant="persistent"
          // anchor="left"
          // open={open}
        >
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px 0px 30px",
            }}
          >
            <img src="./Images/Logo (1).svg" />
            <div
              onClick={handleDrawerClose}
              style={{
                height: "26px",
                width: "26px",
                position: "absolute",
                top: "40px",

                right: isIPhone ? "30px" : "12px",
                boxShadow: "none",
                marginRight: "10px",
                zIndex: "99999",
              }}
            >
              {theme.direction === "ltr" ? (
                <img
                  src="/Images/SideDrawer/SideIcon.png"
                  alt=""
                  className="sideIcon"
                />
              ) : (
                <img
                  src="/Images/SideDrawer/SideIcon2.png"
                  style={{ height: "48px", width: "48px" }}
                  alt=""
                />
              )}
            </div>
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )} 
            </IconButton>*/}
          </DrawerHeader>
          {/* <Divider /> */}
          <div className="side-drawer-header">
            <img src="./Images/plus-circle.svg" />
            <p>xMAG Redeems</p>
          </div>
          <List sx={{ padding: "0px 24px 40px" }}>
            {items.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={images[index]} // Assign each item a specific image based on its index
                      alt={text}
                      style={{ width: 24, height: 24 }} // Adjust the size as needed
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ padding: "40px 24px 2px" }}>
            {items2.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={images[index + 8]} // Assign each item a specific image based on its index
                      alt={text}
                      style={{ width: 24, height: 24 }} // Adjust the size as needed
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ padding: "40px 24px 2px" }}>
            {/* {["Logout"].map( */}
            {/* // (text, index) => ( */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={image12} />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
            {/* ) */}
            {/* //   )} */}
          </List>
        </Drawer>
      )}

      <Main
        // style={{ padding: 24 }}
        // open={open}
        // sx={{
        //   marginLeft: 0,
        // }}
        open={open}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          // height: "100vh",
          height: "100vh",
          fontFamily: "Montserrat-Medium",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "@media (max-width: 768px)": {
            padding: "50px 15px 40px 15px",
          },
          "@media (max-width: 500px)": {
            filter: mobileOpen ? "blur(5px)" : "none",
          },
          padding: "50px 30px 40px 30px",
        }}
        style={{
          msOverflowStyle: "none",
        }}
      >
        <DrawerHeader
          sx={{
            marginLeft: "40px",
          }}
        />
        {/* {children} */}
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
    // )}
    // </ThemeProvider>
  );
}
