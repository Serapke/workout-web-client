import * as React from "react";

import { makeStyles, Theme, createStyles, Avatar } from "@material-ui/core";

type Style = "primary" | "secondary";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  color: Style;
  outlined?: boolean;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "30px",
      height: "30px",
      fontSize: "11px",
    },
    primary: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
    secondary: {
      color: "black",
      backgroundColor: theme.palette.secondary.main,
    },
    outlined: {
      border: "1px solid #707070;",
    },
  })
);

const CircleItem = ({ onClick, color, outlined, children }: Props) => {
  const classes = useStyles();
  return (
    <Avatar
      classes={{
        root: classes.root,
      }}
      className={`${classes[color]}${outlined ? ` ${classes.outlined}` : ""}`}
      onClick={onClick}
    >
      {children}
    </Avatar>
  );
};

export default CircleItem;
