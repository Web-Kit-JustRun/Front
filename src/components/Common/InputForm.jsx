import styled from "styled-components";

const InputForm = ({
  title,
  inputTitle,
  eMsgColor,
  eMsgContent,
  onChange,
  value,
  type = "text",
}) => {
  return (
    <InputFormBlock $eMsgColor={eMsgColor}>
      <label className="title">{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={inputTitle}
      />
      <label className="errorMsg">{eMsgContent || " "}</label>
    </InputFormBlock>
  );
};

const InputFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;

  input {
    border-width: 0 0 1px;
    outline: none;
    padding: 10px;
  }

  .errorMsg {
    font-size: 0.7em;
    color: ${(props) => props.$eMsgColor};
    height: 1rem;
    user-select: none;
    transition: color 0.3s ease-in-out;
  }
`;

export default InputForm;
