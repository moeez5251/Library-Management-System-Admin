import { Button } from "@/components/ui/button";

const PaginationControls = ({ table }) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const visiblePages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-1 pt-4 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        ⏮
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        ◀
      </Button>

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size="sm"
          onClick={() => table.setPageIndex(page)}
        >
          {page + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        ▶
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        ⏭
      </Button>
    </div>
  );
};

export default PaginationControls