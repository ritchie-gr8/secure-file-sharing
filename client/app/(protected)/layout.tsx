export const dynamic = "force-dynamic";
export const revalidate = 0;

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default ProtectedLayout;
