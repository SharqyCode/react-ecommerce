import UserTable from "../user/userTable";

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Users</h1>
      <UserTable />
    </div>
  );
}
