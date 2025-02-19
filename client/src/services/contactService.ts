import { ContactDTO, ContactResponse, ContactsResponse } from "@/types/contact";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

const contactService = {
  getAll: async (options?: QueryOptions) => {
    let query = "";

    if (options?.limit) {
      query += query ? `&limit=${options.limit}` : `?limit=${options.limit}`;
    }

    if (options?.page) {
      query += query ? `&page=${options.page}` : `?page=${options.page}`;
    }

    if (options?.search) {
      query += query
        ? `&search=${options.search}`
        : `?search=${options.search}`;
    }

    return apiRequest<ContactsResponse>(`/contacts${query}`, {
      token: true,
    });
  },

  create: async (contact: ContactDTO) => {
    return apiRequest<ContactResponse>("/contacts/create", {
      data: contact,
      method: "POST",
    });
  },

  update: async (id: string, contact: ContactDTO) => {
    return apiRequest<ContactResponse>(`/contacts/update/${id}`, {
      data: contact,
      method: "PUT",
      token: true,
    });
  },

  delete: async (id: string) => {
    return apiRequest<ContactResponse>(`/contacts/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },

  deleteMany: async (ids: string[]) => {
    return apiRequest<ContactResponse>(`/contacts/delete-many`, {
      data: { ids },
      method: "DELETE",
      token: true,
    });
  },
};

export default contactService;
