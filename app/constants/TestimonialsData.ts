export interface Testimonial {
  headline: string;
  quote: string;
  name: string;
  title: string;
  image: string;
  bgImage: string;
  bgPosition: string; // <-- Add this new property
}

export const testimonialsData: Testimonial[] = [
  {
    headline: "Brandby is phenomenal",
    quote: "The Portfolio Management course provided me with a structured approach to asset allocation and risk management. My clients have seen consistent returns even in volatile markets.",
    name: "David K.",
    title: "Goldman Sachs",
    image: "/dog6.jpg",
    bgImage: '/hat.png',
    bgPosition: 'top 40% right 50%' // Example: Top right
  },
  {
    headline: "Choosing Brandby was one of the best decisions",
    quote: "Their team is nothing short of fantastic—extremely helpful, incredibly quick, and utterly professional in every interaction. From the get-go, they worked closely with us, ensuring that our vision was brought to life in a way that exceeded our expectations.",
    name: "Reece Akhtar",
    title: "CEO & Co-Founder @Deeper Signals",
    image: "/dog5.jpeg",
    bgImage: '/hat.png',
    bgPosition: 'bottom 40% left 10%' // Example: Bottom left
  },
  {
    headline: "Right balance of beautiful design",
    quote: "Simon and the team at Brandby are essential to my team. Full stop. They strike the right balance of beautiful design and functional usability. No doubt you'll be happy with the results.",
    name: "Scott Willman",
    title: "EVP of Product Management @SmartCloud",
    image: "/cat2.jpeg",
    bgImage: '/hat.png',
    bgPosition: 'bottom 50% left 80%' // Example: Bottom right
  },
  {
    headline: "One of the most talented design teams",
    quote: "After 7+ years in the SaaS industry, I can confidently say that Simon from Brandby is one of the most talented designers I've worked with so far. He goes above and beyond when it comes to understanding and executing design.",
    name: "Amneet Bains",
    title: "Marketing Lead @Stepsize",
    image: "/bear1.jpg",
    bgImage: '/hat.png',
    bgPosition: 'top 15% left 15%' // Example: Top left
  },
  // ... continue adding unique positions for the rest of your testimonials
  {
    headline: "Amazing to work with",
    quote: "Our product and website redesign went great, and we're thrilled with the end result. But more than that, Brandby was just amazing to work with and made the whole process fun and stress free. They're always super responsive.",
    name: "Patrick Kelly",
    title: "CEO & Founder @ClickMagick",
    image: "/dog3.jpg",
    bgImage: '/hat.png',
    bgPosition: 'center right 10%'
  },
  {
    headline: "Outstanding product design",
    quote: "Their creativity-fueled technical skills resulted in visually stunning, user-friendly mobile app and web designs. It was an absolute pleasure working with such talented people. I highly recommend!",
    name: "Marta Tloczek",
    title: "Product Owner @Plix",
    image: "/cat1.jpg",
    bgImage: '/hat.png',
    bgPosition: 'bottom center'
  },
    {
    headline: "Reliable, Fast, Easy",
    quote: "Brandby were incredibly fast and came up with numerous options for us to walk-through. They solicit feedback at every opportunity and worked really hard to create the perfect design for us. We couldn't be happier!",
    name: "Jackie Sheely",
    title: "Co-Founder @Legacy Blueprint",
    image: "/dog1.jpeg",
    bgImage: '/hat.png',
    bgPosition: 'top left'
  },
];