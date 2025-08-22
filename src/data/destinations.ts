// src/data/destinations.ts
export interface Destination {
  name: string;
  description: string;
  img: string;
  badge: string;
  link: string;
  highlights: string[];
  duration: string;
  distance: string;
}

export const destinations: Destination[] = [
  { 
    name: 'Sigiriya Rock', 
    description: 'Ancient fortress & UNESCO World Heritage site',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMkWxtcdtIp3DAFtfr6OrgmmnKrDHEUcV6Pp_uIJNwaaI2-AbW3SVnOLoYxB495wGO2uskRhcS2w7A_diCr5IwujhjR8-seGS0lXE0tv_YbEejGnAMBugUxBlICo1Zltwj9WIfOA=w675-h390-n-k-no',
    badge: 'Historic',
    link: '/destinations/sigiriya',
    highlights: ['Ancient frescoes', 'Lion Rock fortress', 'Archaeological marvel'],
    duration: 'Full Day',
    distance: '150km from Colombo'
  },
  { 
    name: 'Ella Gap',
    description: 'Breathtaking mountain views & Nine Arch Bridge',
    img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQq5pbN7Zxv77kLzdbKiFqDZjHcLQV3_XkL3HFVHLuMC2mmuqzBWp72JW-48k_MFE6niadf4l_mwmUu7ow2H-CSabFZ0qKHODVJre_AbA',
    badge: 'Adventure',
    link: '/destinations/ella',
    highlights: ['Nine Arch Bridge', "Little Adam's Peak", 'Train journey'],
    duration: 'Full Day',
    distance: '200km from Colombo'
  },
  { 
    name: 'Galle Fort', 
    description: 'Dutch colonial architecture by the ocean',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRta1MxIz0aq_fkiLmx7hzuFNkCkgdLA9Dx1676zKtrsR1jAzIDD3vRmd0&s',
    badge: 'Cultural',
    link: '/destinations/galle',
    highlights: ['Dutch fortifications', 'Lighthouse', 'Colonial charm'],
    duration: 'Half Day',
    distance: '120km from Colombo'
  },
  { 
    name: 'Yala National Park', 
    description: 'Wildlife safari & leopard spotting',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqG2Ozb6CoWolgYMOW4wCzldt4Izk1CH-ZOEhtd2QLpFPZ7vIBE1uebcKLnzwDPVkmr74Le3FmaEQjPaBsR-uh-2WMIgTJjtfznxN6c5lSjOYxoFS1X4jOPnbwyJBbfty6YTPM-=w270-h312-n-k-no',
    badge: 'Wildlife',
    link: '/destinations/yala',
    highlights: ['Leopard spotting', 'Elephant herds', 'Bird watching'],
    duration: 'Full Day',
    distance: '300km from Colombo'
  },
  { 
    name: 'Nuwara Eliya', 
    description: 'Cool climate & tea plantations',
    img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSuERwH5XEDER_zrb6eJ8ZUk1bOBA-2qZc_RCVMqQb4RSjKKi_Je2Hw7uv2tl0YTtXfGJX6nnS32HdnSAh2KGho3Xa77KdLjiKsRANN7iU',
    badge: 'Nature',
    link: '/destinations/nuwara-eliya',
    highlights: ['Tea factory tours', 'Lake Gregory', 'British colonial architecture'],
    duration: 'Full Day',
    distance: '180km from Colombo'
  },
  { 
    name: 'Mirissa Beach', 
    description: 'Whale watching & golden sunsets',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPIcUBsGG4-bK8Lxm8y2-mZPyimlAUIeDZT4mw1QLKeFzVGCSQDkexvA9HqOeygX-jTY1UEk-i7IOM8acDKAPLVjx2Vndx4-t_VkBCnlB8oo3p2GNJJzlAHYWSBxSndTPuoMhH=w675-h390-n-k-no',
    badge: 'Beach',
    link: '/destinations/mirissa',
    highlights: ['Whale watching', 'Blue whale season', 'Beach relaxation'],
    duration: 'Full Day',
    distance: '150km from Colombo'
  },
];
