import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Prize {
  id: number;
  icon: string;
  stars: number;
}

interface SpinRouletteProps {
  onBack: () => void;
}

const SpinRoulette = ({ onBack }: SpinRouletteProps) => {
  const [spinning, setSpinning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const prizes: Prize[] = [
    { id: 1, icon: '🎮', stars: 1058 },
    { id: 2, icon: '🎂', stars: 286 },
    { id: 3, icon: '🧸', stars: 445 },
    { id: 4, icon: '💎', stars: 892 },
    { id: 5, icon: '🎪', stars: 156 },
    { id: 6, icon: '🎯', stars: 723 },
    { id: 7, icon: '🎨', stars: 334 },
    { id: 8, icon: '🎭', stars: 567 }
  ];

  const duplicatedPrizes = [...prizes, ...prizes, ...prizes];

  const handleSpin = () => {
    if (spinning) return;
    
    setSpinning(true);
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const itemWidth = 176;
    const centerOffset = window.innerWidth / 2 - itemWidth / 2;
    const startPosition = prizes.length * itemWidth;
    const targetPosition = startPosition + (prizes.length + randomIndex) * itemWidth - centerOffset;
    
    container.scrollLeft = 0;
    
    let startTime: number | null = null;
    const duration = 4000;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      container.scrollLeft = targetPosition * easedProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setSpinning(false);
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 animate-fade-in overflow-hidden">
      <div className="h-full flex flex-col">
        <header className="flex items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          
          <h1 className="font-heading font-bold text-xl text-white">Назад</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Icon name="Check" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Icon name="MoreVertical" size={24} />
            </Button>
          </div>
        </header>

        <div className="flex items-center justify-center gap-4 px-4 pb-4">
          <div className="flex items-center gap-2 bg-blue-800/50 rounded-full px-4 py-2">
            <span className="text-2xl">⭐</span>
            <span className="font-heading font-bold text-xl text-white">107</span>
            <Button size="icon" className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600">
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-blue-800/50 rounded-full px-4 py-2">
            <span className="text-2xl">🎫</span>
            <span className="font-heading font-bold text-xl text-white">0</span>
            <Button size="icon" className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600">
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        <div className="bg-blue-800/30 rounded-3xl mx-4 p-4 flex items-center gap-3 overflow-x-auto mb-6">
          <div className="font-heading font-bold text-2xl whitespace-nowrap text-white">LIVE</div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-16 h-16 bg-blue-700/40 rounded-2xl flex items-center justify-center text-3xl"
            >
              {['🎮', '💎', '🐸', '🧪', '🌈'][i - 1]}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative px-4">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-white/80 rounded-full z-10 pointer-events-none shadow-lg" />
          
          <div className="mb-8 text-center">
            <Icon name="ChevronDown" size={48} className="text-white/60 mx-auto animate-bounce" />
          </div>

          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-scroll scrollbar-hide mb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
          >
            <div className="flex gap-4 py-8" style={{ paddingLeft: 'calc(50vw - 80px)', paddingRight: 'calc(50vw - 80px)' }}>
              {duplicatedPrizes.map((prize, index) => (
                <div
                  key={`${prize.id}-${index}`}
                  className="flex-shrink-0 w-40 transition-transform"
                >
                  <div className="bg-gradient-to-b from-blue-700/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
                    <div className="aspect-square bg-blue-600/30 rounded-2xl flex items-center justify-center mb-3">
                      <span className="text-7xl">{prize.icon}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 bg-blue-900/50 rounded-full px-3 py-2">
                      <span className="text-amber-400">⭐</span>
                      <span className="font-heading font-bold text-white">{prize.stars}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 text-center">
            <Icon name="ChevronUp" size={48} className="text-white/60 mx-auto animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 bg-blue-800/50 border-white/20 text-white hover:bg-blue-700/50 h-14 text-lg font-heading font-semibold"
            >
              <Icon name="Settings" size={20} className="mr-2" />
              Настройки
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-blue-800/50 border-white/20 text-white hover:bg-blue-700/50 h-14 text-lg font-heading font-semibold"
            >
              <Icon name="Gift" size={20} className="mr-2" />
              Призы
            </Button>
          </div>

          <Button 
            onClick={handleSpin}
            disabled={spinning}
            className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-white text-xl font-heading font-bold rounded-2xl shadow-lg disabled:opacity-50"
          >
            {spinning ? 'Крутится...' : (
              <>
                Крутить за <span className="text-amber-300 ml-2">⭐ 119</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SpinRoulette;