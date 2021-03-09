/** @jsxRuntime classic */
/** @jsx jsx */
import React, { memo } from 'react'
import { css, jsx } from '@emotion/core'
import './Slide.css'

const Slide = ({ content, width,num }) => {
  var textStyle = {
  position: 'absolute',
  fontSize: '100px',
  top: '30%',
  left: '35%',
  color: '#006400'
  };
  return (
    <div
      css={css`
        height: 100%;
        width: ${width}px;
        background-image: url('${content}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `}>
      <div className='form2' style= {textStyle}>
    <p className='h1_new'> Welcome to EVolution  </p>
    <p className='label1'> The No.1</p>
    <p className='label1'>  e-mobility charging solution </p>

       </div>

    </div>
  )

}

export default memo(Slide)
