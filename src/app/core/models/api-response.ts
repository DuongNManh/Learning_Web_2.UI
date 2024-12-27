export interface ApiResponse<T> {
  status_code: number;
  message: string;
  reason?: string;
  is_success: boolean;
  data?: T;
}

export interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface PagingResponse<T> {
  items: T[];
  meta: PaginationMeta;
} 