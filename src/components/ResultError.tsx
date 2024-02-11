import React, { ReactNode } from 'react'
import Container from './styled/Container';
import ErrorMessage from './styled/ErrorMessage';
import { MdError } from "react-icons/md";
import FlexStack from './styled/FlexStack';

const ResultError: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <ErrorMessage fontSize='20px'>
      <FlexStack align={'center'} justify={'center'} spacing={10} direction={'row'}>
        <MdError />
        <div>
          {children}
        </div>
      </FlexStack>
    </ErrorMessage>
  );
};

export default ResultError;