import React, { FormEvent, useState } from 'react'
import FlexStack from './styled/FlexStack'
import FormInput from './styled/FormInput'
import Hint from './styled/Hint'
import { useAppDispatch } from '../store/hook'
import { setEditInputs, setEditMark, setEditSubject } from '../store/reducers/mark_dialog_reducer'

interface InputEntryProps{
    text: string,
    placeholder: string,
    hint: string,
    number?: boolean
    value?: string | number
}

const InputEntry: React.FC<InputEntryProps> = React.forwardRef<HTMLInputElement, InputEntryProps>(
    ({ text, placeholder, hint, number, value, ...rest }, register) => {

    const defaultTextPlaceholder = 'Insert text here';
    const defaultNumberPlaceholder = 'Insert a number';

    const [ inputValue, setInputValue ] = useState<string | number | undefined>(value);

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setInputValue((event.target as HTMLInputElement).value);
    };

    return (
        <FlexStack 
            align={'flex-start'} 
            justify={'space-evenly'} 
            spacing={10} 
            direction={'column'}
        >
            <label>{text}</label>

            <FlexStack
                align={'flex-end'} 
                justify={'space-evenly'} 
                spacing={5} 
                direction={'column'}
            >
                { number ?
                    <FormInput 
                        placeholder={placeholder ? placeholder : defaultNumberPlaceholder} 
                        type='number' 
                        variant='number'
                        defaultValue={inputValue}
                        onChange={(e)=>onChange(e)}
                        ref={register}
                        {...rest}
                    />
                :
                    <FormInput 
                        placeholder={placeholder ? placeholder : defaultTextPlaceholder} 
                        type='text'
                        ref={register}
                        defaultValue={inputValue}
                        onChange={(e)=>onChange(e)}
                        {...rest}
                    />
                }
                <Hint text={hint}/>
            </FlexStack>
            
            
        </FlexStack>
    )
});

export default InputEntry