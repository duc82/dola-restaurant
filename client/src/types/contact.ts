export interface ContactDTO {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface Contact extends ContactDTO {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactResponse {
  contact: Contact;
  message: string;
}

export interface ContactsResponse {
  contacts: Contact[];
  limit: number;
  total: number;
  skip: number;
}
