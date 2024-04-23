interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

interface FullType extends Timestamp {
  _id: string;
}

interface FilePreview extends File {
  preview: string;
}

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface RedirectProps {
  redirect: string;
}

interface RejectValue {
  rejectValue: {
    message: string;
  };
}

interface Filter {
  search?: string;
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  skip: number;
}

export type {
  RedirectProps,
  RejectValue,
  BreadcrumbItem,
  Timestamp,
  FullType,
  FilePreview,
  Filter,
  Pagination,
};
