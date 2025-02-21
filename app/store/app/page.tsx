import React from 'react';
import { Star, Package, Users, Clock, ArrowLeft, Play, MessageSquare, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DetailViews = () => {
    // Sample data for the Productivity Suite
    const suiteAgents = [
        {
            name: "Task Manager",
            description: "Organizes and prioritizes your tasks intelligently",
            rating: 4.9,
            users: 15000,
            category: "Productivity"
        },
        {
            name: "Meeting Assistant",
            description: "Takes notes and creates action items from meetings",
            rating: 4.8,
            users: 12000,
            category: "Communication"
        },
        {
            name: "Schedule Optimizer",
            description: "AI-powered calendar management and scheduling",
            rating: 4.7,
            users: 9800,
            category: "Productivity"
        }
    ];

    // Sample reviews
    const reviews = [
        {
            user: "Alex M.",
            rating: 5,
            text: "Completely transformed how I handle my daily tasks. The automation is incredible.",
            date: "2 days ago"
        },
        {
            user: "Sarah K.",
            rating: 4,
            text: "Very intuitive and helpful. Would love to see more customization options.",
            date: "1 week ago"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto p-6">
                {/* Package View */}
                <section className="mb-20">
                    <div className="mb-12">
                        <button className="flex items-center text-violet-600 mb-6 hover:text-violet-700 transition-colors">
                            <ArrowLeft className="mr-2" size={20} />
                            Back to Store
                        </button>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-3 text-gray-900">Productivity Suite</h1>
                                <p className="text-xl text-gray-600 mb-4">Essential agents for daily tasks and work optimization</p>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <Package className="mr-1" size={16} />
                                        5 Agents
                                    </span>
                                    <span className="flex items-center text-amber-500">
                                        <Star className="mr-1" size={16} />
                                        4.8
                                    </span>
                                    <span className="flex items-center">
                                        <Users className="mr-1" size={16} />
                                        12.5k Users
                                    </span>
                                </div>
                            </div>

                            <button className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors font-medium">
                                Install Suite
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {suiteAgents.map((agent, index) => (
                            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg shadow-violet-100">
                                <CardHeader>
                                    <div className="text-sm text-violet-600 mb-2">{agent.category}</div>
                                    <CardTitle className="text-lg text-gray-900">{agent.name}</CardTitle>
                                    <CardDescription className="text-gray-600">{agent.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="flex items-center text-amber-500">
                                            <Star className="mr-1" size={16} />
                                            {agent.rating}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="mr-1" size={16} />
                                            {agent.users.toLocaleString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Individual Agent View */}
                <section>
                    <button className="flex items-center text-violet-600 mb-6 hover:text-violet-700 transition-colors">
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Suite
                    </button>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <div className="mb-8">
                                <div className="text-sm text-violet-600 mb-2">Productivity</div>
                                <h1 className="text-4xl font-bold mb-3 text-gray-900">Task Manager</h1>
                                <p className="text-xl text-gray-600 mb-6">Your intelligent task organization and prioritization assistant</p>

                                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center text-amber-500">
                                        <Star className="mr-1" size={16} />
                                        4.9
                                    </span>
                                    <span className="flex items-center">
                                        <Users className="mr-1" size={16} />
                                        15k Users
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="mr-1" size={16} />
                                        Updated 2 days ago
                                    </span>
                                </div>

                                <button className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors font-medium w-full md:w-auto">
                                    Install Agent
                                </button>
                            </div>

                            {/* Features */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Capabilities</h2>
                                <div className="grid gap-4">
                                    {[
                                        { icon: MessageSquare, title: "Natural Conversations", desc: "Chat naturally about your tasks and priorities" },
                                        { icon: Zap, title: "Smart Automation", desc: "Automated task organization and priority suggestions" },
                                        { icon: CheckCircle, title: "Progress Tracking", desc: "Real-time progress monitoring and adjustments" }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-start p-4 rounded-xl bg-white shadow-sm">
                                            <feature.icon className="text-violet-600 mr-4" size={24} />
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                                                <p className="text-gray-600">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-6 text-gray-900">User Reviews</h2>
                                <div className="space-y-6">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="border-b border-gray-100 pb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-medium text-gray-900">{review.user}</div>
                                                <div className="text-sm text-gray-500">{review.date}</div>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} className={i < review.rating ? "text-amber-500" : "text-gray-200"} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600">{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <Card className="sticky top-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg shadow-violet-100">
                                <CardHeader>
                                    <CardTitle className="text-lg">Try It Out</CardTitle>
                                    <CardDescription>See how Task Manager works with a quick demo</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <button className="flex items-center justify-center w-full bg-violet-50 text-violet-600 p-8 rounded-lg hover:bg-violet-100 transition-colors mb-4">
                                        <Play size={32} />
                                    </button>
                                    <p className="text-sm text-gray-500">Watch a 2-minute demo of Task Manager in action</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DetailViews;