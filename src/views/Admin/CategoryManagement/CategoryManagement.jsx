import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

class MaxWidthDialog extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Card>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open max-width dialog
        </Button>
          </Card>
    
      </React.Fragment>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaxWidthDialog);