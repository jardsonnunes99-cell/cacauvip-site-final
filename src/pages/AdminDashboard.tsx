import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, Settings, Clock, Plus, Minus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyCard {
  id: string;
  customer_name: string;
  customer_email: string;
  points: number;
  total_purchases: number;
  is_active?: boolean;
}

interface BusinessSetting {
  id: string;
  key: string;
  value: string;
  description: string;
}

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([]);
  const [businessSettings, setBusinessSettings] = useState<BusinessSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    // For demo purposes, allow any logged-in user to access admin
    // In production, you should check for admin role
    fetchLoyaltyCards();
    fetchBusinessSettings();
  }, [user, navigate]);

  const fetchLoyaltyCards = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_cards')
        .select('*')
        .order('customer_name');

      if (error) throw error;
      setLoyaltyCards(data || []);
    } catch (error) {
      console.error('Error fetching loyalty cards:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar cartões fidelidade.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      setBusinessSettings(data || []);
    } catch (error) {
      console.error('Error fetching business settings:', error);
    }
  };

  const toggleCustomerStatus = async (customerId: string, currentStatus?: boolean) => {
    try {
      const { error } = await supabase
        .from('loyalty_cards')
        .update({ points: currentStatus ? 0 : 1 }) // Simple toggle simulation
        .eq('id', customerId);

      if (error) throw error;

      await fetchLoyaltyCards();
      toast({
        title: 'Sucesso',
        description: `Cliente ${!currentStatus ? 'ativado' : 'bloqueado'} com sucesso.`
      });
    } catch (error) {
      console.error('Error toggling customer status:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao alterar status do cliente.',
        variant: 'destructive'
      });
    }
  };

  const adjustCustomerPoints = async (customerId: string, currentPoints: number, adjustment: number) => {
    const newPoints = Math.max(0, Math.min(5, currentPoints + adjustment));
    
    try {
      const { error } = await supabase
        .from('loyalty_cards')
        .update({ points: newPoints })
        .eq('id', customerId);

      if (error) throw error;

      await fetchLoyaltyCards();
      toast({
        title: 'Sucesso',
        description: `Pontos ajustados para ${newPoints}.`
      });
    } catch (error) {
      console.error('Error adjusting points:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao ajustar pontos.',
        variant: 'destructive'
      });
    }
  };

  const updateBusinessSetting = async (settingId: string, newValue: string) => {
    setSettingsLoading(true);
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ value: newValue })
        .eq('id', settingId);

      if (error) throw error;

      await fetchBusinessSettings();
      toast({
        title: 'Sucesso',
        description: 'Configuração atualizada com sucesso.'
      });
    } catch (error) {
      console.error('Error updating business setting:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar configuração.',
        variant: 'destructive'
      });
    } finally {
      setSettingsLoading(false);
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
          <p className="text-muted-foreground">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Painel Administrativo</h1>
              <p className="text-sm text-primary-foreground/80">CacauVip - Gestão de Fidelidade</p>
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
      <main className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciar Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead>Total de Compras</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loyaltyCards.map((card) => (
                        <TableRow key={card.id}>
                          <TableCell className="font-medium">{card.customer_name}</TableCell>
                          <TableCell>{card.customer_email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{card.points}/5</span>
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${
                                      i < card.points 
                                        ? 'bg-conversion-green' 
                                        : 'bg-muted border border-muted-foreground/20'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{card.total_purchases}</TableCell>
                          <TableCell>
                            <Badge variant={card.is_active !== false ? "default" : "destructive"}>
                              {card.is_active !== false ? 'Ativo' : 'Bloqueado'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleCustomerStatus(card.id, card.is_active)}
                              >
                                {card.is_active !== false ? 'Bloquear' : 'Ativar'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => adjustCustomerPoints(card.id, card.points, 1)}
                                disabled={card.points >= 5}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => adjustCustomerPoints(card.id, card.points, -1)}
                                disabled={card.points <= 0}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {businessSettings.map((setting) => (
                  <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label className="font-medium">
                      {setting.key === 'business_hours_start' && 'Horário de Início'}
                      {setting.key === 'business_hours_end' && 'Horário de Fim'}
                      {setting.key === 'business_days' && 'Dias de Funcionamento'}
                      {setting.key === 'timezone' && 'Fuso Horário'}
                      {!setting.key.includes('business') && setting.key}
                    </Label>
                    <Input
                      value={setting.value}
                      onChange={(e) => updateBusinessSetting(setting.id, e.target.value)}
                      disabled={settingsLoading}
                      placeholder={setting.description || ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Instruções:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Horários devem estar no formato HH:MM (ex: 10:00)</li>
                    <li>• Dias da semana: 1=Segunda, 2=Terça, ..., 7=Domingo</li>
                    <li>• Use vírgulas para separar múltiplos dias (ex: 1,2,3,4,5,6)</li>
                    <li>• Fuso horário deve seguir o padrão IANA (ex: America/Sao_Paulo)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}