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

  //댓글 불러오기
  const {
    data: comments,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments
  });

  // 댓글 생성
  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      alert("댓글이 추가되었습니다!");
      queryClient.invalidateQueries(["comments"]);
    }
  });

  // 댓글 제출하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim() !== "") {
      const comment = {
        text: newComment
      };

      mutate(comment);

      setNewComment("");
    }
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h1>댓글 공간</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button type="submit">댓글 작성</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <small>
              {comment.userId}_{comment.createdAt}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
