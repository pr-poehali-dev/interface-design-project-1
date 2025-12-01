import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NFTItem {
  id: string;
  name: string;
  stars: number;
  image: string;
  locked?: boolean;
}

interface RouletteModalProps {
  onClose: () => void;
}

const RouletteModal = ({ onClose }: RouletteModalProps) => {
  const nftItems: NFTItem[] = [
    {
      id: '1',
      name: 'Player',
      stars: 119,
      image: '🎮'
    },
    {
      id: '2',
      name: 'Bear',
      stars: 149,
      image: '🧸'
    },
    {
      id: '3',
      name: 'Skull',
      stars: 199,
      image: '💀'
    },
    {
      id: '4',
      name: 'Lamp',
      stars: 249,
      image: '🪔'
    },
    {
      id: '5',
      name: 'Sha...',
      stars: 499,
      image: '🎪',
      locked: true
    },
    {
      id: '6',
      name: 'Bra...',
      stars: 999,
      image: '🎁',
      locked: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="h-full flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-foreground"
          >
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
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="bg-gradient-to-b from-secondary/50 to-secondary/20 rounded-3xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-3xl">Рулетка</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={28} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {nftItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-secondary/80 rounded-2xl p-4 relative overflow-hidden hover:scale-[1.02] transition-all animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="aspect-square bg-muted/30 rounded-xl mb-3 flex items-center justify-center text-6xl relative">
                      {item.locked && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <Icon name="Lock" size={32} className="text-muted-foreground mx-auto mb-2" />
                          </div>
                        </div>
                      )}
                      {!item.locked && item.image}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-xl">
                        {item.name}
                      </h3>
                      
                      {item.locked ? (
                        <Badge className="bg-green-600 hover:bg-green-700 text-white border-0 px-3 py-1 font-medium text-sm">
                          Беспроигрыш...
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-400">
                          <span className="text-lg">⭐</span>
                          <span className="font-heading font-bold text-lg">
                            {item.stars}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteModal;
