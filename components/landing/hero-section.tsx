'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  const handleCheck = async () => {
    if (!username || username.length < 6) return;
    
    setIsChecking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, randomly determine availability
    const available = Math.random() > 0.3;
    setIsAvailable(available);
    setIsChecking(false);
  };

  const handleRegister = () => {
    router.push(`/registrasi?username=${encodeURIComponent(username)}`);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Buat Toko Online Anda
            <br />
            <span className="text-foreground">Dalam Hitungan Menit!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Platform hosting microsite gratis dengan fitur lengkap. 
            Mulai dari katalog produk hingga sistem pembayaran - semua ada di sini!
          </p>
        </div>

        <Card className="max-w-lg mx-auto p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Cek Ketersediaan Username</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="masukkan-username-anda"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9\-_]/g, ''));
                  setIsAvailable(null);
                }}
                className="text-center"
              />
            </div>
            <Button 
              onClick={handleCheck}
              disabled={isChecking || username.length < 6}
              className="min-w-[100px]"
            >
              {isChecking ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </>
              )}
            </Button>
          </div>
          
          {isAvailable === true && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Selamat! Username bisa digunakan</span>
              </div>
              <Button onClick={handleRegister} className="w-full">
                Daftar Sekarang
              </Button>
            </div>
          )}
          
          {isAvailable === false && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <span className="text-red-700 dark:text-red-300">Username sudah digunakan, coba yang lain</span>
            </div>
          )}
        </Card>

        <p className="text-sm text-muted-foreground">
          Username hanya boleh menggunakan huruf kecil, angka, tanda '-' dan '_' (minimal 6 karakter)
        </p>
      </div>
    </section>
  );
}