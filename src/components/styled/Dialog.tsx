import styled from "styled-components";
import Container from "./Container";
import React, { ReactNode, useRef, useEffect, useCallback } from 'react'
import { useAppDispatch } from "../../store/hook";

const DialogScreen = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7 );
    backdrop-filter: blur(10px);
    top: 0;
    padding: 40px;
    transition: 0.2s;
`;

const CloseButton = styled.div<React.HTMLAttributes<HTMLDivElement>>`
    width: 60px;
    font-size: 50px;
    cursor: pointer;
    margin-bottom: 5%;
    padding: 10px;
    transition: 0.2s;
    margin-left: auto; 
    margin-right: 0;

    &:before {
        content: '✕';
    }

    &:hover {
        filter: brightness(0.7);
        transition: 0.2s;
    }
`;

const DialogContainer = styled(Container).attrs({ variant: 'small' })`
    margin-left: auto;
    margin-right: auto;
    width: 700px; 

    @media only screen and (${props => props.theme.devices.xl}) {
        max-width: 90%;
    }
`;

const Dialog: React.FC<{children: ReactNode, onClose: (...args: any) => any}> = ({ children, onClose }) => {

  const dialogRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const closeDialog = useCallback(
    () => dispatch(onClose()), [onClose, dispatch]
  );

  useEffect(() => {

    const handleClickOutside = (event: Event) => {
        if (
            dialogRef.current 
            && event.target 
            && !dialogRef.current.contains(event.target as Node)
        ) {
            closeDialog();
        }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'auto';
    }
  }, [closeDialog]);

  return (
    <DialogScreen>
        <CloseButton onClick={closeDialog}/>
        <DialogContainer ref={dialogRef}>
            {children}
        </DialogContainer>
    </DialogScreen>
  )
}

export default Dialog;