import React, { useEffect, useState } from 'react';
import {FormStyle} from './ChargeNow_components/FormStyling'
import Form from './ChargeNow_components/Form';
import VideoCharge from './videos/video_charge.mp4'

function ChargeNow(){

	const [didSubmit, setDidSubmit] = useState(false)

	return(
		<div className='chargeNow'>
		<video
			autoPlay
			loop
			muted
			style={{
				position : "absolute",
				width : "100%",
				left : "49.96%",
				top : "49.96%",
				height : "100%",
				objectFit : "cover",
				transform : "translate(-50%, -50%)",
				zIndex : "-10"
			}}
		>
			<source src={VideoCharge} type="video/mp4" />
		</video>
			<FormStyle>
        		<Form setDidSubmit={setDidSubmit}/>
             </FormStyle>
		</div>
	)
}

export default ChargeNow