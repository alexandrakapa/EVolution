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
                              backgroundColor: '#006400',
                              width: '500px'
                            },
                          /*  paper: {
                              boxShadow: 'none',
                            }, */
                          },
                          MuiToolbar: {
                            root: {
                              backgroundColor: '#006400',
                              }
                            
                          }, 
                        /*MuiTableCell: {
                            head: {
                              backgroundColor: '#006400',
                            },
                          }, */
                          MUIDataTableSelectCell: {
                            root: {
                              backgroundColor: '#006400'
                            },
                            headerCell: {
                              backgroundColor: '#006400',
                            },
                          },
                          MUIDataTableBodyCell: {
                            headerCell: {
                              backgroundColor: '#006400',
                            },
                          },
                          MUIDataTableHeadCell: {
                            root: {
                              borderBottom : '1px solid black',
                              borderColor : 'black',
                            },
                            fixedHeader: {
                              position: 'sticky',
                              top: '0px',
                              zIndex: 100,
                              backgroundColor: '#c8f7c5',
                              borderColor : 'black'
                             
                            }, 
                          },
                          MuiTableFooter: {
                            root: {
                              '& .MuiToolbar-root': {
                                backgroundColor: '#006400',
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
