import * as React from "react";
import { renderRoutes } from "react-router-config";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import NavigationBar from "../../components/navigation-bar";
import Modal from "../../components/modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(4, 4, 10),
    },
  })
);

const RootPage = ({ route }: any) => {
  const classes = useStyles();
  return (
    <div>
      <NavigationBar />
      <div className={classes.content}>{renderRoutes(route.routes)}</div>
      <Modal />
    </div>
  );
};

export default RootPage;
