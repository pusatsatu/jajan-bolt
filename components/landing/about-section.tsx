import { Card } from '@/components/ui/card';
import { ShoppingCart, Users, TrendingUp, Shield } from 'lucide-react';

export default function AboutSection() {
  const benefits = {
    seller: [
      {
        icon: <ShoppingCart className="w-8 h-8" />,
        title: "Toko Online Siap Pakai",
        description: "Dashboard lengkap untuk mengelola produk, pesanan, dan pelanggan"
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Analytics Mendalam",
        description: "Pantau performa toko Anda dengan data real-time yang akurat"
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Keamanan Terjamin",
        description: "Data dan transaksi Anda aman dengan enkripsi tingkat enterprise"
      }
    ],
    buyer: [
      {
        icon: <Users className="w-8 h-8" />,
        title: "Belanja Mudah",
        description: "Interface yang intuitif dan proses checkout yang cepat"
      },
      {
        icon: <ShoppingCart className="w-8 h-8" />,
        title: "Katalog Lengkap",
        description: "Temukan berbagai produk dengan sistem pencarian yang canggih"
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Pembayaran Aman",
        description: "Sistem pembayaran terintegrasi dengan berbagai metode"
      }
    ]
  };

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kenapa Memilih jajan.app?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kami menghadirkan solusi terbaik untuk membantu Anda memasarkan produk secara online
            dengan fitur-fitur yang tidak akan Anda temukan di platform lain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Manfaat untuk Penjual</h3>
            <div className="space-y-6">
              {benefits.seller.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-primary">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Manfaat untuk Pembeli</h3>
            <div className="space-y-6">
              {benefits.buyer.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-primary">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Card className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Yang Membuat Kami Berbeda</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Gratis untuk Memulai</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">30 Detik</div>
                <div className="text-sm text-muted-foreground">Setup Toko Online</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Dukungan Teknis</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}