import "@/app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { menu } from "@/app/layouts/models/menu";
import StoreProvider from "./providers/StoreProvider";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={` flex flex-col min-h-screen bg-background`}>
          <header className="sticky top-0 z-40 w-full h-[60px] bg-secondary-foreground text-primary-foreground border-b shadow-sm">
            <div className="w-full px-4 h-full flex items-center justify-between bg-secondary-foreground ">
              <Menubar className="flex-shrink-0">
                {menu.map((section) => (
                  <MenubarMenu key={section.trigger}>
                    <MenubarTrigger>{section.trigger}</MenubarTrigger>
                    <MenubarContent>
                      {section.items.map((item) => (
                        <MenubarItem key={item.title}>
                          {item.title}{" "}
                          <MenubarShortcut>{item.shortCut}</MenubarShortcut>
                        </MenubarItem>
                      ))}
                      <MenubarSeparator />
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
              <div
                className="
                      flex flex-row items-center gap-2
                      sm:mt-0 bg-secondary-foreground "
              >
                <h1 className="text-sm font-medium">Jorge Álvarez</h1>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Jorge Álvarez"
                  />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-grow overflow-y-auto min-w-[575px] min-h-[900px]">
            {children}
          </main>

          <footer className="sticky bottom-0 z-40 w-full h-[60px] bg-white border-t shadow-sm min-w-[575px]">
            <div className="container mx-auto px-4 h-full flex items-center justify-center">
              <p className="text-sm text-gray-600">
                © 2025 ABST Software. All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </StoreProvider>
  );
}
