import { container } from "assets/jss/material-kit-react.jsx";

import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const signupPageStyle = {
  container: {
    zIndex: "5",
    margin: "0",
    position: "relative",
    padding: "0",
    paddingTop: "15vh",
    color: "#FFFFFF",
    overflow: "scroll"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    overflow: "scroll",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "5px"
  },
  divider: {
    marginTop: "5%",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    paddingTop: "0rem",
    padding: "0",
    border: "0",
    borderRadius: "4px",
    justifyContent: "center !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: "#495057"
  },
  footer: {
    position: "absolute",
    bottom: "0",
    padding: "0",
    width: "100%"
  },

  //Custom Input

  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor
  },
  labelRootSuccess: {
    color: successColor
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "4px",
    margin: "18px 0 0 0",
    position: "relative"
  }
};

export default signupPageStyle;
