'use client';

import { useState, useMemo } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { AgentCard } from './components/agent-card';
import { AgentToolbar } from './components/agent-toolbar';
import { AgentEditor } from './components/agent-editor';
import { defaultAgents } from '@/app/types/agent';
import type { Agent } from '@/app/types/agent';
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
    const [agents, setAgents] = useState<Agent[]>(defaultAgents);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('updated');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showArchived, setShowArchived] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    // Get all unique tags from agents
    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        agents.forEach(agent => {
            agent.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [agents]);

    // Filter and sort agents
    const filteredAgents = useMemo(() => {
        return agents
            .filter(agent => {
                // Filter by search query
                const matchesSearch =
                    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

                // Filter by selected tags
                const matchesTags =
                    selectedTags.length === 0 ||
                    selectedTags.every(tag => agent.tags.includes(tag));

                // Filter by status
                const matchesStatus = showArchived || agent.status === 'active';

                return matchesSearch && matchesTags && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'updated':
                        return b.updatedAt.getTime() - a.updatedAt.getTime();
                    case 'created':
                        return b.createdAt.getTime() - a.createdAt.getTime();
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            });
    }, [agents, searchQuery, selectedTags, showArchived, sortBy]);

    const handleEdit = (agent: Agent) => {
        setSelectedAgent(agent);
        setEditorOpen(true);
    };

    const handleDuplicate = (agent: Agent) => {
        const newAgent: Agent = {
            ...agent,
            id: Math.random().toString(36).substr(2, 9),
            name: `${agent.name} (Copy)`,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
        };
        setAgents([...agents, newAgent]);
        toast({
            title: "Agent duplicated",
            description: "A copy of the agent has been created.",
        });
    };

    const handleArchive = (agent: Agent) => {
        setAgents(agents.map(a =>
            a.id === agent.id
                ? { ...a, status: a.status === 'active' ? 'archived' : 'active' }
                : a
        ));
        toast({
            title: agent.status === 'active' ? "Agent archived" : "Agent activated",
            description: agent.status === 'active'
                ? "The agent has been moved to the archive."
                : "The agent has been restored from the archive.",
        });
    };

    const handleCreateNew = () => {
        setSelectedAgent(undefined);
        setEditorOpen(true);
    };

    const handleSave = (agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => {
        if (selectedAgent) {
            // Edit existing agent
            setAgents(agents.map(a =>
                a.id === selectedAgent.id
                    ? {
                        ...a,
                        ...agentData,
                        updatedAt: new Date(),
                        version: a.version + 1,
                    }
                    : a
            ));
            toast({
                title: "Agent updated",
                description: "Your changes have been saved.",
            });
        } else {
            // Create new agent
            const newAgent: Agent = {
                ...agentData,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date(),
                updatedAt: new Date(),
                version: 1,
            };
            setAgents([...agents, newAgent]);
            toast({
                title: "Agent created",
                description: "Your new agent has been created.",
            });
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Agents</h1>
                    <p className="text-muted-foreground mt-2">Manage your collection of AI agents</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleCreateNew}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Agent
                    </Button>
                </div>
            </div>

            <AgentToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                showArchived={showArchived}
                onShowArchivedChange={setShowArchived}
                availableTags={availableTags}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        onEdit={handleEdit}
                        onDuplicate={handleDuplicate}
                        onArchive={handleArchive}
                    />
                ))}
                {filteredAgents.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No agents found matching your criteria.</p>
                    </div>
                )}
            </div>

            <AgentEditor
                open={editorOpen}
                onOpenChange={setEditorOpen}
                agent={selectedAgent}
                onSave={handleSave}
            />
        </div>
    );
} 