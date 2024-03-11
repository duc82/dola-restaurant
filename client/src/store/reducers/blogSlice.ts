import blogService from "@/services/blogService";
import { FullBlog } from "@/types/blog";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllBlog = createAsyncThunk(
  "blog/getAllBlog",
  async (_, thunkApi) => {
    try {
      const data = await blogService.getAll();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(handlingAxiosError(error));
    }
  }
);

const initialState = {
  blogs: [] as FullBlog[],
  limit: 0,
  total: 0,
  skip: 0,
  isLoading: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllBlog.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.blogs = payload.blogs;
      state.limit = payload.limit;
      state.skip = payload.skip;
      state.total = payload.total;
    });

    builder.addCase(getAllBlog.rejected, (state, { payload }) => {});
  },
});

export default blogSlice.reducer;
