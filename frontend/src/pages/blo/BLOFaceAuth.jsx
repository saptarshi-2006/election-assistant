import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Camera, ShieldCheck, ShieldAlert, RefreshCw, AlertCircle } from 'lucide-react';

const BLOFaceAuth = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, scanning, success, fail
  const [stream, setStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      setStatus('loading_camera');
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        setStatus('idle');
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setStatus('error');
    }
  };

  const handleScan = () => {
    setStatus('scanning');
    // Simulate scan
    setTimeout(() => {
      // For demo: randomly succeed or fail, or allow user to choose?
      // I'll make it succeed for now but show the fail UI path
    }, 2000);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedPhoto(dataUrl);
      return dataUrl;
    }
    return null;
  };

  const simulateResult = async (result) => {
    if (result === 'success') {
      setStatus('success');
      setTimeout(() => {
        localStorage.setItem('blo_verified', 'true');
        navigate('/blo/dashboard');
      }, 1500);
    } else {
      const photo = capturePhoto();
      setStatus('fail');
      
      // Simulate API call to report incident with photo
      try {
        console.log("Reporting security incident with captured photo...");
        // In real app: await api.post('/ec/report-incident', { photo, location: 'Booth 42' });
      } catch (err) {
        console.error("Failed to report incident", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Security Verification</h1>
          <p className="text-slate-400 text-sm">Face recognition required to access BLO Portal</p>
        </div>

        <Card className="relative overflow-hidden aspect-square bg-black rounded-3xl border-4 border-slate-800">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
          
          <canvas ref={canvasRef} className="hidden" />
          
          {status === 'scanning' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-full h-1 bg-blue-500 animate-scan shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              <div className="absolute inset-0 bg-blue-500/10" />
            </div>
          )}

          {status === 'success' && (
            <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <ShieldCheck className="w-20 h-20 text-green-500 mb-4" />
              <p className="text-green-500 font-bold text-xl">Access Granted</p>
            </div>
          )}

          {status === 'fail' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <div className="absolute inset-0 bg-red-900/40 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center">
                <ShieldAlert className="w-20 h-20 text-red-500 mb-4" />
                <p className="text-red-500 font-bold text-xl">Access Denied</p>
                <p className="text-red-100 text-[10px] mt-2 px-6 text-center uppercase tracking-wider">Snapshot sent to Election Commission</p>
                {capturedPhoto && (
                  <div className="mt-4 border-2 border-red-500 rounded-lg overflow-hidden w-24 aspect-square">
                    <img src={capturedPhoto} alt="Intruder" className="w-full h-full object-cover grayscale" />
                  </div>
                )}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
              <p className="text-white font-bold text-lg mb-2">Camera Access Denied</p>
              <p className="text-slate-400 text-xs mb-6">
                Permission was denied or no camera was found. Please ensure your camera is connected and you have granted permission in your browser settings.
              </p>
              <Button onClick={startCamera} variant="outline" className="text-white border-slate-700 hover:bg-slate-800">
                <RefreshCw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </div>
          )}
        </Card>

        <div className="flex flex-col space-y-3">
          {status === 'idle' && (
            <Button onClick={() => setStatus('scanning')} size="lg" className="h-14 rounded-2xl text-lg font-bold">
              <Camera className="w-6 h-6 mr-2" /> Start Face Scan
            </Button>
          )}

          {status === 'scanning' && (
            <div className="flex space-x-3">
              <Button onClick={() => simulateResult('success')} className="flex-1 bg-green-600 hover:bg-green-700">
                Simulate Success
              </Button>
              <Button onClick={() => simulateResult('fail')} className="flex-1 bg-red-600 hover:bg-red-700">
                Simulate Failure
              </Button>
            </div>
          )}

          {status === 'fail' && (
            <Button onClick={() => setStatus('idle')} variant="outline" className="text-white border-slate-700">
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
          Secured by ECI Biometric Protocol
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
      `}} />
    </div>
  );
};

export default BLOFaceAuth;
