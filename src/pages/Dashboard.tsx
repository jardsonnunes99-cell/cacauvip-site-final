import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, ShoppingBag, LogOut, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/ui/confetti';

interface LoyaltyCard {
  id: string;
  customer_name: string;
  customer_email: string;
  points: number;
  total_purchases: number;
  is_active?: boolean;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [loyaltyCard, setLoyaltyCard] = useState<LoyaltyCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [canAddPurchase, setCanAddPurchase] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchLoyaltyCard();
    checkBusinessHours();
  }, [user, navigate]);

  const fetchLoyaltyCard = async () => {
    if (!user) return;

    try {
      // Check if loyalty card exists
      const { data, error } = await supabase
        .from('loyalty_cards')
        .select('*')
        .eq('customer_email', user.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create new loyalty card
        const { data: newCard, error: createError } = await supabase
          .from('loyalty_cards')
          .insert({
            customer_name: user.user_metadata.name || user.email?.split('@')[0] || 'Cliente',
            customer_email: user.email!,
            points: 0,
            total_purchases: 0
          })
          .select()
          .single();

        if (createError) throw createError;
        setLoyaltyCard(newCard);
      } else {
        setLoyaltyCard(data);
      }
    } catch (error) {
      console.error('Error fetching loyalty card:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar seus dados.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const checkBusinessHours = async () => {
    try {
      // Simple business hours check (Monday-Saturday, 10:00-18:00 Brazil time)
      const now = new Date();
      const brasilTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
      const currentDay = brasilTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = brasilTime.getHours();
      
      // Check if it's business day (Monday-Saturday: 1-6)
      const isBusinessDay = currentDay >= 1 && currentDay <= 6;
      // Check if it's business hours (10:00-18:00)
      const isBusinessHours = currentHour >= 10 && currentHour < 18;
      
      if (!isBusinessDay || !isBusinessHours) {
        setCanAddPurchase(false);
        setStatusMessage('Registros só são aceitos durante nosso horário de funcionamento: Segunda a Sábado, das 10h às 18h.');
      } else {
        setCanAddPurchase(true);
        setStatusMessage('');
      }
    } catch (error) {
      console.error('Error checking business hours:', error);
      setCanAddPurchase(false);
      setStatusMessage('Erro ao verificar horário de funcionamento.');
    }
  };

  const handleAddPurchase = async () => {
    if (!user?.email || !canAddPurchase) return;

    setAdding(true);
    try {
      // Check current loyalty card status
      if (loyaltyCard?.is_active === false) {
        toast({
          title: "Conta bloqueada",
          description: "Sua conta está temporariamente bloqueada. Entre em contato conosco.",
          variant: "destructive"
        });
        setAdding(false);
        return;
      }

      // Simple fraud prevention: Check current time
      const now = new Date();
      const brasilTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
      const currentDay = brasilTime.getDay();
      const currentHour = brasilTime.getHours();
      
      // Business day and hours check
      const isBusinessDay = currentDay >= 1 && currentDay <= 6;
      const isBusinessHours = currentHour >= 10 && currentHour < 18;
      
      if (!isBusinessDay || !isBusinessHours) {
        toast({
          title: "Fora do horário",
          description: "Registros só são aceitos durante nosso horário de funcionamento: Segunda a Sábado, das 10h às 18h.",
          variant: "destructive"
        });
        setAdding(false);
        return;
      }

      // Update loyalty card points directly (simplified approach)
      const currentPoints = loyaltyCard?.points || 0;
      const newPoints = currentPoints + 1;
      
      if (newPoints >= 5) {
        // Reset points and increment total_purchases
        const { error: updateError } = await supabase
          .from('loyalty_cards')
          .update({
            points: 0,
            total_purchases: (loyaltyCard?.total_purchases || 0) + newPoints
          })
          .eq('customer_email', user.email);

        if (updateError) throw updateError;

        toast({
          title: "🎉 Parabéns!",
          description: "Você ganhou uma caixa de brigadeiros grátis! Entre em contato para resgatar.",
        });

        // Show confetti animation
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);

        // Refresh loyalty card data
        await fetchLoyaltyCard();
        await checkBusinessHours();

        setTimeout(() => {
          toast({
            title: "Resgate seu prêmio!",
            description: "Entre em contato conosco pelo WhatsApp para resgatar sua caixa de brigadeiros grátis!",
          });
        }, 2000);
      } else {
        // Update points
        const { error: updateError } = await supabase
          .from('loyalty_cards')
          .update({
            points: newPoints,
            total_purchases: (loyaltyCard?.total_purchases || 0) + 1
          })
          .eq('customer_email', user.email);

        if (updateError) throw updateError;

        toast({
          title: "Compra registrada!",
          description: "Mais uma compra registrada no seu cartão fidelidade!"
        });

        // Refresh loyalty card data
        await fetchLoyaltyCard();
        await checkBusinessHours();
      }
    } catch (error: any) {
      console.error('Error adding purchase:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao registrar compra. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setAdding(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!loyaltyCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Erro ao carregar dados do cartão fidelidade.</p>
      </div>
    );
  }

  // Calculate stamps (each purchase gives one stamp, max 5)
  const stamps = loyaltyCard.points % 5;
  const completedCards = Math.floor(loyaltyCard.points / 5);

  const loyaltySteps = Array.from({ length: 5 }, (_, index) => ({
    filled: index < stamps,
    icon: index < 4 ? ShoppingBag : Gift
  }));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Confetti Animation */}
      <Confetti 
        active={showConfetti} 
        config={{
          elementCount: 100,
          duration: 4000,
          startVelocity: 30,
          spread: 60
        }}
      />
      
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold">Olá, {loyaltyCard.customer_name}! 👋</h1>
              <p className="text-sm text-primary-foreground/80">Cliente VIP</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSignOut}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Loyalty Card */}
        <Card className="border-2 border-accent-gold/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-primary">Cartão Fidelidade</CardTitle>
            <p className="text-sm text-muted-foreground">
              {5 - stamps} {5 - stamps === 1 ? 'compra' : 'compras'} para ganhar 1 caixa de brigadeiros grátis!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Visual */}
            <div className="flex justify-center gap-2">
              {loyaltySteps.map((step, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    step.filled 
                      ? 'bg-conversion-green border-conversion-green text-white' 
                      : 'border-muted bg-muted/30'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
              ))}
            </div>

            {/* Next Reward */}
            {stamps === 0 && completedCards > 0 ? (
              <div className="text-center p-4 bg-conversion-green/10 rounded-lg border border-conversion-green/20">
                <Gift className="h-8 w-8 text-conversion-green mx-auto mb-2" />
                <p className="font-bold text-conversion-green">Você ganhou uma caixa de brigadeiros grátis! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">Entre em contato para resgatar</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  {5 - stamps} {5 - stamps === 1 ? 'carimbo' : 'carimbos'} para ganhar:
                </p>
                <p className="text-lg font-bold text-conversion-green">1 CAIXA DE BRIGADEIROS GRÁTIS! 🎁</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{loyaltyCard.total_purchases}</div>
              <div className="text-sm text-muted-foreground">Compras Totais</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-conversion-green">{completedCards}</div>
              <div className="text-sm text-muted-foreground">Prêmios Ganhos</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Purchase Button */}
        <Card className="border-2 border-accent-gold/20">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="font-bold text-primary text-lg">Acabei de Comprar!</h3>
            
            {canAddPurchase ? (
              <Button 
                onClick={handleAddPurchase}
                disabled={adding}
                className="w-full bg-conversion-green hover:bg-conversion-green/90 text-white font-bold py-4 text-lg"
              >
                {adding ? "Registrando..." : "Registrar Nova Compra (+1)"}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  disabled
                  className="w-full bg-muted text-muted-foreground font-bold py-4 text-lg cursor-not-allowed"
                >
                  Registrar Nova Compra (+1)
                </Button>
                <p className="text-sm text-muted-foreground text-center px-2">
                  {statusMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Button */}
        <Card className="bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 border-accent-gold/20">
          <CardContent className="p-6 text-center space-y-4">
            <div>
              <h3 className="font-bold text-primary mb-2">Tem um prêmio para resgatar?</h3>
              <p className="text-sm text-muted-foreground">
                Entre em contato conosco pelo WhatsApp para resgatar sua caixa de brigadeiros grátis!
              </p>
            </div>
            <Button 
              className="w-full bg-conversion-green hover:bg-conversion-green/90"
              onClick={() => window.open('https://wa.me/5583999004653?text=Olá! Gostaria de resgatar meu prêmio do cartão fidelidade.', '_blank')}
            >
              Resgatar via WhatsApp
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}