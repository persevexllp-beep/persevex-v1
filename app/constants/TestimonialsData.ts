// Filename: constants/testimonialsData.ts (example path)

export interface Testimonial {
  headline: string;
  quote: string;
  name: string;
  title: string;
  image: string;
  bgImage: string; // Kept for reference, but we won't use it on the card
  bgPosition: string;
  planetImage: string; // <-- This is the new property for the planet
}

export const testimonialsData: Testimonial[] = [
  {
    headline: "Brandby is phenomenal",
    quote: "The Portfolio Management course provided me with a structured approach to asset allocation and risk management. My clients have seen consistent returns even in volatile markets.",
    name: "David K.",
    title: "Goldman Sachs",
    image: "/c1.webp",
    bgImage: '/hat.png',
    bgPosition: 'top 40% right 50%',
    planetImage: '/artificialint.png' // New
  },
  {
    headline: "Choosing Brandby was one of the best decisions",
    quote: "The Finance program at Persevex helped me land a role as an Analyst. The learning was top-notch, the internship was valuable, and the support was great throughout. Highly recommended for anyone serious about finance.",
    name: "Ravi K.",
    title: "Xaviers",
    image: "/c2.webp",
    bgImage: '/hat.png',
    bgPosition: 'bottom 40% left 10%',
    planetImage: '/machine.png' // New
  },
  {
    headline: "Right balance of beautiful design",
    quote: "Persevex's HR course helped me improve my understanding of people management and workplace dynamics. Their structured content and helpful mentors gave me a clear path to grow in my HR career.",
    name: "Virat S R.",
    title: "PurpleMerit",
    image: "/c3.webp",
    bgImage: '/hat.png',
    bgPosition: 'bottom 50% left 80%',
    planetImage: '/cybersec.png' // New
  },
  {
    headline: "One of the most talented design teams",
    quote: "Persevex's Artificial Intelligence course helped me shift careers confidently. The hands-on projects, live sessions, and mentor support made learning enjoyable and effective. I now build and deploy AI models independently.",
    name: "Pramod C A.",
    title: "Infosys",
    image: "/c4.webp",
    bgImage: '/hat.png',
    bgPosition: 'top 15% left 15%',
    planetImage: '/finan.png' // New
  },
  {
    headline: "Amazing to work with",
    quote: "Persevex's internship and training in data science gave me hands-on experience and the technical skills needed to succeed in the field. If you're aiming to upskill and gain real-world exposure, this is the place to start.",
    name: "Samarth M N.",
    title: "Cognizant",
    image: "/c5.webp",
    bgImage: '/hat.png',
    bgPosition: 'center right 10%',
    planetImage: '/digitalmar.png' // New
  },
  {
    headline: "Outstanding product design",
    quote: "Joined Persevex's Digital Marketing course and it exceeded my expectations. From SEO to social media strategy, everyttaught in-depth and practically. I'm now working as a mstrategist and it's all thanks to the solid foundatihere.",
    name: "Aryan.",
    title: "EY",
    image: "/c6.webp",
    bgImage: '/hat.png',
    bgPosition: 'bottom center',
    planetImage: '/webdevl.png' // New
  },

];