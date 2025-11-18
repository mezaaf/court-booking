"use client";

import { LIMIT_LIST } from "@/constant/dataTableConstant";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PaginationDataTable from "./PaginationDataTable";

const PaginationData = ({
  isLimit = false,
  total,
  refetch,
}: {
  isLimit?: boolean;
  total: number;
  refetch?: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || LIMIT_LIST[0];
  console.log(currentLimit);
  const totalPages = Math.ceil(total / currentLimit);

  const updateUrlParams = (params: { page?: number; limit?: number }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (params.page !== undefined) {
      newParams.set("page", params.page.toString());
    }
    if (params.limit !== undefined) {
      newParams.set("limit", params.limit.toString());
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
    if (refetch) {
      refetch();
    }
  };
  return (
    <div className="my-2 flex items-center justify-between">
      {isLimit && (
        <div className="flex items-center gap-2">
          <Label>Limit</Label>
          <Select
            value={currentLimit.toString()}
            onValueChange={(val) =>
              updateUrlParams({ limit: Number(val), page: 1 })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Limit</SelectLabel>
                {LIMIT_LIST.map((limit) => (
                  <SelectItem key={limit} value={limit.toString()}>
                    {limit}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {totalPages > 1 && (
        <PaginationDataTable
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => updateUrlParams({ page })}
        />
      )}
    </div>
  );
};

export default PaginationData;
