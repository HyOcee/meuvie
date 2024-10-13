import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  let pageNumber = 1;
  let title = "";
  let pageSize = 10;

  const pageNumberParam = searchParams.get("page");
  if (pageNumberParam) {
    const n = parseInt(pageNumberParam, 10);
    if (!isNaN(n) && n > 1) {
      pageNumber = n;
    }
  }
  const pageSizeParam = searchParams.get("page_size");
  if (pageSizeParam) {
    const n = parseInt(pageSizeParam, 10);
    if (!isNaN(n) && n > 1) {
      pageSize = n;
    }
  }

  const titleParam = searchParams.get("search");
  if (titleParam) {
    title = titleParam;
  }

  const setPageNumber = (pageNumber: number) => {
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
  };

  const setPageSize = (pageSize: number) => {
    searchParams.set("page_size", pageSize.toString());
    setSearchParams(searchParams);
  };

  const setTitle = (title: string) => {
    searchParams.set("search", title);
    setSearchParams(searchParams);
  };

  return {
    pageNumber,
    pageSize,
    title,
    setPageNumber,
    setPageSize,
    setTitle,
  };
}
