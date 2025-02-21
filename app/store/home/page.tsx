import React from 'react';
import { Search, Star, Package, Clock, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgentStore = () => {
    const featuredPackages = [
        {
            title: "Productivity Suite",
            description: "Essential agents for daily tasks and work optimization",
            agents: 5,
            rating: 4.8,
            users: 12500
        },
        {
            title: "Creative Studio",
            description: "AI companions for writing, art, and content creation",
            agents: 4,
            rating: 4.7,
            users: 8300
        }
    ];

    const popularAgents = [
        {
            title: "Research Assistant",
            description: "Deep learning powered research and analysis companion",
            rating: 4.9,
            users: 25000
        },
        {
            title: "Code Buddy",
            description: "Your personal programming assistant and debugger",
            rating: 4.8,
            users: 18000
        },
        {
            title: "Writing Coach",
            description: "Advanced writing assistance and style improvement",
            rating: 4.7,
            users: 15000
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="text-center mb-16 pt-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-transparent bg-clip-text">AI Agent Store</h1>
                    <p className="text-xl text-gray-600 mb-8">Find the perfect AI companion for your needs</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for agents or packages..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 shadow-lg shadow-violet-100 focus:ring-2 focus:ring-violet-500 transition-shadow"
                        />
                    </div>
                </div>

                {/* Featured Packages */}
                <section className="mb-16">
                    <div className="flex items-center mb-8">
                        <Package className="mr-2 text-violet-600" />
                        <h2 className="text-2xl font-semibold text-gray-900">Featured Packages</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredPackages.map((pkg, index) => (
                            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg shadow-violet-100">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-900">{pkg.title}</CardTitle>
                                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="flex items-center group-hover:text-violet-600 transition-colors">
                                            <Package className="mr-1" size={16} />
                                            {pkg.agents} Agents
                                        </span>
                                        <span className="flex items-center text-amber-500">
                                            <Star className="mr-1" size={16} />
                                            {pkg.rating}
                                        </span>
                                        <span className="flex items-center group-hover:text-violet-600 transition-colors">
                                            <Users className="mr-1" size={16} />
                                            {pkg.users.toLocaleString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Popular Agents */}
                <section>
                    <div className="flex items-center mb-8">
                        <Star className="mr-2 text-violet-600" />
                        <h2 className="text-2xl font-semibold text-gray-900">Popular Agents</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {popularAgents.map((agent, index) => (
                            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg shadow-violet-100">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gray-900">{agent.title}</CardTitle>
                                    <CardDescription className="text-gray-600">{agent.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="flex items-center text-amber-500">
                                            <Star className="mr-1" size={16} />
                                            {agent.rating}
                                        </span>
                                        <span className="flex items-center group-hover:text-violet-600 transition-colors">
                                            <Users className="mr-1" size={16} />
                                            {agent.users.toLocaleString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AgentStore;