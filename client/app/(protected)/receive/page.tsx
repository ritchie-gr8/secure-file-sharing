import { receiveFileList } from "@/action/file-handler";
import { auth } from "@/auth";
import Receive from "./components/Receive";

const ReceivePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const fileData = await receiveFileList({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
  });
  const session = await auth();

  return (
    <div className="p-4">
      <Receive
        data={fileData.files}
        total={fileData.results}
        token={session?.user.accessToken || null}
      />
    </div>
  );
};

export default ReceivePage;
