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
                              backgroundColor: '#AAF',
                            },
                            paper: {
                              boxShadow: 'none',
                            },
                          },
                          MuiToolbar: {
                            root: {
                              backgroundColor: 'darkseagreen',
                            },
                          },
                        MuiTableCell: {
                            head: {
                              backgroundColor: 'snow',
                            },
                          },
                          MUIDataTableSelectCell: {
                            root: {
                              backgroundColor: 'darkseagreen'
                            },
                          },
                          MUIDataTableBodyCell: {
                            root:{
                              backgroundColor: 'snow'
                            },
                          },
                          MUIDataTableHeaderCell: {
                            root:{
                              backgroundColor: 'lightgreen'
                            },
                          },
                          MuiTableRow: {
                            root: {
                              '&$selected': {
                                backgroundColor: ''
                              }
                            }
                          },
                          MuiTableFooter: {
                            root: {
                              '& .MuiToolbar-root': {
                                backgroundColor: 'green',
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
