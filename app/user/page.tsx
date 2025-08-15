'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Eye, 
  Clock, 
  Crown, 
  AlertTriangle,
  ExternalLink 
} from 'lucide-react';
import Header from '@/components/header';
import UserSidebar from '@/components/user/user-sidebar';

interface User {
  username: string;
  role: 'trial' | 'free' | 'pro';
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'trial': return 'bg-blue-500';
      case 'free': return 'bg-gray-500';
      case 'pro': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'trial': return 'Trial';
      case 'free': return 'Free';
      case 'pro': return 'Pro';
      default: return 'Free';
    }
  };

  // Mock analytics data
  const analytics = {
    totalVisits: 150,
    todayVisits: 12,
    totalClicks: 45,
    conversionRate: 30
  };

  // Mock expiry date (7 days from now for trial/free, 30 days for pro)
  const expiryDate = new Date();
  if (user.role === 'pro') {
    expiryDate.setDate(expiryDate.getDate() + 30);
  } else {
    expiryDate.setDate(expiryDate.getDate() + 7);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Selamat datang kembali, @{user.username}!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getRoleColor(user.role)} text-white`}>
                    {getRoleText(user.role)}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <a 
                      href={`/i/${user.username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Lihat Microsite
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {user.role === 'pro' ? (
                      <Crown className="w-8 h-8 text-yellow-500" />
                    ) : (
                      <Clock className="w-8 h-8 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {user.role === 'pro' 
                        ? 'Status Pro Aktif' 
                        : user.role === 'trial'
                        ? 'Masa Trial Berlaku'
                        : 'Status Free Aktif'
                      }
                    </h3>
                    <p className="text-muted-foreground">
                      {user.role === 'pro'
                        ? `Akses premium berakhir pada ${expiryDate.toLocaleDateString('id-ID')}`
                        : user.role === 'trial'
                        ? `Trial berakhir pada ${expiryDate.toLocaleDateString('id-ID')}`
                        : `Free berakhir pada ${expiryDate.toLocaleDateString('id-ID')}`
                      }
                    </p>
                  </div>
                  {user.role !== 'pro' && (
                    <Button className="flex-shrink-0">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade ke Pro
                    </Button>
                  )}
                </div>
                {user.role !== 'pro' && (
                  <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          {user.role === 'trial'
                            ? 'Upgrade ke Pro untuk menikmati fitur lengkap tanpa batas waktu!'
                            : 'Jangan lewatkan kesempatan untuk upgrade ke Pro dengan fitur premium!'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analytics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Kunjungan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold">{analytics.totalVisits}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    +12% dari bulan lalu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Kunjungan Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <span className="text-2xl font-bold">{analytics.todayVisits}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Puncak jam 10-12 WIB
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Klik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-bold">{analytics.totalClicks}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    WhatsApp paling populer
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <span className="text-2xl font-bold">{analytics.conversionRate}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sangat baik!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Lihat Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <ExternalLink className="w-6 h-6" />
                    <span>Buka Microsite</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Crown className="w-6 h-6" />
                    <span>Upgrade Pro</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}