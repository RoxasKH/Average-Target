import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import FlexStack from "./FlexStack";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'fullsize' | 'wrap';
    priority?: 'normal' | 'danger'
}

interface ButtonProps extends StyledButtonProps {
    icon?: ReactNode;
    onClick?: (...args: any[]) => void
}

const StyledButton = styled.button<StyledButtonProps>`
    width: ${({ variant = 'wrap' }) =>  variant === 'fullsize' ? '100%' : 'auto'};
    padding: 15px;
    font-size: 20px;
    border-radius: 20px;
    color: inherit;
    background-color: ${props => props.theme.background.button};
    outline: none;
    border: 5px solid ${props => props.theme.background.button_border};
    cursor: pointer;

    &:hover {
        transition: 0.2s;
        ${({ priority = 'normal', theme }) => {
            switch(priority) {
                case 'danger':
                    return `
                        background-color: ${theme.background.negative_feedback};
                        color: ${theme.colors.text};
                        border-color: ${theme.background.background};
                    `;
                default:
                    return `
                        background-color: auto;
                        filter: brightness(1.25);
                        color: ${theme.colors.button_text_hover};
                    `;
            }
        }}
    }
`;

const Button: React.FC<ButtonProps> = ({variant, priority, icon, onClick, type = 'button', children}) => {
    return (
        <StyledButton variant={variant} priority={priority} onClick={onClick} type={type}>
            <FlexStack 
                align={'center'} 
                justify={'center'}
                spacing={10} 
                direction={'row'}
            >
                {icon}
                <div>{children}</div>
            </FlexStack>
        </StyledButton>
    );
};

export default Button;