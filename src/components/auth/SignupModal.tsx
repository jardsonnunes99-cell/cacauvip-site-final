import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.name, formData.phone);
    
    if (!error) {
      onClose();
      setFormData({ name: '', email: '', phone: '', password: '' });
    }
    
    setLoading(false);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Crie sua Conta Fidelidade
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
              required
              placeholder="Seu nome completo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Celular</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              required
              placeholder="(83) 99999-9999"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              required
              placeholder="Mínimo 6 caracteres"
              minLength={6}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-conversion-green hover:bg-conversion-green/90"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar e Começar a Ganhar'}
          </Button>
        </form>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Já tem uma conta?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-accent-gold hover:underline font-medium"
          >
            Entre aqui
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}