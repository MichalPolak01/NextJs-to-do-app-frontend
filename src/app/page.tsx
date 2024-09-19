// import { useAuth } from "@/components/authProvider";
import { ThemeModeToggle } from "@/components/themeToggleButton";
// import { error } from "console";
// import { useEffect } from "react";

export default function Home() {
  // const auth = useAuth()

  // useEffect(() => {
  //   if (error?.status === 401) {
  //     auth.loginRequired()
  //   }
  // }, [auth, error])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ThemeModeToggle />
    </div>
  );
}
