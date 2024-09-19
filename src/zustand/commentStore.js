import { create } from "zustand";

// Zustand 스토어 생성
export const useCommentStore = create((set) => ({
  newComment: "",
  editingComment: { id: null, text: "" },
  setNewComment: (comment) => set({ newComment: comment }),
  setEditingComment: (id, text) => set({ editingComment: { id, text } })
}));
