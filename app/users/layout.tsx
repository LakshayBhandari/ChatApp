import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" h-full">
    <Sidebar>
    {children}
    </Sidebar>
    </div>;
}
