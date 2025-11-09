"use client";

import DataTable from "@/components/common/DataTable";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma/client";
import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";
import DialogCreateUser from "../components/DialogCreateUser";
import DialogDeleteUser from "../components/DialogDeleteUser";
import { USER_TABLE_HEADER } from "../constants/userConstant";
import userService from "../services/user";

const UsersPage = () => {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useDataTable();
  const {
    data: usersResponse,
    isLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", currentSearch, currentPage, currentLimit],
    queryFn: async () => {
      const res = await userService.getAllUsers(
        currentSearch,
        currentPage,
        currentLimit
      );
      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
      return res;
    },
  });

  const users = usersResponse?.data.data as User[];
  const total = usersResponse?.data.total;

  const filteredData = useMemo(() => {
    return (users || []).map((user, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        <div className="flex items-center gap-2" key={user.id}>
          <Image
            src={user.image ?? "/images/user.jpg"}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full aspect-square w-8 object-cover object-center"
          />
          {user.name}
        </div>,
        user.email,
        <p key={user.id} className="capitalize">
          {user.role}
        </p>,

        <div key={user.id} className="flex items-center gap-2">
          {/* <DialogCourt
            mode="update"
            refetchCourts={refetchCourts}
            courtId={court.id}
            initialValues={{
              name: court.name,
              description: court.description || undefined,
              pricePerHour: court.pricePerHour.toString(),
              image: court.image as string,
              isActive: court.isActive,
            }}
          /> */}

          <DialogDeleteUser
            userId={user.id}
            name={user.name}
            refetch={refetchUsers}
          />
        </div>,
      ];
    });
  }, [currentLimit, currentPage, refetchUsers, users]);
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data User ({total})</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Cari nama / email..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <DialogCreateUser refetchUsers={refetchUsers} />
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
      <DataTable
        header={USER_TABLE_HEADER}
        isLoading={isLoading}
        data={filteredData}
        total={total}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default UsersPage;
