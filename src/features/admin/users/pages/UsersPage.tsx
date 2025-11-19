"use client";

import DataTable from "@/components/common/DataTable";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import DialogCreateUser from "../components/DialogCreateUser";
import DialogDeleteUser from "../components/DialogDeleteUser";
import { USER_TABLE_HEADER } from "../constants/userConstant";
import { useUsersPage } from "../hooks/useUsersPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditIcon } from "lucide-react";

const UsersPage = () => {
  const {
    users,
    total,
    isLoading,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    refetchUsers,
  } = useUsersPage();
  const filteredData = (users || []).map((user, index) => {
    return [
      currentLimit * (currentPage - 1) + index + 1,
      <div className="flex items-center gap-2" key={user.id}>
        <Image
          src={user.image !== null ? user.image : "/images/user.jpg"}
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
        <Button
          asChild
          size={"icon"}
          className="bg-amber-500 hover:bg-amber-500/80"
        >
          <Link href={`/admin/users/${user.id}`}>
            <EditIcon />
          </Link>
        </Button>

        <DialogDeleteUser
          userId={user.id}
          name={user.name}
          refetch={refetchUsers}
        />
      </div>,
    ];
  });
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
