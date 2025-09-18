"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './CertificateVerifier.module.css'; 

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

const CheckIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

const CrossIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20">
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

  if (result.status === 'verifying') {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingCard}>
          <h2 className={styles.headline}>{loadingState.headline}</h2>
          <p className={styles.subhead}>{loadingState.message}</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressBarInner} 
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
    <main className={`${styles.container} ${styles.show}`}>
      <header className={styles.brandHeader}>
        <div className={styles.brandLogo} aria-hidden="true">
          <CheckIcon />
        </div>
        <div>
          <div className={styles.brandTitle}>Persevex CertiCheck</div>
          <div className={styles.brandSub}>Official Certificate Verification</div>
        </div>
      </header>

      <div className={`${styles.resultPanel} ${styles.show}`}>
        <div className={`${styles.statusBadge} ${isSuccess ? styles.verified : styles.notFound}`}>
          {isSuccess ? <CheckIcon /> : <CrossIcon />}
          <span>{badgeTitle}</span>
        </div>
        <div className={styles.detailsGrid}>
          <div>
            <div className={styles.detailsLabel}>Student</div>
            <div className={styles.detailsValue}>{result.data?.studentName ?? '—'}</div>
          </div>
          <div>
            <div className={styles.detailsLabel}>Program / Domain</div>
            <div className={styles.detailsValue}>{result.data?.domain ?? '—'}</div>
          </div>
          <div>
            <div className={styles.detailsLabel}>Date of Issue</div>
            <div className={styles.detailsValue}>{result.data?.issueDate ?? result.message ?? '—'}</div>
          </div>
        </div>
      </div>

      <p className={styles.footnote}>Verification data is sourced directly from our secure registry.</p>
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
    <div className={styles.loadingOverlay}>
        <div className={styles.loadingCard}>
            <h2 className={styles.headline}>Loading Verifier...</h2>
        </div>
    </div>
);