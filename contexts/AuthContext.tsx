"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  likePoint: number;
  _count?: {
    likedBy: number;
  };
}
interface SignUpForm {
  email: string;
  password: string;
  name: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignUpForm) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!mounted) return;

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("인증 확인 중 오류 발생:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 또는 적절한 로딩 컴포넌트
  }

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "로그인에 실패했습니다");
    }

    const data = await response.json();
    if (data.success) {
      setUser(data.user);
      await new Promise((resolve) => setTimeout(resolve, 0));
      router.push("/home");
    }
  };

  /**
   * 사용자 로그아웃을 처리하는 함수
   * 1. POST 요청으로 서버의 로그아웃 API를 호출
   * 2. 요청이 성공하면 사용자 상태를 초기화하고 홈페이지로 리다이렉트
   */
  const logout = async () => {
    // 로그아웃 API 호출
    const response = await fetch("/api/logout", { method: "POST" });

    // 요청이 성공적으로 처리된 경우
    if (response.ok) {
      // 사용자 상태를 null로 초기화
      setUser(null);
      // 메인 페이지로 리다이렉트
      router.push("/");
    }
  };

  const signup = async (data: SignUpForm) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "회원가입에 실패했습니다");
    }

    const { user } = await response.json();
    setUser(user);
    router.push("/home");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
