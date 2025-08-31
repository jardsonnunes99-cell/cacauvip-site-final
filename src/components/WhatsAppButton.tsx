import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  quantity?: number;
  totalValue?: number;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hero" | "fixed";
}

const WHATSAPP_NUMBER = "5583999004653";

export const WhatsAppButton = ({ 
  quantity = 0, 
  totalValue = 0, 
  children, 
  className,
  variant = "default"
}: WhatsAppButtonProps) => {
  
  const generateWhatsAppLink = () => {
    let message = "Olá! Gostaria de fazer uma encomenda";
    
    if (quantity > 0 && totalValue > 0) {
      message += ` de ${quantity} brigadeiros, no valor de R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    }
    
    message += ".";
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const variantClasses = {
    default: "btn-whatsapp w-full",
    hero: "btn-hero w-full",
    fixed: "btn-whatsapp fixed bottom-4 right-4 w-auto z-50 shadow-2xl"
  };

  return (
    <a
      href={generateWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 no-underline",
        variantClasses[variant],
        className
      )}
    >
      <MessageCircle className="h-5 w-5" />
      {children}
    </a>
  );
};