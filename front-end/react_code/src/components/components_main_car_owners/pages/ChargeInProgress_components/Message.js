import React, { useState } from "react";
import "./Message.css";

function Message(){
    return(
        <div className='back_charge'>
            <h1 className='message_charge2'>Charging in progress!</h1>
            <h1 className='message_charge'>Time to fully charged:</h1>
        </div>
    )    
}

export default Message;