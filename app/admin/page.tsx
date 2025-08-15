'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, CreditCard, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import AdminSidebar from '@/components/admin/admin-sidebar';

interface Admin {
  username: string;
  role: 'admin' | 'staff';
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      router.push('/login-as-admin');
      return;
    }
    setAdmin(JSON.parse(adminData));
  }, [router]);

  if (!admin) return null;

  // Mock data
  const stats = {
    totalTrialUsers: 45,
    totalFreeUsers: 125,
    totalProUsers: 87,
    todayIncome: 2500000,
    monthlyIncome: 45000000,
    yearlyIncome: 450000000,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Selamat datang, {admin.username}! ({admin.role})
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    User Trial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-bold">{stats.totalTrialUsers}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Masa trial aktif
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    User Free
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-2xl font-bold">{stats.totalFreeUsers}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Akun gratis aktif
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    User Pro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold">{stats.totalProUsers}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Subscriber premium
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Income Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pendapatan Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-xl font-bold">{formatCurrency(stats.todayIncome)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    +15% dari kemarin
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pendapatan Bulan Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className="text-xl font-bold">{formatCurrency(stats.monthlyIncome)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Target 50% tercapai
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pendapatan Tahun Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="text-xl font-bold">{formatCurrency(stats.yearlyIncome)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    +35% dari tahun lalu
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Pembayaran diterima dari @toko-bunga</p>
                      <p className="text-sm text-muted-foreground">2 menit yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">User baru mendaftar: @warung-elektronik</p>
                      <p className="text-sm text-muted-foreground">15 menit yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Ticket baru: Konfirmasi pembayaran</p>
                      <p className="text-sm text-muted-foreground">1 jam yang lalu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}