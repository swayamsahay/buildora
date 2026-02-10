import AuthBackground from "./AuthBackground";
import AuthNavbar from "./AuthNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <AuthBackground />
      <AuthNavbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
