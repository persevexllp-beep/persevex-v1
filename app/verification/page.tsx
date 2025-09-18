import CertificateVerifier from "../components/CertificateVerifier";

export default function VerifyPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa', 
      padding: '1rem'
    }}>
      <CertificateVerifier />
    </div>
  );
}