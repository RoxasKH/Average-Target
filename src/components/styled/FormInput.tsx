import React from "react";
import styled from "styled-components";

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
    variant?: 'text' | 'number';
}

const FormInput = styled.input<FormInputProps>`

    width: 100%;
    height: 10%;
    border-radius: 10px;
    outline: none;
    border: none;
    background-color: ${props => props.theme.background.textbox};
    color: ${props => props.theme.colors.textbox_text};
    font-size: 20px;
    padding: 10px;
    
    &:focus, textarea:focus {
        transition: 0.2s;
        background-color: ${props => props.theme.background.textbox_focus};
    }

    &::placeholder {
        color: ${props => props.theme.colors.text_placeholder};
    }

    ${({ variant = 'text' }) => {
        if(variant === 'number') {
            return `
                -moz-appearance: textfield;
                appearance: textfield;
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `;
        }
    }}
`;

export default FormInput;