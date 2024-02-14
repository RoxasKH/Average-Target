import styled from "styled-components";
import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import FlexStack from "./FlexStack";
import { useAppDispatch } from "../../store/hook";
import { removeMark } from "../../store/reducers/mark_reducer";
import { setEditInputs, toggleEditDialog } from "../../store/reducers/mark_dialog_reducer";
import { hideConfirmationDialog, showConfirmationDialog } from "../../store/reducers/confirmation_dialog_reducer";

interface MarkProps {
    mark: number;
    subject: string;
    id: number;
}

interface MarkButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: 'danger';
}

const MarkContainer = styled.div`
    width: 150px;
    height: 150px;
    background-color: ${props => props.theme.background.mark_container};
    border-radius: 30px;    
    margin: 10px;

    &:hover {
        transition: 0.2s;
        filter: brightness(1.25);
    }

    @media only screen and (${props => props.theme.devices.xl}) {
        width: 120px;
        height: 120px;
        margin: 8px;
    }
`;

const MarkButton = styled.div<MarkButtonProps>`
    height: 30px;
    width: 30px;
    padding: 5px;
    background-color: ${props => props.theme.background.mark_container};
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    margin: 5px 2px;
    
    ${({ variant = 'default', theme }) => {
        switch (variant) {
            case 'danger':
                return `
                    &:hover {
                        background-color: ${theme.background.negative_feedback};
                    }
                `;
            default:
                return `
                    &:hover {
                        filter: brightness(1.25);
                    }
                `;
        }
    }}

`;

const MarkValue = styled.div`
    height: 70px;
    width: 70px;
    margin: auto;
    border-radius: 20px;
    background-color: ${props => props.theme.background.mark_container_box};
    margin-top: -10px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 30px;
    line-height: 70px;
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        background: transparent; /* Chrome/Safari/Webkit */
        width: 0px;
    }
    @media only screen and (${props => props.theme.devices.xl}) {
        width: 50px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
    }
`;

const MarkSubject = styled.div`
    height: 20px;
    line-height: 15px;
    width: 75%;
    margin: auto;
    border-radius: 10px;
    background-color: ${props => props.theme.background.mark_container_box};
    font-size: 15px;
    overflow-x: hidden;
    box-sizing: border-box;
    text-align: center;
    padding: 2px 5px 2px 5px;

    text-overflow: ellipsis; /* manage text overflow */
    white-space: nowrap;
    overflow: hidden;

    @media only screen and (${props => props.theme.devices.xl}) {
        height: 15px;
        font-size: 10px;
        line-height: 10px;
    }
`;

const MarkButtons: React.FC<MarkProps> = ({ mark, subject, id }) => {

    const dispatch = useAppDispatch();

    return (
        <div style={{
            position: 'relative',
            top: '-10px',
            right: '-10px',
        }}>
            <FlexStack 
                align={'flex-end'} 
                justify={'end'} 
                spacing={0} 
                direction={'row'}
            >
                <MarkButton>
                    <MdModeEdit
                        onClick={() => {
                            dispatch(setEditInputs({
                                mark: mark,
                                subject: subject,
                                id: id
                            }));
                            dispatch(toggleEditDialog());
                        }}    
                    />
                </MarkButton>
                <MarkButton 
                    variant='danger'
                    onClick={() => {
                        dispatch(
                            showConfirmationDialog({
                                message: 'Are you sure you want to delete the mark?',
                                onCancel: () => dispatch(hideConfirmationDialog()),
                                onConfirm: () => dispatch(removeMark({id: id}))
                            })
                        );
                    }}
                >
                    <IoClose />
                </MarkButton>
            </FlexStack>
        </div>
    );
};

const Mark: React.FC<MarkProps> = (markObj) => {
  return (
    <MarkContainer>
        <MarkButtons {...markObj}/>
        <MarkValue>{markObj.mark}</MarkValue>
        <MarkSubject>{markObj.subject}</MarkSubject>
    </MarkContainer>
  );
};

export default Mark;