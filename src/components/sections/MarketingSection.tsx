import { useState } from 'react';
import { Gift, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignupModal } from '@/components/auth/SignupModal';
import { LoginModal } from '@/components/auth/LoginModal';

export function MarketingSection() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const loyaltySteps = [
    { filled: false, icon: ShoppingBag },
    { filled: false, icon: ShoppingBag },
    { filled: false, icon: ShoppingBag },
    { filled: false, icon: ShoppingBag },
    { filled: false, icon: ShoppingBag },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent-gold/10 via-secondary/20 to-background">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Headline */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            Torne-se um{' '}
            <span className="text-accent-gold">Cliente VIP</span>{' '}
            e Ganhe Doces de Graça!
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A cada 5 compras você ganha 1 caixa de brigadeiros grátis! 
            Cadastre-se agora e comece a acumular seus carimbos.
          </p>
        </div>

        {/* Visual Representation */}
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border-2 border-accent-gold/20">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary mb-2">Como Funciona</h3>
            </div>
            
            {/* 5 Gray Boxes → 1 Green Box */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {/* 5 Gray boxes */}
              {loyaltySteps.map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-lg border-2 border-muted bg-muted/30 flex items-center justify-center"
                >
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
              
              {/* Arrow */}
              <div className="mx-4 text-2xl text-muted-foreground">→</div>
              
              {/* 1 Green box (prize) */}
              <div className="w-12 h-12 rounded-lg bg-conversion-green border-2 border-conversion-green flex items-center justify-center animate-pulse">
                <Gift className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">5 compras =</p>
              <p className="text-lg font-bold text-conversion-green">1 CAIXA DE BRIGADEIROS GRÁTIS! 🎁</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-8 w-8 text-accent-gold" />
            </div>
            <h4 className="font-bold text-primary">Acumule Pontos</h4>
            <p className="text-sm text-muted-foreground">A cada compra você ganha um carimbo no seu cartão</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-conversion-green/10 rounded-full flex items-center justify-center mx-auto">
              <Gift className="h-8 w-8 text-conversion-green" />
            </div>
            <h4 className="font-bold text-primary">Ganhe Prêmios</h4>
            <p className="text-sm text-muted-foreground">Complete 5 carimbos e ganhe uma caixa de brigadeiros grátis</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">👑</span>
            </div>
            <h4 className="font-bold text-primary">Status VIP</h4>
            <p className="text-sm text-muted-foreground">Ofertas exclusivas e atendimento prioritário</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="max-w-sm mx-auto">
          <Button 
            onClick={() => setShowSignup(true)}
            className="btn-hero-glow w-full text-lg py-4 hover:scale-105 transition-transform"
          >
            Quero Participar Agora!
          </Button>
        </div>
      </div>

      {/* Modals */}
      <SignupModal 
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
    </section>
  );
}