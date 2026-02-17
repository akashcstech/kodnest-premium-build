export type JobMode = "Remote" | "Hybrid" | "Onsite";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: JobMode;
  experience: string;
  skills: string[];
  source: string;
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
}

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "SDE Intern - Payments Platform",
    company: "Razorpay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Spring Boot", "REST APIs", "SQL"],
    source: "Company Site",
    postedDaysAgo: 0,
    salaryRange: "₹40k–₹60k/month Internship",
    applyUrl: "https://razorpay.com/careers/sde-intern-payments-platform",
    description:
      "Work with the core payments engineering team to build high-scale services used by thousands of merchants.\n" +
      "Implement features under mentorship, write clean and testable Java code, and participate in weekly design reviews.\n" +
      "You will be exposed to concepts like idempotency, eventual consistency, and secure payment processing.\n" +
      "Ideal for final year students or fresh graduates with strong CS fundamentals.",
  },
  {
    id: "job-2",
    title: "Graduate Engineer Trainee - Full Stack",
    company: "Infosys",
    location: "Mysuru",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Java", "React", "HTML", "CSS"],
    source: "Naukri",
    postedDaysAgo: 1,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.infosys.com/graduate-engineer-trainee-fullstack",
    description:
      "Join the Infosys training cohort and learn to build full-stack enterprise applications.\n" +
      "You will rotate across backend, frontend, and testing tracks before being mapped to a project.\n" +
      "Strong communication skills and willingness to relocate across India are expected.\n" +
      "Bond and service agreement policies will be applicable for this role.",
  },
  {
    id: "job-3",
    title: "Junior Backend Developer - Java",
    company: "TCS",
    location: "Pune",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Spring", "REST", "Git"],
    source: "Company Site",
    postedDaysAgo: 2,
    salaryRange: "4–7 LPA",
    applyUrl: "https://ibegin.tcs.com/jr-backend-developer-java-pune",
    description:
      "Build and maintain backend services for large enterprise clients across BFSI and Retail domains.\n" +
      "Collaborate with solution designers to translate requirements into scalable microservices.\n" +
      "Follow secure coding standards and participate in code reviews and performance tuning.\n" +
      "Exposure to cloud platforms like AWS or Azure is a plus.",
  },
  {
    id: "job-4",
    title: "Frontend Intern - React",
    company: "Swiggy",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "TypeScript", "CSS", "Testing Library"],
    source: "LinkedIn",
    postedDaysAgo: 3,
    salaryRange: "₹25k–₹40k/month Internship",
    applyUrl: "https://careers.swiggy.com/frontend-intern-react",
    description:
      "Work with the consumer growth team to experiment with new UX flows and features.\n" +
      "Build accessible, responsive React components backed by strong unit and integration tests.\n" +
      "Learn how product analytics and A/B experiments shape the roadmap.\n" +
      "Good understanding of modern JavaScript and React hooks is expected.",
  },
  {
    id: "job-5",
    title: "Data Analyst Intern",
    company: "Flipkart",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["SQL", "Python", "Excel", "Tableau"],
    source: "Internshala",
    postedDaysAgo: 4,
    salaryRange: "₹30k–₹45k/month Internship",
    applyUrl: "https://flipkartcareers.com/data-analyst-intern",
    description:
      "Assist the category analytics team in building dashboards and running deep-dive analyses.\n" +
      "Work with large datasets, clean and transform data, and surface actionable insights.\n" +
      "Collaborate with product managers and business stakeholders on weekly reporting.\n" +
      "Knowledge of basic statistics and comfort with SQL is required.",
  },
  {
    id: "job-6",
    title: "QA Intern - Web & Mobile",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Manual Testing", "Test Cases", "Bug Reporting"],
    source: "Company Site",
    postedDaysAgo: 5,
    salaryRange: "₹20k–₹35k/month Internship",
    applyUrl: "https://careers.zoho.com/qa-intern-web-mobile",
    description:
      "Execute manual test cases across web and mobile products within tight release cycles.\n" +
      "Own regression suites, document issues clearly, and work closely with developers.\n" +
      "Learn how to think like an end user and spot edge cases before they reach production.\n" +
      "Good analytical skills and attention to detail are critical.",
  },
  {
    id: "job-7",
    title: "Python Developer Fresher",
    company: "Capgemini",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Python", "Django", "REST APIs"],
    source: "Naukri",
    postedDaysAgo: 6,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.capgemini.com/in-en/jobs/python-developer-fresher",
    description:
      "Work on internal tools and client-facing applications built using Python and Django.\n" +
      "Implement REST endpoints, integrate with third-party APIs, and support basic deployments.\n" +
      "You will be part of an agile squad with mentorship from senior engineers.\n" +
      "Strong problem-solving skills and understanding of OOP concepts are expected.",
  },
  {
    id: "job-8",
    title: "React Developer 1–3 Years",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["React", "TypeScript", "Redux", "REST"],
    source: "Company Site",
    postedDaysAgo: 7,
    salaryRange: "8–14 LPA",
    applyUrl: "https://careers.freshworks.com/react-developer-1-3",
    description:
      "Build and maintain high-quality frontends for SaaS products used by global customers.\n" +
      "Work closely with designers to translate Figma mocks into pixel-perfect components.\n" +
      "Collaborate with backend teams to integrate APIs and handle error states gracefully.\n" +
      "Performance tuning and accessibility are key parts of the role.",
  },
  {
    id: "job-9",
    title: "SDE I - Backend (Java)",
    company: "Amazon India",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Distributed Systems", "AWS", "Data Structures"],
    source: "Company Site",
    postedDaysAgo: 1,
    salaryRange: "15–25 LPA",
    applyUrl: "https://www.amazon.jobs/en/jobs/sde-1-backend-java-india",
    description:
      "Own microservices that power critical customer experiences at scale.\n" +
      "Design, implement, and operate services with a strong focus on reliability and observability.\n" +
      "Participate in design reviews, write RFCs, and uphold high bar for code quality.\n" +
      "Solid understanding of algorithms, data structures, and OS concepts is required.",
  },
  {
    id: "job-10",
    title: "GET - Cloud & DevOps",
    company: "Cognizant",
    location: "Kolkata",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Linux", "Shell Scripting", "AWS", "CI/CD"],
    source: "Company Site",
    postedDaysAgo: 3,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.cognizant.com/get-cloud-devops",
    description:
      "Be part of the cloud platform team helping clients adopt modern infrastructure.\n" +
      "Work on automating deployments, monitoring, and basic troubleshooting of cloud resources.\n" +
      "You will be trained on AWS fundamentals, Terraform basics, and CI/CD tooling.\n" +
      "Willingness to work in rotational shifts is required.",
  },
  {
    id: "job-11",
    title: "Junior Backend Engineer - Node.js",
    company: "Juspay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–2 years",
    skills: ["Node.js", "PostgreSQL", "Microservices"],
    source: "AngelList",
    postedDaysAgo: 2,
    salaryRange: "8–14 LPA",
    applyUrl: "https://juspay.in/careers/junior-backend-node",
    description:
      "Help design and build payment orchestration services with strict reliability requirements.\n" +
      "Implement APIs, write integration tests, and work closely with SREs on observability.\n" +
      "You will work in a small, high-ownership team that ships to production frequently.\n" +
      "Comfort with functional programming is a bonus.",
  },
  {
    id: "job-12",
    title: "SDE Intern - Frontend",
    company: "CRED",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "JavaScript", "CSS", "Design Systems"],
    source: "Company Site",
    postedDaysAgo: 4,
    salaryRange: "₹60k–₹80k/month Internship",
    applyUrl: "https://careers.cred.club/sde-intern-frontend",
    description:
      "Contribute to CRED's design system and product surfaces used by millions of users.\n" +
      "Pair with senior engineers to ship polished, highly-performant UI features.\n" +
      "You will learn about motion design, micro-interactions, and accessibility in depth.\n" +
      "A strong portfolio or GitHub profile is preferred.",
  },
  {
    id: "job-13",
    title: "Java Developer 0–1 Years",
    company: "Wipro",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Java", "Spring Boot", "REST", "SQL"],
    source: "Naukri",
    postedDaysAgo: 5,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.wipro.com/java-developer-fresher",
    description:
      "Join project teams working on large-scale enterprise Java applications.\n" +
      "Implement change requests, fix bugs, and gradually own small modules end-to-end.\n" +
      "Training on SDLC processes, coding standards, and review practices will be provided.\n" +
      "Good communication skills and flexibility to work in client locations are must-haves.",
  },
  {
    id: "job-14",
    title: "Data Analyst - Intern",
    company: "PhonePe",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["SQL", "Python", "Dashboards"],
    source: "LinkedIn",
    postedDaysAgo: 6,
    salaryRange: "₹35k–₹50k/month Internship",
    applyUrl: "https://careers.phonepe.com/data-analyst-intern",
    description:
      "Support product teams with cohort analysis, funnel drop-off studies, and A/B test reads.\n" +
      "Work with senior analysts to define metrics and build self-serve dashboards.\n" +
      "You will learn how data shapes decision-making in a high-growth fintech.\n" +
      "Curiosity and strong ownership mindset are key.",
  },
  {
    id: "job-15",
    title: "Frontend Engineer - React 1–3 Years",
    company: "Paytm",
    location: "Noida",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["React", "Redux", "TypeScript", "REST"],
    source: "Company Site",
    postedDaysAgo: 7,
    salaryRange: "10–18 LPA",
    applyUrl: "https://jobs.paytm.com/frontend-engineer-react",
    description:
      "Own customer-facing flows on the Paytm app and web surfaces.\n" +
      "Work closely with product and design to deliver features with measurable impact.\n" +
      "Optimize for performance on low-end Android devices and spot regressions early.\n" +
      "Strong debugging skills and understanding of browser internals will help.",
  },
  {
    id: "job-16",
    title: "Associate Software Engineer - Java",
    company: "Accenture",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "REST", "Agile"],
    source: "Company Site",
    postedDaysAgo: 8,
    salaryRange: "4–6 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/associate-software-engineer-java",
    description:
      "Work with global clients to modernize legacy applications using Java and microservices.\n" +
      "Participate in daily stand-ups, sprint planning, and retrospectives.\n" +
      "You will be mentored on design patterns, clean code, and testing practices.\n" +
      "Certification in Java or cloud is an added advantage.",
  },
  {
    id: "job-17",
    title: "SDE Intern - Data Platform",
    company: "Swiggy",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Python", "Spark", "SQL"],
    source: "Company Site",
    postedDaysAgo: 9,
    salaryRange: "₹45k–₹60k/month Internship",
    applyUrl: "https://careers.swiggy.com/sde-intern-data-platform",
    description:
      "Help build data pipelines and tools that power analytics and ML models.\n" +
      "Work with large-scale data, ensuring reliability and data quality.\n" +
      "You will learn about event-driven architectures and lakehouse patterns.\n" +
      "Comfort with Linux and scripting is expected.",
  },
  {
    id: "job-18",
    title: "Junior QA Engineer",
    company: "Zoho",
    location: "Salem",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["Manual Testing", "API Testing"],
    source: "Company Site",
    postedDaysAgo: 2,
    salaryRange: "3–4.5 LPA",
    applyUrl: "https://careers.zoho.com/junior-qa-engineer-salem",
    description:
      "Work with product and development teams to define and execute test strategies.\n" +
      "Test web, mobile, and API layers to ensure a smooth customer experience.\n" +
      "Document reproducible bug reports and verify fixes across releases.\n" +
      "Basic scripting knowledge will be a plus.",
  },
  {
    id: "job-19",
    title: "SDE Intern - Full Stack",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["JavaScript", "React", "Node.js"],
    source: "Company Site",
    postedDaysAgo: 4,
    salaryRange: "₹30k–₹50k/month Internship",
    applyUrl: "https://careers.freshworks.com/sde-intern-fullstack",
    description:
      "Work with a cross-functional squad to build customer-facing features.\n" +
      "Contribute to both frontend and backend codebases with strong reviews.\n" +
      "You will learn how SaaS products are built, shipped, and monitored in production.\n" +
      "Strong fundamentals in web development are important.",
  },
  {
    id: "job-20",
    title: "Junior Backend Engineer - Go",
    company: "Razorpay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Go", "MySQL", "Kafka"],
    source: "LinkedIn",
    postedDaysAgo: 5,
    salaryRange: "12–20 LPA",
    applyUrl: "https://razorpay.com/careers/junior-backend-go",
    description:
      "Design and build resilient services using Go and event-driven patterns.\n" +
      "Work closely with product teams to roll out features safely and monitor impact.\n" +
      "You will pair with senior engineers for design and on-call responsibilities.\n" +
      "Prior experience with high-scale systems is preferred.",
  },
  {
    id: "job-21",
    title: "SDE Intern - Android",
    company: "PhonePe",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Kotlin", "Android", "MVVM"],
    source: "LinkedIn",
    postedDaysAgo: 6,
    salaryRange: "₹50k–₹80k/month Internship",
    applyUrl: "https://careers.phonepe.com/sde-intern-android",
    description:
      "Contribute to the PhonePe Android app and learn best practices for mobile engineering.\n" +
      "Fix bugs, build small features, and improve app performance under guidance.\n" +
      "You will be exposed to analytics, crash monitoring, and experimentation frameworks.\n" +
      "A few personal Android apps or GitHub projects are expected.",
  },
  {
    id: "job-22",
    title: "Junior Data Engineer",
    company: "TCS",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["SQL", "ETL", "Python"],
    source: "Naukri",
    postedDaysAgo: 7,
    salaryRange: "4–6 LPA",
    applyUrl: "https://ibegin.tcs.com/junior-data-engineer",
    description:
      "Develop and maintain ETL pipelines for large enterprise data warehouses.\n" +
      "Work with business analysts to understand reporting requirements and data quality issues.\n" +
      "You will be trained on TCS internal tooling and standard data patterns.\n" +
      "Good grasp of SQL joins and aggregations is a must.",
  },
  {
    id: "job-23",
    title: "SDE Intern - Backend",
    company: "CRED",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Kotlin", "Microservices"],
    source: "Company Site",
    postedDaysAgo: 8,
    salaryRange: "₹70k–₹90k/month Internship",
    applyUrl: "https://careers.cred.club/sde-intern-backend",
    description:
      "Work on services that power credit products and growth experiments.\n" +
      "Write clean, well-tested code and learn from rigorous code reviews.\n" +
      "You will gain exposure to distributed systems, caching, and observability.\n" +
      "Strong problem-solving skills and curiosity are valued.",
  },
  {
    id: "job-24",
    title: "Junior Frontend Developer - Vue.js",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["JavaScript", "Vue.js", "HTML", "CSS"],
    source: "Company Site",
    postedDaysAgo: 9,
    salaryRange: "4–6 LPA",
    applyUrl: "https://careers.zoho.com/junior-frontend-developer-vue",
    description:
      "Build intuitive user interfaces for Zoho's suite of business applications.\n" +
      "Collaborate with designers and backend engineers to deliver features end-to-end.\n" +
      "You will learn performance optimization and cross-browser compatibility techniques.\n" +
      "Strong understanding of JavaScript fundamentals is required.",
  },
  {
    id: "job-25",
    title: "Graduate Engineer Trainee - Data",
    company: "Capgemini",
    location: "Pune",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["SQL", "Python", "ETL"],
    source: "Company Site",
    postedDaysAgo: 10,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.capgemini.com/in-en/jobs/get-data-engineer",
    description:
      "Start your career in data engineering working with global clients.\n" +
      "Assist in building and maintaining data pipelines and analytic solutions.\n" +
      "You will receive structured training on cloud data platforms and tools.\n" +
      "Good analytical and communication skills are expected.",
  },
  {
    id: "job-26",
    title: "Backend Engineer - Java 1–3 Years",
    company: "Juspay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Functional Programming", "PostgreSQL"],
    source: "AngelList",
    postedDaysAgo: 1,
    salaryRange: "12–22 LPA",
    applyUrl: "https://juspay.in/careers/backend-engineer-java",
    description:
      "Design and build mission-critical payment services with a focus on safety and correctness.\n" +
      "Contribute to design discussions, run experiments, and participate in on-call.\n" +
      "You will work in a small team with high ownership and steep learning.\n" +
      "Interest in formal methods or functional programming is a plus.",
  },
  {
    id: "job-27",
    title: "SDE Intern - Full Stack",
    company: "CRED",
    location: "Remote",
    mode: "Remote",
    experience: "0–1 years",
    skills: ["React", "Node.js", "TypeScript"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "₹80k–₹1L/month Internship",
    applyUrl: "https://careers.cred.club/sde-intern-fullstack-remote",
    description:
      "Work remotely with a cross-functional team on new product bets.\n" +
      "Ship features across the stack under mentorship from experienced engineers.\n" +
      "You will learn modern product development practices and tooling.\n" +
      "Strong self-management and communication are required for this remote role.",
  },
  {
    id: "job-28",
    title: "Junior SDET - Java",
    company: "Amazon India",
    location: "Hyderabad",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Automation Testing", "Selenium"],
    source: "Company Site",
    postedDaysAgo: 3,
    salaryRange: "10–18 LPA",
    applyUrl: "https://www.amazon.jobs/en/jobs/junior-sdet-java-india",
    description:
      "Own automated test coverage for critical services and customer journeys.\n" +
      "Design robust test frameworks, write resilient test suites, and analyze failures.\n" +
      "You will collaborate closely with SDEs and product teams on quality strategy.\n" +
      "Strong coding skills in Java and debugging ability are required.",
  },
  {
    id: "job-29",
    title: "Frontend Intern - Design System",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "CSS", "Design Systems"],
    source: "Company Site",
    postedDaysAgo: 4,
    salaryRange: "₹25k–₹35k/month Internship",
    applyUrl: "https://careers.freshworks.com/frontend-intern-design-system",
    description:
      "Help build and maintain the internal design system used across product squads.\n" +
      "Create reusable components, document usage, and improve consistency.\n" +
      "You will collaborate with designers and engineers from multiple teams.\n" +
      "An eye for detail and visual polish is important.",
  },
  {
    id: "job-30",
    title: "SDE Intern - ML Platform",
    company: "Swiggy",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Python", "Kubernetes", "ML Pipelines"],
    source: "Company Site",
    postedDaysAgo: 5,
    salaryRange: "₹50k–₹70k/month Internship",
    applyUrl: "https://careers.swiggy.com/sde-intern-ml-platform",
    description:
      "Build tooling and services that make it easy to train and deploy ML models.\n" +
      "Work with data scientists to productionize experiments reliably.\n" +
      "You will learn about CI/CD for ML and observability of models in production.\n" +
      "Interest in MLOps and distributed systems is a plus.",
  },
  {
    id: "job-31",
    title: "Junior Backend Developer - .NET",
    company: "Infosys",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "0–2 years",
    skills: [".NET", "C#", "SQL"],
    source: "Naukri",
    postedDaysAgo: 6,
    salaryRange: "4–6 LPA",
    applyUrl: "https://careers.infosys.com/junior-backend-dotnet",
    description:
      "Contribute to .NET-based applications for global clients across industries.\n" +
      "Implement features, fix issues, and support performance tuning activities.\n" +
      "You will work within a structured SDLC with clear coding standards.\n" +
      "Basic understanding of web technologies is beneficial.",
  },
  {
    id: "job-32",
    title: "SDE Intern - Analytics Engineering",
    company: "Razorpay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["SQL", "dbt", "Python"],
    source: "LinkedIn",
    postedDaysAgo: 7,
    salaryRange: "₹40k–₹60k/month Internship",
    applyUrl: "https://razorpay.com/careers/sde-intern-analytics-engineering",
    description:
      "Work with analytics engineers to model business entities and metrics.\n" +
      "Help maintain data pipelines, tests, and documentation in a modern stack.\n" +
      "You will learn about data modeling, lineage, and governance.\n" +
      "Strong SQL skills and curiosity about data are required.",
  },
  {
    id: "job-33",
    title: "Associate Engineer - Cloud Support",
    company: "Amazon India",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–2 years",
    skills: ["Linux", "AWS", "Networking"],
    source: "Company Site",
    postedDaysAgo: 8,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.amazon.jobs/en/jobs/associate-cloud-support-india",
    description:
      "Help customers troubleshoot issues on AWS services via tickets and calls.\n" +
      "Identify patterns, document solutions, and feed learnings back into product.\n" +
      "You will work in a 24/7 environment with rotational shifts.\n" +
      "Strong fundamentals in OS, networking, and scripting are needed.",
  },
  {
    id: "job-34",
    title: "Junior Frontend Developer - React",
    company: "Flipkart",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["React", "TypeScript", "Redux"],
    source: "Company Site",
    postedDaysAgo: 9,
    salaryRange: "10–16 LPA",
    applyUrl: "https://flipkartcareers.com/junior-frontend-react",
    description:
      "Own slices of the consumer experience across web and mweb.\n" +
      "Collaborate with design, analytics, and backend teams to ship experiments.\n" +
      "You will focus on performance, accessibility, and reliability.\n" +
      "Experience with large-scale React codebases is preferred.",
  },
  {
    id: "job-35",
    title: "Graduate Engineer Trainee - QA",
    company: "TCS",
    location: "Kochi",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Manual Testing", "Basics of Automation"],
    source: "Company Site",
    postedDaysAgo: 10,
    salaryRange: "3–4.5 LPA",
    applyUrl: "https://ibegin.tcs.com/get-qa-kochi",
    description:
      "Start your career in quality assurance working on enterprise applications.\n" +
      "Execute test cases, document defects, and support UAT cycles.\n" +
      "You will learn structured testing techniques and tools.\n" +
      "Attention to detail and good documentation skills are important.",
  },
  {
    id: "job-36",
    title: "SDE Intern - Web",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["JavaScript", "HTML", "CSS"],
    source: "Company Site",
    postedDaysAgo: 0,
    salaryRange: "₹20k–₹30k/month Internship",
    applyUrl: "https://careers.zoho.com/sde-intern-web",
    description:
      "Work on real-world modules of Zoho products and learn end-to-end development.\n" +
      "Fix bugs, enhance features, and pair with senior developers regularly.\n" +
      "You will get exposure to performance, security, and UX best practices.\n" +
      "Strong logical thinking and curiosity are valued.",
  },
  {
    id: "job-37",
    title: "Junior Backend Developer - Python",
    company: "Freshworks",
    location: "Hyderabad",
    mode: "Remote",
    experience: "1–3 years",
    skills: ["Python", "Django", "PostgreSQL"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "8–13 LPA",
    applyUrl: "https://careers.freshworks.com/junior-backend-python-remote",
    description:
      "Build and maintain backend services for SaaS products in a remote-first team.\n" +
      "Own features from design to deployment, including tests and monitoring.\n" +
      "You will collaborate across time zones and use async communication heavily.\n" +
      "Prior remote work experience is a plus.",
  },
  {
    id: "job-38",
    title: "SDE Intern - React Native",
    company: "Swiggy",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React Native", "JavaScript"],
    source: "Internshala",
    postedDaysAgo: 2,
    salaryRange: "₹35k–₹45k/month Internship",
    applyUrl: "https://careers.swiggy.com/sde-intern-react-native",
    description:
      "Contribute to Swiggy's consumer and delivery partner apps built on React Native.\n" +
      "Fix UI issues, improve performance, and help with feature development.\n" +
      "You will learn how mobile releases are planned and monitored.\n" +
      "Basic understanding of native platforms is helpful.",
  },
  {
    id: "job-39",
    title: "Junior DevOps Engineer",
    company: "Capgemini",
    location: "Mumbai",
    mode: "Hybrid",
    experience: "0–2 years",
    skills: ["Linux", "Docker", "CI/CD"],
    source: "Company Site",
    postedDaysAgo: 3,
    salaryRange: "5–8 LPA",
    applyUrl: "https://www.capgemini.com/in-en/jobs/junior-devops-engineer",
    description:
      "Support application teams in containerizing and deploying their services.\n" +
      "Manage CI/CD pipelines, basic infra issues, and monitoring dashboards.\n" +
      "You will be exposed to Kubernetes and cloud providers over time.\n" +
      "Strong fundamentals in OS and networking are expected.",
  },
  {
    id: "job-40",
    title: "SDE Intern - Backend",
    company: "Razorpay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Go", "SQL"],
    source: "AngelList",
    postedDaysAgo: 4,
    salaryRange: "₹50k–₹70k/month Internship",
    applyUrl: "https://razorpay.com/careers/sde-intern-backend",
    description:
      "Work with senior engineers on APIs and services that power merchant experiences.\n" +
      "Write production-grade code with tests and learn about observability.\n" +
      "You will participate in code reviews and design discussions.\n" +
      "Solid problem-solving and CS fundamentals are required.",
  },
  {
    id: "job-41",
    title: "Graduate Engineer Trainee - Full Stack",
    company: "Wipro",
    location: "Bengaluru",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Java", "JavaScript", "SQL"],
    source: "Naukri",
    postedDaysAgo: 5,
    salaryRange: "3–4.5 LPA",
    applyUrl: "https://careers.wipro.com/get-fullstack-bengaluru",
    description:
      "Rotate across backend, frontend, and database teams on enterprise projects.\n" +
      "Learn SDLC processes, documentation, and agile ceremonies.\n" +
      "You will be assigned a mentor and a clear learning path.\n" +
      "Flexibility to work across technologies is important.",
  },
  {
    id: "job-42",
    title: "Junior React Developer",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["React", "JavaScript", "CSS"],
    source: "Company Site",
    postedDaysAgo: 6,
    salaryRange: "4–6.5 LPA",
    applyUrl: "https://careers.zoho.com/junior-react-developer",
    description:
      "Build interactive frontends for Zoho products with a focus on UX.\n" +
      "Collaborate with backend teams to integrate APIs and handle edge cases.\n" +
      "You will learn performance and accessibility best practices.\n" +
      "Comfort with vanilla JavaScript is expected.",
  },
  {
    id: "job-43",
    title: "SDE Intern - Data Science",
    company: "Flipkart",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Python", "Pandas", "ML Basics"],
    source: "Company Site",
    postedDaysAgo: 7,
    salaryRange: "₹45k–₹65k/month Internship",
    applyUrl: "https://flipkartcareers.com/sde-intern-data-science",
    description:
      "Assist data scientists with feature engineering and experiment analysis.\n" +
      "Help build prototypes that eventually convert into production models.\n" +
      "You will learn how ML is applied to pricing, logistics, and recommendations.\n" +
      "Comfort with statistics and Python is essential.",
  },
  {
    id: "job-44",
    title: "Junior Backend Developer - Java",
    company: "Accenture",
    location: "Hyderabad",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Spring Boot", "REST"],
    source: "Company Site",
    postedDaysAgo: 8,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/junior-backend-java-hyd",
    description:
      "Implement and maintain microservices for global clients across industries.\n" +
      "Work in agile teams and collaborate with architects and testers.\n" +
      "You will be involved in estimations, design discussions, and production support.\n" +
      "Good communication skills and client handling are important.",
  },
  {
    id: "job-45",
    title: "SDE Intern - Frontend",
    company: "PhonePe",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "TypeScript"],
    source: "LinkedIn",
    postedDaysAgo: 9,
    salaryRange: "₹55k–₹75k/month Internship",
    applyUrl: "https://careers.phonepe.com/sde-intern-frontend",
    description:
      "Contribute to PhonePe web surfaces and internal tools.\n" +
      "Build reusable components, fix bugs, and improve developer experience.\n" +
      "You will learn how large-scale React applications are structured.\n" +
      "A strong grasp of modern JavaScript is needed.",
  },
  {
    id: "job-46",
    title: "Junior Data Analyst",
    company: "TCS",
    location: "Delhi NCR",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["SQL", "Excel", "Power BI"],
    source: "Naukri",
    postedDaysAgo: 10,
    salaryRange: "3–5 LPA",
    applyUrl: "https://ibegin.tcs.com/junior-data-analyst-delhi",
    description:
      "Support business units with reports and dashboard development.\n" +
      "Clean, transform, and validate data from multiple systems.\n" +
      "You will learn corporate reporting standards and governance.\n" +
      "Attention to detail and stakeholder management are key.",
  },
  {
    id: "job-47",
    title: "SDE Intern - Backend",
    company: "Juspay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Functional Programming"],
    source: "AngelList",
    postedDaysAgo: 0,
    salaryRange: "₹60k–₹80k/month Internship",
    applyUrl: "https://juspay.in/careers/sde-intern-backend",
    description:
      "Work on internal tools and payment flows under guidance from senior engineers.\n" +
      "Write safe, composable code and gradually own small services.\n" +
      "You will be exposed to functional programming concepts daily.\n" +
      "A strong math or CS background is preferred.",
  },
  {
    id: "job-48",
    title: "Junior Frontend Developer - Angular",
    company: "Capgemini",
    location: "Pune",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["Angular", "TypeScript", "HTML"],
    source: "Company Site",
    postedDaysAgo: 1,
    salaryRange: "4–6.5 LPA",
    applyUrl: "https://www.capgemini.com/in-en/jobs/junior-frontend-angular",
    description:
      "Develop frontends for enterprise applications using Angular and TypeScript.\n" +
      "Collaborate with backend and QA teams to ensure smooth releases.\n" +
      "You will learn about state management and component design.\n" +
      "Good understanding of web fundamentals is expected.",
  },
  {
    id: "job-49",
    title: "SDE Intern - Platform",
    company: "CRED",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Go", "Kubernetes", "Microservices"],
    source: "Company Site",
    postedDaysAgo: 2,
    salaryRange: "₹80k–₹1L/month Internship",
    applyUrl: "https://careers.cred.club/sde-intern-platform",
    description:
      "Help build platforms that abstract infrastructure complexity for product teams.\n" +
      "Contribute to tooling around deployments, observability, and reliability.\n" +
      "You will work closely with SREs and platform engineers.\n" +
      "Interest in distributed systems and infra is important.",
  },
  {
    id: "job-50",
    title: "Junior Backend Developer - Java",
    company: "Infosys",
    location: "Pune",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Spring", "REST"],
    source: "Company Site",
    postedDaysAgo: 3,
    salaryRange: "5–8 LPA",
    applyUrl: "https://careers.infosys.com/junior-backend-java-pune",
    description:
      "Work on microservices and integration layers for enterprise clients.\n" +
      "Participate in design reviews, coding, and unit testing.\n" +
      "You will be part of a global delivery model with onsite coordination.\n" +
      "Good communication skills are essential.",
  },
  {
    id: "job-51",
    title: "SDE Intern - Web",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "JavaScript", "CSS"],
    source: "Company Site",
    postedDaysAgo: 4,
    salaryRange: "₹25k–₹40k/month Internship",
    applyUrl: "https://careers.freshworks.com/sde-intern-web-2026",
    description:
      "Contribute to customer-facing web modules with close mentorship.\n" +
      "Fix bugs, improve UI polish, and help modernize legacy components.\n" +
      "You will learn about design systems and accessibility in practice.\n" +
      "A strong willingness to learn is key.",
  },
  {
    id: "job-52",
    title: "Junior Data Engineer",
    company: "Flipkart",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["SQL", "Spark", "ETL"],
    source: "Company Site",
    postedDaysAgo: 5,
    salaryRange: "8–14 LPA",
    applyUrl: "https://flipkartcareers.com/junior-data-engineer",
    description:
      "Build and operate data pipelines that feed analytics and ML models.\n" +
      "Work with product and analytics teams on data requirements.\n" +
      "You will be responsible for data quality and reliability.\n" +
      "Experience with big data tools is preferred.",
  },
  {
    id: "job-53",
    title: "Graduate Engineer Trainee - Java",
    company: "TCS",
    location: "Bhubaneswar",
    mode: "Onsite",
    experience: "0–1 years",
    skills: ["Java", "OOP", "SQL"],
    source: "Naukri",
    postedDaysAgo: 6,
    salaryRange: "3–4 LPA",
    applyUrl: "https://ibegin.tcs.com/get-java-bhubaneswar",
    description:
      "Kickstart your Java career with structured training and project exposure.\n" +
      "Learn coding standards, documentation, and client communication.\n" +
      "You will eventually be mapped to a domain-specific project.\n" +
      "Consistent academic performance is expected.",
  },
  {
    id: "job-54",
    title: "SDE Intern - Backend",
    company: "Swiggy",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Spring Boot"],
    source: "Company Site",
    postedDaysAgo: 7,
    salaryRange: "₹45k–₹65k/month Internship",
    applyUrl: "https://careers.swiggy.com/sde-intern-backend-java",
    description:
      "Work with restaurant and logistics teams on backend services.\n" +
      "Implement features, write tests, and perform basic performance tuning.\n" +
      "You will be part of a squad with a clear problem statement.\n" +
      "Good grasp of data structures is important.",
  },
  {
    id: "job-55",
    title: "Junior Frontend Developer - React",
    company: "Wipro",
    location: "Chennai",
    mode: "Onsite",
    experience: "0–2 years",
    skills: ["React", "JavaScript", "CSS"],
    source: "Company Site",
    postedDaysAgo: 8,
    salaryRange: "4–6 LPA",
    applyUrl: "https://careers.wipro.com/junior-frontend-react-chennai",
    description:
      "Develop UI modules for enterprise web applications.\n" +
      "Collaborate with UX designers and backend engineers.\n" +
      "You will learn about accessibility and responsive design.\n" +
      "Strong fundamentals in HTML/CSS are needed.",
  },
  {
    id: "job-56",
    title: "SDE Intern - Data Platform",
    company: "Razorpay",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Python", "SQL", "Airflow"],
    source: "AngelList",
    postedDaysAgo: 9,
    salaryRange: "₹45k–₹65k/month Internship",
    applyUrl: "https://razorpay.com/careers/sde-intern-data-platform-2026",
    description:
      "Assist in building orchestrated data workflows powering analytics.\n" +
      "Monitor pipelines, debug failures, and improve reliability.\n" +
      "You will collaborate with analytics and infrastructure teams.\n" +
      "Comfort with debugging and logs is important.",
  },
  {
    id: "job-57",
    title: "Junior Backend Developer - Java",
    company: "Accenture",
    location: "Gurugram",
    mode: "Hybrid",
    experience: "1–3 years",
    skills: ["Java", "Spring", "REST"],
    source: "Company Site",
    postedDaysAgo: 10,
    salaryRange: "6–9 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/junior-backend-java-gurugram",
    description:
      "Support digital transformation projects for global clients.\n" +
      "Implement features, fix production issues, and participate in code reviews.\n" +
      "You will work with architects to align with reference designs.\n" +
      "Client-facing communication skills are valued.",
  },
  {
    id: "job-58",
    title: "SDE Intern - Web",
    company: "PhonePe",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["React", "TypeScript", "CSS"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "₹55k–₹75k/month Internship",
    applyUrl: "https://careers.phonepe.com/sde-intern-web-2026",
    description:
      "Work with web teams to build and maintain critical user journeys.\n" +
      "Learn from senior engineers on code quality and performance.\n" +
      "You will gradually own small features end-to-end.\n" +
      "Strong attention to detail is important.",
  },
  {
    id: "job-59",
    title: "Junior Data Analyst - Product",
    company: "CRED",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–2 years",
    skills: ["SQL", "Product Analytics", "Dashboards"],
    source: "Company Site",
    postedDaysAgo: 1,
    salaryRange: "8–12 LPA",
    applyUrl: "https://careers.cred.club/junior-data-analyst-product",
    description:
      "Partner with product managers to measure impact of features and experiments.\n" +
      "Build dashboards, define metrics, and dig into user behavior.\n" +
      "You will be part of a high-context, data-informed culture.\n" +
      "Prior experience in product analytics is a plus.",
  },
  {
    id: "job-60",
    title: "SDE Intern - Backend",
    company: "Flipkart",
    location: "Bengaluru",
    mode: "Hybrid",
    experience: "0–1 years",
    skills: ["Java", "Spring Boot", "SQL"],
    source: "Company Site",
    postedDaysAgo: 2,
    salaryRange: "₹50k–₹70k/month Internship",
    applyUrl: "https://flipkartcareers.com/sde-intern-backend-2026",
    description:
      "Contribute to backend services that power Flipkart's core shopping flows.\n" +
      "Implement features, write tests, and learn from design reviews.\n" +
      "You will gain exposure to high-scale distributed systems.\n" +
      "Good problem-solving skills and CS fundamentals are required.",
  },
];

