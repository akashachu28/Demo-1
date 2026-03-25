import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import renuityLogo from '../assets/renuityLogo.svg';
import backgroundImg from '../assets/bgAS.avif';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'contractor') {
        navigate('/contractors/register', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate credential validation
      if (email && password) {
        // Show OTP modal instead of logging in directly
        setShowOtpModal(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const otpValue = otp.join('');
      
      // For demo purposes, accept any 6-digit OTP
      if (otpValue.length === 6) {
        // Now actually log in
        const success = await login(email, password);
        if (success) {
          // Navigation will be handled by useEffect
        } else {
          setOtpError('Login failed. Please try again.');
        }
      } else {
        setOtpError('Please enter a valid 6-digit OTP.');
      }
    } catch (err) {
      setOtpError('Verification failed. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleCancelOtp = () => {
    setShowOtpModal(false);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-left"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: ' cover',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 20%, black 60%)',
          maskImage: 'linear-gradient(180deg, transparent 20%, black 60%)'
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/80 via-white/70 to-[#cdf7ff60]"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e0f2fe%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Login Card - Hidden when OTP modal is shown */}
        {!showOtpModal && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className=" px-8 py-10 text-center">
            <div className="mb-6">
              <img 
                src={renuityLogo} 
                alt="Renuity Logo" 
                className="h-12 mx-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Sign in to your compliance dashboard
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36b0c9] focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36b0c9] focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#36b0c9] to-[#003057] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#2a9bb5] hover:to-[#002a4a] focus:outline-none focus:ring-2 focus:ring-[#36b0c9] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p><span className="font-medium">Username:</span> admin</p>
                <p><span className="font-medium">Password:</span> admin@123</p>
              </div>
            </div> */}
          </div>
        </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md mx-4 relative">

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#36b0c9]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit code to your registered device
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36b0c9] focus:border-transparent transition-colors"
                  />
                ))}
              </div>

              {/* Error Message */}
              {otpError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{otpError}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || otp.some(d => !d)}
                  className="w-full bg-gradient-to-r from-[#36b0c9] to-[#003057] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#2a9bb5] hover:to-[#002a4a] focus:outline-none focus:ring-2 focus:ring-[#36b0c9] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifyingOtp ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>

                <button
                  onClick={handleCancelOtp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {/* <ArrowLeft className="w-4 h-4" /> */}
                  cancel
                </button>
              </div>

              {/* Resend OTP */}
              <div className="text-center font-thin mt-4">
                <button>
                  Haven't recieved an OTP? <span className="text-sm text-[#36b0c9] hover:text-[#2a9bb5] font-medium">Resend OTP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}