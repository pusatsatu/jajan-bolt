import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="container mx-auto">
        <Card className="p-12 text-center max-w-4xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Memulai Bisnis Online Anda?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan penjual yang telah merasakan kemudahan 
            dan keuntungan menggunakan jajan.app untuk bisnis online mereka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/registrasi">
                Daftar Gratis Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/login">
                Masuk ke Akun
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">✅</div>
              <div className="text-sm text-muted-foreground">Setup dalam 2 menit</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">💰</div>
              <div className="text-sm text-muted-foreground">Gratis selamanya</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">🚀</div>
              <div className="text-sm text-muted-foreground">Langsung bisa jualan</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}