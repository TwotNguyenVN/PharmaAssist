'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateForm = () => {
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
      return false;
    }
    
    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      await login(email, password);
      // login method redirects to /dashboard internally
    } catch (err: any) {
      console.error('Login error:', err);
      // Detailed errors from backend validation/unauthorized
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401) {
        setErrorMsg('Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.');
      } else if (status === 400 && Array.isArray(message)) {
        setErrorMsg(message.join(', '));
      } else if (message) {
        setErrorMsg(message);
      } else {
        setErrorMsg('Đăng nhập thất bại. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cloud px-4 py-12 relative overflow-hidden font-sans">
      {/* Decorative HP Slashes (Chevrons) for visual branding signature */}
      <div className="absolute top-[-20%] left-[-10%] w-[30%] h-[150%] bg-primary opacity-5 transform rotate-[25deg] hidden lg:block pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[25%] h-[150%] bg-primary opacity-5 transform rotate-[25deg] hidden lg:block pointer-events-none"></div>

      <Card className="w-full max-w-md shadow-lg border border-hairline rounded-xl bg-white relative z-10">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-xl"></div>
        
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
            <span className="text-2xl text-primary font-bold">P</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-ink mt-3">
            Pharma<span className="text-primary">Assist</span>
          </CardTitle>
          <CardDescription className="text-sm text-graphite">
            Hệ thống quản lý nhà thuốc và cảnh báo tương tác thuốc thông minh
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 px-6">
            {errorMsg && (
              <Alert variant="destructive" className="bg-bloom-rose border-bloom-coral/30 text-bloom-deep">
                <ShieldAlert className="h-4 w-4 text-bloom-deep" />
                <AlertTitle className="font-semibold text-bloom-deep">Lỗi đăng nhập</AlertTitle>
                <AlertDescription className="text-bloom-wine text-xs mt-1">{errorMsg}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="email">
                Email nhân viên
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@pharmaassist.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="password">
                  Mật khẩu
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col px-6 pb-8 pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-deep text-white font-semibold uppercase tracking-wider text-xs h-11 rounded-md transition-all shadow-md active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
            
            <p className="mt-5 text-[11px] text-center text-graphite leading-relaxed">
              Hệ thống bảo mật nội bộ. Mọi truy cập trái phép sẽ bị ghi nhật ký.<br />
              &copy; {new Date().getFullYear()} PharmaAssist. All rights reserved.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
