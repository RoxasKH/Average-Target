import styled from "styled-components";
import React from 'react'
import FlexStack from "./FlexStack";

const Result = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: ${props => props.theme.background.mark_container_box};
    font-size: 30px;
`;

const Combination = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: ${props => props.theme.background.mark_container};
    width: 100%;

    & + * {
        margin-top: 10px;
    }
`;

const ResultCombination: React.FC<{marks: number[]}> = ({marks}) => {
  return (
    <Combination>
        <FlexStack 
            align={'flex-start'} 
            justify={'start'} 
            spacing={10} 
            direction={"row"}
            scrollable={true}
        >
            {
                marks.map((mark) => {
                    return <Result>{mark}</Result>
                })
            }
        </FlexStack>
    </Combination>
  )
};

export default ResultCombination;