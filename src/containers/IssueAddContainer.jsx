import { useState, useEffect } from "react";
import IssueAddComponent from "../components/IssueAddComponent";

const IssueAddContainer = ({ onClose, type, issueData }) => {
  const [issueName, setIssueName] = useState("");
  const [issuePriority, setIssuePriority] = useState("Low");
  const [issueTag, setIssueTag] = useState("버그");
  const [frontWork, setFrontWork] = useState("");
  const [endWork, setEndWork] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  // edit일 때 데이터 관리
  useEffect(() => {
    if (type === "edit" && issueData) {
      setIssueName(issueData.title);
      setDescription(issueData.content);
      setIssuePriority(issueData.priority);
      setIssueTag(issueData.type);
      setFrontWork(issueData.front_work);
      setEndWork(issueData.end_work);
    }
  }, [type, issueData]);

  // 입력값 처리
  const handleIssueNameChange = (e) => setIssueName(e.target.value);
  const handlePriorityChange = (e) => setIssuePriority(e.target.value);
  const handleTagChange = (e) => setIssueTag(e.target.value);
  const handleFrontWorkChange = (e) => setFrontWork(e.target.value);
  const handleEndWorkChange = (e) => setEndWork(e.target.value);
  const handleTaskChange = (e) => setTask(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    if (type === "add") {
      console.log("Adding new issue:", {
        issueName,
        issuePriority,
        issueTag,
        frontWork,
        endWork,
        task,
        description,
      });
    } else if (type === "edit") {
      console.log("Updating issue:", {
        issueName,
        issuePriority,
        issueTag,
        frontWork,
        endWork,
        task,
        description,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    console.log("Deleting issue:", issueData);
    onClose();
  };

  const propData = {
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
  };

  return <IssueAddComponent {...propData} />;
};

export default IssueAddContainer;
