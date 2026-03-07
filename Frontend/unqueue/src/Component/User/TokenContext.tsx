import React, { createContext, useContext, useState, useEffect } from 'react';
import { Token, StoreType, TokenStatus } from './Types';

interface TokenContextType {
  tokens: Token[];
  addToken: (token: Omit<Token, 'id' | 'tokenNumber' | 'status' | 'createdAt'>) => Token;
  updateTokenStatus: (id: string, status: TokenStatus) => void;
  getNextWaitingToken: (storeType?: StoreType, city?: string) => Token | null;
  getTokensByStatus: (status: TokenStatus, storeType?: StoreType, city?: string) => Token[];
  getTokenById: (id: string) => Token | undefined;
  clearCompletedTokens: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>(() => {
    const saved = localStorage.getItem('uniqueue-tokens');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          calledAt: t.calledAt ? new Date(t.calledAt) : undefined,
          completedAt: t.completedAt ? new Date(t.completedAt) : undefined
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('uniqueue-tokens', JSON.stringify(tokens));
  }, [tokens]);

  const generateTokenNumber = (storeType: StoreType): string => {
    const prefix = storeType.substring(0, 1).toUpperCase();
    const todayTokens = tokens.filter(
      t => t.storeType === storeType && 
      new Date(t.createdAt).toDateString() === new Date().toDateString()
    );
    const nextNumber = todayTokens.length + 1;
    return `${prefix}${String(nextNumber).padStart(3, '0')}`;
  };

  const addToken = (tokenData: Omit<Token, 'id' | 'tokenNumber' | 'status' | 'createdAt'>): Token => {
    const newToken: Token = {
      ...tokenData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tokenNumber: generateTokenNumber(tokenData.storeType),
      status: 'waiting',
      createdAt: new Date()
    };
    
    setTokens(prev => [...prev, newToken]);
    return newToken;
  };

  const updateTokenStatus = (id: string, status: TokenStatus) => {
    setTokens(prev => prev.map(token => {
      if (token.id === id) {
        const updates: Partial<Token> = { status };
        if (status === 'serving') {
          updates.calledAt = new Date();
        } else if (status === 'completed') {
          updates.completedAt = new Date();
        }
        return { ...token, ...updates };
      }
      return token;
    }));
  };

  const getNextWaitingToken = (storeType?: StoreType, city?: string): Token | null => {
    const waitingTokens = tokens
      .filter(t => {
        if (t.status !== 'waiting') return false;
        if (storeType && t.storeType !== storeType) return false;
        if (city && t.city !== city) return false;
        return true;
      })
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
    return waitingTokens[0] || null;
  };

  const getTokensByStatus = (status: TokenStatus, storeType?: StoreType, city?: string): Token[] => {
    return tokens
      .filter(t => {
        if (t.status !== status) return false;
        if (storeType && t.storeType !== storeType) return false;
        if (city && t.city !== city) return false;
        return true;
      })
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const getTokenById = (id: string): Token | undefined => {
    return tokens.find(t => t.id === id);
  };

  const clearCompletedTokens = () => {
    setTokens(prev => prev.filter(t => t.status !== 'completed'));
  };

  return (
    <TokenContext.Provider
      value={{
        tokens,
        addToken,
        updateTokenStatus,
        getNextWaitingToken,
        getTokensByStatus,
        getTokenById,
        clearCompletedTokens
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}