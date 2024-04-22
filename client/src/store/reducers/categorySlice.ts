import categoryService from "@/services/categoryService";
import { RejectValue } from "@/types";
import {
  CategoriesResponse,
  CategoryDto,
  CategoryResponse,
  FullCategory
} from "@/types/category";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface CategoryState extends CategoriesResponse {
  skip: number;
}

const initialState: CategoryState = {
  categories: [],
  total: 0,
  page: 1,
  limit: 10,
  skip: 0
};

export const createCategory = createAsyncThunk<
  CategoryResponse,
  CategoryDto,
  RejectValue
>("category/createCategory", async (body, thunkApi) => {
  try {
    const data = await categoryService.create(body);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, { payload }: PayloadAction<FullCategory[]>) {
      state.categories = payload;
    },

    sortCategories(
      state,
      {
        payload
      }: PayloadAction<{
        key: "name" | "createdAt";
        order: "asc" | "desc";
      }>
    ) {
      state.categories.sort((a, b) => {
        if (payload.order === "asc") {
          return a[payload.key] > b[payload.key] ? 1 : -1;
        }

        return a[payload.key] < b[payload.key] ? 1 : -1;
      });
    },

    updateCategories(state, { payload }: PayloadAction<FullCategory>) {
      const indexCategory = state.categories.findIndex(
        (category) => category._id === payload._id
      );

      if (indexCategory !== -1) {
        state.categories[indexCategory] = payload;
      }
    },

    deleteCategory(state, { payload }: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category._id !== payload
      );
      state.total -= 1;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload.category);
      state.total += 1;
    });
  }
});

export const {
  setCategories,
  updateCategories,
  deleteCategory,
  sortCategories
} = categorySlice.actions;

export default categorySlice.reducer;
