'use client';

import { useState } from 'react';
import {
    Sidebar as SidebarPrimitive,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface Document {
    id: string;
    title: string;
}

interface SidebarProps {
    documents: Document[];
    currentDocId?: string;
    onDocumentSelect: (id: string) => void;
}

export function Sidebar({ documents, currentDocId, onDocumentSelect }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarProvider>
            <div className="group/sidebar-wrapper">
                <SidebarPrimitive
                    className={`border-r h-screen transition-all duration-300 ${isCollapsed ? "w-0" : "w-[240px]"
                        }`}
                    data-variant="inset"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-4 translate-x-12"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className={`${isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
                        } transition-all duration-300 w-[240px] overflow-hidden`}>
                        <SidebarContent>
                            <SidebarGroup>
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">Your Documents</h2>
                                </div>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {documents.map((doc) => (
                                            <SidebarMenuItem key={doc.id}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={currentDocId === doc.id}
                                                >
                                                    <button
                                                        onClick={() => onDocumentSelect(doc.id)}
                                                        className="w-full"
                                                    >
                                                        <span>{doc.title}</span>
                                                    </button>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </div>
                </SidebarPrimitive>
            </div>
        </SidebarProvider>
    );
} 