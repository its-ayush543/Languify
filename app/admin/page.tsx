import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";

const AdminApp = dynamic(() => import("./app"), { ssr: false });

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect("/");

  return (
    <div>
      <AdminApp />
    </div>
  );
};

export default AdminPage;
