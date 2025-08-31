import { useState } from 'react';
import { Gift, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignupModal } from '@/components/auth/SignupModal';
import { LoginModal } from '@/components/auth/LoginModal';

export function LoyaltySection() {
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
    <section className="py-20 px-4 bg-gradient-to-br from-secondary to-background">
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

        {/* Loyalty Card Visual */}
        <div className="bg-card rounded-2xl shadow-xl p-8 border-2 border-accent-gold/20 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-primary mb-2">Cartão Fidelidade</h3>
            <p className="text-sm text-muted-foreground">Complete 5 compras e ganhe a próxima!</p>
          </div>
          
          <div className="flex justify-center gap-3 mb-6">
            {loyaltySteps.map((step, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  step.filled 
                    ? 'bg-conversion-green border-conversion-green text-white' 
                    : 'border-muted bg-muted/30'
                }`}
              >
                {index < 4 ? (
                  <ShoppingBag className="h-5 w-5" />
                ) : (
                  <Gift className="h-5 w-5" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">5 compras =</p>
            <p className="text-lg font-bold text-conversion-green">1 CAIXA DE BRIGADEIROS GRÁTIS! 🎁</p>
          </div>
        </div>

        {/* Benefits List */}
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
            className="btn-hero-glow w-full text-lg py-4"
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