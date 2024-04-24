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

interface RedirectProps {
  redirect: string;
}

interface RejectValue {
  rejectValue: {
    message: string;
  };
}

interface QueryOptions {
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
  Timestamp,
  FullType,
  FilePreview,
  QueryOptions,
  Pagination
};
