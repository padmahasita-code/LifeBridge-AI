import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileCheck,
  FileText,
  Filter,
  Heart,
  HeartHandshake,
  Info,
  KeyRound,
  Languages,
  Layers,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Plus,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Wifi,
  Wrench,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  image: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  languages: string[];
  availability: string;
  npiNumber: string;
  bio: string;
  badges: string[];
}

export const LandingPage: React.FC = () => {
  const { setPage, setCareSubPage, showToast, loginWithCredentials } = useApp();

  // Architecture tabs state
  const [activeArchTab, setActiveArchTab] = useState<'frontend' | 'backend'>('frontend');

  // Photo gallery filter & lightbox state
  const [photoFilter, setPhotoFilter] = useState<'all' | 'doctors' | 'family' | 'tech'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    title: string;
    category: string;
    description: string;
    badge: string;
  } | null>(null);

  // Doctors Join modal state
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorModalStep, setDoctorModalStep] = useState<1 | 2 | 3>(1);
  const [isVerifyingDoctor, setIsVerifyingDoctor] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    npi: '',
    specialty: 'Internal Medicine',
    hospital: '',
    yearsExp: '5-10 years',
    consultType: 'telehealth',
    languages: 'English, Spanish',
    acceptTerms: true,
  });

  // Doctor Consult Booking / Profile preview modal state
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);

  // Doctor roster data with high quality portraits
  const doctorList: DoctorProfile[] = [
    {
      id: 'doc-chen',
      name: 'Dr. Sarah Chen, MD',
      title: 'Attending Physician & Clinical Director',
      specialty: 'Internal Medicine & Geriatrics',
      hospital: "St. Jude's Health & Medical Center",
      image: APP_IMAGES.doctorDrSarah,
      rating: 4.95,
      reviewsCount: 142,
      experienceYears: 14,
      languages: ['English', 'Mandarin'],
      availability: 'Available Today · 2 Slots Open',
      npiNumber: 'NPI #1849204912',
      bio: 'Specializing in chronic disease management, elderly patient medication reviews, and family-centered preventive care.',
      badges: ['Board Certified', 'Top Rated 2026', 'CareCircle Verified'],
    },
    {
      id: 'doc-vance',
      name: 'Dr. Marcus Vance, MD',
      title: 'Chief of Telehealth & Associate Professor',
      specialty: 'Cardiovascular Care & Preventive Medicine',
      hospital: 'Metro Heart & Vascular Institute',
      image: APP_IMAGES.doctorDrMarcus,
      rating: 4.98,
      reviewsCount: 189,
      experienceYears: 16,
      languages: ['English', 'Spanish'],
      availability: 'Accepting Telehealth Consults',
      npiNumber: 'NPI #1938501234',
      bio: 'Pioneer in continuous biometric monitoring, remote blood pressure management, and post-discharge recovery protocols.',
      badges: ['Fellow ACC', 'Telehealth Pioneer', 'HIPAA Secure'],
    },
    {
      id: 'doc-rao',
      name: 'Dr. Ananya Rao, MD',
      title: 'Senior Family Physician & Geriatric Lead',
      specialty: 'Family Medicine & Multilingual Care',
      hospital: 'University Health Alliance & Eldercare',
      image: APP_IMAGES.doctorDrAnanya,
      rating: 4.93,
      reviewsCount: 128,
      experienceYears: 12,
      languages: ['English', 'Telugu', 'Hindi'],
      availability: 'Available for Family Consults',
      npiNumber: 'NPI #1729482019',
      bio: 'Passionate about bridging cultural nuances in care, empowering family caregivers, and simplifying confusing prescriptions.',
      badges: ['Multilingual Lead', 'Patient Choice 2026', 'CareCircle Mentor'],
    },
  ];

  // Gallery photos
  const photoGallery = [
    {
      src: APP_IMAGES.doctorDrSarah,
      title: 'Dr. Sarah Chen, MD — Internal Medicine',
      category: 'doctors',
      badge: 'Clinician Partner',
      description: 'Reviewing patient biometric trends and medication schedules in her clinical consultation suite.',
    },
    {
      src: APP_IMAGES.lifebridgeAiCare,
      title: 'LifeBridge AI Biometric Family Tablet',
      category: 'family',
      badge: 'Smart Care AI',
      description: 'Grandmother and daughter exploring daily care schedules with glowing vital statistics.',
    },
    {
      src: APP_IMAGES.doctorDrMarcus,
      title: 'Dr. Marcus Vance, MD — Chief of Telehealth',
      category: 'doctors',
      badge: 'Cardiovascular Lead',
      description: 'Conducting real-time remote telemetry review with automatic AI heartbeat waveform analysis.',
    },
    {
      src: APP_IMAGES.lifebridgeAiNeural,
      title: 'Neural Diagnostics & Holographic AI Waveform',
      category: 'tech',
      badge: 'Gemini 3.8 Flash',
      description: 'Clinical grade neural reasoning engine processing complex symptoms and medication interactions.',
    },
    {
      src: APP_IMAGES.doctorDrAnanya,
      title: 'Dr. Ananya Rao, MD — Family & Multilingual Care',
      category: 'doctors',
      badge: 'Trilingual Consults',
      description: 'Bridging eldercare communication across English, Telugu, and Hindi for global families.',
    },
    {
      src: APP_IMAGES.frontendUiDash,
      title: 'Glassmorphic Frontend Dashboard UI',
      category: 'tech',
      badge: 'React 19 + Tailwind',
      description: 'High-contrast, 60 FPS accessible interface designed for both aging seniors and active caregivers.',
    },
    {
      src: APP_IMAGES.backendCloudInfra,
      title: 'Cloud Microservices & High Resilience',
      category: 'tech',
      badge: 'Express + REST APIs',
      description: 'Automated 503 fallback pipeline with multi-model failover for zero clinical downtime.',
    },
    {
      src: APP_IMAGES.familyCarecircleJoy,
      title: 'Multigenerational Family Joy',
      category: 'family',
      badge: 'CareCircle Sync',
      description: 'Peace of mind knowing daily medication routines, meals, and appointments are seamlessly managed.',
    },
  ];

  const filteredPhotos =
    photoFilter === 'all'
      ? photoGallery
      : photoGallery.filter((p) => p.category === photoFilter);

  // Handle doctor registration submission
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorForm.fullName || !doctorForm.email || !doctorForm.npi) {
      showToast('Please fill in required fields: Full Name, Email, and NPI / License.', 'info');
      return;
    }

    setIsVerifyingDoctor(true);
    // Simulate real-time NPI Registry & state licensing verification
    setTimeout(() => {
      setIsVerifyingDoctor(false);
      setVerificationComplete(true);
      setDoctorModalStep(3);
      showToast(`Credentials verified for ${doctorForm.fullName}! Welcome to LifeBridge Clinical Network.`, 'success');
    }, 1800);
  };

  const handleCompleteDoctorOnboarding = () => {
    loginWithCredentials(doctorForm.email, 'verified-doctor-pwd', doctorForm.fullName, 'doctor');
    setShowDoctorModal(false);
    setDoctorModalStep(1);
    setVerificationComplete(false);
    showToast('Signed in to Doctor & Clinician Portal', 'success');
    setPage('dashboard');
  };

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-900 shadow-2xs">
                <Sparkles className="h-4 w-4 text-teal-600 animate-pulse" />
                <span>Next-Gen Family Care AI · Verified Clinician & Doctor Partner Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                Care for your loved ones{' '}
                <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  with total clarity
                </span>
                , doctor trust & warmth.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                LifeBridge AI simplifies complex medical decisions, coordinates family care circles, and connects you directly with top verified physicians—all backed by our intelligent Gemini clinical reasoning engine.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setPage('login')}
                  className="group flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <KeyRound className="h-4 w-4 text-amber-400" />
                  <span>Enter Portal / Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShowDoctorModal(true)}
                  className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-blue-700 transition-all cursor-pointer"
                >
                  <Stethoscope className="h-4 w-4 text-sky-200" />
                  <span>Doctors Join Network</span>
                  <UserPlus className="h-3.5 w-3.5 opacity-80" />
                </button>

                <button
                  onClick={() => setPage('dashboard')}
                  className="group flex items-center gap-2 rounded-2xl bg-teal-600 px-4.5 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-all cursor-pointer"
                >
                  <Activity className="h-4 w-4" />
                  <span>Family Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setCareSubPage('overview');
                    setPage('carecircle');
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3.5 text-sm font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition-all cursor-pointer"
                >
                  <Users className="h-4 w-4 text-amber-700" />
                  <span>CareCircle Hub</span>
                </button>

                <button
                  onClick={() => setPage('chat')}
                  className="flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50/70 px-4 py-3.5 text-sm font-bold text-indigo-900 shadow-xs hover:bg-indigo-100 transition-all cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-indigo-700" />
                  <span>AI Care Chat</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  <span>HIPAA-Compliant & Secure Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                  <span>1,200+ Verified Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-indigo-600" />
                  <span>English · Telugu · Hindi Trilingual</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  <span>Google Gemini 3.8 Flash Powered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 bg-white shadow-2xl shadow-indigo-100/60 group">
                <img
                  src={APP_IMAGES.lifebridgeAiCare}
                  alt="Multigenerational family sharing a joyful care moment with LifeBridge AI tablet"
                  referrerPolicy="no-referrer"
                  className="w-full h-[410px] sm:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 rounded-full border border-white/60 bg-white/95 px-3 py-1 text-xs font-bold text-teal-800 backdrop-blur-md shadow-md flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>CareCircle Active · Doctors & Family in Sync</span>
                </div>

                {/* Floating doctor consult chip */}
                <div className="absolute top-4 right-4 rounded-full border border-indigo-200 bg-indigo-900/90 text-white px-3 py-1 text-xs font-bold backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5 text-sky-300" />
                  <span>Dr. Sarah Chen, MD Online</span>
                </div>

                {/* Floating overlay card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/95 p-4 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                      <HeartHandshake className="h-3.5 w-3.5 text-indigo-600" /> LifeBridge Care Rhythm
                    </span>
                    <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      Vitals Stabilized (122/78)
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    “Morning medication taken with water. Hydration logged. Dr. Sarah Chen reviewed vitals and sent encouragement note to the family circle.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOCTORS & CLINICIANS NETWORK: "DOCTORS JOIN" SECTION */}
      <section id="doctors-section" className="py-16 bg-gradient-to-b from-indigo-50/50 via-white to-sky-50/40 border-y border-indigo-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/70 px-3.5 py-1 text-xs font-bold text-indigo-900 mb-3">
                <Stethoscope className="h-3.5 w-3.5 text-indigo-700" />
                <span>LifeBridge Clinical Network · For Physicians & Medical Specialists</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Doctors & Clinicians:{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
                  Join Our Connected Care Network
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Partner with LifeBridge AI to deliver proactive, high-touch eldercare. Receive AI-triaged patient summaries, streamline tele-consults, and collaborate with designated family caregivers seamlessly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowDoctorModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                <span>Apply to Join Network</span>
              </button>
              <button
                onClick={() => setPage('login')}
                className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <KeyRound className="h-4 w-4 text-slate-500" />
                <span>Doctor Portal Login</span>
              </button>
            </div>
          </div>

          {/* Key Benefits Grid for Doctors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 mb-3.5">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Pre-Visit AI Summaries</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Save up to 45 mins/day on EHR chart reviews with automatically consolidated vitals, symptom logs, and medication adherence.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-600 mb-3.5">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Flexible Telehealth</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Set custom hours for remote video consults, second opinions, or asynchronous care plan co-signatures on your schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-600 mb-3.5">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Verified Doctor Badge</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Instantly verified via NPI registry and state licensing boards, earning high trust with families seeking care.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 mb-3.5">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Direct CareCircle Link</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Communicate directly with authorized adult children and family caregivers without messy phone tags or missed messages.
              </p>
            </div>
          </div>

          {/* Featured Doctors Roster Cards with Real Photos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Meet Our Verified Physician Partners</h3>
                <p className="text-xs text-slate-500">Board-certified doctors actively collaborating with LifeBridge AI CareCircles</p>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                All 3 Accepting New Consults
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctorList.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {doc.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 shadow-xs backdrop-blur-xs flex items-center gap-1"
                        >
                          <Check className="h-2.5 w-2.5 text-teal-600" /> {b}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-0.5">
                        <Star className="h-3.5 w-3.5 fill-amber-300" />
                        <span>{doc.rating}</span>
                        <span className="text-white/80 font-normal">({doc.reviewsCount} reviews)</span>
                      </div>
                      <h4 className="text-base font-bold tracking-tight text-white">{doc.name}</h4>
                      <p className="text-xs text-slate-200">{doc.specialty}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{doc.hospital}</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {doc.bio}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {doc.languages.map((lang, lIdx) => (
                          <span
                            key={lIdx}
                            className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {lang}
                          </span>
                        ))}
                        <span className="bg-teal-50 text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {doc.experienceYears}+ Yrs Exp
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedDoctor(doc)}
                        className="flex-1 rounded-xl bg-indigo-50 border border-indigo-200 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer text-center"
                      >
                        Doctor Profile & Slots
                      </button>
                      <button
                        onClick={() => {
                          setPage('dashboard');
                          showToast(`Connecting with ${doc.name} via Care Dashboard...`, 'info');
                        }}
                        className="rounded-xl bg-slate-900 p-2.5 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Book Telehealth Consult"
                      >
                        <Video className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGH-FIDELITY PHOTO SHOWCASE GALLERY */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Visual Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5">
                LifeBridge AI in Action: Transforming Modern Eldercare
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore real photography of our caring physician partners, family CareCircles, and neural health technology.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Photos' },
                { key: 'doctors', label: 'Doctors & Clinicians' },
                { key: 'family', label: 'Family Care' },
                { key: 'tech', label: 'Tech & Architecture' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setPhotoFilter(f.key as any)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    photoFilter === f.key
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                <span className="absolute top-3 left-3 rounded-md bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 backdrop-blur-xs">
                  {photo.badge}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-xs font-bold text-white leading-snug group-hover:text-teal-300 transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FULL-STACK ARCHITECTURE SHOWCASE: FRONT-END & BACK-END */}
      <section className="py-16 bg-[#F8F9FA] border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 rounded-full">
              Full-Stack Architecture & High Availability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3.5">
              Engineered with Front-End Elegance & Back-End Resilience
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A robust dual-tier architecture pairing an intuitive, accessible React frontend with an Express/Node.js backend featuring automatic Gemini multi-model fallback.
            </p>

            {/* Toggle Pills */}
            <div className="inline-flex rounded-2xl bg-slate-200/80 p-1 mt-6 border border-slate-300/60 shadow-inner">
              <button
                onClick={() => setActiveArchTab('frontend')}
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeArchTab === 'frontend'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Front-End Experience (React 19 + Tailwind)</span>
              </button>
              <button
                onClick={() => setActiveArchTab('backend')}
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeArchTab === 'backend'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Server className="h-3.5 w-3.5" />
                <span>Back-End Cloud & AI (Express + Gemini)</span>
              </button>
            </div>
          </div>

          {/* Front-End Tab Content */}
          {activeArchTab === 'frontend' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
                  <img
                    src={APP_IMAGES.frontendUiDash}
                    alt="LifeBridge AI modern frontend dashboard on tablet and laptop"
                    referrerPolicy="no-referrer"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-md">
                      <Layers className="h-3.5 w-3.5 text-sky-400" /> Responsive React UI · Tablet & Desktop
                    </span>
                    <span className="bg-emerald-500/90 text-white font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                      60 FPS Smooth Glassmorphism
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-indigo-700 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200">
                      <Layers className="h-4 w-4" />
                    </div>
                    <span>Glassmorphic Multi-Device Interface</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Custom built for elderly adults and family caregivers alike with generous click targets, calm pastel tones, and high-contrast typography.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-sky-700 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 border border-sky-200">
                      <Activity className="h-4 w-4" />
                    </div>
                    <span>Real-Time Vital Waveforms & Trends</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interactive charts for systolic/diastolic blood pressure, pulse, SpO2 levels, and daily medication adherence logging.
                  </p>
                </div>

                <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-teal-700 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 border border-teal-200">
                      <Languages className="h-4 w-4" />
                    </div>
                    <span>Trilingual Care Navigation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instant toggling across English, Telugu, and Hindi so elders and multilingual relatives can read reminders comfortably.
                  </p>
                </div>

                <button
                  onClick={() => setPage('dashboard')}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <span>Experience Frontend Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Back-End Tab Content */}
          {activeArchTab === 'backend' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
                  <img
                    src={APP_IMAGES.backendCloudInfra}
                    alt="LifeBridge AI cloud backend microservices and neural intelligence"
                    referrerPolicy="no-referrer"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-md">
                      <Server className="h-3.5 w-3.5 text-emerald-400" /> Express.js + Node.js Cloud Engine
                    </span>
                    <span className="bg-teal-500/90 text-white font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                      99.9% Upstream Resilience
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-teal-700 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 border border-teal-200">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <span>Multi-Model Gemini Fallback Pipeline</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automatic failover routing: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">gemini-3.8-flash</code> &rarr; <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">gemini-3-flash-preview</code> &rarr; <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">gemini-3.1-flash-lite</code> prevents any 503 high-demand dropouts.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-emerald-700 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200">
                      <Database className="h-4 w-4" />
                    </div>
                    <span>Encrypted Care Storage & HIPAA-Aware</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero third-party tracking, strict medical disclaimers, and encrypted client-side caching ensures family health records stay private.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3 text-slate-800 font-bold text-sm mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                      <Wifi className="h-4 w-4" />
                    </div>
                    <span>REST API Endpoints & Health Check</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated backend routes: <code className="font-mono text-[11px] text-teal-700">/api/gemini/chat</code>, <code className="font-mono text-[11px] text-teal-700">/api/gemini/tool</code>, and <code className="font-mono text-[11px] text-teal-700">/api/health</code> with sub-second response times.
                  </p>
                </div>

                <button
                  onClick={() => setPage('chat')}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  <span>Test Live AI Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. QUICK ACCESS FEATURE BENTO-GRID */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full">
              Integrated Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Everything you need to move from confusion to calm
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Thoughtfully architected to handle everyday healthcare complexity without emotional or cognitive overload.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AI Chat Assistant */}
            <div className="group rounded-3xl border border-indigo-100 bg-white p-5 flex flex-col justify-between hover:shadow-lg hover:border-indigo-300 transition-all shadow-xs">
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-indigo-50">
                  <img
                    src={APP_IMAGES.digitalHealthCare}
                    alt="Digital healthcare consultation"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/90 text-white backdrop-blur-xs shadow-sm">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-slate-900/75 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white">
                    Live Gemini
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  AI Care Chat Assistant
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  Ask questions anytime regarding medication schedules, eldercare routines, doctor visit prep, and emotional respite tips.
                </p>
              </div>
              <button
                onClick={() => setPage('chat')}
                className="mt-5 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Chat with AI</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: CareCircle Family Hub */}
            <div className="group rounded-3xl border border-amber-200/80 bg-white p-5 flex flex-col justify-between hover:shadow-lg hover:border-amber-400 transition-all shadow-xs">
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-amber-50">
                  <img
                    src={APP_IMAGES.familyCareJoy}
                    alt="Multigenerational family in CareCircle"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/90 text-white backdrop-blur-xs shadow-sm">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-slate-900/75 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white">
                    4 Members Active
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  CareCircle Family Hub
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  Shared family calendar, daily task checklist, emotional check-ins, grocery lists, and gentle care routines all in one place.
                </p>
              </div>
              <button
                onClick={() => {
                  setCareSubPage('overview');
                  setPage('carecircle');
                }}
                className="mt-5 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Open Family Hub</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: Telehealth & Clinical Consultation */}
            <div className="group rounded-3xl border border-teal-200/80 bg-white p-5 flex flex-col justify-between hover:shadow-lg hover:border-teal-400 transition-all shadow-xs">
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-teal-50">
                  <img
                    src={APP_IMAGES.doctorConsultation}
                    alt="Telehealth physician consultation"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600/90 text-white backdrop-blur-xs shadow-sm">
                    <Video className="h-4 w-4" />
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-slate-900/75 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white">
                    Clinical Link
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Telehealth & Clinical Visits
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  Connect family members with treating physicians, prep questions with Gemini AI, and summarize clinical visit notes instantly.
                </p>
              </div>
              <button
                onClick={() => setPage('dashboard')}
                className="mt-5 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>View Care Team</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE CLINICAL PAPERWORK & ACTION PLAN PREVIEW */}
      <section className="py-16 bg-[#FAF9F6] border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                Real Clinical Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                Decipher medical paperwork and coordinate family care effortlessly
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Whether you received a confusing insurance letter, need a structured daily medicine chart, or want to divide weekend duties with siblings, LifeBridge AI provides instant, reliable solutions.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Automatic 503 high-demand resilience with Google Gemini model fallbacks',
                  'Translate doctor prescriptions into Telugu, Hindi, Spanish, or plain English',
                  'One-click convert AI suggestions into executable CareCircle family tasks',
                  'Track blood pressure, heart rate, and daily care log trends',
                  'Direct messaging channel connecting family caregivers to verified doctors',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setPage('create')}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Create Custom Action Plan
                </button>
                <button
                  onClick={() => setPage('explain')}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Explain Medical Document
                </button>
                <button
                  onClick={() => setPage('dashboard')}
                  className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  View Healthcare Dashboard
                </button>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-teal-400" />
                  <span className="text-xs font-bold text-slate-700 ml-2">Sample Daily Care Plan</span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                  Doctor Approved
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl bg-teal-50/60 border border-teal-100 p-3 flex items-start gap-3">
                  <Pill className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">8:30 AM — Lisinopril 20mg & Light Breakfast</h4>
                    <p className="text-[11px] text-slate-600">Assigned to Dad. Take with a full glass of water.</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-sky-50/60 border border-sky-100 p-3 flex items-start gap-3">
                  <Activity className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">1:00 PM — Hydration & Blood Pressure Check</h4>
                    <p className="text-[11px] text-slate-600">Target systolic: 120–135 mmHg. Record in Care Journal.</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-3 flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">4:00 PM — 20-Min Garden Walk & Gentle Respite</h4>
                    <p className="text-[11px] text-slate-600">Coordinated with Priya for caregiver respite pause.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Caregiver stress reduction score: <strong>94%</strong></span>
                <button
                  onClick={() => setPage('dashboard')}
                  className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Manage in Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DOCTOR APPLICATION / JOIN MODAL */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => {
                  setShowDoctorModal(false);
                  setDoctorModalStep(1);
                  setVerificationComplete(false);
                }}
                className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Stethoscope className="h-4 w-4" />
                <span>LifeBridge Clinical Partner Program</span>
              </div>
              <h3 className="text-2xl font-black">Doctor & Clinician Enrollment</h3>
              <p className="text-xs text-slate-300 mt-1">
                Join our network to receive pre-triaged patient vitals, expand telehealth reach, and co-manage family care plans.
              </p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4 text-xs font-semibold">
                <span className={`px-2.5 py-1 rounded-full ${doctorModalStep >= 1 ? 'bg-indigo-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  1. Credentials
                </span>
                <span className="text-white/40">&rarr;</span>
                <span className={`px-2.5 py-1 rounded-full ${doctorModalStep >= 2 ? 'bg-indigo-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  2. Practice Settings
                </span>
                <span className="text-white/40">&rarr;</span>
                <span className={`px-2.5 py-1 rounded-full ${doctorModalStep === 3 ? 'bg-teal-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  3. Verification
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {doctorModalStep === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!doctorForm.fullName || !doctorForm.email || !doctorForm.npi) {
                      showToast('Please provide your Full Name, Email, and NPI / License.', 'info');
                      return;
                    }
                    setDoctorModalStep(2);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name & Credentials *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.fullName}
                        onChange={(e) => setDoctorForm({ ...doctorForm, fullName: e.target.value })}
                        placeholder="e.g. Dr. Jennifer Adams, MD"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Medical License or NPI # *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.npi}
                        onChange={(e) => setDoctorForm({ ...doctorForm, npi: e.target.value })}
                        placeholder="e.g. 10-digit NPI #1982736450"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        placeholder="doctor@hospital.org"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Direct Phone / Pager
                      </label>
                      <input
                        type="tel"
                        value={doctorForm.phone}
                        onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Specialty
                      </label>
                      <select
                        value={doctorForm.specialty}
                        onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Internal Medicine">Internal Medicine</option>
                        <option value="Geriatric Medicine">Geriatric Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Family Practice">Family Practice</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Palliative & Hospice Care">Palliative & Hospice Care</option>
                        <option value="Nurse Practitioner / PA">Nurse Practitioner / PA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Hospital or Health System Affiliation
                      </label>
                      <input
                        type="text"
                        value={doctorForm.hospital}
                        onChange={(e) => setDoctorForm({ ...doctorForm, hospital: e.target.value })}
                        placeholder="e.g. Stanford Health / Mayo Clinic"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowDoctorModal(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
                    >
                      Next: Practice Settings &rarr;
                    </button>
                  </div>
                </form>
              )}

              {doctorModalStep === 2 && (
                <form onSubmit={handleDoctorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Years in Active Clinical Practice
                    </label>
                    <select
                      value={doctorForm.yearsExp}
                      onChange={(e) => setDoctorForm({ ...doctorForm, yearsExp: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="1-3 years">1-3 years (Junior Attending / Fellow)</option>
                      <option value="4-7 years">4-7 years (Mid-career Physician)</option>
                      <option value="8-15 years">8-15 years (Experienced Specialist)</option>
                      <option value="15+ years">15+ years (Senior Clinician / Chief)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Consultation Models
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input
                          type="radio"
                          name="consultType"
                          checked={doctorForm.consultType === 'telehealth'}
                          onChange={() => setDoctorForm({ ...doctorForm, consultType: 'telehealth' })}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-semibold text-slate-800">Telehealth & Remote Vitals</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input
                          type="radio"
                          name="consultType"
                          checked={doctorForm.consultType === 'hybrid'}
                          onChange={() => setDoctorForm({ ...doctorForm, consultType: 'hybrid' })}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-semibold text-slate-800">Hybrid (In-Clinic & Virtual)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Consultation Languages
                    </label>
                    <input
                      type="text"
                      value={doctorForm.languages}
                      onChange={(e) => setDoctorForm({ ...doctorForm, languages: e.target.value })}
                      placeholder="e.g. English, Telugu, Hindi, Spanish"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">LifeBridge AI provides real-time prescription and note translation.</p>
                  </div>

                  <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3.5 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-700 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-indigo-900 space-y-1">
                      <p className="font-bold">Automated Credential Verification</p>
                      <p>
                        By clicking Submit, your NPI and state medical license will be instantly queried against the National Plan & Provider Enumeration System (NPPES).
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setDoctorModalStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      disabled={isVerifyingDoctor}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 text-xs font-bold text-white hover:opacity-90 shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      {isVerifyingDoctor ? (
                        <>
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Verifying NPI Registry...</span>
                        </>
                      ) : (
                        <>
                          <BadgeCheck className="h-4 w-4" />
                          <span>Submit & Verify Credentials</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {doctorModalStep === 3 && verificationComplete && (
                <div className="text-center py-6 space-y-5 animate-fadeIn">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      <BadgeCheck className="h-3.5 w-3.5" /> NPI Verified: Active & In Good Standing
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-2">
                      Welcome, {doctorForm.fullName || 'Doctor'}!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                      Your physician partner credentials have been authorized. You have been assigned Clinical Partner ID{' '}
                      <span className="font-mono font-bold text-indigo-700">DOC-8942-VERIFIED</span>.
                    </p>
                  </div>

                  {/* Issued Badge Preview */}
                  <div className="max-w-md mx-auto rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-teal-50 p-4 text-left shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-sm font-bold text-slate-900">{doctorForm.fullName}</h5>
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                        </div>
                        <p className="text-xs text-indigo-700 font-semibold">{doctorForm.specialty}</p>
                        <p className="text-[11px] text-slate-500">{doctorForm.hospital || 'LifeBridge Clinical Affiliate'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleCompleteDoctorOnboarding}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Enter Doctor Portal & Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowDoctorModal(false);
                        setDoctorModalStep(1);
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. DOCTOR PROFILE & CONSULT MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 z-10 text-white bg-slate-900/60 hover:bg-slate-900 p-1.5 rounded-full backdrop-blur-xs transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-56 bg-slate-900">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                  <Star className="h-4 w-4 fill-amber-300" />
                  <span>{selectedDoctor.rating}</span>
                  <span className="text-white/80">({selectedDoctor.reviewsCount} patient reviews)</span>
                </div>
                <h3 className="text-xl font-black">{selectedDoctor.name}</h3>
                <p className="text-xs text-sky-300">{selectedDoctor.title}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                <span className="text-slate-500 font-medium">Affiliation:</span>
                <span className="font-bold text-slate-800">{selectedDoctor.hospital}</span>
              </div>

              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                <span className="text-slate-500 font-medium">NPI Credential:</span>
                <span className="font-mono font-bold text-teal-700">{selectedDoctor.npiNumber}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Clinical Background</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Available Consultation Times Today</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      showToast(`Consult slot confirmed with ${selectedDoctor.name} at 2:30 PM`, 'success');
                      setSelectedDoctor(null);
                      setPage('dashboard');
                    }}
                    className="p-2.5 rounded-xl border border-teal-200 bg-teal-50 text-teal-900 font-bold hover:bg-teal-100 text-center transition-colors cursor-pointer"
                  >
                    Today · 2:30 PM (Video)
                  </button>
                  <button
                    onClick={() => {
                      showToast(`Consult slot confirmed with ${selectedDoctor.name} at 4:15 PM`, 'success');
                      setSelectedDoctor(null);
                      setPage('dashboard');
                    }}
                    className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-900 font-bold hover:bg-indigo-100 text-center transition-colors cursor-pointer"
                  >
                    Today · 4:15 PM (Video)
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    setPage('dashboard');
                    showToast(`Direct message thread opened with ${selectedDoctor.name}`, 'success');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
                >
                  Message in CareCircle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/90 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  {selectedPhoto.badge}
                </span>
                <span className="text-xs text-slate-400 capitalize">Category: {selectedPhoto.category}</span>
              </div>
              <h3 className="text-lg font-bold">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
