import type { TablePaginationConfig } from '../interface';
export declare const DEFAULT_PAGE_SIZE = 10;
export declare function getPaginationParam(mergedPagination: TablePaginationConfig, pagination?: TablePaginationConfig | boolean): any;
export default function usePagination(total: number, pagination: TablePaginationConfig | false | undefined, onChange: (current: number, pageSize: number) => void): [TablePaginationConfig, () => void];
