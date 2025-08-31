import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Qual é o pedido mínimo?",
    answer: "O pedido mínimo é de 100 brigadeiros. Isso garante que possamos manter nossa qualidade artesanal e oferecer o melhor preço para você."
  },
  {
    question: "Com quanto tempo de antecedência devo fazer o pedido?",
    answer: "Recomendamos fazer o pedido com pelo menos 3 dias de antecedência para eventos pequenos e 7 dias para eventos maiores (acima de 300 brigadeiros). Isso nos permite preparar tudo com calma e garantir a máxima qualidade."
  },
  {
    question: "Vocês fazem entrega? Qual é a área de cobertura?",
    answer: "Sim! Fazemos entrega gratuita em São José dos Cordeiros - PB e região para pedidos acima de 150 unidades. Para pedidos menores, consultamos a taxa de entrega no momento do pedido."
  },
  {
    question: "Posso personalizar os sabores?",
    answer: "Claro! Oferecemos diversos sabores gourmet: tradicional, beijinho, morango, maracujá, limão, café, chocolate branco e muitos outros. Você pode escolher uma combinação de sabores para seu pedido."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Aceitamos PIX, dinheiro e cartão de débito/crédito. Para pedidos maiores, oferecemos a opção de entrada de 50% na confirmação do pedido e o restante na entrega."
  },
  {
    question: "Vocês têm alguma garantia?",
    answer: "Sim! Oferecemos 100% de garantia de satisfação. Se por algum motivo você não ficar completamente satisfeito, refazemos seu pedido sem custo adicional."
  },
  {
    question: "Os brigadeiros podem ficar quantos dias na geladeira?",
    answer: "Nossos brigadeiros gourmet permanecem frescos por até 5 dias quando armazenados adequadamente na geladeira em recipiente fechado. Recomendamos consumi-los em até 3 dias para melhor experiência."
  },
  {
    question: "Vocês fazem para eventos corporativos?",
    answer: "Sim! Atendemos eventos corporativos, casamentos, aniversários, formaturas e qualquer tipo de celebração. Para eventos maiores, oferecemos condições especiais e embalagens personalizadas."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground">
            Esclareça suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 px-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Não encontrou sua resposta? Entre em contato conosco!
          </p>
          <a
            href="https://wa.me/5583999004653?text=Olá! Tenho uma dúvida sobre os brigadeiros."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};