"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface CertificateData {
  studentName: string;
  domain: string;
  issueDate: string;
}

type VerificationStatus = 'verifying' | 'verified' | 'not-found' | 'error' | 'invalid-link';

interface VerificationResult {
  status: VerificationStatus;
  data?: CertificateData;
  message?: string;
}

interface LoadingState {
  percent: number;
  message: string;
  headline: string;
}

const CheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

const CrossIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
  </svg>
);


function Verifier() {
  const searchParams = useSearchParams();
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbxqa4m-IpuY43y18oCM2MAyygwO0n9t3pqpjpH58NmuOdA-ylbRAfqmYDRIVnXwqh1o/exec";
  
  const [result, setResult] = useState<VerificationResult>({ status: 'verifying' });
  const [loadingState, setLoadingState] = useState<LoadingState>({ 
    percent: 0, 
    message: 'Initializing...', 
    headline: 'Verifying Certificate' 
  });
  const [showResult, setShowResult] = useState(false);
  
  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    const verifyCertificate = async () => {
      const certId = searchParams.get('id');

      if (!certId) {
        setLoadingState({ percent: 100, message: "Invalid Link", headline: "Error" });
        await wait(1200);
        setResult({ status: 'invalid-link', message: 'The verification link is missing a certificate ID.' });
        return;
      }

      try {
        await wait(200);
        setLoadingState(prev => ({ ...prev, percent: 25, message: 'Connecting to Secure Server...' }));
        
        await wait(500);
        setLoadingState(prev => ({ ...prev, percent: 50, message: 'Querying Official Registry...' }));

        const form = new URLSearchParams();
        form.append('certId', certId.trim());
        
        const response = await fetch(ENDPOINT, { method: 'POST', body: form });
        if (!response.ok) throw new Error(`Network Error: ${response.statusText}`);
        const json = await response.json();

        await wait(800);
        setLoadingState(prev => ({ ...prev, percent: 80, message: 'Finalizing...' }));

        await wait(400);
        setLoadingState(prev => ({ ...prev, percent: 100, message: 'Done!' }));
        
        await wait(400);
        if (json && json.status === 'verified' && json.data) {
          setResult({ status: 'verified', data: json.data });
        } else {
          setResult({ status: 'not-found', message: 'No valid record was found for this ID.' });
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setLoadingState(prev => ({ ...prev, percent: 100, message: 'Error!' }));
        await wait(1200);
        setResult({ status: 'error', message: 'Could not connect to the verification service.' });
      }
    };
    verifyCertificate();
  }, [searchParams]);

  useEffect(() => {
    if (result.status !== 'verifying') {
      const timer = setTimeout(() => setShowResult(true), 100);
      return () => clearTimeout(timer);
    }
  }, [result.status]);

  if (result.status === 'verifying') {
    return (
      <div className="w-full max-w-md mx-4 text-center">
        <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-2">{loadingState.headline}</h2>
          <p className="text-gray-300 mb-6">{loadingState.message}</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${loadingState.percent}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = result.status === 'verified';
  const badgeTitle = {
      'verified': 'VERIFIED',
      'not-found': 'NOT FOUND',
      'invalid-link': 'INVALID LINK',
      'error': 'REQUEST FAILED'
  }[result.status];

  return (
    <main className={`w-full max-w-2xl mx-4 transition-opacity duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700 text-white">
        
        <header className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full">
            <img src="/whitelogo.png" alt="Persevex Logo" className="w-12 h-12 rounded-full"/>
          </div>
          <div>
            <div className="text-xl font-bold text-white">Persevex CertiCheck</div>
            <div className="text-sm text-gray-400">Official Certificate Verification</div>
          </div>
        </header>

        <div className="bg-gray-800/70 rounded-lg p-6 border border-gray-700">
          <div className={`flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-full mb-6 w-fit ${isSuccess ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {isSuccess ? <CheckIcon className="w-5 h-5"/> : <CrossIcon className="w-5 h-5"/>}
            <span>{badgeTitle}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 text-left">
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Student</div>
              <div className="text-lg font-medium text-white mt-1 break-words">{result.data?.studentName ?? '—'}</div>
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Program / Domain</div>
              <div className="text-lg font-medium text-white mt-1 break-words">{result.data?.domain ?? '—'}</div>
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Date of Issue</div>
              <div className="text-lg font-medium text-white mt-1 break-words">{result.data?.issueDate ?? result.message ?? '—'}</div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">Verification data is sourced directly from our secure registry.</p>
      </div>
    </main>
  );
}

export default function CertificateVerifier() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Verifier />
        </Suspense>
    );
}

const LoadingFallback = () => (
    <div className="w-full max-w-md mx-4 text-center">
        <div className=" p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white">Loading Verifier...</h2>
            <p className="text-gray-400 mt-2">Please wait a moment.</p>
        </div>
    </div>
);


function ExploreAppbar() {
  return (
    <div className="flex items-start justify-start w-full ">
      <Link href={"/"} className="text-2xl md:text-3xl font-bold">
        PERSEVEX
      </Link>
    </div>
  );
}
