"use client";

import { startTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export function IntlSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <select
      className="z-10 w-20 rounded-md border-small border-default-300 bg-content1 py-0.5 pl-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
      id="language"
      name="language"
      defaultValue={locale}
      onChange={onSelectChange}
    >
      <option key="en" value="en">
        English
      </option>
      <option key="zh_cn" value="zh_cn">
        简体中文
      </option>
    </select>
  );
}
