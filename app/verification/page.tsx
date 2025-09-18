import CertificateVerifier from "../components/CertificateVerifier";

export default function VerifyPage() {
  return (
    // The component needs to fill the screen, so we add some styles to the wrapper
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa', // Corresponds to --bg
      padding: '1rem'
    }}>
      <CertificateVerifier />
    </div>
  );
}