import { Home, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGlobalContext } from "@/GlobalContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

// Menu items.
const items = [
  {
    title: "P&ID",
    url: "#",
    icon: Home,
    globalString: "main",
  },
  {
    title: "Variables",
    url: "#",
    icon: Search,
    globalString: "variables",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    globalString: "settings",
  },
];

export function AppSidebar() {
  const { setGlobalString } = useGlobalContext();

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-grow">
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.globalString === "settings" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuButton asChild>
                          <a>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Edit settings</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-72">
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="OpcUa Server IP" className="text-right col-span-2">
                                OpcUa Server IP
                              </Label>
                              <Input id="OpcUa Server IP" value="192.168.64.175" className="col-span-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="opcuaConnectionString" className="text-right col-span-2">
                                opcuaConnectionString
                              </Label>
                              <Input id="opcuaConnectionString" value="PLC1.dbx...dbdigital..." className="col-span-2" />
                            </div>

                            <Separator className="my-2" />
                          </div>
                        </ScrollArea>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        onClick={() => setGlobalString(item.globalString)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="p-4">
          <ModeToggle />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}