import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constant/dataTableConstant";
import { useState } from "react";
import useDebounce from "./useDebounce";

export default function useDataTable() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const debounce = useDebounce();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(DEFAULT_PAGE);
  };
  const handleSearchChange = (search: string) => {
    debounce(() => {
      setCurrentSearch(search);
      setCurrentPage(DEFAULT_PAGE);
    }, 300);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setCurrentPage(DEFAULT_PAGE);
  };
  return {
    currentPage,
    currentLimit,
    currentSearch,
    currentFilter,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    handleFilterChange,
  };
}
