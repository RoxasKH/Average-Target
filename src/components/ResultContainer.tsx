import React, { useEffect, useState } from 'react'
import FlexStack from './styled/FlexStack';
import Container from './styled/Container';
import ResultCombination from './styled/ResultCombination';

const ResultContainer: React.FC<{result: number[][]}> = ({ result }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedResult, setPaginatedResult] = useState<number[][]>([]);
    const pageSize = 10;

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPaginatedResult(result.slice(0, endIndex));
    }, [result, currentPage, pageSize]);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    
        if (bottom) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            <FlexStack align={'flex-start'} justify={'start'} spacing={0} direction={'row'} padding='0px 10px'>
            <p>Possible marks combinations:</p>
            </FlexStack>
            
            <Container variant='small' scrollable={true} maxHeight='250px' padding={0} onScroll={handleScroll}>
            {
                paginatedResult.map((combination) => <ResultCombination marks={combination} />)
            }
            </Container>
        </>
    )
};

export default ResultContainer;