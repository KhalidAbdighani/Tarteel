import { NextResponse } from 'next/server';
import path from 'path';

export function proxy(request) {
  // 1. جلب التوكن من الكوكيز (جافا سكريبت عادية)
  const token = request.cookies.get('Token')?.value;
  const { pathname } = request.nextUrl;


  // 2. إذا المستخدم زائر (ما عنده توكن) ويحاول يدخل أي صفحة غير اللوجن والريجستر
  if (pathname === "/tarteel3.png") {
  return NextResponse.next();
}

  if (!token) {
    if (pathname !== '/login' && pathname !== '/register') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. إذا المستخدم مسجل (عنده توكن) وحاول يدخل صفحة اللوجن أو الريجستر بيده
  if (token && (pathname === '/login' || pathname === '/register')) {
    
    return NextResponse.redirect(new URL('/', request.url));
  }
  

  // إذا أموره تمام، خليه يمر بسلام
  return NextResponse.next();
}

// الماتشر يظل كما هو لأنه كود Next.js أساسي
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};