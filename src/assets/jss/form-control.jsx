import green from "@material-ui/core/colors/green";

const formControlStyle = theme => ({
  formRoot: {
    display: "flex",
    flexWrap: "wrap"
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 1,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",
    flexGrow: 1
  },

  button: {
    margin: theme.spacing.unit * 4
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  date_root: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  delete: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4
  },
  greyBackground: {
    background: "grey"
  },

  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

export default formControlStyle;
