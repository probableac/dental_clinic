/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, ComfortPreferences, Appointment } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { TreatmentsView } from './components/TreatmentsView';
import { BookingView } from './components/BookingView';
import { InsuranceView } from './components/InsuranceView';
import { PortalView } from './components/PortalView';
import { ComfortModal } from './components/ComfortModal';
import { EmergencyModal } from './components/EmergencyModal';
import { MapModal } from './components/MapModal';

const DEFAULT_PREFERENCES: ComfortPreferences = {
  aromatherapy: 'French Lavender',
  weightedBlanket: '12-lb Plush',
  audioStreaming: 'Bose QuietComfort + Spotify Calm',
  handRaiseAgreement: true,
  organicTea: 'Organic Tulsi Chamomile',
  numbingPreference: 'The Wand® Computer Numbing',
  anxietyScore: 2
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'SRN-NOIDA-829104',
    patientName: 'Pooja Verma',
    patientEmail: 'pooja.verma@example.in',
    patientPhone: '+91 98112 34567',
    treatmentId: 'preventative-cleaning',
    treatmentName: 'Preventative Ultrasonic Care & Airflow Polishing',
    dentist: 'Dr. Anjali Bhardwaj, BDS, MDS',
    date: '2026-10-18',
    timeSlot: '11:00 AM',
    comfortPreferences: {
      ...DEFAULT_PREFERENCES,
      aromatherapy: 'French Lavender',
      weightedBlanket: '12-lb Plush',
      audioStreaming: 'Ceiling Screen: Planet Earth / Nature',
      organicTea: 'Organic Tulsi Chamomile',
      specialNotes: 'Prefers warm water ultrasonic tip and extra gentle gum check'
    },
    status: 'Confirmed',
    createdAt: '2026-10-01T09:30:00Z'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [bookingTreatmentId, setBookingTreatmentId] = useState<string | undefined>(undefined);

  // Modals
  const [isComfortModalOpen, setIsComfortModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // User State
  const [preferences, setPreferences] = useState<ComfortPreferences>(() => {
    try {
      const saved = localStorage.getItem('serene_comfort_prefs');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('serene_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('serene_comfort_prefs', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Could not store preferences in localStorage', e);
    }
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem('serene_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('Could not store appointments in localStorage', e);
    }
  }, [appointments]);

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (treatmentId?: string) => {
    if (treatmentId) {
      setBookingTreatmentId(treatmentId);
    }
    setActiveTab('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentBooked = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c20] flex flex-col font-['Inter',sans-serif]">
      {/* Header with Navigation and Branding */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="w-full pt-20 flex-grow min-h-screen">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenComfortMenu={() => setIsComfortModalOpen(true)}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            onOpenMap={() => setIsMapModalOpen(true)}
          />
        )}

        {activeTab === 'treatments-and-services' && (
          <TreatmentsView
            onBookTreatment={handleOpenBooking}
            onOpenComfortMenu={() => setIsComfortModalOpen(true)}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'book-appointment' && (
          <BookingView
            initialTreatmentId={bookingTreatmentId}
            defaultPreferences={preferences}
            onAppointmentBooked={handleAppointmentBooked}
            onNavigateToPortal={() => handleNavigate('patient-portal')}
          />
        )}

        {activeTab === 'insurance-and-resources' && (
          <InsuranceView
            onOpenBooking={() => handleOpenBooking()}
            onOpenComfortMenu={() => setIsComfortModalOpen(true)}
          />
        )}

        {activeTab === 'patient-portal' && (
          <PortalView
            appointments={appointments}
            preferences={preferences}
            onUpdatePreferences={(newPrefs) => setPreferences(newPrefs)}
            onCancelAppointment={handleCancelAppointment}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Floating Quick Sensory Tray & Emergency Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
        <button
          onClick={() => setIsComfortModalOpen(true)}
          className="bg-white/95 backdrop-blur-md text-[#0f5238] border border-[#0f5238]/30 px-3.5 py-2 rounded-full shadow-lg hover:bg-[#92f7c3]/30 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95 group"
          title="Customize Sensory Comfort Tray"
        >
          <span className="material-symbols-outlined text-[18px] text-[#006c48]">spa</span>
          <span className="hidden sm:inline">Sensory Comfort Tray</span>
        </button>

        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="bg-[#ba1a1a] text-white px-3.5 py-2 rounded-full shadow-xl hover:bg-[#93000a] transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95"
          title="24/7 Dental Emergency Care"
        >
          <span className="material-symbols-outlined text-[18px]">emergency</span>
          <span className="hidden sm:inline">24/7 Emergency Line</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMap={() => setIsMapModalOpen(true)}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ComfortModal
        isOpen={isComfortModalOpen}
        onClose={() => setIsComfortModalOpen(false)}
        preferences={preferences}
        onSavePreferences={(newPrefs) => setPreferences(newPrefs)}
        onProceedToBooking={() => handleOpenBooking()}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onBookEmergencySlot={() => handleOpenBooking('emergency-pain-relief')}
      />

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />
    </div>
  );
}
