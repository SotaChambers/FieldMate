import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const Header = ({ signOut, user }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userDrawerOpen, setUserDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleUserDrawerOpen = () => {
        setUserDrawerOpen(true);
    };

    const handleUserDrawerClose = () => {
        setUserDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    background:
                        "linear-gradient(90deg, #141E30 0%, #243B55 100%)",
                    padding: "10px 0",
                    zIndex: 1301, // Drawerより高く設定
                    height: "70px", // 必要に応じて調整
                }}
            >
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexGrow: 1,
                            }}
                        >
                            <img
                                src={logo}
                                alt="Sports Activate"
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: 10,
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                                Sports Activate
                            </Typography>
                        </Box>
                    </Link>

                    <Button
                        color="inherit"
                        startIcon={<AccountCircle />}
                        sx={{
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                        onClick={handleUserDrawerOpen}
                    >
                        {user.username}
                    </Button>
                </Toolbar>
            </AppBar>
            {/* ヘッダーの高さ分の余白を確保 */}
            <Box sx={{ height: "100px" }} />{" "}
            {/* ヘッダーと同じ高さのスペース */}
            {/* ハンバーガーメニューのDrawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{ zIndex: 1302 }} // AppBarより高く設定
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "16px",
                            backgroundColor: "#f3f4f6",
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <img
                                src={logo}
                                alt="Sports Activate"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    marginRight: 10,
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: "bold" }}
                            >
                                メニュー
                            </Typography>
                        </Link>
                    </Box>
                    <Divider />
                    <List>
                        <Link
                            to="/recruit"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <EditNoteIcon />
                                </ListItemIcon>
                                <ListItemText primary="新規募集作成" />
                            </ListItem>
                        </Link>

                        <Link
                            to="/games"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <SportsBaseballIcon />
                                </ListItemIcon>
                                <ListItemText primary="募集試合一覧" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            {/* UsernameをクリックしたときのDrawer */}
            <Drawer
                anchor="right"
                open={userDrawerOpen}
                onClose={handleUserDrawerClose}
                sx={{ zIndex: 1302 }} // AppBarより高く設定
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={handleUserDrawerClose}
                    onKeyDown={handleUserDrawerClose}
                >
                    <List>
                        <ListItem button onClick={signOut}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="サインアウト" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default withAuthenticator(Header);
