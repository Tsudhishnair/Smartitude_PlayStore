import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import MUIDataTable from "mui-datatables";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import Exp from "../../../components/ExpansionPanel/Expansionpanel";
import EnhancedTable from "../../Components/Management/Management";

import FlatButton from '@material-ui/core/Button/Button'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 6,
  },
});

class Dashboard extends React.Component {

  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;
    const header1 = 'Student';
    const header2 = 'Add a new student';
    const columns = [{
      name: "Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "Username",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "Department",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Batch",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Phone",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Rank",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "Score",
      options: {
        filter: false,
        sort: true,
      }
    },];

    const data = [
      ["Joe James", "uxxxxx", "CS", "2015", "12345678", "2", "1.0"],
      ["John Walsh", "uxxxxx", "CS", "2015", "12345678", "7", "5.0"],
      ["Bob Herm", "uxxxxx", "CS", "2015", "12345678", "5", "5.0"],
      ["Mebin John", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Mahesh Raja", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Muhsin Houston", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["John Hong", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Prejith Prem", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Prabha Houston", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["James John", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Sudhish Nair", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["James Houston", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["George Hoj", "uxxxxx", "CS", "2015", "12345678", "3", "6.1"],
      ["Ashiq Hassan", "uxxxxx", "IT", "2015", "12345678", "1", "8.0"],
    ];

    const options = {
      filterType: 'checkbox',
      rowsPerPage: 20,
      rowsPerPageOptions: [20, 30, 100, 200],

      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
      },
    };


    return (
      <div>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Exp headers={header1} header={header2} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"4"} />
            <Exp headers={"Multiple Student"} header={"Add groups of students"} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"3"} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {/* <EnhancedTable test={"Q"} /> */}
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Student List</h4>
              </CardHeader>
              <MUIDataTable
                title={""}
                data={data}
                columns={columns}
                options={options}
              />
            </Card>
          </GridItem >
        </GridContainer >
      </div >
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
