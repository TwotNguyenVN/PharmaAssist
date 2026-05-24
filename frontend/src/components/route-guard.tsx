'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from './ui/button';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // If still loading session, show premium spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="text-center space-y-3 font-sans">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-medium text-graphite">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, do not show children while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // If roles restriction exists, verify permissions
  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cloud px-4">
        <div className="max-w-md w-full bg-white border border-hairline p-8 rounded-xl shadow-sm text-center font-sans space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bloom-rose text-bloom-deep">
            <ShieldAlert className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-ink">Truy cập bị từ chối</h2>
            <p className="text-sm text-charcoal">
              Tài khoản của bạn không có quyền truy cập vào chức năng này. Vui lòng liên hệ với quản trị viên nếu bạn tin rằng đây là một sự nhầm lẫn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-primary hover:bg-primary-deep text-white font-medium"
            >
              Quay lại Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/login')}
              className="border-hairline hover:bg-cloud"
            >
              Đăng nhập tài khoản khác
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Everything is fine, render child components
  return <>{children}</>;
}
