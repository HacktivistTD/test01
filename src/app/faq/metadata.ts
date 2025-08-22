// src/pages/faq/metadata.ts

export const faqs = [
  {
    question: "Do you offer airport pickup 24/7?",
    answer:
      "Yes, our cab service operates 24 hours a day, 7 days a week, including holidays."
  },
  {
    question: "Can I book a taxi for a multi-day trip?",
    answer:
      "Absolutely! You can book our taxis for multiple days, and we offer discounted long-trip rates."
  },
  {
    question: "Do your taxis have Wi-Fi?",
    answer:
      "Yes, most of our vehicles are equipped with free high-speed Wi-Fi for your convenience."
  },
  {
    question: "How can I pay for my ride?",
    answer:
      "We accept cash, credit/debit cards, and popular digital payment methods such as Google Pay."
  },
  {
    question: "Do you provide baby seats?",
    answer:
      "Yes, baby and child safety seats are available on request at no extra charge."
  }
];

// Page SEO metadata
export const seoMeta = {
  title: "Frequently Asked Questions | Taprobana Taxi",
  description:
    "Find answers to frequently asked questions about Taprobana Taxi services including booking, payment, and travel options."
};

// FAQ Schema JSON-LD
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
