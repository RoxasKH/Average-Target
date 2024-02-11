import styled from "styled-components";

const ErrorMessage = styled.div<{fontSize?: string}>`
    background-color: ${props => props.theme.background.negative_feedback};
    border-radius: 10px;
    padding: 5px 15px;
    font-size: ${props => props.fontSize ? props.fontSize : '15px'};
`;

export default ErrorMessage;