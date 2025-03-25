import axios from "axios";
import apiRequest from "./api";
import {
  Address,
  AddressResponse,
  District,
  FullAddress,
  Province,
  Ward,
} from "@/types/address";

const addressService = {
  getProvinces: async () => {
    const res = await axios.get<Province[]>(
      `${import.meta.env.VITE_API_PROVINCE}/provinces`
    );
    return res.data;
  },

  getDistricts: async (parent_code: string) => {
    const res = await axios.get<District[]>(
      `${
        import.meta.env.VITE_API_PROVINCE
      }/districts?parent_code=${parent_code}`
    );
    return res.data;
  },

  getWards: async (parent_code: string) => {
    const res = await axios.get<Ward[]>(
      `${import.meta.env.VITE_API_PROVINCE}/wards?parent_code=${parent_code}`
    );
    return res.data;
  },

  getCurrent: async () => {
    return apiRequest<FullAddress[]>("addresses/current", { token: true });
  },

  create: (data: Address) => {
    return apiRequest<AddressResponse>("addresses/create", {
      method: "POST",
      data,
      token: true,
    });
  },

  update: (id: string, data: Address) => {
    return apiRequest<AddressResponse>(`addresses/update/${id}`, {
      method: "PUT",
      data,
      token: true,
    });
  },

  deleteOne: (id: string) => {
    return apiRequest<{ message: string }>(`addresses/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },
};

export default addressService;
