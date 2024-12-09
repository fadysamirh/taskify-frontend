import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { FC } from "react";
import Image from "next/image";
import { Drawer } from "@mui/material";
import { useAppContext } from "@/contexts/app-context/app-context";

export const ButtonAppBar: FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const appContext = useAppContext();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const styles = {
    appBar: {
      bgcolor: "white",
    },
    horizontalLinksContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "1vw",
      flexGrow: 1,
      "@media (max-width: 768px)": {
        display: "none",
      },
    },
    verticalLinksContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "5vw",
      width: "40vw",
      p: 2,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      "@media (max-width: 768px)": {
        justifyContent: "space-between",
      },
    },
    image: {
      marginRight: "2vw",
    },
    logoutIcon: {
      p: 3,
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.appBar} elevation={0}>
        <Toolbar sx={styles.toolbar}>
          <IconButton
            size="large"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src={"/logo-without-padding.png"}
            alt={"Logo"}
            width={150}
            height={75}
            style={styles.image}
          />

          <Typography
            variant="body1SemiBold"
            sx={styles.horizontalLinksContainer}
          >
            <Link href="/" underline="none" color="inherit">
              Home
            </Link>
            <Link href="/tasks" underline="none" color="inherit">
              Tasks
            </Link>
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-label="logout"
            sx={styles.logoutIcon}
            onClick={() => appContext.logout()}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <Typography
            variant="body1SemiBold"
            sx={styles.verticalLinksContainer}
          >
            <Link href="/" underline="none" color="inherit">
              Home
            </Link>
            <Link href="/tasks" underline="none" color="inherit">
              Tasks
            </Link>
          </Typography>
        </Drawer>
      </AppBar>
    </Box>
  );
};
