'use client';

import { Copy, Edit, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Agent } from '@/app/types/agent';

interface AgentCardProps {
    agent: Agent;
    onEdit: (agent: Agent) => void;
    onDuplicate: (agent: Agent) => void;
    onArchive: (agent: Agent) => void;
}

export function AgentCard({ agent, onEdit, onDuplicate, onArchive }: AgentCardProps) {
    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{agent.personality.emoji}</span>
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                            {agent.name}
                            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                                {agent.status}
                            </Badge>
                        </CardTitle>
                        <CardDescription>
                            Last updated {agent.updatedAt.toLocaleDateString()}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {agent.description}
                </p>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Personality</p>
                        <div className="flex flex-wrap gap-1">
                            {agent.personality.traits.map((trait) => (
                                <Badge key={trait} variant="outline" className="text-xs">
                                    {trait}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Domains</p>
                        <div className="flex flex-wrap gap-1">
                            {agent.domains.map((domain) => (
                                <Badge key={domain} variant="secondary" className="text-xs">
                                    {domain}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                            {agent.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs bg-primary/10">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => onEdit(agent)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit agent</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => onDuplicate(agent)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate agent</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => onArchive(agent)}>
                                <Archive className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{agent.status === 'active' ? 'Archive agent' : 'Unarchive agent'}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
} 