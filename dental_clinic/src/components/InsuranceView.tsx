import React, { useState } from 'react';

interface InsuranceViewProps {
  onOpenBooking: () => void;
  onOpenComfortMenu: () => void;
}

export const InsuranceView: React.FC<InsuranceViewProps> = ({
  onOpenBooking,
  onOpenComfortMenu
}) => {
  const [insuranceQuery, setInsuranceQuery] = useState('');
  const [checkedPlan, setCheckedPlan] = useState<{ name: string; status: string; note: string } | null>(null);

  const supportedInsurers = [
    { name: 'Star Health & Allied Insurance', status: 'Cashless Tie-Up / Direct Claim', note: 'Accidental & out-patient dental benefits supported with instant digital reimbursement paperwork' },
    { name: 'HDFC ERGO General Insurance', status: 'Cashless / Corporate Network', note: 'Outpatient dental checkups and diagnostic x-rays processed seamlessly' },
    { name: 'ICICI Lombard Health Care', status: 'Direct TPA Partner', note: 'Cashless dental opd claims and corporate employer wellness benefits accepted' },
    { name: 'Care Health Insurance (Religare)', status: 'Approved Network', note: 'Dental OPD coverage honored with itemized DCI invoices' },
    { name: 'Niva Bupa Health Insurance', status: 'Corporate Cashless', note: 'Direct OPD dental claims & emergency trauma stabilization' },
    { name: 'Bajaj Allianz General Insurance', status: 'Direct Partner', note: 'Comprehensive dental OPD reimbursement claim assist provided' },
    { name: 'Medi Assist TPA', status: 'Empanelled TPA', note: 'Direct cashless desk assistance for IT/Corporate employees across Noida & Gurugram' },
    { name: 'Vidal Health / Paramount TPA', status: 'Empanelled TPA', note: 'Hassle-free pre-authorization for corporate policyholders' }
  ];

  const handleCheckInsurance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!insuranceQuery) return;
    const found = supportedInsurers.find((ins) => 
      ins.name.toLowerCase().includes(insuranceQuery.toLowerCase())
    );
    if (found) {
      setCheckedPlan(found);
    } else {
      setCheckedPlan({
        name: insuranceQuery,
        status: 'Reimbursement Supported (Standard DCI Invoicing)',
        note: 'We furnish detailed DCI-compliant medical summaries, digital RVG x-rays, and itemized GST tax invoices for 100% claim submission to any Indian insurer.'
      });
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'I haven’t visited a dentist in 5 to 10 years. Will I be judged or scolded?',
      a: 'Never. Dr. Anjali Bhardwaj founded Serene Dental Studio in Noida specifically to abolish dental shame and fear. We view your decision to seek care as an act of immense courage. We do not judge, we do not lecture, and we work completely at your pace.'
    },
    {
      q: 'What is the "Zero-Panic Hand-Raise Guarantee"?',
      a: 'Before we begin any procedure, Dr. Anjali establishes a clear physical signal: whenever you raise your hand or finger, our clinical team pauses instantly within 2 seconds. No questions asked. You can take a breath, drink herbal tea, or recalibrate.'
    },
    {
      q: 'How does The Wand® computerized needle-free numbing work?',
      a: 'Traditional injections sting because liquid anesthetic is manually forced in too fast. The Wand uses a micro-sensor to deliver anesthetic at a steady, microscopic flow rate ahead of the needle. You feel zero stinging pinch, and it numbs only the targeted tooth without numbing your cheek or lip.'
    },
    {
      q: 'Does dental insurance in India cover general treatments?',
      a: 'Most standard health insurance in India covers dental only if related to hospitalization, trauma, or through corporate OPD wellness riders. For comprehensive routine and restorative dentistry, 60%+ of our Noida patients use our in-house Serene Club Membership (₹3,999/yr) or 0% Interest EMI via Bajaj Finserv / Credit Cards.'
    },
    {
      q: 'Are your clinic practices compliant with Indian healthcare regulations?',
      a: 'Yes, 100%. Serene Dental Studio is registered under the UP Clinical Establishments Act and Dental Council of India (DCI). We follow strict Class-B Autoclave 6-tier sterilization, Bio-Medical Waste Management Rules (Barcoded segregation), and Digital Personal Data Protection (DPDP) Act 2023 privacy.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Page Title */}
      <div className="bg-[#ffffff] rounded-3xl p-8 md:p-12 shadow-sm border border-[#e5e8ee]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#92f7c3]/50 text-[#00734d] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Transparent Indian Pricing &amp; DCI Standards</span>
          </div>
          <h1 className="text-[32px] md:text-[44px] font-bold text-[#181c20] tracking-tight font-['Plus_Jakarta_Sans'] leading-tight mb-3">
            Insurance, Corporate TPA &amp; Anxiety Protocol
          </h1>
          <p className="text-[16px] text-[#404943] leading-relaxed">
            Financial clarity is fundamental to calm dental care. We provide printed itemized estimates in ₹ INR before beginning any procedure, and support cashless insurance TPAs, UPI, and 0% EMI.
          </p>
        </div>
      </div>

      {/* Insurance & TPA Checker */}
      <section className="bg-[#f1f4f9] rounded-3xl p-8 md:p-12 border border-[#e5e8ee]">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-bold text-[#0f5238] uppercase tracking-wider">Instant Verification</span>
          <h2 className="text-[28px] font-bold text-[#181c20] font-['Plus_Jakarta_Sans'] mt-1 mb-2">
            Indian Health Insurance &amp; Corporate TPA Checker
          </h2>
          <p className="text-sm text-[#404943]">
            Type your health insurance provider or corporate TPA to check coverage assistance.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleCheckInsurance} className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707973] text-[20px]">
                credit_card
              </span>
              <input
                type="text"
                value={insuranceQuery}
                onChange={(e) => setInsuranceQuery(e.target.value)}
                placeholder="e.g. Star Health, HDFC ERGO, ICICI Lombard, Medi Assist..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#bfc9c1]/80 rounded-xl text-sm text-[#181c20] focus:ring-2 focus:ring-[#0f5238] focus:outline-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2d6a4f] hover:bg-[#0f5238] text-white text-sm font-bold rounded-xl shadow-sm transition-all"
            >
              Verify
            </button>
          </form>

          {checkedPlan && (
            <div className="mt-4 p-5 bg-white rounded-2xl border border-[#92f7c3] shadow-md animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#0f5238] text-[22px]">check_circle</span>
                <h4 className="font-bold text-[#181c20] text-sm">{checkedPlan.name}</h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#92f7c3]/60 text-[#005235] ml-auto">
                  {checkedPlan.status}
                </span>
              </div>
              <p className="text-xs text-[#404943] leading-relaxed">{checkedPlan.note}</p>
              <div className="mt-3 pt-3 border-t border-[#e5e8ee] flex justify-between items-center text-xs">
                <span className="text-[#0f5238] font-bold">100% Upfront Cost Transparency Guaranteed</span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs text-[#2d6a4f] font-bold hover:underline"
                >
                  Schedule with Dr. Anjali →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Supported badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {supportedInsurers.map((ins, i) => (
            <div
              key={i}
              onClick={() => {
                setInsuranceQuery(ins.name);
                setCheckedPlan(ins);
              }}
              className="bg-white p-3 rounded-xl border border-[#e5e8ee] text-center hover:border-[#0f5238] cursor-pointer transition-all shadow-sm"
            >
              <span className="text-xs font-bold text-[#181c20] block">{ins.name.split(' ')[0]} {ins.name.split(' ')[1]}</span>
              <span className="text-[10px] text-[#0f5238] font-semibold">{ins.status.split('/')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Serene Club In-House Membership in INR */}
      <section className="bg-[#ffffff] rounded-3xl p-8 md:p-12 border border-[#e5e8ee] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#0f5238] uppercase tracking-wider">No Insurance? Zero Problem</span>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#181c20] font-['Plus_Jakarta_Sans'] mt-1">
              The Serene Dental Wellness Club
            </h2>
            <p className="text-sm text-[#404943] max-w-xl mt-1">
              Affordable preventive care and flat 20% savings on all treatments across Noida with zero waiting periods, zero claims paperwork, and zero claim rejections.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="bg-[#2d6a4f] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#0f5238] transition-all shrink-0"
          >
            Enroll Online in 60s
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan 1 */}
          <div className="p-8 rounded-2xl bg-[#f1f4f9] border border-[#e5e8ee] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0f5238] uppercase">Individual &amp; Family</span>
              <h3 className="text-2xl font-bold text-[#181c20] font-['Plus_Jakarta_Sans'] mt-1">
                Serene Annual Wellness Plan
              </h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-extrabold text-[#0f5238]">₹3,999</span>
                <span className="text-sm text-[#404943]">/ year (or ₹399 monthly)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#404943] mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check</span>
                  <strong>2 Ultrasonic Cleanings &amp; Swiss Airflow Polishing</strong> per year
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check</span>
                  All necessary digital RVG &amp; OPG x-rays included
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check</span>
                  1 Emergency Exam &amp; Pain Triage consultation per year
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check</span>
                  <strong>Flat 20% off all additional procedures</strong> (RCT, Zirconia Crowns, Fillings)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check</span>
                  0% Bajaj Finserv EMI eligibility on treatments above ₹15,000
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#ffffff] border border-[#0f5238] text-[#0f5238] font-bold text-xs rounded-xl hover:bg-[#0f5238] hover:text-white transition-all text-center"
            >
              Select Annual Plan (₹3,999)
            </button>
          </div>

          {/* Plan 2 */}
          <div className="p-8 rounded-2xl bg-[#2d6a4f] text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#92f7c3] text-[#002113] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
              Deep Gum Care
            </div>
            <div>
              <span className="text-xs font-bold text-[#a8e7c5] uppercase">Periodontal &amp; Laser Health</span>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-1">
                Serene Laser &amp; Perio Plan
              </h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-extrabold text-white">₹5,999</span>
                <span className="text-sm text-[#a8e7c5]">/ year (or ₹599 monthly)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#a8e7c5] mb-6">
                <li className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[#92f7c3] text-[18px]">check</span>
                  <strong>3 to 4 Periodontal Maintenance cleanings</strong> per year
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[#92f7c3] text-[18px]">check</span>
                  Biannual Biolase diode laser pocket disinfection
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[#92f7c3] text-[18px]">check</span>
                  Full 3D intraoral scans &amp; complete bone health mapping
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[#92f7c3] text-[18px]">check</span>
                  <strong>Flat 20% off all restorative &amp; surgical therapies</strong>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[#92f7c3] text-[18px]">check</span>
                  Complimentary GC Tooth Mousse remineralizer home pack
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#ffffff] text-[#0f5238] font-bold text-xs rounded-xl hover:bg-[#f7f9ff] transition-all text-center shadow-md"
            >
              Select Perio Plan (₹5,999)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ & Anxiety Protocol */}
      <section className="bg-[#ffffff] rounded-3xl p-8 md:p-12 border border-[#e5e8ee] shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-[#0f5238] uppercase tracking-wider">Compassionate Answers</span>
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#181c20] font-['Plus_Jakarta_Sans'] mt-1">
            Frequently Asked Questions on Dental Anxiety
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Answers Dr. Anjali Bhardwaj provides to nervous patients across Noida before their first consultation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#e5e8ee] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left bg-[#f1f4f9] hover:bg-[#e5e8ee]/80 transition-colors flex items-center justify-between font-bold text-sm text-[#181c20]"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-[#0f5238] text-[20px]">
                  {openFaq === idx ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="p-5 bg-white text-xs text-[#404943] leading-relaxed border-t border-[#e5e8ee]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
