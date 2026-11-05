
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthBackLink() {
  return (
    <Link
      href="/"
      className="absolute left-6 top-6 z-20 flex items-center gap-2 text-sm font-semibold text-[#806C75] transition hover:text-[#D93676]"
    >
      <ArrowLeft size={16} />
      Back to DRESSED
    </Link>
  );
}
