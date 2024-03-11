import categoryService from "@/services/categoryService";
import { RejectValue } from "@/types";
import { CategoryResponse, FullCategory } from "@/types/category";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  categories: [] as FullCategory[],
};

export const createCategory = createAsyncThunk<
  CategoryResponse,
  FormData,
  RejectValue
>("category/createCategory", async (formData: FormData, thunkApi) => {
  try {
    const data = await categoryService.create(formData);
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

    updateCategories(state, { payload }: PayloadAction<FullCategory>) {
      const indexCategory = state.categories.findIndex(
        (category) => category._id === payload._id
      );

      if (indexCategory !== -1) {
        state.categories[indexCategory] = payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload.category);
    });
  },
});

export const { setCategories, updateCategories } = categorySlice.actions;

export default categorySlice.reducer;
