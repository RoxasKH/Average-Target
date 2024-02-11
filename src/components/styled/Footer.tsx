import styled from "styled-components";
import React from 'react'
import FlexStack from "./FlexStack";

const URL = 'https://github.com/RoxasKH';

const StyledFooter = styled.div`
    background-color: ${props => props.theme.background.footer};
    text-align: center;
    font-size: 13px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 20px;
    transition: 0.2s;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
`;

export const Footer = () => {
  return (
    <StyledFooter>
        <FlexStack 
            align={'flex-end'} 
            justify={'end'}
            spacing={5} 
            direction={'row'}
        >
            <div>
                © 2024 - 
            </div>
            <a href={URL} target="_blank" rel="noreferrer">
                RoxasKH
            </a>
        </FlexStack>
        
    </StyledFooter>
  );
};

export default Footer;