import React, { useState } from "react";
import "./NoData.css";

function NoData(){
    return(
        <div className='back'>
            <h1 className='error1'>Oops...</h1>
            <h1 className='message'>No data found.</h1>
        </div>
    )    
}

export default NoData;