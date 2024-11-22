import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRequest } from "../../utils/useRequest";

export default function AssignmentSubmitBoard() {
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const params = useParams();
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const request = useRequest();

  useEffect(() => {
    async function fetchAssignmentDetail() {
      const assignmentId = params.id;

      const data = await request(`/api/assignments/${assignmentId}`, "GET");

      setAssignmentDetail(data);
    }

    fetchAssignmentDetail();
  }, [params.id, request]);

  if (!assignmentDetail) return null;

  const handleDownload = (file) => {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  };

  return (
    <div>
      <p>{assignmentDetail.title}</p>
      <p>{assignmentDetail.content}</p>
      <FileUploadBox
        onDragEnter={(event) => {
          event.preventDefault();
          event.currentTarget.style.backgroundColor = "#dedede";
        }}
        onDrag={(event) => {
          event.preventDefault();
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          const { relatedTarget } = event;
          if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
            event.currentTarget.style.backgroundColor = "#ededed";
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          const files = event.dataTransfer.files;
          if (files && files.length > 0) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
          }
          event.currentTarget.style.backgroundColor = "#ededed";
        }}
      >
        {selectedFiles.length === 0 ? (
          <p>파일을 업로드할 수 있습니다.</p>
        ) : (
          <>
            <p>업로드 된 파일:</p>
            {selectedFiles.map((file, index) => (
              <FileNameParagraph
                key={index}
                onClick={() => {
                  handleDownload(file);
                }}
              >
                {file.name}
              </FileNameParagraph>
            ))}
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files);
            if (files.length > 0) {
              setSelectedFiles(files);
            }
          }}
        ></input>
        <FileUploadButton
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          업로드
        </FileUploadButton>
        {selectedFiles.length > 0 && (
          <FileUploadButton
            onClick={() => {
              setSelectedFiles([]);
            }}
          >
            삭제
          </FileUploadButton>
        )}
      </FileUploadBox>
      <SubmitMenu>
        <p>
          제출 마감일: {new Date(assignmentDetail.dueDate).toLocaleDateString()}
        </p>
        <SubmitButton>제출하기</SubmitButton>
      </SubmitMenu>
    </div>
  );
}

const SubmitButton = styled.button`
  background: orange;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: white;
`;

const SubmitMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const FileUploadBox = styled.div`
  & > input[type="file"] {
    display: none;
  }

  background: #ededed;
  padding: 0 10px;
  height: fit-content;
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;

  & * {
    white-space: nowrap;
  }
`;

const FileUploadButton = styled.button`
  background: #2f2f2f;
  border: none;
  height: 40px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const FileNameParagraph = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;
