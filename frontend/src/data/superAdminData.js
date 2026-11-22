export const initialSocialFeeds = {
  instagram: {
    handle: '@afterclass.amity',
    followers: '4.8K',
    engagement: '8.4%',
    connected: true,
    latestPosts: [
      { id: 'ig-1', caption: 'Flashback to AmiFIESTA Day 1 vibes! 🎸🔥', date: '2 hours ago', likes: 542, comments: 43 },
      { id: 'ig-2', caption: 'Registrations for HackAmity Genesis are officially open!', date: '1 day ago', likes: 789, comments: 92 },
      { id: 'ig-3', caption: 'Cadence Unplugged open mic lineup drop 🎤✨', date: '3 days ago', likes: 412, comments: 28 }
    ]
  },
  threads: {
    handle: '@afterclass.amity',
    followers: '1.9K',
    engagement: '11.2%',
    connected: true,
    latestThreads: [
      { id: 'th-1', text: 'Who is ready for hackathon weekend? Pizza orders are in 🍕💻', replies: 38, reposts: 14, date: '4 hours ago' },
      { id: 'th-2', text: 'Reminder: Audition slots for Cadence close tonight at 11:59 PM.', replies: 19, reposts: 7, date: '1 day ago' }
    ]
  },
  twitter: {
    handle: '@AfterclassAmity',
    followers: '1.2K',
    engagement: '5.6%',
    connected: true,
    latestTweets: [
      { id: 'tw-1', text: '🚀 Big news: Inter-college tech registrations have crossed 800+ teams across Eastern India!', retweets: 45, likes: 168, date: '6 hours ago' },
      { id: 'tw-2', text: 'Check the new bus route schedules for exam week on Afterclass Notices.', retweets: 24, likes: 89, date: '2 days ago' }
    ]
  },
  linkedin: {
    handle: 'amity-afterclass',
    followers: '3.1K',
    engagement: '7.8%',
    connected: true,
    latestUpdates: [
      { id: 'li-1', title: 'Campus Innovation Showcase 2026', impressions: 3240, reactions: 240, date: '2 days ago' },
      { id: 'li-2', title: 'Student Perks Partnership: 100+ Brands onboarded', impressions: 4510, reactions: 380, date: '5 days ago' }
    ]
  }
};

export const initialFormSubmissions = [
  {
    id: 'sub-101',
    applicantName: 'Aarav Sengupta',
    email: 'aarav.s@amity.edu',
    phone: '+91 98765 43210',
    program: 'B.Tech CSE, 3rd Year',
    targetType: 'Club Recruitment',
    targetTitle: 'Amity Turing Club — AI Lead',
    status: 'Pending',
    submittedAt: 'Nov 21, 2026 • 09:30 PM',
    portfolioUrl: 'https://github.com/aarav-dev',
    answers: {
      'Why do you want to join?': 'Passionate about building on-campus AI pipelines and hosting hands-on agentic workshops.',
      'Previous experience': 'Built campus mess tracker and contributed to open-source LLM tools.',
      'Weekly commitment': '10-12 hours'
    }
  },
  {
    id: 'sub-102',
    applicantName: 'Tanya Mukherjee',
    email: 'tanya.m@amity.edu',
    phone: '+91 98301 22334',
    program: 'B.A. Journalism, 2nd Year',
    targetType: 'Club Recruitment',
    targetTitle: 'Cadence Music Society — Lead Vocalist',
    status: 'Accepted',
    submittedAt: 'Nov 21, 2026 • 06:15 PM',
    portfolioUrl: 'https://instagram.com/tanyasingsofficial',
    answers: {
      'Why do you want to join?': 'Trained classical and western vocalist, looking to represent Amity at inter-college competitions.',
      'Previous experience': 'State-level music festival finalist 2025.',
      'Weekly commitment': '8 hours'
    }
  },
  {
    id: 'sub-103',
    applicantName: 'Rohan Banerjee',
    email: 'rohan.b@amity.edu',
    phone: '+91 91234 56789',
    program: 'BBA, 1st Year',
    targetType: 'Event Registration',
    targetTitle: 'HackAmity Genesis — Team ByteForge',
    status: 'Pending',
    submittedAt: 'Nov 21, 2026 • 04:45 PM',
    portfolioUrl: 'https://linkedin.com/in/rohan-b',
    answers: {
      'Team size': '4 Members',
      'Track': 'Fintech & Campus Automation',
      'Hardware requirement': 'None (Software Track)'
    }
  },
  {
    id: 'sub-104',
    applicantName: 'Ishita Roy',
    email: 'ishita.r@amity.edu',
    phone: '+91 90071 88990',
    program: 'MBA, 1st Year',
    targetType: 'Dhanda Stall Booking',
    targetTitle: 'Handcrafted Trinkets & Clay Charms',
    status: 'Rejected',
    submittedAt: 'Nov 20, 2026 • 02:10 PM',
    portfolioUrl: 'https://instagram.com/clayandcharms',
    answers: {
      'Category': 'Merchandise & Handicrafts',
      'Electricity Requirement': 'No',
      'Notes': 'Need a stall near the main amphitheater'
    }
  }
];

export const initialRazorpayOrders = [
  {
    id: 'pay_Or918237192',
    orderId: 'order_Nov21_001',
    user: 'Pritam Das',
    email: 'pritam.d@amity.edu',
    category: 'Event Ticket',
    title: 'AmiFIESTA VIP Access Pass',
    amount: 499,
    status: 'captured',
    method: 'UPI (Google Pay)',
    date: 'Nov 21, 2026 • 11:15 PM',
    captured: true
  },
  {
    id: 'pay_Or882910391',
    orderId: 'order_Nov21_002',
    user: 'Ananya Sharma',
    email: 'ananya.s@amity.edu',
    category: 'Dhanda Promotion',
    title: 'Sticky Wok Noodles - 7 Day Spotlight Banner',
    amount: 1499,
    status: 'captured',
    method: 'NetBanking (HDFC)',
    date: 'Nov 21, 2026 • 08:40 PM',
    captured: true
  },
  {
    id: 'pay_Or771920392',
    orderId: 'order_Nov21_003',
    user: 'Debjit Paul',
    email: 'debjit.p@amity.edu',
    category: 'Hackathon Entry',
    title: 'HackAmity Genesis (External Team Pass)',
    amount: 800,
    status: 'captured',
    method: 'Credit Card (Razorpay Standard)',
    date: 'Nov 21, 2026 • 05:22 PM',
    captured: true
  },
  {
    id: 'pay_Or551928471',
    orderId: 'order_Nov20_004',
    user: 'Sayani Ghosh',
    email: 'sayani.g@amity.edu',
    category: 'Event Registration',
    title: 'Acoustic Unplugged Early Bird Pass',
    amount: 199,
    status: 'refunded',
    method: 'UPI (PhonePe)',
    date: 'Nov 20, 2026 • 03:10 PM',
    captured: false
  }
];
