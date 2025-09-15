import { ChartCandlestick, Network, Search } from "lucide-react";
import {
  AIIcon,
  CloudIcon,
  CybersecurityIcon,
  FinanceIcon,
  HRIcon,
  IconType,
  MarketingIcon,
  MLIcon,
  WebDevIcon,
} from "./Icons";

export interface ModuleType {
  title: string;
  duration: string;
  lessons: number;
  description: string;
  topics: string[];
}

export interface ProjectsType {
  name: string;
  description: string;
  image: string;
}

export interface CourseType {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  route: string;
  slug: string;
  image: string;
  large_description: string;
  cardBg_image: string;
  programCardsHeading?: string[];
  modules?: ModuleType[];
  projects?: ProjectsType[];
}

export interface ContentType {
  heading: string;
  subheading: string;
  paragraph: string;
}



export const technicalContent: ContentType = {
  heading: "Build the Future.",
  subheading: "Master In-Demand Tech Skills.",
  paragraph:
    "Our technical tracks are hands-on and project-based, ensuring you gain practical skills in software development, data science, and cloud technologies that are directly applicable in the real world.",
};

export const managementCourses: CourseType[] = [
  {
    id: "m1",
    title: "Finance for Managers",
    description:
      "Understand key financial principles to make better business decisions.",
    icon: FinanceIcon,
    route: "/courses/finance",
    slug: "finance",
    image: "/finan.png",
    cardBg_image: "/financepng.png",
    projects: [
            {
                name: 'Financial Modeling',
                description: 'Build comprehensive financial models for business valuation and forecasting.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }, 
            {
                name: 'Investment Analysis',
                description: 'Analyze investment opportunities using various valuation methods and risk assessment.',
                image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'M&A Valuation',
                description: 'Perform merger and acquisition analysis including synergy valuation and deal structuring.',
                image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Portfolio Management',
                description: 'Create and optimize investment portfolios based on risk-return objectives.',
                image: 'https://images.unsplash.com/photo-1642543348745-03b1219733d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }, 
            {
                name: 'Financial Planning',
                description: 'Develop comprehensive financial plans for individuals or businesses.',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Risk Analysis',
                description: 'Identify, assess, and mitigate financial risks using quantitative methods.',
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ],
    modules: [
      {
        title: "Financial Statements & Analysis",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn to analyze and interpret financial statements to make informed business decisions.",
        topics: [
          "Understanding Income Statements, Balance Sheets, and Cash Flow Statements",
          "Financial Ratio Analysis and Interpretation",
          "Trend Analysis and Comparative Analysis",
          "Common-Size Financial Statements",
          "Financial Statement Forecasting",
        ],
      },
      {
        title: "Excel for Financial Modeling",
        duration: "1 week",
        lessons: 4,
        description:
          "Master advanced Excel techniques essential for building robust financial models.",
        topics: [
          "Advanced Excel Functions (VLOOKUP, INDEX-MATCH, OFFSET)",
          "Data Tables and Scenario Analysis",
          "Sensitivity Analysis and Goal Seek",
          "Excel Shortcuts and Efficiency Techniques",
        ],
      },
      {
        title: "Discounted Cash Flow (DCF) Modeling",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Build comprehensive DCF models to value companies and investment opportunities.",
        topics: [
          "Forecasting Revenue and Expenses",
          "Calculating Free Cash Flows",
          "Determining Discount Rates (WACC)",
          "Terminal Value Calculations",
          "Sensitivity Analysis and Scenario Modeling",
          "Building a Complete DCF Model",
        ],
      },
      {
        title: "M&A Modeling and LBO Analysis",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn to model mergers, acquisitions, and leveraged buyouts to evaluate deal structures.",
        topics: [
          "Accretion/Dilution Analysis",
          "Synergy Valuation",
          "Purchase Price Allocation",
          "LBO Model Structure and Returns Analysis",
          "Debt Schedules and Covenant Analysis",
        ],
      },
      {
        title: "Advanced Valuation Techniques",
        duration: "1 week",
        lessons: 4,
        description:
          "Explore advanced valuation methodologies used by investment professionals.",
        topics: [
          "Comparable Company Analysis",
          "Precedent Transaction Analysis",
          "Sum-of-the-Parts Valuation",
          "Real Options Valuation",
        ],
      },
    ],
    large_description:
      "This course provides a comprehensive overview of financial principles essential for effective management. Topics include financial statement analysis, budgeting, forecasting, and investment decision-making. By the end of the course, you'll be equipped to interpret financial data and make informed decisions that drive business success.",
    programCardsHeading: [
      "Financial Statements & Analysis",
      "Excel for Financial Modeling",
      "Discounted Cash Flow (DCF) Modeling",
      "M&A Modeling and LBO Analysis",
      "Advanced Valuation Techniques",
    ],
  },
  {
    id: "m2",
    title: "Digital Marketing Strategy",
    description:
      "Master SEO, SEM, and social media to drive growth and engagement.",
    icon: MarketingIcon,
    route: "/courses/digital-marketing",
    slug: "digital-marketing",
    image: "/digitalmar.png",
    cardBg_image: "/digital.png",
    projects:  [
            {
                name: 'Email Marketing',
                description: 'Create and optimize email marketing campaigns to drive conversions and customer engagement.',
                image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Social Media Campaign',
                description: 'Develop and execute a comprehensive social media marketing campaign across multiple platforms.',
                image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'SEO Optimization',
                description: 'Implement SEO strategies to improve website ranking and organic traffic.',
                image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Content Marketing',
                description: 'Create and distribute valuable content to attract and engage a target audience.',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Google Ads Campaign',
                description: 'Set up and optimize Google Ads campaigns to drive targeted traffic and conversions.',
                image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Analytics Dashboard',
                description: 'Build a comprehensive analytics dashboard to track and report on marketing performance.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ],
    modules: [
      {
        title: "Search Engine Optimization (SEO)",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Master the fundamentals of SEO to improve website visibility and organic traffic.",
        topics: [
          "Keyword Research and Analysis",
          "On-Page SEO Optimization",
          "Technical SEO Fundamentals",
          "Link Building Strategies",
          "Local SEO Techniques",
          "SEO Analytics and Reporting",
        ],
      },
      {
        title: "Pay-Per-Click (PPC) Advertising",
        duration: "1 week",
        lessons: 5,
        description:
          "Learn to create and manage effective paid advertising campaigns across multiple platforms.",
        topics: [
          "Google Ads Campaign Structure",
          "Keyword Match Types and Bidding Strategies",
          "Ad Copywriting and Testing",
          "Display and Remarketing Campaigns",
          "PPC Analytics and Optimization",
        ],
      },
      {
        title: "Social Media Marketing",
        duration: "2 weeks",
        lessons: 7,
        description:
          "Develop strategies for effective social media marketing across multiple platforms.",
        topics: [
          "Platform-Specific Strategies (Facebook, Instagram, LinkedIn, Twitter)",
          "Content Creation and Curation",
          "Community Management and Engagement",
          "Social Media Advertising",
          "Influencer Marketing Strategies",
          "Social Media Analytics and ROI Measurement",
          "Social Listening and Reputation Management",
        ],
      },
      {
        title: "Email Marketing",
        duration: "1 week",
        lessons: 4,
        description:
          "Master email marketing strategies to build relationships and drive conversions.",
        topics: [
          "Building and Segmenting Email Lists",
          "Email Copywriting and Design",
          "Automation and Drip Campaigns",
          "A/B Testing and Optimization",
        ],
      },
      {
        title: "Digital Analytics",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn to measure, analyze, and optimize digital marketing performance.",
        topics: [
          "Google Analytics Implementation and Reporting",
          "Conversion Tracking and Goal Setting",
          "Attribution Modeling",
          "Data Visualization and Dashboards",
          "Data-Driven Decision Making",
        ],
      },
    ],
    programCardsHeading: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) Advertising",
      "Social Media Marketing",
      "Email Marketing",
      "Digital Analytics",
    ],
    large_description:
      "Dive into the world of digital marketing with this strategic course designed for modern managers. Learn how to create and implement effective marketing campaigns using SEO, SEM, content marketing, and social media platforms. The course also covers analytics and performance measurement to help you optimize your marketing efforts for maximum ROI.",
  },
  {
    id: "m3",
    title: "Modern Human Resources",
    description:
      "Learn to attract, manage, and retain top talent in today's workplace.",
    icon: HRIcon,
    route: "/courses/human-resource",
    slug: "human-resource",
    image: "/humanres.png",
    cardBg_image: "/human.png",
    projects: [
            {
                name: 'Recruitment Strategy',
                description: 'Develop a comprehensive recruitment strategy for different organizational needs.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Performance Management',
                description: 'Design a performance management system with evaluation metrics and feedback mechanisms.',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Employee Engagement',
                description: 'Create employee engagement initiatives to improve workplace satisfaction and productivity.',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'HR Analytics',
                description: 'Analyze HR data to derive insights for strategic decision-making.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Training Program',
                description: 'Design and implement a comprehensive training program for employee development.',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                name: 'Compensation Structure',
                description: 'Develop a competitive compensation and benefits structure aligned with market standards.',
                image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ],
    modules: [
      {
        title: "Talent Acquisition",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Master strategies for attracting, recruiting, and selecting top talent.",
        topics: [
          "Job Analysis and Competency Mapping",
          "Recruitment Channels and Employer Branding",
          "Interviewing Techniques and Assessment Methods",
          "Candidate Experience and Onboarding",
          "Recruitment Metrics and Analytics",
        ],
      },
      {
        title: "Performance Management",
        duration: "1 week",
        lessons: 4,
        description:
          "Develop effective performance management systems to drive employee productivity.",
        topics: [
          "Goal Setting and KPI Development",
          "Performance Review Processes",
          "Feedback Techniques and Coaching",
          "Performance Improvement Plans",
        ],
      },
      {
        title: "Learning & Development",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Learn to design and implement effective training and development programs.",
        topics: [
          "Training Needs Analysis",
          "Learning Program Design and Delivery",
          "E-Learning and Blended Learning Approaches",
          "Measuring Training Effectiveness",
          "Career Development Planning",
          "Succession Planning",
        ],
      },
      {
        title: "Compensation & Benefits",
        duration: "1 week",
        lessons: 4,
        description:
          "Design competitive compensation and benefits packages to attract and retain talent.",
        topics: [
          "Salary Structure Design",
          "Incentive and Bonus Programs",
          "Benefits Administration",
          "Total Rewards Strategy",
        ],
      },
      {
        title: "HR Analytics",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Leverage data for strategic HR decision-making and workforce planning.",
        topics: [
          "HR Metrics and KPIs",
          "Workforce Analytics and Reporting",
          "Predictive Analytics in HR",
          "Data Visualization for HR",
          "Data-Driven HR Strategy",
        ],
      },
    ],
    programCardsHeading: [
      "Talent Acquisition",
      "Performance Management",
      "Learning & Development",
      "Compensation & Benefits",
      "HR Analytics",
    ],
    large_description:
      "This course explores contemporary human resource management practices essential for building and maintaining a productive workforce. Topics include talent acquisition, employee engagement, performance management, and legal considerations in HR. You'll gain practical skills to create a positive work environment that attracts and retains top talent.",
  },
  {
  "id": "m4",
  "title": "Stock Market & Crypto Investing",
  "description":
    "Master the art of investing in both traditional stock markets and the emerging world of cryptocurrencies.",
  "icon": ChartCandlestick,
  "route": "/courses/stock-market-crypto",
  "slug": "stock-market-crypto",
  "image": "/digitalmar.png",
  "cardBg_image": "/digital.png",
  "projects": [
    {
      "name": "Equity Research Report",
      "description":
        "Conduct in-depth analysis of a publicly traded company and produce a professional research report.",
      "image":
        "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      "name": "Crypto Portfolio Strategy",
      "description":
        "Develop a diversified cryptocurrency portfolio based on fundamental analysis and risk tolerance.",
      "image":
        "https://images.unsplash.com/photo-1621504450183-225ce7e8e129?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      "name": "Technical Analysis Trading Plan",
      "description":
        "Create a rule-based trading plan using technical indicators like MACD, RSI, and Moving Averages.",
      "image":
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      "name": "Options Trading Strategy",
      "description":
        "Design and backtest an options trading strategy, such as a covered call or a credit spread.",
      "image":
        "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      "name": "DeFi Yield Farming Simulation",
      "description":
        "Analyze and simulate a yield farming strategy on a decentralized finance (DeFi) protocol.",
      "image":
        "https://images.unsplash.com/photo-1639755498822-e42751f7d730?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      "name": "Market Sentiment Analysis",
      "description":
        "Use tools to analyze market sentiment from social media and news to predict price movements.",
      "image":
        "https://images.unsplash.com/photo-1633113087844-368727a3a32f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  "modules": [
    {
      "title": "Foundations of Stock Market Investing",
      "duration": "2 weeks",
      "lessons": 5,
      "description":
        "Understand the fundamentals of the stock market, from types of stocks to market indices.",
      "topics": [
        "Introduction to Equity Markets",
        "Understanding Stock Exchanges (NYSE, NASDAQ)",
        "Fundamental Analysis vs. Technical Analysis",
        "Reading Stock Quotes and Charts",
        "Types of Orders (Market, Limit, Stop)"
      ]
    },
    {
      "title": "Advanced Technical Analysis",
      "duration": "2 weeks",
      "lessons": 6,
      "description":
        "Dive deep into chart patterns and indicators to predict market movements and time your trades.",
      "topics": [
        "Candlestick Patterns",
        "Support and Resistance Levels",
        "Moving Averages and MACD",
        "Relative Strength Index (RSI) and Bollinger Bands",
        "Fibonacci Retracement",
        "Volume Analysis"
      ]
    },
    {
      "title": "Introduction to Cryptocurrencies & Blockchain",
      "duration": "1 week",
      "lessons": 4,
      "description":
        "Grasp the core concepts of blockchain technology and the cryptocurrency ecosystem.",
      "topics": [
        "What is Blockchain Technology?",
        "Understanding Bitcoin and Ethereum",
        "Altcoins and Stablecoins",
        "Crypto Wallets and Security",
        "Navigating Crypto Exchanges"
      ]
    },
    {
      "title": "Crypto Trading & DeFi",
      "duration": "2 weeks",
      "lessons": 5,
      "description":
        "Explore advanced crypto trading strategies and the world of Decentralized Finance (DeFi).",
      "topics": [
        "On-Chain Analysis",
        "Tokenomics and Whitepaper Analysis",
        "Introduction to DeFi: Lending, Borrowing, Staking",
        "Yield Farming and Liquidity Pools",
        "NFTs and the Metaverse Economy"
      ]
    },
    {
      "title": "Portfolio Management & Risk",
      "duration": "1 week",
      "lessons": 4,
      "description":
        "Learn to build and manage a diversified portfolio across stocks and crypto while managing risk.",
      "topics": [
        "Asset Allocation and Diversification",
        "Risk-Reward Ratio",
        "Hedging with Options and Futures",
        "Psychology of Trading and Investing",
        "Tax Implications of Investing"
      ]
    }
  ],
  "large_description":
    "This comprehensive course demystifies the world of stock and cryptocurrency investing. You'll learn the fundamentals of market analysis, from traditional stock valuation to the intricacies of blockchain technology. The curriculum covers technical analysis, portfolio construction, risk management, and an introduction to advanced topics like options trading and DeFi. Whether you're a beginner or looking to enhance your skills, this course will equip you with the knowledge to navigate modern financial markets confidently.",
  "programCardsHeading": [
    "Foundations of Stock Market Investing",
    "Advanced Technical Analysis",
    "Introduction to Cryptocurrencies & Blockchain",
    "Crypto Trading & DeFi",
    "Portfolio Management & Risk"
  ]
}
];

export const technicalCourses: CourseType[] = [
  {
    id: "t1",
    title: "Web Development Mastery",
    description:
      "From HTML to advanced React, become a full-stack web developer.",
    icon: WebDevIcon,
    route: "/courses/web-development",
    slug: "web-development",
    image: "/webdevl.png",
    cardBg_image: "/web.png",
    projects: [
            {
                name: 'Responsive Portfolio Website',
                description: 'Build a modern, responsive portfolio website using HTML, CSS, and JavaScript.',
                image: '/machinelearning.png'
            },
            {
                name: 'Social Media Application',
                description: 'Build a complete Twitter clone from scratch with ReactJS, NodeJS and ExpressJS.',
                image: '/webdevelopment.png'
            }
        ],
    modules: [
      {
        title: "Introduction to Web Development",
        duration: "2 weeks",
        lessons: 4,
        description:
          "Understand how the web works and the fundamentals of frontend and backend development.",
        topics: [
          "Web Architecture Overview",
          "Frontend vs Backend Development",
          "Tools and Environments",
          "Web Development Roadmap",
        ],
      },
      {
        title: "HTML & CSS Essentials",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn how to create the structure and style of web pages using HTML5 and CSS3.",
        topics: [
          "HTML Elements and Structure",
          "CSS Box Model and Positioning",
          "Responsive Design with Flexbox & Grid",
          "Media Queries and Mobile-First Design",
          "CSS Transitions and Animations",
        ],
      },
      {
        title: "JavaScript Programming",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Gain strong fundamentals in JavaScript to build dynamic and interactive web applications.",
        topics: [
          "Variables, Functions, and Scope",
          "DOM Manipulation",
          "Events and Event Listeners",
          "ES6+ Features",
          "Asynchronous JavaScript: Promises & Fetch",
          "Error Handling and Debugging",
        ],
      },
      {
        title: "Frontend Frameworks with React.js",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Build scalable user interfaces with component-based architecture using React.",
        topics: [
          "JSX and Component Structure",
          "State and Props",
          "React Hooks (useState, useEffect)",
          "Routing with React Router",
          "Project: React Todo App",
        ],
      },
      {
        title: "Backend Development with Node.js & MongoDB",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Learn to create RESTful APIs and connect with a database to build full-stack applications.",
        topics: [
          "Node.js and Express Framework",
          "Creating RESTful APIs",
          "MongoDB and Mongoose",
          "User Authentication with JWT",
          "CRUD Operations",
          "Deploying MERN Stack Applications",
        ],
      },
    ],
    programCardsHeading: [
      "Intoduction to Web Development",
      "HTML & CSS Essentials",
      "Javascript Programming",
      "Frontend Frameworks with React.js",
      "Backend Development with NodeJS & MongoDB",
    ],
    large_description:
      "This comprehensive course takes you from the basics of web development to advanced full-stack techniques. You'll learn HTML, CSS, and JavaScript fundamentals before diving into popular frameworks like React for front-end development and Node.js for back-end development. By the end of the course, you'll be able to build and deploy dynamic web applications.",
  },
  {
    id: "t2",
    title: "Artificial Intelligence",
    description: "Explore the foundations of AI and build intelligent agents.",
    icon: AIIcon,
    route: "/courses/artificial-intelligence",
    slug: "artificial-intelligence",
    image: "/artificialint.png",
    cardBg_image: "/artifi.png",
    projects:[
            {
                name: 'Image Recognition System',
                description: 'Build an AI system that can identify and classify objects in images with high accuracy.',
                image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Intelligent Chatbot',
                description: 'Develop a conversational AI chatbot that can understand and respond to user queries naturally.',
                image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Predictive Analytics',
                description: 'Create AI models that can forecast trends and make predictions based on historical data.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Recommendation System',
                description: 'Build an AI-powered recommendation engine similar to those used by Netflix and Amazon.',
                image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Sentiment Analysis',
                description: 'Develop an AI system that can analyze text to determine the emotional tone and sentiment.',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Facial Recognition',
                description: 'Create an AI system that can detect and recognize faces in images and video streams.',
                image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            }
        ],
    programCardsHeading: [
      "Foundation of AI",
      "Machine Learning Fundamentals",
      "Neural Networks and Deep Learning",
      "Natural Language Processing",
      "AI applications and deployment",
    ],
    large_description:
      "This course provides a solid foundation in artificial intelligence concepts and techniques. You'll explore topics such as machine learning, neural networks, natural language processing, and computer vision. Through hands-on projects, you'll learn how to build intelligent agents that can perform tasks such as classification, prediction, and decision-making.",

    modules: [
      {
        title: "Foundations of AI",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Understand the core concepts, history, and ethical considerations of artificial intelligence.",
        topics: [
          "History and Evolution of AI",
          "Types of AI: Narrow, General, and Super Intelligence",
          "AI Ethics and Responsible AI Development",
          "AI Problem Solving Approaches",
          "Python Programming for AI",
          "Mathematics for AI: Linear Algebra and Calculus",
        ],
      },
      {
        title: "Machine Learning Fundamentals",
        duration: "3 weeks",
        lessons: 8,
        description:
          "Learn the core principles of machine learning and implement basic algorithms.",
        topics: [
          "Supervised vs. Unsupervised Learning",
          "Regression and Classification Algorithms",
          "Decision Trees and Random Forests",
          "Support Vector Machines",
          "Feature Engineering and Selection",
          "Model Evaluation and Validation",
          "Overfitting and Regularization",
          "Practical Implementation with Scikit-learn",
        ],
      },
      {
        title: "Neural Networks and Deep Learning",
        duration: "3 weeks",
        lessons: 7,
        description:
          "Master the architecture and training of neural networks for complex pattern recognition.",
        topics: [
          "Neural Network Architecture and Components",
          "Activation Functions and Backpropagation",
          "Convolutional Neural Networks (CNNs)",
          "Recurrent Neural Networks (RNNs) and LSTMs",
          "Transfer Learning and Fine-tuning",
          "Deep Learning Frameworks: TensorFlow and PyTorch",
          "GPU Acceleration and Model Optimization",
        ],
      },
      {
        title: "Natural Language Processing",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn techniques for processing and understanding human language with AI.",
        topics: [
          "Text Preprocessing and Tokenization",
          "Word Embeddings and Language Models",
          "Sentiment Analysis and Text Classification",
          "Named Entity Recognition",
          "Transformer Models and BERT",
        ],
      },
      {
        title: "AI Applications and Deployment",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Apply AI to real-world problems and learn to deploy models in production environments.",
        topics: [
          "Computer Vision Applications",
          "Conversational AI and Chatbots",
          "Recommendation Systems",
          "Model Deployment and API Development",
          "MLOps and Model Monitoring",
          "AI Project Management and Best Practices",
        ],
      },
    ],
  },
  {
    id: "t3",
    title: "Machine Learning Ops",
    description: "Dive into data analysis, model deployment, and MLOps.",
    icon: MLIcon,
    route: "/courses/machine-learning",
    slug: "machine-learning",
    image: "/machinelearn.png",
    cardBg_image: "/machine.png",
    projects: [
            {
                name: 'Product Recommendation System',
                description: 'Build a recommendation engine that suggests products based on user behavior and preferences.',
                image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Image Classification',
                description: 'Develop a model that can accurately classify images into different categories using CNNs.',
                image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Sentiment Analysis',
                description: 'Create a model that can analyze text data to determine sentiment and emotional tone.',
                image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Customer Churn Prediction',
                description: 'Build a model to predict which customers are likely to cancel a subscription or service.',
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Stock Price Prediction',
                description: 'Develop a time series forecasting model to predict stock prices using historical data.',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Intelligent Chatbot',
                description: 'Create a conversational AI chatbot using natural language processing and machine learning.',
                image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            }
        ],
    modules: [
      {
        title: "Introduction to Machine Learning",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Understand the fundamentals of machine learning and its applications.",
        topics: [
          "Machine Learning Concepts and Terminology",
          "Types of Machine Learning: Supervised, Unsupervised, and Reinforcement",
          "The Machine Learning Pipeline",
          "Python Libraries for Machine Learning",
          "Data Preprocessing for Machine Learning",
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        duration: "3 weeks",
        lessons: 7,
        description:
          "Master key supervised learning algorithms for classification and regression tasks.",
        topics: [
          "Linear and Logistic Regression",
          "Decision Trees and Random Forests",
          "Support Vector Machines",
          "K-Nearest Neighbors",
          "Naive Bayes Classifiers",
          "Ensemble Methods: Bagging and Boosting",
          "Model Evaluation and Selection",
        ],
      },
      {
        title: "Unsupervised Learning",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn techniques for finding patterns and structure in unlabeled data.",
        topics: [
          "Clustering Algorithms: K-Means, DBSCAN, Hierarchical",
          "Dimensionality Reduction: PCA, t-SNE",
          "Association Rule Learning",
          "Anomaly Detection",
          "Evaluating Unsupervised Learning Models",
        ],
      },
      {
        title: "Deep Learning Fundamentals",
        duration: "3 weeks",
        lessons: 6,
        description:
          "Understand neural networks and implement deep learning models for complex tasks.",
        topics: [
          "Neural Network Architecture and Training",
          "Deep Learning Frameworks: TensorFlow and Keras",
          "Convolutional Neural Networks for Image Processing",
          "Recurrent Neural Networks for Sequence Data",
          "Generative Adversarial Networks",
          "Transfer Learning and Fine-tuning",
        ],
      },
      {
        title: "Advanced Machine Learning Topics",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Explore advanced techniques and applications of machine learning.",
        topics: [
          "Reinforcement Learning",
          "Natural Language Processing with Machine Learning",
          "Computer Vision Applications",
          "Time Series Forecasting",
          "Model Deployment and MLOps",
          "Ethical Considerations in Machine Learning",
        ],
      },
    ],
    programCardsHeading: [
      "Introduction to Machine Learning",
      "Supervised Learnign Algorithms",
      "Unsupervised Learning",
      "Deep Learning Fundamentals",
      "Advanced Machine Learning Topics",
    ],
    large_description:
      "This course focuses on the practical aspects of machine learning, including data analysis, model training, and deployment. You'll learn how to preprocess data, select appropriate algorithms, and evaluate model performance. Additionally, the course covers MLOps practices for deploying and maintaining machine learning models in production environments.",
  },
  {
    id: "t4",
    title: "Cloud Computing (AWS)",
    description:
      "Architect and deploy scalable, fault-tolerant applications on AWS.",
    icon: CloudIcon,
    route: "/courses/cloud-computing",
    slug: "cloud-computing",
    image: "/cloudcomp.png",
    cardBg_image: "/cloud.png",
    projects:[
            {
                name: 'Deploy a 3-Tier Web Application',
                description: 'Deploy a scalable and secure 3-tier web application using virtual machines, databases, and load balancers on a major cloud platform.',
                image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Build a Serverless Application',
                description: 'Develop a serverless application using AWS Lambda, Azure Functions, or Google Cloud Functions to process data or power a backend API.',
                image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Automate Infrastructure with Terraform',
                description: 'Use Terraform to define and provision a complete cloud infrastructure as code, enabling repeatable and consistent deployments.',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Create a CI/CD Pipeline for a Web App',
                description: 'Implement a continuous integration and continuous delivery (CI/CD) pipeline to automate the building, testing, and deployment of a web application to the cloud.',
                image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Static Website Hosting',
                description: 'Host a static website on a cloud storage service like Amazon S3, Azure Blob Storage, or Google Cloud Storage.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            },
            {
                name: 'Cloud Monitoring and Alerting',
                description: 'Set up monitoring and alerting for a cloud environment to track resource utilization, performance, and security events.',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            }
        ],
    modules: [
      {
        title: "Introduction to Cloud Computing",
        duration: "2 weeks",
        lessons: 4,
        description:
          "Understand cloud fundamentals, benefits, and service models.",
        topics: [
          "What is Cloud Computing?",
          "Cloud Deployment Models (Public, Private, Hybrid)",
          "Cloud Service Models (IaaS, PaaS, SaaS)",
          "Shared Responsibility Model",
        ],
      },
      {
        title: "Core Cloud Services",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Learn about essential services across major providers like AWS, Azure, and Google Cloud.",
        topics: [
          "Compute Services (EC2, VM, App Engine)",
          "Storage Solutions (S3, Blob Storage, Cloud Storage)",
          "Networking & VPC Basics",
          "Databases in the Cloud",
          "Monitoring & Logging",
        ],
      },
      {
        title: "Cloud Security & Identity",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Explore how to secure resources and manage identities in the cloud.",
        topics: [
          "Identity & Access Management (IAM)",
          "Encryption & Key Management",
          "Network Security Groups & Firewalls",
          "Compliance and Governance",
          "Best Practices for Cloud Security",
        ],
      },
      {
        title: "Cloud Deployment & Automation",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Learn how to automate cloud deployments and manage infrastructure as code.",
        topics: [
          "Infrastructure as Code (Terraform, CloudFormation)",
          "CI/CD Pipelines in the Cloud",
          "Serverless Computing (AWS Lambda, Cloud Functions)",
          "Containers & Kubernetes",
          "Load Balancing & Auto Scaling",
          "Hands-on: Deploy a Web App in the Cloud",
        ],
      },
      {
        title: "Advanced Cloud Concepts",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Dive into advanced topics and prepare for real-world cloud architecture.",
        topics: [
          "Multi-Cloud & Hybrid Strategies",
          "Disaster Recovery & High Availability",
          "Big Data & Machine Learning in the Cloud",
          "Cost Optimization Techniques",
          "Capstone Project: End-to-End Cloud Application",
        ],
      },
    ],
    programCardsHeading: [
      "Introduction to Cloud Computing",
      "Core Cloud Services",
      "Cloud Security & Identity",
      "Cloud Deployment & Automation",
      "Advanced Cloud Concepts",
    ],
    large_description:
      "This course introduces you to cloud computing concepts and the Amazon Web Services (AWS) platform. You'll learn how to design and deploy scalable, fault-tolerant applications using AWS services such as EC2, S3, Lambda, and RDS. The course also covers best practices for security, cost management, and performance optimization in the cloud.",
  },
  // {
  //   id: "t5",
  //   title: "Cybersecurity Essentials",
  //   description: "Protect networks, systems, and data from cyber threats.",
  //   icon: CybersecurityIcon,
  //   route: "/courses/cyber-security",
  //   slug: "cyber-security",
  //   image: "/cybersec.png",
  //   cardBg_image: "/cyber.png",
  //   projects: [
  //           {
  //               name: 'Network Security Assessment',
  //               description: 'Conduct comprehensive network security assessments to identify vulnerabilities and recommend solutions.',
  //               image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Ethical Hacking Lab',
  //               description: 'Build and operate an ethical hacking lab to practice penetration testing techniques safely.',
  //               image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Security Monitoring System',
  //               description: 'Design and implement a security monitoring system using SIEM tools to detect and respond to threats.',
  //               image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Incident Response Plan',
  //               description: 'Develop a comprehensive incident response plan for organizations to effectively handle security breaches.',
  //               image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Security Automation Framework',
  //               description: 'Create automated security tools and scripts to streamline security operations and incident response.',
  //               image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Web Application Security Testing',
  //               description: 'Perform security assessments on web applications to identify and mitigate common vulnerabilities.',
  //               image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           }
  //       ],
  //   modules: [
  //     {
  //       title: "Cybersecurity Fundamentals",
  //       duration: "2 weeks",
  //       lessons: 6,
  //       description:
  //         "Understand the core concepts, principles, and frameworks of cybersecurity.",
  //       topics: [
  //         "Introduction to Cybersecurity Landscape",
  //         "Security Principles: CIA Triad and Defense in Depth",
  //         "Types of Cyber Threats and Attack Vectors",
  //         "Security Frameworks and Compliance Standards",
  //         "Risk Assessment and Management",
  //         "Cybersecurity Ethics and Legal Considerations",
  //       ],
  //     },
  //     {
  //       title: "Network Security",
  //       duration: "2 weeks",
  //       lessons: 5,
  //       description:
  //         "Learn to secure network infrastructure and protect against network-based attacks.",
  //       topics: [
  //         "Network Architecture and Security Design",
  //         "Firewalls, IDS/IPS, and Network Monitoring",
  //         "VPNs and Secure Remote Access",
  //         "Wireless Network Security",
  //         "Network Vulnerability Assessment and Penetration Testing",
  //       ],
  //     },
  //     {
  //       title: "Application and Web Security",
  //       duration: "2 weeks",
  //       lessons: 6,
  //       description:
  //         "Master techniques for securing applications and web services against common vulnerabilities.",
  //       topics: [
  //         "OWASP Top 10 Vulnerabilities",
  //         "Secure Coding Practices",
  //         "Authentication and Authorization Mechanisms",
  //         "API Security",
  //         "Web Application Firewalls",
  //         "Security Testing and Code Review",
  //       ],
  //     },
  //     {
  //       title: "Cryptography and Data Protection",
  //       duration: "2 weeks",
  //       lessons: 5,
  //       description:
  //         "Understand cryptographic principles and implement data protection strategies.",
  //       topics: [
  //         "Cryptographic Algorithms and Protocols",
  //         "Public Key Infrastructure (PKI)",
  //         "Data Encryption and Hashing",
  //         "Digital Signatures and Certificates",
  //         "Data Loss Prevention Strategies",
  //       ],
  //     },
  //     {
  //       title: "Incident Response and Forensics",
  //       duration: "2 weeks",
  //       lessons: 6,
  //       description:
  //         "Learn to respond to security incidents and conduct digital forensic investigations.",
  //       topics: [
  //         "Incident Response Planning and Procedures",
  //         "Digital Forensics Methodology",
  //         "Evidence Collection and Handling",
  //         "Malware Analysis",
  //         "Log Analysis and Security Information Event Management (SIEM)",
  //         "Disaster Recovery and Business Continuity",
  //       ],
  //     },
  //   ],
  //   programCardsHeading: [
  //     "Cybersecurity Fundamentals",
  //     "Network Security",
  //     "Application & Web Security",
  //     "Cryptography & Data Protection",
  //     "Incident Response & Forensics",
  //   ],
  //   large_description:
  //     "This course provides an overview of cybersecurity principles and practices essential for protecting digital assets. Topics include network security, threat detection, incident response, and risk management. You'll learn how to implement security measures to safeguard systems and data from cyber threats and vulnerabilities.",
  // },
  // {
  //   id: "t6",
  //   title: "Data Science",
  //   description:
  //     "Learn the art of data manipulation with our well designed data science course.",
  //   icon: CybersecurityIcon,
  //   route: "/courses/data-science",
  //   slug: "data-science",
  //   image: "/datasci.png",
  //   cardBg_image: "/data.png",
  //   projects:[
  //           {
  //               name: 'Customer Segmentation',
  //               description: 'Analyze customer data to identify distinct segments for targeted marketing strategies.',
  //               image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Sales Forecasting',
  //               description: 'Build predictive models to forecast future sales based on historical data and market trends.',
  //               image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Interactive Dashboard',
  //               description: 'Create interactive data visualizations and dashboards to communicate insights effectively.',
  //               image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Social Media Analysis',
  //               description: 'Analyze social media data to extract insights about brand perception and customer sentiment.',
  //               image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Fraud Detection System',
  //               description: 'Develop models to identify fraudulent transactions and activities in financial data.',
  //               image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           },
  //           {
  //               name: 'Market Basket Analysis',
  //               description: 'Analyze purchase patterns to identify product associations and optimize product placement.',
  //               image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  //           }
  //       ],
  //   modules: [
  //     {
  //       title: "Data Science Fundamentals",
  //       duration: "2 weeks",
  //       lessons: 5,
  //       description:
  //         "Understand the data science lifecycle and essential tools for data analysis.",
  //       topics: [
  //         "Introduction to Data Science and Its Applications",
  //         "Data Science Workflow and Methodology",
  //         "Python for Data Science: NumPy and Pandas",
  //         "Data Collection and Data Wrangling",
  //         "Exploratory Data Analysis (EDA)",
  //       ],
  //     },
  //     {
  //       title: "Statistical Analysis and Visualization",
  //       duration: "2 weeks",
  //       lessons: 6,
  //       description:
  //         "Master statistical methods and data visualization techniques for effective data storytelling.",
  //       topics: [
  //         "Descriptive and Inferential Statistics",
  //         "Probability Distributions and Hypothesis Testing",
  //         "Correlation and Regression Analysis",
  //         "Data Visualization Principles",
  //         "Visualization Tools: Matplotlib, Seaborn, and Plotly",
  //         "Interactive Dashboards with Tableau",
  //       ],
  //     },
  //     {
  //       title: "Machine Learning for Data Science",
  //       duration: "3 weeks",
  //       lessons: 7,
  //       description:
  //         "Apply machine learning algorithms to solve data science problems and make predictions.",
  //       topics: [
  //         "Supervised Learning Algorithms",
  //         "Unsupervised Learning and Clustering",
  //         "Dimensionality Reduction Techniques",
  //         "Ensemble Methods",
  //         "Time Series Analysis and Forecasting",
  //         "Model Selection and Hyperparameter Tuning",
  //         "Cross-Validation and Performance Metrics",
  //       ],
  //     },
  //     {
  //       title: "Big Data Analytics",
  //       duration: "2 weeks",
  //       lessons: 5,
  //       description:
  //         "Learn techniques for processing and analyzing large-scale datasets.",
  //       topics: [
  //         "Introduction to Big Data Ecosystems",
  //         "Distributed Computing with Spark",
  //         "SQL for Data Analysis",
  //         "NoSQL Databases",
  //         "Cloud Computing for Data Science",
  //       ],
  //     },
  //     {
  //       title: "Data Science in Practice",
  //       duration: "3 weeks",
  //       lessons: 6,
  //       description:
  //         "Apply data science techniques to real-world problems and learn best practices for deployment.",
  //       topics: [
  //         "End-to-End Data Science Projects",
  //         "Feature Engineering in Practice",
  //         "Model Deployment and API Development",
  //         "Data Ethics and Privacy",
  //         "Communicating Data Science Results",
  //         "Data Science Project Management",
  //       ],
  //     },
  //   ],
  //   programCardsHeading: [
  //     "Data Science Fundamentals",
  //     "Stasticial Analysis and Visualization",
  //     "Machine learning for Data Science",
  //     "Big Data Analytics",
  //     "Data Science in Practice",
  //   ],
    
  //   large_description:
  //     "This course provides an overview of cybersecurity principles and practices essential for protecting digital assets. Topics include network security, threat detection, incident response, and risk management. You'll learn how to implement security measures to safeguard systems and data from cyber threats and vulnerabilities.",
  // },
];


export const ElectronicsCourses: CourseType[] = [
  {
    id: "e1",
    title: "Internet of Things (IoT)",
    description:
      "Learn to build and program connected smart devices for the real world.",
    icon: Network,
    route: "/courses/iot",
    slug: "iot",
    image: "/human.png",
    cardBg_image: "/human.png",
    projects: [
      {
        name: "Smart Home Automation",
        description:
          "Build a system to control lights, fans, and other appliances remotely via a web dashboard.",
        image:
          "https://images.unsplash.com/photo-1596248924036-d24778028a4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Weather Monitoring Station",
        description:
          "Create a device that collects temperature, humidity, and pressure data and sends it to the cloud.",
        image:
          "https://images.unsplash.com/photo-1561553594-87db31828f8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Wearable Health Tracker",
        description:
          "Design a prototype for a wearable device to monitor vital signs like heart rate and steps.",
        image:
          "https://images.unsplash.com/photo-1517838277531-412e46251d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Smart Agriculture System",
        description:
          "Develop an automated system to monitor soil moisture and control an irrigation pump.",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Asset Tracking System",
        description:
          "Build a GPS-based tracker to monitor the real-time location of a vehicle or package.",
        image:
          "https://images.unsplash.com/photo-1567684014761-b65e2e59b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Home Security System",
        description:
          "Create a motion-activated security camera that sends alerts and images to a user's phone.",
        image:
          "https://images.unsplash.com/photo-1589935447037-38b439c0b115?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
    ],
    modules: [
      {
        title: "Intro to IoT & Microcontrollers",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Grasp the fundamentals of IoT and learn to program microcontrollers like ESP32.",
        topics: [
          "What is the Internet of Things (IoT)?",
          "Introduction to Microcontrollers (Arduino, ESP32)",
          "Basic Electronics: Sensors, Actuators, and Circuits",
          "Setting Up the Development Environment (Arduino IDE)",
          "Writing Your First Embedded Program (Blink)",
        ],
      },
      {
        title: "Sensors, Actuators, and Communication",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Interface a variety of sensors and actuators with your microcontroller to interact with the physical world.",
        topics: [
          "Reading Digital and Analog Sensors",
          "Controlling Motors, Relays, and LEDs",
          "Serial Communication Protocols (UART, I2C, SPI)",
          "Connecting to Wi-Fi and Bluetooth",
          "Power Management for IoT Devices",
        ],
      },
      {
        title: "IoT Cloud Platforms & Protocols",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Connect your devices to the internet and send data to cloud platforms using standard IoT protocols.",
        topics: [
          "Understanding Client-Server Architecture",
          "Introduction to MQTT Protocol",
          "Setting up an MQTT Broker",
          "Connecting to Cloud Platforms (AWS IoT Core, Adafruit IO)",
          "Publishing and Subscribing to Data Feeds",
        ],
      },
      {
        title: "Data Visualization & Device Control",
        duration: "1 week",
        lessons: 4,
        description:
          "Build web-based dashboards to visualize sensor data and control your IoT devices from anywhere.",
        topics: [
          "Creating Real-time Dashboards",
          "Visualizing Data with Gauges, Charts, and Graphs",
          "Sending Commands from the Cloud to Your Device",
          "Setting Up Alerts and Notifications",
          "API Integration for IoT",
        ],
      },
      {
        title: "IoT Security and Project Deployment",
        duration: "1 week",
        lessons: 4,
        description:
          "Learn best practices for securing your IoT ecosystem and deploying a final, robust project.",
        topics: [
          "Common IoT Security Vulnerabilities",
          "Securing Device Communication with TLS/SSL",
          "Over-the-Air (OTA) Updates",
          "Designing a Scalable IoT Architecture",
          "Final Project: Build and Deploy a Complete IoT System",
        ],
      },
    ],
    large_description:
      "Dive into the world of the Internet of Things (IoT) and learn how to build smart, connected devices. This hands-on course takes you from basic electronics and microcontroller programming to connecting your creations to the cloud. You will work with popular platforms like the ESP32, master communication protocols like MQTT, and build interactive dashboards to visualize data and control hardware remotely. By the end, you will have the skills to design, build, and deploy your own secure and scalable IoT solutions from scratch.",
    programCardsHeading: [
      "Intro to IoT & Microcontrollers",
      "Sensors, Actuators, and Communication",
      "IoT Cloud Platforms & Protocols",
      "Data Visualization & Device Control",
      "IoT Security and Project Deployment",
    ],
  },
];


export const MechanicalCourses: CourseType[] = [
  {
    id: "mechanical1",
    title: "AutoCAD: 2D & 3D Design",
    description:
      "Master 2D drafting and 3D modeling with the industry-standard design software.",
    icon: Search,
    route: "/courses/autocad",
    slug: "autocad",
    image: "/humanres.png",
    cardBg_image: "/human.png",
    projects: [
      {
        name: "Architectural Floor Plan",
        description:
          "Design a detailed 2D floor plan for a house, including walls, doors, windows, and dimensions.",
        image:
          "https://images.unsplash.com/photo-1581362678913-9154f982390b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Mechanical Part Modeling",
        description:
          "Create a precise 3D model of a mechanical component, like a gear or bracket, ready for manufacturing.",
        image:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "3D Interior Design Scene",
        description:
          "Model and render a realistic 3D interior scene, complete with furniture, lighting, and textures.",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Assembly Drawing with BOM",
        description:
          "Create an exploded view of a multi-part assembly and automatically generate a bill of materials.",
        image:
          "https://images.unsplash.com/photo-1628198495111-a83151368531?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Site Plan Layout",
        description:
          "Develop a 2D site plan for a construction project, showing property lines, building footprints, and landscaping.",
        image:
          "https://images.unsplash.com/photo-1599493356244-a7b68a18357a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Piping and Instrumentation Diagram",
        description:
          "Draft a professional P&ID schematic for an industrial process using standard symbols and annotations.",
        image:
          "https://images.unsplash.com/photo-1614361324261-1b78b05615f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
    ],
    modules: [
      {
        title: "AutoCAD Fundamentals & 2D Drafting",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Get started with the AutoCAD interface and master the essential tools for creating precise 2D drawings.",
        topics: [
          "Navigating the AutoCAD Interface & Ribbon",
          "Drawing & Modifying Objects (Line, Circle, Arc, Trim)",
          "Using Layers, Colors, and Linetypes for Organization",
          "Precision Drawing with Snaps and Grids",
          "Adding Text and Dimensions to Drawings",
          "Working with Blocks and Attributes for Reusability",
        ],
      },
      {
        title: "Advanced 2D Techniques & Plotting",
        duration: "1 week",
        lessons: 4,
        description:
          "Enhance your 2D drafting efficiency with advanced commands and learn to print your designs to scale.",
        topics: [
          "Using Polylines and Splines for Complex Shapes",
          "Creating and Editing Hatch Patterns",
          "Working with External References (Xrefs)",
          "Layouts, Viewports, and Plotting to Scale",
        ],
      },
      {
        title: "Introduction to 3D Modeling",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Transition from 2D to 3D by learning the fundamental concepts and tools for creating 3D solid models.",
        topics: [
          "Understanding the 3D Workspace and UCS",
          "Creating Primitive Solids (Box, Cylinder, Sphere)",
          "Extrude, Revolve, Sweep, and Loft Commands",
          "Boolean Operations: Union, Subtract, Intersect",
          "Navigating 3D Models with Orbit and ViewCube",
        ],
      },
      {
        title: "Advanced 3D Modeling & Editing",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Refine your 3D models with advanced editing tools and learn to generate 2D views from them.",
        topics: [
          "Filleting and Chamfering 3D Edges",
          "Working with 3D Gizmos for Move, Rotate, Scale",
          "Solid Editing Commands: Shell, Taper, Slice",
          "Creating Complex Shapes from 2D Profiles",
          "Generating 2D Orthographic and Section Views from 3D Models",
        ],
      },
      {
        title: "Rendering and Visualization",
        duration: "1 week",
        lessons: 4,
        description:
          "Bring your 3D models to life by applying materials, setting up lighting, and creating photorealistic renderings.",
        topics: [
          "Applying Materials and Textures from the Library",
          "Setting up Lights (Point, Spot, Sunlight)",
          "Configuring Cameras and Perspectives for Views",
          "Rendering a Final Image with Realistic Shadows",
        ],
      },
    ],
    large_description:
      "This course provides a complete journey into AutoCAD, the world's leading software for computer-aided design (CAD). Starting with the basics of 2D drafting, you'll learn to create precise and detailed technical drawings used in architecture, engineering, and construction. Then, you'll transition into the third dimension, mastering the tools to build complex 3D models. The curriculum covers everything from basic shapes to advanced solid editing and culminates in creating photorealistic renderings of your designs. By the end, you'll be proficient in producing professional-grade drawings and models for any technical field.",
    programCardsHeading: [
      "AutoCAD Fundamentals & 2D Drafting",
      "Advanced 2D Techniques & Plotting",
      "Introduction to 3D Modeling",
      "Advanced 3D Modeling & Editing",
      "Rendering and Visualization",
    ],
  },
];

export const CivilCourses: CourseType[] = [
{
    id: "a1",
    title: "AutoCAD: 2D & 3D Design",
    description:
      "Master 2D drafting and 3D modeling with the industry-standard design software.",
    icon: Search,
    route: "/courses/autocad",
    slug: "autocad",
    image: "/human.png",
    cardBg_image: "/human.png",
    projects: [
      {
        name: "Architectural Floor Plan",
        description:
          "Design a detailed 2D floor plan for a house, including walls, doors, windows, and dimensions.",
        image:
          "https://images.unsplash.com/photo-1581362678913-9154f982390b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Mechanical Part Modeling",
        description:
          "Create a precise 3D model of a mechanical component, like a gear or bracket, ready for manufacturing.",
        image:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "3D Interior Design Scene",
        description:
          "Model and render a realistic 3D interior scene, complete with furniture, lighting, and textures.",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Assembly Drawing with BOM",
        description:
          "Create an exploded view of a multi-part assembly and automatically generate a bill of materials.",
        image:
          "https://images.unsplash.com/photo-1628198495111-a83151368531?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Site Plan Layout",
        description:
          "Develop a 2D site plan for a construction project, showing property lines, building footprints, and landscaping.",
        image:
          "https://images.unsplash.com/photo-1599493356244-a7b68a18357a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Piping and Instrumentation Diagram",
        description:
          "Draft a professional P&ID schematic for an industrial process using standard symbols and annotations.",
        image:
          "https://images.unsplash.com/photo-1614361324261-1b78b05615f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
    ],
    modules: [
      {
        title: "AutoCAD Fundamentals & 2D Drafting",
        duration: "2 weeks",
        lessons: 6,
        description:
          "Get started with the AutoCAD interface and master the essential tools for creating precise 2D drawings.",
        topics: [
          "Navigating the AutoCAD Interface & Ribbon",
          "Drawing & Modifying Objects (Line, Circle, Arc, Trim)",
          "Using Layers, Colors, and Linetypes for Organization",
          "Precision Drawing with Snaps and Grids",
          "Adding Text and Dimensions to Drawings",
          "Working with Blocks and Attributes for Reusability",
        ],
      },
      {
        title: "Advanced 2D Techniques & Plotting",
        duration: "1 week",
        lessons: 4,
        description:
          "Enhance your 2D drafting efficiency with advanced commands and learn to print your designs to scale.",
        topics: [
          "Using Polylines and Splines for Complex Shapes",
          "Creating and Editing Hatch Patterns",
          "Working with External References (Xrefs)",
          "Layouts, Viewports, and Plotting to Scale",
        ],
      },
      {
        title: "Introduction to 3D Modeling",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Transition from 2D to 3D by learning the fundamental concepts and tools for creating 3D solid models.",
        topics: [
          "Understanding the 3D Workspace and UCS",
          "Creating Primitive Solids (Box, Cylinder, Sphere)",
          "Extrude, Revolve, Sweep, and Loft Commands",
          "Boolean Operations: Union, Subtract, Intersect",
          "Navigating 3D Models with Orbit and ViewCube",
        ],
      },
      {
        title: "Advanced 3D Modeling & Editing",
        duration: "2 weeks",
        lessons: 5,
        description:
          "Refine your 3D models with advanced editing tools and learn to generate 2D views from them.",
        topics: [
          "Filleting and Chamfering 3D Edges",
          "Working with 3D Gizmos for Move, Rotate, Scale",
          "Solid Editing Commands: Shell, Taper, Slice",
          "Creating Complex Shapes from 2D Profiles",
          "Generating 2D Orthographic and Section Views from 3D Models",
        ],
      },
      {
        title: "Rendering and Visualization",
        duration: "1 week",
        lessons: 4,
        description:
          "Bring your 3D models to life by applying materials, setting up lighting, and creating photorealistic renderings.",
        topics: [
          "Applying Materials and Textures from the Library",
          "Setting up Lights (Point, Spot, Sunlight)",
          "Configuring Cameras and Perspectives for Views",
          "Rendering a Final Image with Realistic Shadows",
        ],
      },
    ],
    large_description:
      "This course provides a complete journey into AutoCAD, the world's leading software for computer-aided design (CAD). Starting with the basics of 2D drafting, you'll learn to create precise and detailed technical drawings used in architecture, engineering, and construction. Then, you'll transition into the third dimension, mastering the tools to build complex 3D models. The curriculum covers everything from basic shapes to advanced solid editing and culminates in creating photorealistic renderings of your designs. By the end, you'll be proficient in producing professional-grade drawings and models for any technical field.",
    programCardsHeading: [
      "AutoCAD Fundamentals & 2D Drafting",
      "Advanced 2D Techniques & Plotting",
      "Introduction to 3D Modeling",
      "Advanced 3D Modeling & Editing",
      "Rendering and Visualization",
    ],
  },
]

export const managementContent: ContentType = {
  heading: "Lead with Confidence.",
  subheading: "Excel in Business & Management.",
  paragraph:
    "Our management curriculum is tailored for aspiring leaders and seasoned professionals alike. Gain the strategic skills needed to navigate the complexities of the modern business world.",
};


export const electronicsContent: ContentType = {
  heading: "Engineer the Connections.",
  subheading: "Explore the World of Electronics.",
  paragraph: "From microcontrollers to the Internet of Things, our courses provide the foundational knowledge to build and innovate in the field of electronics.",
};

export const mechanicalContent: ContentType = {
  heading: "Design the Movement.",
  subheading: "Master Mechanical Engineering.",
  paragraph: "Learn the principles of design, analysis, and manufacturing with industry-standard software and hands-on projects that bring ideas to life.",
};

export const civilContent: ContentType = {
  heading: "Build the World.",
  subheading: "Innovate in Civil Engineering.",
  paragraph: "Shape the infrastructure of tomorrow. Our curriculum covers structural design, analysis, and modern construction techniques.",
};


// NEW: Create a single, unified data structure for all domains
export const allDomains = [
  {
    view: 'management',
    name: 'Management',
    courses: managementCourses,
    content: managementContent,
    enabled: true,
  },
  {
    view: 'technical',
    name: 'Computer Science',
    courses: technicalCourses,
    content: technicalContent,
    enabled: true,
  },
  {
    view: 'electronics',
    name: 'Electronics',
    courses: ElectronicsCourses,
    content: electronicsContent,
    enabled: true,
  },
  {
    view: 'mechanical',
    name: 'Mechanical',
    courses: MechanicalCourses,
    content: mechanicalContent,
    enabled: true,
  },
  {
    view: 'civil',
    name: 'Civil',
    courses: CivilCourses,
    content: civilContent,
    enabled: true,
  },
];


export type DomainView = typeof allDomains[number]['view'];