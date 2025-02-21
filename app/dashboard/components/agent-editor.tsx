'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeableMessage } from "@/app/components/messages/themeable-message";
import type { Agent } from '@/app/types/agent';

interface AgentEditorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agent?: Agent;
    onSave: (agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => void;
}

const EXAMPLE_USER_MESSAGE = "Hi! Can you help me with something?";

export function AgentEditor({ open, onOpenChange, agent, onSave }: AgentEditorProps) {
    const [name, setName] = useState(agent?.name ?? '');
    const [description, setDescription] = useState(agent?.description ?? '');
    const [prompt, setPrompt] = useState(agent?.prompt ?? '');
    const [personality, setPersonality] = useState(agent?.personality ?? {
        traits: [],
        emoji: '🤖',
        tone: 'professional' as const,
    });
    const [domains, setDomains] = useState(agent?.domains ?? []);
    const [examples, setExamples] = useState(agent?.examples ?? []);
    const [tags, setTags] = useState(agent?.tags ?? []);
    const [tagInput, setTagInput] = useState('');
    const [domainInput, setDomainInput] = useState('');
    const [traitInput, setTraitInput] = useState('');
    const [previewMessage, setPreviewMessage] = useState('');

    // Reset form when agent changes
    useEffect(() => {
        if (agent) {
            setName(agent.name);
            setDescription(agent.description);
            setPrompt(agent.prompt);
            setPersonality(agent.personality);
            setDomains(agent.domains);
            setExamples(agent.examples);
            setTags(agent.tags);
        }
    }, [agent]);

    const handleSave = () => {
        onSave({
            name,
            description,
            prompt,
            personality,
            domains,
            examples,
            tags,
            status: agent?.status ?? 'active',
        });
        onOpenChange(false);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setTagInput('');
        }
    };

    const handleDomainInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && domainInput.trim()) {
            e.preventDefault();
            const newDomain = domainInput.trim();
            if (!domains.includes(newDomain)) {
                setDomains([...domains, newDomain]);
            }
            setDomainInput('');
        }
    };

    const handleTraitInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && traitInput.trim()) {
            e.preventDefault();
            const newTrait = traitInput.trim();
            if (!personality.traits.includes(newTrait)) {
                setPersonality({
                    ...personality,
                    traits: [...personality.traits, newTrait],
                });
            }
            setTraitInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const removeDomain = (domainToRemove: string) => {
        setDomains(domains.filter(domain => domain !== domainToRemove));
    };

    const removeTrait = (traitToRemove: string) => {
        setPersonality({
            ...personality,
            traits: personality.traits.filter(trait => trait !== traitToRemove),
        });
    };

    const addExample = () => {
        setExamples([...examples, { input: '', response: '' }]);
    };

    const updateExample = (index: number, field: 'input' | 'response', value: string) => {
        const newExamples = [...examples];
        newExamples[index] = { ...newExamples[index], [field]: value };
        setExamples(newExamples);
    };

    const removeExample = (index: number) => {
        setExamples(examples.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl h-[90vh]">
                <DialogHeader className="hidden">
                    <DialogTitle>
                        {agent ? `Edit ${agent.name}` : 'Create New Agent'}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex h-full gap-4">
                    {/* Left side - Editor */}
                    <div className="flex-1 overflow-hidden">
                        <Tabs defaultValue="basic" className="h-full flex flex-col">
                            <TabsList>
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="personality">Personality</TabsTrigger>
                                <TabsTrigger value="examples">Examples</TabsTrigger>
                            </TabsList>

                            <ScrollArea className="flex-1 p-4">
                                <TabsContent value="basic" className="space-y-4 mt-0">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter agent name..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter agent description..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="prompt">System Prompt</Label>
                                        <Textarea
                                            id="prompt"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="Enter system prompt..."
                                            className="h-32"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Tags</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="cursor-pointer hover:bg-destructive"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    {tag} ×
                                                </Badge>
                                            ))}
                                        </div>
                                        <Input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagInputKeyDown}
                                            placeholder="Type a tag and press Enter..."
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="personality" className="space-y-4 mt-0">
                                    <div className="space-y-2">
                                        <Label htmlFor="emoji">Emoji</Label>
                                        <Input
                                            id="emoji"
                                            value={personality.emoji}
                                            onChange={(e) => setPersonality({ ...personality, emoji: e.target.value })}
                                            placeholder="Choose an emoji..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tone">Tone</Label>
                                        <select
                                            id="tone"
                                            value={personality.tone}
                                            onChange={(e) => setPersonality({
                                                ...personality,
                                                tone: e.target.value as Agent['personality']['tone']
                                            })}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                        >
                                            <option value="professional">Professional</option>
                                            <option value="casual">Casual</option>
                                            <option value="friendly">Friendly</option>
                                            <option value="technical">Technical</option>
                                            <option value="creative">Creative</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Traits</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {personality.traits.map((trait) => (
                                                <Badge
                                                    key={trait}
                                                    variant="secondary"
                                                    className="cursor-pointer hover:bg-destructive"
                                                    onClick={() => removeTrait(trait)}
                                                >
                                                    {trait} ×
                                                </Badge>
                                            ))}
                                        </div>
                                        <Input
                                            value={traitInput}
                                            onChange={(e) => setTraitInput(e.target.value)}
                                            onKeyDown={handleTraitInputKeyDown}
                                            placeholder="Type a trait and press Enter..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Knowledge Domains</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {domains.map((domain) => (
                                                <Badge
                                                    key={domain}
                                                    variant="secondary"
                                                    className="cursor-pointer hover:bg-destructive"
                                                    onClick={() => removeDomain(domain)}
                                                >
                                                    {domain} ×
                                                </Badge>
                                            ))}
                                        </div>
                                        <Input
                                            value={domainInput}
                                            onChange={(e) => setDomainInput(e.target.value)}
                                            onKeyDown={handleDomainInputKeyDown}
                                            placeholder="Type a domain and press Enter..."
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="examples" className="space-y-4 mt-0">
                                    <Button onClick={addExample} variant="outline">
                                        Add Example
                                    </Button>

                                    {examples.map((example, index) => (
                                        <div key={index} className="space-y-2 border rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <Label>Example {index + 1}</Label>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeExample(index)}
                                                    className="text-destructive"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                            <Textarea
                                                value={example.input}
                                                onChange={(e) => updateExample(index, 'input', e.target.value)}
                                                placeholder="User input..."
                                                className="mb-2"
                                            />
                                            <Textarea
                                                value={example.response}
                                                onChange={(e) => updateExample(index, 'response', e.target.value)}
                                                placeholder="Assistant response..."
                                            />
                                        </div>
                                    ))}
                                </TabsContent>
                            </ScrollArea>
                        </Tabs>
                    </div>

                    <Separator orientation="vertical" />

                    {/* Right side - Preview */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="font-medium mb-4">Preview</div>
                        <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">{personality.emoji}</span>
                                <div>
                                    <div className="font-medium">{name || 'Unnamed Agent'}</div>
                                    <div className="text-sm text-muted-foreground">{description}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <ThemeableMessage
                                    id="user-message"
                                    role="user"
                                    theme="bumble"
                                    content={EXAMPLE_USER_MESSAGE}
                                />
                                <ThemeableMessage
                                    id="assistant-message"
                                    role="assistant"
                                    theme="bumble"
                                    content={previewMessage || 'Type something to see how I would respond...'}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Input
                                value={previewMessage}
                                onChange={(e) => setPreviewMessage(e.target.value)}
                                placeholder="Type something to test the agent..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // TODO: Implement preview response generation
                                        alert('not implemented yet!!')
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!name || !prompt}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 