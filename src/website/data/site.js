export const sitePages = [
  {
    path: '/',
    title: 'Home',
    description:
      'A collective platform for the welfare, dignity, protection and rights of advocates.',
  },
  {
    path: '/charter',
    title: 'Mandate & Aims',
    description: 'Read the seven aims and nine objects of the National Lawyers Federation.',
  },
  {
    path: '/working-principle',
    title: 'Working Principle',
    description:
      'Identify, represent, follow-up and resolve: the NLF approach to constructive representation.',
  },
  {
    path: '/structure',
    title: 'Our Structure',
    description: 'Democratic representation at National, State, District and Bar Unit levels.',
  },
  {
    path: '/leadership',
    title: 'Leadership',
    description: 'Meet Chittem Venkata Reddy, Advocate, High Court and Founder President of NLF.',
  },
  {
    path: '/membership',
    title: 'Membership',
    description:
      'Prepare your membership application and connect with the National Lawyers Federation.',
  },
  {
    path: '/welfare',
    title: 'Welfare & Support',
    description:
      'Explore the welfare priorities set out in the NLF brochure and prepare an enquiry.',
  },
  {
    path: '/grievances',
    title: 'Grievance & Protection',
    description: 'Prepare a professional or welfare representation for the NLF office.',
  },
  {
    path: '/learning',
    title: 'Learning & Mentorship',
    description: 'Connect with NLF about continuing legal education, training and mentorship.',
  },
  {
    path: '/directory',
    title: 'Unit Directory',
    description:
      'Find the published national contact and enquire about State, District and Bar Units.',
  },
  {
    path: '/resources',
    title: 'Brochure & Resources',
    description: 'Read and download the NLF brochure, aims, objects and organisational structure.',
  },
  {
    path: '/community',
    title: 'NLF Community',
    description:
      'Connect with fellow advocates through the supplied NLF WhatsApp group invitation.',
  },
  {
    path: '/portal',
    title: 'Member Portal Preview',
    description: 'Explore a sample dashboard for planned member services.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Reach the National Lawyers Federation by email, telephone or WhatsApp.',
  },
];
export const primaryPaths = ['/charter', '/structure', '/leadership', '/welfare'];
export function getSitePage(path) {
  return sitePages.find((page) => page.path === path);
}
