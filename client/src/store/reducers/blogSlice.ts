import { BlogsResponse, Blog } from "@/types/blog";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  blogs: [] as Blog[],
  limit: 0,
  total: 0,
  skip: 0,
  isLoading: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getAllBlogs: (state, { payload }: PayloadAction<BlogsResponse>) => {
      state.blogs = payload.blogs;
      state.limit = payload.limit;
      state.total = payload.total;
      state.skip = payload.skip;
    },
  },
});

export const { getAllBlogs } = blogSlice.actions;
export default blogSlice.reducer;
