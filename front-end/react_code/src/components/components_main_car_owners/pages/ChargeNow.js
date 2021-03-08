import React, { useEffect, useState } from 'react';
import {FormStyle} from './ChargeNow_components/FormStyling'
import Form from './ChargeNow_components/Form';

function ChargeNow(){

	const [didSubmit, setDidSubmit] = useState(false)

	return(
		<div className='chargeNow'>
			<FormStyle>
        		<Form setDidSubmit={setDidSubmit}/>
             </FormStyle>
		</div>
	)
}

export default ChargeNow