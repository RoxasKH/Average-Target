import styled from "styled-components";

interface AddButtonProps {
    onClick: () => void;
};

const StyledAddButton = styled.button`

    font-size: 150px;
    height: 150px;
    width: 150px;
    background-color: ${props => props.theme.background.mark_container};
    color: ${props => props.theme.colors.text};
    text-align: center;
    border-radius: 30px;
    outline: none;
    border: none;
    line-height: 40px;
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
            +
        </StyledAddButton>
    )
}

export default AddButton;