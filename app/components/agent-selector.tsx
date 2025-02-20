"use client";

import { Agent } from "@/app/types/agent";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AgentSelectorProps {
    agents: Agent[];
    selectedAgent: Agent;
    onAgentChange: (agent: Agent) => void;
    onPromptChange: (prompt: string) => void;
}

export function AgentSelector({
    agents,
    selectedAgent,
    onAgentChange,
    onPromptChange,
}: AgentSelectorProps) {
    const [customPrompt, setCustomPrompt] = useState(selectedAgent.prompt);

    const handleAgentChange = (value: string) => {
        const agent = agents.find(a => a.name === value) || agents[0];
        setCustomPrompt(agent.prompt);
        onPromptChange(agent.prompt);
        onAgentChange(agent);
    };

    const handlePromptChange = (value: string) => {
        setCustomPrompt(value);
        onPromptChange(value);
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="space-y-2">
                <label className="text-sm font-medium">Select Agent Personality</label>
                <Select value={selectedAgent.name} onValueChange={handleAgentChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an agent personality" />
                    </SelectTrigger>
                    <SelectContent>
                        {agents.map((agent) => (
                            <SelectItem key={agent.name} value={agent.name}>
                                {agent.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    {selectedAgent.characteristics.map((char, index) => (
                        <Badge key={index} variant="secondary">
                            {char}
                        </Badge>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Customize Prompt</label>
                <Textarea
                    value={customPrompt}
                    onChange={(e) => handlePromptChange(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Customize the agent's prompt..."
                />
            </div>
        </div>
    );
} 