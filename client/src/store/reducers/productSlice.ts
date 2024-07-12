import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "../../utils/handlingAxiosError";
import { Pagination, RejectValue } from "@/types";
import productService, { GetAllProductParams } from "@/services/productService";
import {
  FullProduct,
  Product,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";
import limits from "@/data/limits.json";

export const getAllProduct = createAsyncThunk<
  ProductsResponse,
  GetAllProductParams | undefined,
  RejectValue
>("products/getAll", async (queryOptions, thunkApi) => {
  try {
    const data = await productService.getAll(queryOptions);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const createProduct = createAsyncThunk<
  ProductResponse,
  Product,
  RejectValue
>("products/create", async (product, thunkApi) => {
  try {
    const data = await productService.create(product);
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

export const deleteManyProduct = createAsyncThunk<
  { message: string },
  string[],
  RejectValue
>("products/deleteMany", async (ids, thunkApi) => {
  try {
    const data = await productService.deleteMany(ids);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export interface ProductState extends Pagination {
  products: FullProduct[];
  viewedProducts: FullProduct[];
  favoriteProducts: FullProduct[];
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  viewedProducts: [],
  favoriteProducts: [],
  limit: limits[0],
  skip: 0,
  total: 0,
  page: 1,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addViewedProducts: (state, { payload }: PayloadAction<FullProduct>) => {
      const isExists = state.viewedProducts.some((p) => p._id === payload._id);
      if (!isExists) {
        state.viewedProducts.push(payload);
      }
    },
    addFavoriteProducts: (state, { payload }: PayloadAction<FullProduct>) => {
      state.favoriteProducts.push(payload);
    },

    removeFavoriteProducts: (state, { payload }: PayloadAction<string>) => {
      const index = state.favoriteProducts.findIndex((p) => p._id === payload);
      state.favoriteProducts.splice(index, 1);
    },
  },
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
export const {
  addViewedProducts,
  addFavoriteProducts,
  removeFavoriteProducts,
} = productSlice.actions;
