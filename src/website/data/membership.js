import { federation } from '../../shared/config.js';
export const emptyApplication = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  enrolment: '',
  year: '',
  state: '',
  district: '',
  court: '',
  tier: 'Ordinary Member',
};
export const membershipTiers = [
  [
    'Young Advocate',
    'Young Advocate',
    'Interested in guidance and mentorship at the beginning of practice.',
  ],
  [
    'Ordinary Member',
    'Ordinary Annual Member',
    'Enquire about ordinary membership and the applicable terms.',
  ],
  ['Life Member', 'Life Member', 'Enquire about life membership and the applicable terms.'],
];
export function validateStep(values, step, year = new Date().getFullYear()) {
  const errors = {};
  if (step === 0) {
    if (!values.name.trim()) errors.name = 'Please enter your name.';
    if (
      !/^\+?[\d\s()-]+$/.test(values.mobile.trim()) ||
      !/^(?:91)?[6-9]\d{9}$/.test(values.mobile.replace(/\D/g, ''))
    )
      errors.mobile = 'Enter a valid Indian mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errors.email = 'Enter a valid email address.';
  }
  if (step === 1) {
    for (const [key, message] of [
      ['enrolment', 'Enter your enrolment number.'],
      ['state', 'Select your state or union territory.'],
      ['district', 'Enter your district.'],
      ['court', 'Enter your court or bar unit.'],
    ]) {
      if (!values[key].trim()) errors[key] = message;
    }
    if (!/^\d{4}$/.test(values.year) || Number(values.year) < 1950 || Number(values.year) > year)
      errors.year = `Enter a year between 1950 and ${year}.`;
  }
  return errors;
}
export function applicationRows(values) {
  return [
    ['Name', values.name.trim()],
    ['Mobile', values.mobile.trim()],
    ['Email', values.email.trim()],
    ['Address', values.address.trim() || 'Not provided'],
    ['Enrolment number', values.enrolment.trim()],
    ['Year of enrolment', values.year],
    ['State / union territory', values.state],
    ['District', values.district.trim()],
    ['Court / Bar unit', values.court.trim()],
    ['Membership tier', values.tier],
  ];
}
export function applicationText(values) {
  return `Dear NLF,\n\nI would like to apply for membership.\n\n${applicationRows(values)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')}\n\nPlease find my Bar Council ID / Certificate of Practice attached.\n`;
}
export function applicationEmail(values) {
  return `mailto:${federation.email}?subject=${encodeURIComponent(`NLF Membership Application – ${values.name.trim()}`)}&body=${encodeURIComponent(applicationText(values))}`;
}
