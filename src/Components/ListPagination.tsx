import React from "react";
import Pagination from "react-bootstrap/Pagination";

interface IListPaginationProps {
  totalRecords: number;
  recordsPerPage: number;
  currentPage?:number;
  onClick: (p: number) => void;
}
function ListPagination(props: IListPaginationProps) {
  const [activePage, setActivePage] = React.useState<number>(props.currentPage || 1);
  const [pagination, setPagination] = React.useState({
    totalPages: 1,
    paginationItems: [] as any,
  });
  React.useEffect(()=>{
    setActivePage(props.currentPage || 1)
  },[props.currentPage])

  React.useEffect(() => {
    let items = [];
    let pages = Math.ceil(props.totalRecords / props.recordsPerPage);
    let startPage = activePage - 3 >= 1 ? activePage - 3 : 1;
    let endPage = activePage + 3 >= pages ? pages : activePage + 3;
    if (startPage > 1) {
      items.push(<Pagination.Ellipsis />);
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(
          <Pagination.Item
            key={i}
            active={i === activePage}
            onClick={() => {
              setActivePage(i);
              props.onClick(i);
            }}>
            {i}
          </Pagination.Item>
      );
    }

    if (endPage <= pages - 3) {
      items.push(<Pagination.Ellipsis />);
    }
    setPagination({ ...pagination, paginationItems: items, totalPages: pages });
  }, [props.totalRecords, activePage]);

  const RedirectPage = (page: number) => {
    setActivePage(page);
    props.onClick(page);
  };

  return (
    <Pagination>
      <Pagination.First
        disabled={activePage === 1}
        onClick={() => {
          let newPage = 1;
          RedirectPage(newPage);
        }}
      />
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => {
          let newPage = activePage - 1;
          RedirectPage(newPage);
        }}
      />
      {pagination.paginationItems}
      <Pagination.Next
        disabled={activePage === pagination.totalPages}
        onClick={() => {
          let newPage = activePage + 1;
          RedirectPage(newPage);
        }}
      />
      <Pagination.Last
        disabled={activePage === pagination.totalPages}
        onClick={() => {
          let newPage = pagination.totalPages;
          RedirectPage(newPage);
        }}
      />
    </Pagination>
  );
}

export default ListPagination;
