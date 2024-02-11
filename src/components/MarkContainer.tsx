import React, { useState } from 'react'
import Container from './styled/Container'
import FlexStack from './styled/FlexStack'
import AddButton from './styled/AddButton'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { toggleAddDialog } from '../store/reducers/mark_dialog_reducer'
import Mark from './styled/Mark'
import Button from './styled/Button'
import { MdDelete } from "react-icons/md";
import { clearMarks } from '../store/reducers/mark_reducer'
import ConfirmationDialog from './ConfirmationDialog'
import { hideConfirmationDialog, showConfirmationDialog } from '../store/reducers/confirmation_dialog_reducer'

export const MarkContainer = () => {

    const dispatch = useAppDispatch();
    const marks = useAppSelector(store => store.mark)

    return (
        <>
            <FlexStack 
                align={'flex-end'} 
                justify={'end'} 
                spacing={0} 
                direction={'row'}
            >
                <Button
                    icon={<MdDelete />}
                    priority='danger'
                    onClick={() => dispatch(
                        showConfirmationDialog({
                            message: 'Are you sure you want to clear all marks?',
                            onCancel: () => dispatch(hideConfirmationDialog()),
                            onConfirm: () => dispatch(clearMarks())
                        })
                    )}
                >
                    Clear marks
                </Button>
            </FlexStack>
            
            <Container variant='small' padding={35}>
                <FlexStack
                    align={'flex-start'} 
                    justify={'start'}
                    spacing={0} 
                    direction={'row'}
                    wrap={true}
                >
                    {
                        marks && 
                        marks.length !== 0 &&
                        marks.map((mark) => {
                            return (
                                <Mark 
                                    {...mark}
                                    key={mark.id}
                                />
                            );
                        })
                    }
                    <AddButton onClick={() => dispatch(toggleAddDialog())} />
                </FlexStack>
            </Container>
        </>
  )
}
