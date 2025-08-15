import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function DemoSection() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lihat Demo Microsite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Begini tampilan microsite Anda nantinya - elegan, profesional, dan mudah digunakan.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="p-8 max-w-md mx-auto">
            <div className="relative">
              {/* Phone Frame */}
              <div className="bg-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-black rounded-[2rem] p-1">
                  <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="aspect-[9/16] bg-gradient-to-b from-primary/5 to-primary/10 p-4">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Image
                            src="/logo.png"
                            alt="Demo Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <h3 className="font-bold text-lg">@toko-bunga</h3>
                        <p className="text-sm text-muted-foreground">Toko bunga segar setiap hari</p>
                        <div className="flex gap-2 justify-center mt-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📱</span>
                          </div>
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📍</span>
                          </div>
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔗</span>
                          </div>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Produk Terlaris</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                            <div className="w-full h-16 bg-pink-200 rounded mb-1"></div>
                            <p className="text-xs font-medium">Buket Mawar</p>
                            <p className="text-xs text-primary">Rp 75K</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                            <div className="w-full h-16 bg-yellow-200 rounded mb-1"></div>
                            <p className="text-xs font-medium">Buket Tulip</p>
                            <p className="text-xs text-primary">Rp 85K</p>
                          </div>
                        </div>
                      </div>

                      {/* Custom Links */}
                      <div className="mt-4 space-y-2">
                        <h4 className="font-semibold text-sm">Link Berguna</h4>
                        <div className="space-y-1">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-xs">
                            📱 WhatsApp Business
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-xs">
                            📸 Instagram @toko.bunga
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desain yang clean dan modern dengan navigasi yang intuitif. 
            Pengunjung dapat dengan mudah melihat produk dan menghubungi Anda langsung.
          </p>
        </div>
      </div>
    </section>
  );
}