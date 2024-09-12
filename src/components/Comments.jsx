import axios from "axios";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Axios 인스턴스 생성
const commentApi = axios.create({
  baseURL: "http://localhost:5000/comments"
});

//Zustand 스토어 생성
const useCommentStore = create((set) => ({
  newComment: "",
  setNewComment: (comment) => set({ newComment: comment })
}));

//서버에서 댓글 불러오는 함수
const fetchComments = async () => {
  const { data } = await commentApi.get("/");
  return data;
};

//서버에 댓글 생성하는 함수
const postComment = async (comment) => {
  const { data } = await commentApi.post("/", {
    ...comment,
    userId: "s77772005", //임시로 ID 넣어놈.
    createdAt: new Date().toISOString()
  });

  return data;
};

const Comments = () => {
  const { newComment, setNewComment } = useCommentStore();
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>댓글</h1>
      <form>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default Comments;
