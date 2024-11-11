import styled from "styled-components";
import InputForm from "./Common/InputForm"; // 기존 InputForm import

const IssueAddComponent = (props) => {
  const {
    issueName,
    issuePriority,
    issueTag,
    frontWork,
    endWork,
    task,
    description,
    handleIssueNameChange,
    handlePriorityChange,
    handleTagChange,
    handleFrontWorkChange,
    handleEndWorkChange,
    handleTaskChange,
    handleDescriptionChange,
    handleSave,
    handleDelete,
    type,
  } = props;
  return (
    <Container>
      <Header>
        <Title>{type === "add" ? "ADD_ISSUE" : "EDIT_ISSUE"}</Title>
      </Header>
      <FormContent>
        {type === "add" ? (
          <InputForm
            title="ADD_ISSUE_NAME"
            inputTitle="Issue Name"
            value={issueName}
            onChange={handleIssueNameChange}
          />
        ) : (
          <InputForm
            title="EDIT_ISSUE_NAME"
            inputTitle="Issue Name"
            value={issueName}
            onChange={handleIssueNameChange}
          />
        )}

        <SelectWrapper>
          <label>ADD_ISSUE_PRIORITY</label>
          <select value={issuePriority} onChange={handlePriorityChange}>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
            <option value="3">3순위</option>
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <label>ADD_ISSUE_TAG</label>
          <select value={issueTag} onChange={handleTagChange}>
            <option value="버그">버그</option>
            <option value="개선">개선</option>
            <option value="새 기능">새 기능</option>
            <option value="이슈">이슈</option>
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <label>FRONT_WORK</label>
          <select value={frontWork} onChange={handleFrontWorkChange}>
            <option value="none">선택해주세요</option>
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <label>END_WORK</label>
          <select value={endWork} onChange={handleEndWorkChange}>
            <option value="none">선택해주세요</option>
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <label>TASK</label>
          <select value={task} onChange={handleTaskChange}>
            <option value="none">선택해주세요</option>
          </select>
        </SelectWrapper>

        <DescriptionWrapper>
          <label>Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter the description here..."
          />
        </DescriptionWrapper>

        <SaveButton onClick={handleSave}>
          {type === "add" ? "SAVE" : "UPDATE"}
        </SaveButton>
        {type === "edit" && (
          <DeleteButton onClick={handleDelete}>DELETE</DeleteButton>
        )}
      </FormContent>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const FormContent = styled.div`
  width: 95%;
`;

const SelectWrapper = styled.div`
  margin-bottom: 15px;

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 20px;

  textarea {
    width: 100%;
    height: 70px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    overflow-y: auto;
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  background-color: #dddddd;
  color: black;
  padding: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #cccccc;
  }
`;

const DeleteButton = styled.button`
  margin-top: 5px;
  background-color: #f05f4f;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #c53935;
  }
`;

export default IssueAddComponent;
