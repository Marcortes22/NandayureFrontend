import Nav from '@/components/dashboard/nav/nav';
import { SideBarSystemConfiguration } from '@/components/system-configuration/sider-bar/side-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configuracion del sistema',
  description: 'Generated by create next app',
};

export default function SystemConfigurationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <SideBarSystemConfiguration />
      <div className="flex-1 p-4">
        <Nav />
        {children}
      </div>
    </main>
  );
}
