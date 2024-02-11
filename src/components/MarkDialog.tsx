import Dialog from './styled/Dialog'
import InputEntry from './InputEntry'
import Button from './styled/Button'
import FlexStack from './styled/FlexStack'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { addMark, editMark } from '../store/reducers/mark_reducer'
import { toggleMarkDialog } from '../store/reducers/mark_dialog_reducer'
import { FaPlus } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from './styled/ErrorMessage'
import { capitalize } from '../utils'

const MarkDialog: React.FC = () => {

    const { edit, edit_content } = useAppSelector(store => store.markDialog)
    const { mark, subject, id } = edit_content;

    const MarkValidationSchema = z.object({
        mark: z.coerce.number().nonnegative().gt(0).lte(999),
        subject: z.coerce.string().min(1).max(30)
    });
    type MarkValidationSchemaType = z.infer<typeof MarkValidationSchema>;

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MarkValidationSchemaType>({ resolver: zodResolver(MarkValidationSchema) })
    
    const onSubmit: SubmitHandler<MarkValidationSchemaType> = (data) => {
        if(edit) {
            dispatch(editMark({
                mark: data.mark,
                subject: capitalize(data.subject),
                id: id
            }));
        }
        else {
            dispatch(addMark({
                mark: data.mark,
                subject: capitalize(data.subject),
                id: 0
            }));
        }
        dispatch(toggleMarkDialog());
    }

    return (
        <Dialog onClose={toggleMarkDialog}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FlexStack 
                    align={'center'}
                    justify={'space-evenly'}
                    spacing={10} 
                    direction={'column'} 
                >
                    <InputEntry 
                        text={'Mark'} 
                        placeholder={'Insert a mark'} 
                        hint={'The mark you got.'}
                        number={true}
                        value={edit ? mark : undefined}
                        {...register('mark')}
                    />
                    {errors.mark && <ErrorMessage>{errors.mark.message}</ErrorMessage>}
                    <InputEntry 
                        text={'Subject'} 
                        placeholder={'Insert the subject'} 
                        hint={'The subject you got the mark in.'}
                        value={edit ? subject : undefined}
                        {...register('subject')}
                    />
                    {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
                    <FlexStack
                        align={'flex-end'}
                        justify={'space-around'}
                        spacing={10} 
                        direction={'column'} 
                    >
                        {
                            edit ? (
                                <Button
                                    type='submit'
                                    icon={<MdModeEdit />}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    type='submit'
                                    icon={<FaPlus />}
                                >
                                    Add
                                </Button>
                            )
                        }
                        
                    </FlexStack>
                </FlexStack>
            </form>
        </Dialog>
    );
};

export default MarkDialog;