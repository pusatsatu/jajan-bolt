import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "Gratis",
      period: "selamanya",
      description: "Cocok untuk pemula yang ingin mencoba",
      features: [
        "Microsite dengan domain jajan.app/i/username",
        "Bio dan deskripsi toko",
        "Integrasi WhatsApp dan Google Maps",
        "Masa berlaku terbatas",
        "Dukungan komunitas"
      ]
    },
    {
      name: "Pro",
      price: "30K",
      period: "per bulan",
      yearlyPrice: "300K",
      yearlyPeriod: "per tahun",
      description: "Fitur lengkap untuk bisnis serius",
      features: [
        "Semua fitur Free",
        "Katalog produk (maksimal 30 item)",
        "Custom link (maksimal 30 link)",
        "Analytics mendalam",
        "Keranjang belanja terintegrasi",
        "Dukungan prioritas",
        "Tema premium dengan motif batik",
        "SEO optimization"
      ],
      popular: true
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Harga yang Terjangkau untuk Semua
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mulai gratis dan upgrade kapan saja Anda siap mengembangkan bisnis lebih serius.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-8 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Paling Populer
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">Rp {plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                {plan.yearlyPrice && (
                  <div className="text-sm text-muted-foreground">
                    atau Rp {plan.yearlyPrice} {plan.yearlyPeriod} (hemat 17%)
                  </div>
                )}
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Semua paket dilengkapi dengan hosting gratis dan SSL certificate.
            Tidak ada biaya tersembunyi atau setup fee.
          </p>
        </div>
      </div>
    </section>
  );
}