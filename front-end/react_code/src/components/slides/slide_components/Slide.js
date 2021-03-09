/** @jsxRuntime classic */
/** @jsx jsx */
import React, { memo } from 'react'
import { css, jsx } from '@emotion/core'
import './Slide.css'

const Slide = ({ content, width }) => {
  var textStyle = {
  position: 'absolute',
  fontSize: '100px',
  top: '30%',
  left: '40%',
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
    <p className='h1_new'> Hi  </p>

       </div>

    </div>
  )
}

export default memo(Slide)
