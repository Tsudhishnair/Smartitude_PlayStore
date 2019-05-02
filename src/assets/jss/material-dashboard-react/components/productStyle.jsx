import { title } from "assets/jss/material-kit-react.jsx";

const productStyle = theme => ({
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999",
    [theme.breakpoints.down("sm")]: { fontSize: "1.1rem", margin: "5px auto 0" }
  }
});

export default productStyle;
