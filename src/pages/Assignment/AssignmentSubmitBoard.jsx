import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRequest } from "../../utils/useRequest";

export default function AssignmentSubmitBoard() {
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const params = useParams(); // URL에서 id 가져오기
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const request = useRequest();

  useEffect(() => {
    async function fetchAssignmentDetail() {
      if (!params.id) {
        console.error("Assignment ID is missing in the URL.");
        return;
      }

      try {
        console.log(`Fetching assignment detail for ID: ${params.id}`);
        const data = await request(`/api/assignments/${params.id}`, "GET");
        setAssignmentDetail(data);
      } catch (error) {
        console.error("Error fetching assignment detail:", error);
      }
    }

    fetchAssignmentDetail();
  }, [params.id, request]);

  if (!assignmentDetail) return <p>Loading...</p>;

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
      <p>
        제출 마감일: {new Date(assignmentDetail.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
}

// Styled Components
const FileUploadBox = styled.div`
  & > input[type="file"] {
    display: none;
  }

  background: #ededed;
  padding: 0 10px;
  width: 100%;
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
