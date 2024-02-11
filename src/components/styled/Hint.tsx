import styled from "styled-components";
import React from "react";

interface HintProps {
    text: string;
}

const StyledHint = styled.div`
    width: 100%;
    text-align: end;
    font-style: italic;
    font-size: 15px;
    color: ${props => props.theme.colors.text_hint};
`;

const Hint: React.FC<HintProps> = ({text}) => {
    return (
        <StyledHint>{text}</StyledHint>
        );
};

export default Hint;