import * as React from "react";

import { makeStyles, Theme, createStyles, Box } from "@material-ui/core";

type Style = "primary" | "secondary";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  color: Style;
  outlined?: boolean;
  children: React.ReactNode;
  size?: Size;
  fontSize?: string;
}

type Size = 'small' | 'medium' | 'large';

const sizeMap = {
  small: "32px",
  medium: "40px",
  large: "48px"
}

const lineHeightMap = {
  small: "28px",
  medium: "36px",
  large: "44px"
}

const fontSizeMap = {
  small: "14px"
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primary: {
      color: "#777",
      backgroundColor: "white",
    },
    secondary: {
      color: "black",
      backgroundColor: theme.palette.secondary.main,
    },
    outlined: {
      border: "2px solid #707070;",
    },
  })
);

const CircleItem = ({ onClick, color, outlined, children, size = 'small', fontSize }: Props) => {
  const classes = useStyles();
  return (
    <Box
      borderRadius="50%"
      textAlign="center"
      width={sizeMap[size]}
      height={sizeMap[size]}
      lineHeight={outlined ? lineHeightMap[size] : sizeMap[size]}
      fontSize={fontSize || fontSizeMap[size]}
      className={`${classes[color]}${outlined ? ` ${classes.outlined}` : ""}`}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default CircleItem;
