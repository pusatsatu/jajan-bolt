'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  MessageSquare, 
  DollarSign,
  Settings,
  Shield,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Management User',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: 'Konfirmasi Pembayaran',
      href: '/admin/payments',
      icon: CreditCard,
    },
    {
      name: 'Ticketing System',
      href: '/admin/tickets',
      icon: MessageSquare,
    },
    {
      name: 'Management Keuangan',
      href: '/admin/finance',
      icon: DollarSign,
    },
    {
      name: 'Pengaturan',
      href: '/admin/settings',
      icon: Settings,
    },
    {
      name: 'Management Admin',
      href: '/admin/admins',
      icon: Shield,
    },
    {
      name: 'Trailing Log',
      href: '/admin/logs',
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/login-as-admin');
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="font-semibold">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}