import { ReactNode } from "react";

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

interface ChildrenProps {
  children?: ReactNode;
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
  query?: string;
  limit?: number;
}

export type {
  ChildrenProps,
  RedirectProps,
  RejectValue,
  BreadcrumbItem,
  Timestamp,
  FullType,
  FilePreview,
  Filter,
};
