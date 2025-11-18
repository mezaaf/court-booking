"use client";
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
import { LIMIT_LIST } from "@/constant/dataTableConstant";
import PaginationDataTable from "./PaginationDataTable";

interface Props {
  isLimit?: boolean;
  total: number;
  limit?: number;
}

export default function PaginationData({
  isLimit = true,
  total,
  limit,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit =
    Number(searchParams.get("limit")) || limit || LIMIT_LIST[0];
  const totalPages = Math.ceil(total / currentLimit);

  const updateUrlParams = (params: { page?: number; limit?: number }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (params.page !== undefined)
      newParams.set("page", params.page.toString());
    if (params.limit !== undefined)
      newParams.set("limit", params.limit.toString());
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="my-2 flex items-center justify-between">
      {isLimit && (
        <div className="flex items-center gap-2">
          <Label>Limit</Label>
          <Select
            value={currentLimit.toString()}
            onValueChange={(value) =>
              updateUrlParams({ limit: Number(value), page: 1 })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Limit" />
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => updateUrlParams({ page })}
        />
      )}
    </div>
  );
}
