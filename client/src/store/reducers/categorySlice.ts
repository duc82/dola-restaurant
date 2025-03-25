import categoryService from "@/services/categoryService";
import { RejectValue } from "@/types";
import { CategoryDto, CategoryResponse, FullCategory } from "@/types/category";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  categories: [] as FullCategory[],
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

    deleteCategory(state, { payload }: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category._id !== payload
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload.category);
    });
  },
});

export const { setCategories, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;
