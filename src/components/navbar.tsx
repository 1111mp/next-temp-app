"use client";

import { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { User } from "@nextui-org/user";
import { NextLogo } from "./next-logo";
import { useTheme } from "next-themes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useRouter } from "@/navigation";

import type { SessionUser } from "@/lib/session";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

type Props = {
  user: SessionUser;
};

enum Theme {
  System = "system",
  Dark = "dark",
  Light = "light",
}

export function Navbar({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const { email, name } = user;

  const onSignout = async () => {
    const ret = await fetch("/api/auth/signout", { method: "POST" });

    ret.status === 200 && router.replace("/login");
  };

  return (
    <NextUINavbar
      maxWidth="xl"
      className="dark:bg-slate-950/20"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand className="gap-2">
          <NextLogo />
          <p className="font-bold text-inherit">Next.js</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand className="mr-2 gap-2">
          <NextLogo />
          <p className="font-bold text-inherit">Next.js</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" color="warning" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown
          isOpen={isOpen}
          radius="sm"
          placement="bottom-end"
          onOpenChange={(open) => setIsOpen(open)}
        >
          <DropdownTrigger>
            <Avatar
              size="sm"
              as="button"
              name={name}
              className="transition-transform"
              src="https://avatars.githubusercontent.com/u/30373425?v=4"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection aria-label="Profile & Actions" showDivider>
              <DropdownItem
                isReadOnly
                key="profile"
                textValue="profile"
                className="h-14 gap-2 opacity-100"
              >
                <User
                  name={name}
                  description={email}
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                />
              </DropdownItem>
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="new_project">New Project</DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Preferences" showDivider>
              <DropdownItem
                isReadOnly
                key="language"
                endContent={<LocaleSwitcher onClose={() => setIsOpen(false)} />}
              >
                Language
              </DropdownItem>
              <DropdownItem
                isReadOnly
                key="theme"
                textValue="theme"
                className="cursor-default"
                endContent={
                  <select
                    className="z-10 w-20 rounded-md border-small border-default-300 bg-content1 py-0.5 pl-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                    id="theme"
                    name="theme"
                    defaultValue={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value={Theme.System}>System</option>
                    <option value={Theme.Dark}>Dark</option>
                    <option value={Theme.Light}>Light</option>
                  </select>
                }
              >
                Theme
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger data-[hover=true]:text-danger"
                color="danger"
                onPress={onSignout}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="/"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}
