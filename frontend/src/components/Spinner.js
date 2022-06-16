import React from 'react'
import styled from "styled-components";

const StyledSpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 130px;
    height:130px;
  
    @keyframes animation {
    0% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -105;
    }
    50% {
      stroke-dasharray: 80 10;
      stroke-dashoffset: -160;
    }
    100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
    }
  }
  
  #spinner {
    transform-origin: center;
    animation-name: animation;
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier;
    animation-iteration-count: infinite;
  }
`

export default function Spinner(){
    return(
        <StyledSpinnerContainer>
            <svg viewBox="0 0 100 100">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="lightgrey"/>
                    </filter>
                </defs>
                <circle id="spinner" style={{fill:"transparent",stroke:"green",strokeWidth: "5px",strokeLinecap: "round",filter:"url(#shadow)"}} cx="50" cy="50" r="45"/>
            </svg>
        </StyledSpinnerContainer>
    )
}