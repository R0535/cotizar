import { MenubarShortcut } from "@/components/ui/menubar";
import { menu } from "@/app/layouts/models/menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header
        className="sticky top-0 z-10 w-full h-[60px] bg-primary text-primary-foreground flex 
      items-center justify-between px-6  shadow-sm"
      >
        <div className="flex">
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
        </div>
        <div
          className="
    flex flex-row items-center gap-2
    mt-2 sm:mt-0
  "
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
      </header>

      <main className="flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          
          {Array(30)
            .fill(0)
            .map((_, i) => (
              <p key={i} className="my-4">
                This is paragraph {i + 1}. Adding more content to demonstrate
                scrolling behavior.
              </p>
            ))}
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 h-[60px] bg-primary text-primary-foreground flex items-center justify-center">
        <p>Sticky Footer</p>
      </footer>
    </div>
  );
}
