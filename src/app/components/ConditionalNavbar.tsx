"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
ssr: false,
});

export default function ConditionalNavbar() {
const pathname = usePathname();

if (pathname === "/admin/login" || pathname.startsWith("/login/")) {
return null;
}

return <Navbar />;
}
