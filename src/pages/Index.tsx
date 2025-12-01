import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const Index = () => {
  const [stars, setStars] = useState(107);
  const [tickets, setTickets] = useState(0);
  const [activeTab, setActiveTab] = useState('cases');

  const cases: CaseItem[] = [
    {
      id: 'free',
      title: 'Бесплатно',
      description: '2 кейсов',
      icon: '🎁',
      gradient: 'from-pink-500 via-purple-500 to-blue-500'
    },
    {
      id: 'roulette',
      title: 'Рулетка',
      description: '10 кейсов',
      icon: '⭐',
      gradient: 'from-blue-500 via-blue-600 to-blue-700'
    },
    {
      id: 'slots',
      title: 'Слоты',
      description: '5 кейсов',
      icon: '🎰',
      gradient: 'from-red-600 via-red-700 to-red-800'
    },
    {
      id: 'eggs',
      title: 'Яйца',
      description: '5 кейсов',
      icon: '🥚',
      gradient: 'from-green-600 via-green-700 to-green-800'
    },
    {
      id: 'upgrade',
      title: 'Апгрейд',
      description: 'Улучшите свои подарки',
      icon: '🦆',
      gradient: 'from-purple-600 via-purple-700 to-purple-800'
    }
  ];

  const liveItems = [
    { icon: '📖', id: 1 },
    { icon: '🪄', id: 2 },
    { icon: '🪄', id: 3 },
    { icon: '🔮', id: 4 },
    { icon: '🍀', id: 5 }
  ];

  const navItems = [
    { id: 'cases', icon: 'Package', label: 'Кейсы', badge: null },
    { id: 'contests', icon: 'Trophy', label: 'Конкурсы', badge: 3 },
    { id: 'tasks', icon: 'ListTodo', label: 'Задания', badge: 6 },
    { id: 'leaders', icon: 'Crown', label: 'Лидеры', badge: null },
    { id: 'profile', icon: 'User', label: 'Профиль', badge: null }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-2xl mx-auto">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Icon name="X" size={24} />
            </Button>
            
            <h1 className="font-heading font-bold text-lg">Закрыть</h1>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Icon name="Check" size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Icon name="MoreVertical" size={24} />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-4 pb-4">
            <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <span className="text-2xl">⭐</span>
              <span className="font-heading font-bold text-xl">{stars}</span>
              <Button size="icon" className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <span className="text-2xl">🎫</span>
              <span className="font-heading font-bold text-xl">{tickets}</span>
              <Button size="icon" className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 space-y-6">
          <div className="bg-secondary/50 rounded-3xl p-4 flex items-center gap-3 overflow-x-auto">
            <div className="font-heading font-bold text-2xl whitespace-nowrap">LIVE</div>
            {liveItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-3xl hover:scale-105 transition-transform cursor-pointer"
              >
                {item.icon}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {cases.map((caseItem, index) => (
              <div
                key={caseItem.id}
                className={`bg-gradient-to-r ${caseItem.gradient} rounded-3xl p-6 cursor-pointer hover:scale-[1.02] transition-all animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                    {caseItem.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl mb-1 text-white">
                      {caseItem.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {caseItem.description}
                    </p>
                  </div>
                  {caseItem.id === 'roulette' && (
                    <Badge className="bg-white/20 text-white border-0 px-3 py-1 font-heading font-semibold">
                      <span className="text-yellow-300">⭐</span> 1500
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-2xl mx-auto flex items-center justify-around px-2 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon name={item.icon as any} size={24} />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive border-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;
