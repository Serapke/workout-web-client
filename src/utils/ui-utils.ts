import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const fabKeyboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    keyboardStyle: {
      animation: "$fab-effect 50ms",
      animationDelay: "50ms",
      animationFillMode: "forwards",
    },
    "@keyframes fab-effect": {
      from: {
        position: "relative",
      },
      to: {
        position: "fixed",
      },
    },
  })
);

export const onInputFocusHideFab = (showClass: string) => {
  document.getElementById("fab").classList.remove(showClass);
  document.getElementById("fab").style.position = "relative";
  document.getElementById("fab").style.marginTop = "50px";
};

export const onInputBlurShowFab = (showClass: string) => {
  document.getElementById("fab").classList.add(showClass);
  document.getElementById("fab").style.marginTop = "0";
};
