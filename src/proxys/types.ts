import type { NextProxy } from 'next/server';

export type ProxyFactory = (middleware: NextProxy) => NextProxy;
