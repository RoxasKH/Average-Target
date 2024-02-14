import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";

interface AddButtonProps {
    onClick: () => void;
};

const StyledAddButton = styled.button`

    height: 150px;
    width: 150px;
    background-color: ${props => props.theme.background.mark_container};
    color: ${props => props.theme.colors.text};
    border-radius: 30px;
    outline: none;
    border: none;
    margin: 10px;

    &:hover {
        background-color: ${props => props.theme.background.positive_feedback};
        transition: 0.2s;
        filter: brightness(1.25);
        cursor: pointer;
    }

`;

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <StyledAddButton onClick={onClick} type='button'>
            <FaPlus size={'100px'}/>
        </StyledAddButton>
    )
}

export default AddButton;