import styled from "styled-components";

interface StackWrapperProps {
  childrenMarginTop: number;
  childrenMarginBottom: number;
  childrenMarginRight: number;
  childrenMarginLeft: number;
  align: string;
  justify: string;
  direction: string;
  wrap: string;
  width: string;
  padding: string;
  scrollable: boolean;
};

interface FlexStackProps {
  align: string;
  justify: string;
  spacing: number;
  direction: string;
  wrap?: boolean;
  width?: string;
  padding?: string;
  scrollable?: boolean;
  children: React.ReactNode;
}

const StackWrapper = styled.div<StackWrapperProps>`
  display: flex;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  flex-direction: ${props => props.direction};
  width: ${props => props.width};
  flex-wrap: ${props => props.wrap};
  padding: ${props => props.padding};

  overflow-x: ${props => props.scrollable ? 'scroll' : 'auto'};

  & > * + * {
    margin-top: ${props => props.childrenMarginTop}px;
    margin-bottom: ${props => props.childrenMarginBottom}px;
    margin-left: ${props => props.childrenMarginLeft}px;
    margin-right: ${props => props.childrenMarginRight}px;
  }

`;

const FlexStack: React.FC<FlexStackProps> = ({
  align,
  justify,
  spacing,
  direction = "row",
  wrap = false,
  width = '100%',
  padding = 'auto',
  scrollable = false,
  children
}) => {
  return (
    <StackWrapper
      childrenMarginTop={direction === "column" ? spacing : 0}
      childrenMarginBottom={direction === "column-reverse" ? spacing : 0}
      childrenMarginLeft={direction === "row" ? spacing : 0}
      childrenMarginRight={direction === "row-reverse" ? spacing : 0}
      align={align}
      justify={justify}
      direction={direction}
      wrap={wrap ? 'wrap' : 'nowrap'}
      width={width}
      padding={padding}
      scrollable={scrollable}
    >
      {children}
    </StackWrapper>
  );
};

export default FlexStack;
