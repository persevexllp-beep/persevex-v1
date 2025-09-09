import React, { ComponentType } from "react";

export type IconType = ComponentType<{ className?: string }>;

export interface ModuleType {
  title: string;
  duration: string;
  lessons: number;
  description: string;
  topics: string[];
}

// 2. Update CourseType to include an optional array of modules
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
  modules?: ModuleType[]; // <-- ADD THIS NEW PROPERTY
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

export const FinanceIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-green-500"
  >
    <path
      d="M12 21V12M12 12H3.5M12 12H20.5M4 7H20M17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MarketingIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-orange-500"
  >
    <path
      d="M3 3V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 3V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HRIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-red-500"
  >
    <path
      d="M17 21V19C17 16.7909 15.2091 15 13 15H11C8.79086 15 7 16.7909 7 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WebDevIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-500"
  >
    <path
      d="M7 8L3 12L7 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 8L21 12L17 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 4L10 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AIIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-cyan-500"
  >
    <path
      d="M12 8V4H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 8H8V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 20V16H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16H8V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8H16V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8V4H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 16H16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16V20H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MLIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-purple-500"
  >
    <path
      d="M12 13V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 13V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3L5.5 7.5L12 12L18.5 7.5L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloudIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-indigo-500"
  >
    <path
      d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 10.3347 6.02996 10.6652 6.08839 10.9882C4.35414 11.8585 3 13.7025 3 16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16C21 13.7025 19.6459 11.8585 17.9116 10.9882C17.97 10.6652 18 10.3347 18 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CybersecurityIcon: IconType = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-pink-500"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 2V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const managementCourses: CourseType[] = [
  {
    id: "m1",
    title: "Finance for Managers",
    description: "Understand key financial principles to make better business decisions.",
    icon: FinanceIcon,
    route: "/courses/finance",
    slug: "finance",
    image: "/financecourse.png",
    cardBg_image: "/finance1.png",
    modules: [
  {
    "title": "Financial Statements & Analysis",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Learn to analyze and interpret financial statements to make informed business decisions.",
    "topics": [
      "Understanding Income Statements, Balance Sheets, and Cash Flow Statements",
      "Financial Ratio Analysis and Interpretation",
      "Trend Analysis and Comparative Analysis",
      "Common-Size Financial Statements",
      "Financial Statement Forecasting"
    ]
  },
  {
    "title": "Excel for Financial Modeling",
    "duration": "1 week",
    "lessons": 4,
    "description": "Master advanced Excel techniques essential for building robust financial models.",
    "topics": [
      "Advanced Excel Functions (VLOOKUP, INDEX-MATCH, OFFSET)",
      "Data Tables and Scenario Analysis",
      "Sensitivity Analysis and Goal Seek",
      "Excel Shortcuts and Efficiency Techniques"
    ]
  },
  {
    "title": "Discounted Cash Flow (DCF) Modeling",
    "duration": "2 weeks",
    "lessons": 6,
    "description": "Build comprehensive DCF models to value companies and investment opportunities.",
    "topics": [
      "Forecasting Revenue and Expenses",
      "Calculating Free Cash Flows",
      "Determining Discount Rates (WACC)",
      "Terminal Value Calculations",
      "Sensitivity Analysis and Scenario Modeling",
      "Building a Complete DCF Model"
    ]
  },
  {
    "title": "M&A Modeling and LBO Analysis",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Learn to model mergers, acquisitions, and leveraged buyouts to evaluate deal structures.",
    "topics": [
      "Accretion/Dilution Analysis",
      "Synergy Valuation",
      "Purchase Price Allocation",
      "LBO Model Structure and Returns Analysis",
      "Debt Schedules and Covenant Analysis"
    ]
  },
  {
    "title": "Advanced Valuation Techniques",
    "duration": "1 week",
    "lessons": 4,
    "description": "Explore advanced valuation methodologies used by investment professionals.",
    "topics": [
      "Comparable Company Analysis",
      "Precedent Transaction Analysis",
      "Sum-of-the-Parts Valuation",
      "Real Options Valuation"
    ]
  }
],
    large_description: "This course provides a comprehensive overview of financial principles essential for effective management. Topics include financial statement analysis, budgeting, forecasting, and investment decision-making. By the end of the course, you'll be equipped to interpret financial data and make informed decisions that drive business success.",
    programCardsHeading: ['Financial Statements & Analysis', 'Excel for Financial Modeling', 'Discounted Cash Flow (DCF) Modeling', 'M&A Modeling and LBO Analysis', 'Advanced Valuation Techniques']
  },
  {
    id: "m2",
    title: "Digital Marketing Strategy",
    description: "Master SEO, SEM, and social media to drive growth and engagement.",
    icon: MarketingIcon,
    route: "/courses/digital-marketing",
    slug: "digital-marketing",
    image: '/digitalmarketing.png',
    cardBg_image: "/digital-marketing1.png",
    modules: [
  {
    "title": "Search Engine Optimization (SEO)",
    "duration": "2 weeks",
    "lessons": 6,
    "description": "Master the fundamentals of SEO to improve website visibility and organic traffic.",
    "topics": [
      "Keyword Research and Analysis",
      "On-Page SEO Optimization",
      "Technical SEO Fundamentals",
      "Link Building Strategies",
      "Local SEO Techniques",
      "SEO Analytics and Reporting"
    ]
  },
  {
    "title": "Pay-Per-Click (PPC) Advertising",
    "duration": "1 week",
    "lessons": 5,
    "description": "Learn to create and manage effective paid advertising campaigns across multiple platforms.",
    "topics": [
      "Google Ads Campaign Structure",
      "Keyword Match Types and Bidding Strategies",
      "Ad Copywriting and Testing",
      "Display and Remarketing Campaigns",
      "PPC Analytics and Optimization"
    ]
  },
  {
    "title": "Social Media Marketing",
    "duration": "2 weeks",
    "lessons": 7,
    "description": "Develop strategies for effective social media marketing across multiple platforms.",
    "topics": [
      "Platform-Specific Strategies (Facebook, Instagram, LinkedIn, Twitter)",
      "Content Creation and Curation",
      "Community Management and Engagement",
      "Social Media Advertising",
      "Influencer Marketing Strategies",
      "Social Media Analytics and ROI Measurement",
      "Social Listening and Reputation Management"
    ]
  },
  {
    "title": "Email Marketing",
    "duration": "1 week",
    "lessons": 4,
    "description": "Master email marketing strategies to build relationships and drive conversions.",
    "topics": [
      "Building and Segmenting Email Lists",
      "Email Copywriting and Design",
      "Automation and Drip Campaigns",
      "A/B Testing and Optimization"
    ]
  },
  {
    "title": "Digital Analytics",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Learn to measure, analyze, and optimize digital marketing performance.",
    "topics": [
      "Google Analytics Implementation and Reporting",
      "Conversion Tracking and Goal Setting",
      "Attribution Modeling",
      "Data Visualization and Dashboards",
      "Data-Driven Decision Making"
    ]
  }
],
    programCardsHeading: ['Search Engine Optimization (SEO)', 'Pay-Per-Click (PPC) Advertising', 'Social Media Marketing', 'Email Marketing', 'Digital Analytics'],
    large_description: "Dive into the world of digital marketing with this strategic course designed for modern managers. Learn how to create and implement effective marketing campaigns using SEO, SEM, content marketing, and social media platforms. The course also covers analytics and performance measurement to help you optimize your marketing efforts for maximum ROI."
  },
  {
    id: "m3",
    title: "Modern Human Resources",
    description: "Learn to attract, manage, and retain top talent in today's workplace.",
    icon: HRIcon,
    route: "/courses/human-resource",
    slug: "human-resourse",
    image: '/humanresource.png',
    cardBg_image: "/human-resource1.png",
    modules: [
  {
    "title": "Talent Acquisition",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Master strategies for attracting, recruiting, and selecting top talent.",
    "topics": [
      "Job Analysis and Competency Mapping",
      "Recruitment Channels and Employer Branding",
      "Interviewing Techniques and Assessment Methods",
      "Candidate Experience and Onboarding",
      "Recruitment Metrics and Analytics"
    ]
  },
  {
    "title": "Performance Management",
    "duration": "1 week",
    "lessons": 4,
    "description": "Develop effective performance management systems to drive employee productivity.",
    "topics": [
      "Goal Setting and KPI Development",
      "Performance Review Processes",
      "Feedback Techniques and Coaching",
      "Performance Improvement Plans"
    ]
  },
  {
    "title": "Learning & Development",
    "duration": "2 weeks",
    "lessons": 6,
    "description": "Learn to design and implement effective training and development programs.",
    "topics": [
      "Training Needs Analysis",
      "Learning Program Design and Delivery",
      "E-Learning and Blended Learning Approaches",
      "Measuring Training Effectiveness",
      "Career Development Planning",
      "Succession Planning"
    ]
  },
  {
    "title": "Compensation & Benefits",
    "duration": "1 week",
    "lessons": 4,
    "description": "Design competitive compensation and benefits packages to attract and retain talent.",
    "topics": [
      "Salary Structure Design",
      "Incentive and Bonus Programs",
      "Benefits Administration",
      "Total Rewards Strategy"
    ]
  },
  {
    "title": "HR Analytics",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Leverage data for strategic HR decision-making and workforce planning.",
    "topics": [
      "HR Metrics and KPIs",
      "Workforce Analytics and Reporting",
      "Predictive Analytics in HR",
      "Data Visualization for HR",
      "Data-Driven HR Strategy"
    ]
  }
],
    programCardsHeading: ['Talent Acquisition', 'Performance Management', 'Learning & Development', 'Compensation & Benefits', 'HR Analytics'],
    large_description: "This course explores contemporary human resource management practices essential for building and maintaining a productive workforce. Topics include talent acquisition, employee engagement, performance management, and legal considerations in HR. You'll gain practical skills to create a positive work environment that attracts and retains top talent."
  },
];

export const technicalCourses: CourseType[] = [
  {
    id: "t1",
    title: "Web Development Mastery",
    description: "From HTML to advanced React, become a full-stack web developer.",
    icon: WebDevIcon,
    route: "/courses/web-development",
    slug: "web-development",
    image: '/webdevelopment.png',
    cardBg_image: "/web-development1.png",
    programCardsHeading: ['Intoduction to Web Development', 'HTML & CSS Essentials', 'Javascript Programming', 'Frontend Frameworks with React.js', 'Backend Development with NodeJS & MongoDB'],
    large_description: "This comprehensive course takes you from the basics of web development to advanced full-stack techniques. You'll learn HTML, CSS, and JavaScript fundamentals before diving into popular frameworks like React for front-end development and Node.js for back-end development. By the end of the course, you'll be able to build and deploy dynamic web applications."
  },
   {
    id: "t2",
    title: "Artificial Intelligence",
    description: "Explore the foundations of AI and build intelligent agents.",
    icon: AIIcon,
    route: "/courses/artificial-intelligence",
    slug: "artificial-intelligence",
    image: '/artificialintelligence.png',
    cardBg_image: "/artificial-intelligence1.png",
    programCardsHeading: ['Foundation of AI', 'Machine Learning Fundamentals', 'Neural Networks and Deep Learning', 'Natural Language Processing', 'AI applications and deployment'],
    large_description: "This course provides a solid foundation in artificial intelligence concepts and techniques. You'll explore topics such as machine learning, neural networks, natural language processing, and computer vision. Through hands-on projects, you'll learn how to build intelligent agents that can perform tasks such as classification, prediction, and decision-making.",
    // ADD THE MODULES DATA HERE
    modules: [
      {
        title: "Foundations of AI",
        duration: "2 weeks",
        lessons: 6,
        description: "Understand the core concepts, history, and ethical considerations of artificial intelligence.",
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
        "title": "Machine Learning Fundamentals",
        "duration": "3 weeks",
        "lessons": 8,
        "description": "Learn the core principles of machine learning and implement basic algorithms.",
        "topics": [
          "Supervised vs. Unsupervised Learning",
          "Regression and Classification Algorithms",
          "Decision Trees and Random Forests",
          "Support Vector Machines",
          "Feature Engineering and Selection",
          "Model Evaluation and Validation",
          "Overfitting and Regularization",
          "Practical Implementation with Scikit-learn"
        ]
},
      {
    "title": "Neural Networks and Deep Learning",
    "duration": "3 weeks",
    "lessons": 7,
    "description": "Master the architecture and training of neural networks for complex pattern recognition.",
    "topics": [
      "Neural Network Architecture and Components",
      "Activation Functions and Backpropagation",
      "Convolutional Neural Networks (CNNs)",
      "Recurrent Neural Networks (RNNs) and LSTMs",
      "Transfer Learning and Fine-tuning",
      "Deep Learning Frameworks: TensorFlow and PyTorch",
      "GPU Acceleration and Model Optimization"
    ]
  },
     {
    "title": "Natural Language Processing",
    "duration": "2 weeks",
    "lessons": 5,
    "description": "Learn techniques for processing and understanding human language with AI.",
    "topics": [
      "Text Preprocessing and Tokenization",
      "Word Embeddings and Language Models",
      "Sentiment Analysis and Text Classification",
      "Named Entity Recognition",
      "Transformer Models and BERT"
    ]
  },
  {
    "title": "AI Applications and Deployment",
    "duration": "2 weeks",
    "lessons": 6,
    "description": "Apply AI to real-world problems and learn to deploy models in production environments.",
    "topics": [
      "Computer Vision Applications",
      "Conversational AI and Chatbots",
      "Recommendation Systems",
      "Model Deployment and API Development",
      "MLOps and Model Monitoring",
      "AI Project Management and Best Practices"
    ]
  }
    ],
  },
  {
    id: "t3",
    title: "Machine Learning Ops",
    description: "Dive into data analysis, model deployment, and MLOps.",
    icon: MLIcon,
    route: "/courses/machine-learning",
    slug: "machine-learning",
    image: '/machinelearning.png',
    cardBg_image: "/machine-learning1.png",
    programCardsHeading: ['Introduction to Machine Learning', 'Supervised Learnign Algorithms', 'Unsupervised Learning', 'Deep Learning Fundamentals', 'Advanced Machine Learning Topics'],
    large_description: "This course focuses on the practical aspects of machine learning, including data analysis, model training, and deployment. You'll learn how to preprocess data, select appropriate algorithms, and evaluate model performance. Additionally, the course covers MLOps practices for deploying and maintaining machine learning models in production environments."
  },
  {
    id: "t4",
    title: "Cloud Computing (AWS)",
    description: "Architect and deploy scalable, fault-tolerant applications on AWS.",
    icon: CloudIcon,
    route: "/courses/cloud-computing",
    slug: "cloud-computing",
    image: '/cloudcomputing.png',
    cardBg_image: "/cloud-computing1.png",
    programCardsHeading: ['Introduction to Cloud Computing', 'Core Cloud Services', 'Cloud Security & Identity', 'Cloud Deployment & Automation', 'Advanced Cloud Concepts'],
    large_description: "This course introduces you to cloud computing concepts and the Amazon Web Services (AWS) platform. You'll learn how to design and deploy scalable, fault-tolerant applications using AWS services such as EC2, S3, Lambda, and RDS. The course also covers best practices for security, cost management, and performance optimization in the cloud."
  },
  {
    id: "t5",
    title: "Cybersecurity Essentials",
    description: "Protect networks, systems, and data from cyber threats.",
    icon: CybersecurityIcon,
    route: "/courses/cybersecurity",
    slug: "cybersecurity",
    image: '/cybersecurity.png',
    cardBg_image: "/cybersecurity1.png",
    programCardsHeading: ['Cybersecurity Fundamentals', 'Network Security', 'Application & Web Security' , 'Cryptography & Data Protection', 'Incident Response & Forensics'],
    large_description: "This course provides an overview of cybersecurity principles and practices essential for protecting digital assets. Topics include network security, threat detection, incident response, and risk management. You'll learn how to implement security measures to safeguard systems and data from cyber threats and vulnerabilities."
  },
  {
    id: "t6",
    title: "Data Science",
    description: "Learn the art of data manipulation with our well designed data science course.",
    icon: CybersecurityIcon,
    route: "/courses/datascience",
    slug: "datascience",
    image: '/datasciencecourse.png',
    cardBg_image: "/data-science.png",
    programCardsHeading: ['Data Science Fundamentals', 'Stasticial Analysis and Visualization','Machine learning for Data Science', 'Big Data Analytics', 'Data Science in Practice'],
    large_description: "This course provides an overview of cybersecurity principles and practices essential for protecting digital assets. Topics include network security, threat detection, incident response, and risk management. You'll learn how to implement security measures to safeguard systems and data from cyber threats and vulnerabilities."
  },

];

export const managementContent: ContentType = {
  heading: "Lead with Confidence.",
  subheading: "Excel in Business & Management.",
  paragraph:
    "Our management curriculum is tailored for aspiring leaders and seasoned professionals alike. Gain the strategic skills needed to navigate the complexities of the modern business world.",
};
