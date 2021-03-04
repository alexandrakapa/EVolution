import MUIDataTable from "mui-datatables";
import React from 'react';

import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";


function MuiTable (props) {



      const data = props.data;

      const options = {
        filterType: "checkbox",

      };




      function handleclick(){
        console.log(data)
      }



        return (
          <div>
              <br />

              <MuiThemeProvider theme={
                      createMuiTheme({
                        overrides: {
                          MUIDataTable: {
                            root: {
                              backgroundColor: 'green',
                            },
                          /*  paper: {
                              boxShadow: 'none',
                            }, */
                          },
                          MuiToolbar: {
                            root: {
                              backgroundColor: 'darkseagreen',
                              }
                            
                          }, 
                      /*  MuiTableCell: {
                            head: {
                              backgroundColor: 'snow',
                            },
                          }, */
                          MUIDataTableSelectCell: {
                            root: {
                              backgroundColor: 'darkseagreen'
                            },
                          },
                          MUIDataTableBodyCell: {
                            root:{
                              backgroundColor: 'white',
                            },
                          },
                         /* MUIDataTableHeaderCell: {
                            root:{
                              backgroundColor: 'lightgreen'
                            },
                          }, */
                        /*  MuiTableRow: {
                            root: {
                              '&$selected': {
                                backgroundColor: 'snow'
                              }
                            }
                          }, */
                          MuiTableFooter: {
                            root: {
                              '& .MuiToolbar-root': {
                                backgroundColor: 'darkseagreen',
                              },
                            },
                          },
                        },
                      })
              }>
                <MUIDataTable
                    title={props.tableName}
                    data={data}
                    columns={props.columns}
                    options={options}
                  />

              </MuiThemeProvider>



        </div>
        )


      }


export default MuiTable;
