import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
  onNavigateHome: () => void;
  onNavigateToMode: (mode: 'login' | 'signup') => void;
}

export default function AuthPage({ 
  initialMode = 'login', 
  onAuthSuccess, 
  onNavigateHome,
  onNavigateToMode
}: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Quick fill VIP profile
  const demoVipAccount = {
    firstName: "Yasin Arafat",
    lastName: "Azad",
    email: "yasinarafatazad082@gmail.com",
    phone: "+880 1712-345678",
    street: "12/A Dhanmondi R/A",
    city: "Dhaka",
    postalCode: "1209",
    country: "Bangladesh"
  };

  const handleQuickFill = () => {
    setError(null);
    if (mode === 'login') {
      setEmail(demoVipAccount.email);
      setPassword('vip_password_123');
    } else {
      setFirstName(demoVipAccount.firstName);
      setLastName(demoVipAccount.lastName);
      setEmail(demoVipAccount.email);
      setPhone(demoVipAccount.phone);
      setStreet(demoVipAccount.street);
      setCity(demoVipAccount.city);
      setPostalCode(demoVipAccount.postalCode);
      setCountry(demoVipAccount.country);
      setPassword('vip_password_123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic Validation
    if (!email || !password) {
      setError("Please fill in all security credentials.");
      setLoading(false);
      return;
    }

    if (mode === 'signup' && (!firstName || !lastName || !phone || !street || !city)) {
      setError("Please complete your delivery address and personal specifications.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      
      // Setup the resulting profile
      const finalProfile: UserProfile = mode === 'login' && email.toLowerCase() === demoVipAccount.email.toLowerCase()
        ? demoVipAccount
        : {
            firstName: firstName || email.split('@')[0],
            lastName: lastName || "Member",
            email: email,
            phone: phone || "+880 1700-000000",
            street: street || "Not specified",
            city: city || "Dhaka",
            postalCode: postalCode || "1000",
            country: country || "Bangladesh"
          };

      // Store in LocalStorage
      localStorage.setItem('stylee_user', JSON.stringify(finalProfile));
      
      // Execute trigger
      onAuthSuccess(finalProfile);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1E8] pt-28 pb-16 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none opacity-5 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D90429] blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-zinc-800 blur-[150px]" />
      </div>

      <div className="w-full max-w-xl bg-[#121212] border border-white/5 relative z-10 overflow-hidden shadow-2xl">
        
        {/* Aesthetic top decorative line */}
        <div className="h-[3px] bg-[#D90429] w-full" />

        {/* Content wrapper */}
        <div className="p-8 sm:p-12">
          
          {/* Header info */}
          <div className="mb-8 text-center sm:text-left relative">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3 font-semibold">
              {mode === 'login' ? 'SECURE ACCOUNT ACCESS' : 'VIP ENROLLMENT PROTOCOL'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-serif tracking-tight text-white">
              {mode === 'login' ? 'Member' : 'Create'}{' '}
              <span className="font-extrabold font-sans italic text-[#D90429]">
                {mode === 'login' ? 'Sign In' : 'Account'}
              </span>
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">
              {mode === 'login' 
                ? 'Enter your credentials to access your Stylee archive'
                : 'Register your details to secure elite benefits & orders tracking'
              }
            </p>
          </div>

          {/* Quick Demo Assist banner */}
          <div className="mb-6 bg-zinc-950/80 border border-[#D90429]/30 p-4 rounded-sm flex items-start gap-3">
            <Info className="text-[#D90429] flex-shrink-0 mt-0.5" size={16} />
            <div className="flex-1">
              <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold block">DEMO CONVENIENCE HUB</span>
              <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">
                Want to quickly view the dashboard features? You can use the quick fill option to populate the fields with a valid elite account instantly.
              </p>
              <button
                type="button"
                onClick={handleQuickFill}
                className="mt-2.5 px-3 py-1 bg-[#D90429]/10 hover:bg-[#D90429]/20 text-[#D90429] border border-[#D90429]/20 rounded-sm text-[9px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={10} />
                <span>Quick Fill Elite Demo Account</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 bg-[#D90429]/10 border border-[#D90429]/30 p-4 text-xs font-mono text-[#D90429]">
              ⚠️ ERROR: {error.toUpperCase()}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* If sign up, show names first */}
            {mode === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                    FIRST NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="e.g. Yasin"
                      className="w-full bg-black border border-white/5 py-3 pl-10 pr-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                    LAST NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="e.g. Azad"
                      className="w-full bg-black border border-white/5 py-3 pl-10 pr-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                EMAIL ADDRESS *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. yasinarafatazad082@gmail.com"
                  className="w-full bg-black border border-white/5 py-3 pl-10 pr-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-mono uppercase text-zinc-500">
                  ACCESS KEY / PASSWORD *
                </label>
                {mode === 'login' && (
                  <button 
                    type="button"
                    onClick={() => alert("This is a demo. Please use the quick fill button to instantly login to the pre-seeded account.")}
                    className="text-[9px] font-mono text-zinc-600 hover:text-[#D90429] uppercase"
                  >
                    Forgot key?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-black border border-white/5 py-3 pl-10 pr-12 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Extra Sign Up Address Fields */}
            {mode === 'signup' && (
              <div className="flex flex-col gap-4 mt-1 pt-3 border-t border-white/5">
                <span className="text-[9px] font-mono uppercase text-[#D90429] font-bold tracking-widest block">
                  DELIVERY SPECIFICATIONS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                      PHONE NUMBER *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +880 1712-345678"
                        className="w-full bg-black border border-white/5 py-3 pl-10 pr-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                      STREET ADDRESS *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        placeholder="e.g. 12/A Dhanmondi R/A"
                        className="w-full bg-black border border-white/5 py-3 pl-10 pr-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                      CITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Dhaka"
                      className="w-full bg-black border border-white/5 py-3 px-3 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                      POSTAL *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="1209"
                      className="w-full bg-black border border-white/5 py-3 px-3 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors rounded-none placeholder:text-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-4 bg-[#D90429] hover:bg-[#8B0000] disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer flex items-center justify-center gap-3 border border-[#D90429]"
            >
              {loading ? (
                <span className="animate-pulse">AUTHENTICATING SECURE TERMINAL...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'SECURE CLIENT LOGIN' : 'CONFIRM VIP REGISTRATION'}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            {/* Toggle Mode */}
            <div className="mt-4 text-center border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
              <span>
                {mode === 'login' ? "New to the luxury archive?" : "Already possess an access key?"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const targetMode = mode === 'login' ? 'signup' : 'login';
                  setMode(targetMode);
                  onNavigateToMode(targetMode);
                }}
                className="text-[#D90429] hover:underline uppercase tracking-wider font-bold"
              >
                {mode === 'login' ? "[ REGISTER NEW ACCOUNT ]" : "[ SIGN IN MEMBER ]"}
              </button>
            </div>

          </form>

        </div>

        {/* Security Stamp Footer */}
        <div className="bg-black/50 border-t border-white/5 p-4 text-center text-[9px] font-mono text-zinc-600 uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>SSL 256-BIT ENCRYPTED CLIENT GATEWAY</span>
        </div>

      </div>
    </div>
  );
}
