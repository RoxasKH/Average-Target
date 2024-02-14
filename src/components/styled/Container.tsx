import styled, { DefaultTheme } from "styled-components";

interface ContainerProps {
    variant?: 'small';
    scrollable?: boolean;
    maxHeight?: string;
    padding?: number;
}

const Container = styled.div<ContainerProps & {theme: DefaultTheme}>`

    overflow-y: ${({scrollable = false}) => scrollable ? 'scroll' : 'auto'};
    ${({scrollable = false, maxHeight = 'auto'}) => scrollable && `max-height: ${maxHeight};`}

    ${({ variant = 'default', padding = 25, theme }) => {
        switch (variant) {
            case 'small':
                return `
                    width: 100%;
                    padding: ${padding}px;
                    border-radius: 20px;
                    background-color: ${theme.background.container};

                    @media only screen and (${theme.devices.xl}) {
                        padding: ${padding-5}px;
                    }
                `;
            default:
                return `
                    width: 750px;
                    margin: auto;
                    padding: 20px 0 80px 0;
                    
                    @media only screen and (${theme.devices.xl}) {
                        max-width: 90%;
                    }
                `;
        }
    }}


`

export default Container;