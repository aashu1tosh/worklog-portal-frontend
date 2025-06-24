import { DocumentTitle } from '@/functions/DocumentTitle'
import { BarChart3, Clock, Coffee, Lightbulb, PlusCircle, Rocket, Target, TrendingUp, Zap } from 'lucide-react'

const Dashboard = () => {
    DocumentTitle('Home')

    const motivationalQuotes = [
        { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
        { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
    ]

    const todaysQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

    const quickActions = [
        { title: 'New Worklog', description: 'Start tracking your work', icon: PlusCircle, color: 'bg-blue-500 hover:bg-blue-600' },
        { title: 'View Reports', description: 'Check your progress', icon: BarChart3, color: 'bg-green-500 hover:bg-green-600' },
        { title: 'Manage Projects', description: 'Organize your work', icon: Target, color: 'bg-purple-500 hover:bg-purple-600' },
        { title: 'Time Tracker', description: 'Live time tracking', icon: Clock, color: 'bg-orange-500 hover:bg-orange-600' }
    ]

    const features = [
        { title: 'Track Your Time', description: 'Monitor how you spend your work hours', icon: Clock },
        { title: 'Organize Projects', description: 'Keep all your work organized and accessible', icon: Target },
        { title: 'Generate Reports', description: 'Get insights into your productivity', icon: TrendingUp },
        { title: 'Stay Motivated', description: 'Track progress and celebrate achievements', icon: Zap }
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome to Your Worklog Dashboard 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Track your work, manage your time, and boost your productivity</p>
            </div>

            {/* Quote of the Day */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Today's Inspiration</h3>
                        <blockquote className="text-gray-600 dark:text-gray-300 italic mb-2">
                            "{todaysQuote.quote}"
                        </blockquote>
                        <cite className="text-gray-500 dark:text-gray-400 font-medium">— {todaysQuote.author}</cite>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                                <div className={`w-10 h-10 ${action.color} dark:opacity-90 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
                                    <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{action.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Overview */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Coffee className="w-5 h-5 mr-2 text-blue-600" />
                    What You Can Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start space-x-3">
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard