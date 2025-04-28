"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiveColumnsType, useReceiveColumns } from "./columns";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/ui/data-table";

interface ReceiveProps {
  data: ReceiveColumnsType[];
  total: number;
  token: string | null;
}

const Receive = ({ data, total, token }: ReceiveProps) => {
  const columns = useReceiveColumns({ token });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receive Files</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 space-y-4">
        <DataTable columns={columns} data={data} totalCount={total} />
      </CardContent>
    </Card>
  );
};

export default Receive;
