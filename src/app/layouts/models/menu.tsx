import { title } from "process";
import { icons } from "lucide-react";
import { AppWindow, Camera } from "lucide-react";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  shortCut: string;
}
interface AppSection {
  trigger: string;
  items: MenuItem[];
}

export const menu: AppSection[] = [
  {
    trigger: "Agents",
    items: [
      {
        title: "Create Agent",
        description: "Form to create a new agent",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Agent",
        description: "Edit an existing agent",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all agents",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asign",
        description: "Asign agents to a task",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
    ],
  },
  {
    trigger: "Travelers",
    items: [
      {
        title: "Create Traveler",
        description: "Form to create a new traveler",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Traveler",
        description: "Edit an existing traveler",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all travelers",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asign",
        description: "Asign travelers to a trip",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
    ],
  },
  {
    trigger: "Buses",
    items: [
      {
        title: "Create Bus",
        description: "Form to create a new bus",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Bus",
        description: "Edit an existing bus",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all buses",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asign Bus",
        description: "Asign buses to a trip",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "Asign Driver",
        description: "Asign drivers to a bus",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "Asign Guide",
        description: "Asign guides to a bus",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "Asign Travelers",
        description: "Asign travelers to a bus",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "Asign Trip",
        description: "Asign trips to a bus",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
    ],
  },
  {
    trigger: "Trips",
    items: [
      {
        title: "Create Trip",
        description: "Form to create a new trip",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Trip",
        description: "Edit an existing trip",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all trips",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asignments",
        description: "Build a trip with agents, travelers and buses",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "Concerts & Events",
        description: "Build a trip with a concert or event",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
    ],
  },
  {
    trigger: "Concerts & Events",
    items: [
      {
        title: "Create Event",
        description: "Form to create a new event",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Event",
        description: "Edit an existing event",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all events",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asignments",
        description: "Build an event with agents and travelers",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
    ],
  },
  {
    trigger: "Payments",
    items: [
      {
        title: "Create Payment",
        description: "Form to create a new payment",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Payment",
        description: "Edit an existing payment",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all payments",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asignments",
        description: "Asign payments to a trip",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      },
      {
        title: "---------------------------------------",
        description: "",
        icon: <AppWindow />,
        href: "",
        shortCut: "",
      },
      {
        title: "Create Payment Plan",
        description: "Form to create a new payment plan",
        icon: <AppWindow />,
        href: "#file",
        shortCut: "⌘T",
      },
      {
        title: "Edit Payment Plan",
        description: "Edit an existing payment plan",
        icon: <AppWindow />,
        href: "#edit",
        shortCut: "⌘E",
      },
      {
        title: "List",
        description: "List of all payment plans",
        icon: <AppWindow />,
        href: "#view",
        shortCut: "⌘V",
      },
      {
        title: "Asignments",
        description: "Asign payment plans to a trip",
        icon: <AppWindow />,
        href: "#help",
        shortCut: "⌘H",
      }
    ],
  },
];
