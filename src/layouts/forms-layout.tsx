import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { menu } from "./models/menu";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" bg-primary">
      <body className={`flex flex-col min-h-screen`}>
        <header
          className="sticky px-6 top-0 z-10 h-[60px] bg-primary text-primary-foreground flex 
        items-center justify-between "
        >
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
      mt-2 sm:mt-0 
    "
          >
            <h1 className="text-sm font-medium ">Jorge Álvarez</h1>
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
          <div className="flex justify-between items-center p-4 bg-muted/20">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>

          {/* Form Area */}
          <div className="flex-grow overflow-y-auto">
            {/* Responsive Grid for Form Inputs */}
            {children}
          </div>
        </main>

        <footer className="sticky bottom-0 z-10 h-[60px] bg-primary text-primary-foreground flex items-center justify-center">
          <p>Sticky Footer</p>
        </footer>
      </body>
    </html>
  );
}
