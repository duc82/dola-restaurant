import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "../../utils/handlingAxiosError";
import { RejectValue } from "@/types";
import productService from "@/services/productService";
import {
  FullProduct,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";

export const getAllProduct = createAsyncThunk<
  ProductsResponse,
  | {
      category?: string;
      query?: string;
      limit?: number;
    }
  | undefined,
  RejectValue
>("products/getAll", async (param, thunkApi) => {
  try {
    const data = await productService.getAll(param);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const createProduct = createAsyncThunk<
  ProductResponse,
  FormData,
  RejectValue
>("products/create", async (formData, thunkApi) => {
  try {
    const data = await productService.create(formData);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const updateProduct = createAsyncThunk<
  ProductResponse,
  { id: string; formData: FormData },
  RejectValue
>("products/update", async ({ id, formData }, thunkApi) => {
  try {
    const data = await productService.update(id, formData);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const deleteProduct = createAsyncThunk<
  { message: string; id: string },
  string,
  RejectValue
>("products/delete", async (id, thunkApi) => {
  try {
    const data = await productService.delete(id);
    return { id, message: data.message };
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

const initialState = {
  products: [] as FullProduct[],
  limit: 0,
  skip: 0,
  total: 0,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllProduct.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.total = payload.total;
      state.limit = payload.limit;
      state.skip = payload.skip;
      state.isLoading = false;
    });

    builder.addCase(getAllProduct.rejected, (state) => {
      state.products = [];
      state.total = 0;
      state.limit = 0;
      state.skip = 0;
      state.isLoading = false;
    });

    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.total++;
      state.products.push(payload.product);
    });

    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      console.log(payload.product);
      const index = state.products.findIndex(
        (product) => product._id === payload.product._id
      );

      if (index !== -1) {
        state.products[index] = payload.product;
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.total--;
      const indexProduct = state.products.findIndex(
        (product) => product._id === payload.id
      );

      if (indexProduct !== -1) {
        state.products.splice(indexProduct, 1);
      }
    });
  },
});

export default productSlice.reducer;
