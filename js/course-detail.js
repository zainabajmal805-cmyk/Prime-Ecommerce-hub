// ============================================================
// COURSE-DETAIL.JS — Clean version, no encoding issues
// ============================================================

const COURSES = {

  "Shopify Mastery": {
    icon: "cart",
    badge: "E-commerce Store Building",
    fee: { online: 17000, physical: 20000 },
    tagline: "Build, launch and scale a professional Shopify store from scratch.",
    about: "Shopify Mastery is a comprehensive, hands-on course designed to take you from complete beginner to a confident Shopify store owner. You will work on a real Shopify store throughout the course, applying every concept in practice. From choosing the right niche to running your first ad campaign, this course covers the complete journey of building a profitable e-commerce business on Shopify.",
    tags: ["Shopify", "E-commerce", "Dropshipping", "Store Design", "Product Research", "Ads"],
    overview: [
      { icon: "store", label: "Platform", value: "Shopify" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Set up a professional Shopify store from scratch",
      "Customize themes and design high-converting pages",
      "Add, manage and optimize product listings",
      "Set up payment gateways and shipping methods",
      "Run Facebook and Instagram ad campaigns",
      "Analyze store performance using Shopify analytics",
      "Optimize your store for SEO and organic traffic",
      "Use powerful Shopify apps to automate your store"
    ],
    modules: [
      { title: "Module 1 - Introduction to Shopify & E-commerce", topics: ["What is Shopify and why it's the best platform", "Setting up your Shopify account", "Understanding the Shopify dashboard", "Choosing the right plan for your business"] },
      { title: "Module 2 - Store Setup & Design", topics: ["Selecting and customizing your theme", "Creating homepage, product pages and collections", "Mobile optimization and speed improvements", "Adding logo, branding and store identity"] },
      { title: "Module 3 - Product Research & Listing", topics: ["Finding winning products for your niche", "Writing compelling product descriptions", "Product photography and image optimization", "Pricing strategy and profit calculation"] },
      { title: "Module 4 - Payments, Shipping & Orders", topics: ["Setting up EasyPaisa and Stripe", "Creating shipping zones and rates", "Processing and fulfilling orders", "Managing returns and refunds professionally"] },
      { title: "Module 5 - Marketing & Advertising", topics: ["Facebook & Instagram Ads setup", "Creating your first profitable ad campaign", "Retargeting and lookalike audiences", "Influencer marketing and organic growth"] },
      { title: "Module 6 - Analytics & Scaling", topics: ["Reading Shopify analytics and reports", "Identifying best-selling products", "Scaling winning campaigns", "Expanding to international markets"] }
    ],
    skills: ["Shopify Store Setup", "Theme Customization", "Product Research", "Facebook Ads", "Instagram Marketing", "SEO Optimization", "Order Management", "Analytics", "Dropshipping", "Brand Building"],
    forList: [
      "Students who want to start an online business from scratch",
      "Entrepreneurs looking to sell products online nationally and internationally",
      "Freelancers who want to offer Shopify store setup as a service",
      "Business owners wanting to take their physical store online",
      "Anyone who wants to earn income through e-commerce",
      "Professionals looking to upskill in digital retail"
    ]
  },

  "Amazon FBA": {
    icon: "amazon",
    badge: "Global Marketplace Selling",
    fee: { online: 22000, physical: 25000 },
    tagline: "Master the complete Amazon FBA model from product research to generating consistent sales on the world's largest marketplace.",
    about: "Amazon FBA (Fulfillment by Amazon) is one of the most powerful business models available today. In this advanced course, you will learn everything needed to launch a successful Amazon business. From identifying high-demand, low-competition products to creating optimized listings, managing inventory and running PPC campaigns that drive consistent sales. Our instructors have real selling experience on Amazon, meaning you learn practical, proven strategies that actually work.",
    tags: ["Amazon FBA", "Product Hunting", "China Sourcing", "Amazon PPC", "Walmart", "Seller Central"],
    overview: [
      { icon: "globe", label: "Platform", value: "Amazon + Walmart" },
      { icon: "level", label: "Level", value: "Beginner to Advanced" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Research winning products using Helium 10, Jungle Scout and product hunting tools",
      "Source products from Alibaba, 1688 and China suppliers with proper MOQ negotiation",
      "Create fully optimized Amazon product listings",
      "Set up and manage FBA shipments to Amazon warehouses",
      "Run and optimize Amazon PPC ad campaigns",
      "Build reviews and manage your seller reputation",
      "Read Amazon analytics and business reports",
      "Expand to Amazon US, UK, UAE and Walmart Marketplace"
    ],
    modules: [
      { title: "Module 1 - Amazon Business Overview", topics: ["Understanding the FBA and FBM models", "Setting up your Amazon Seller Central account", "Understanding Amazon fees and profit margins", "Pakistan-specific setup and bank requirements"] },
      { title: "Module 2 - Product Hunting & Research", topics: ["Product hunting strategies for winning niches", "Using Helium 10, Jungle Scout and MerchantWords", "Finding high-demand, low-competition products", "Validating product demand with real data", "Calculating ROI, profit potential and break-even"] },
      { title: "Module 3 - China Sourcing & Inventory", topics: ["Finding suppliers on Alibaba and 1688", "Contacting and negotiating with Chinese manufacturers", "Comparing Alibaba vs direct China sourcing", "Quality inspection process and shipping Incoterms", "Creating your first FBA shipment to Amazon"] },
      { title: "Module 4 - Listing Optimization", topics: ["Writing keyword-rich titles and bullet points", "A+ Content and enhanced brand content", "Product photography best practices", "Backend keywords and search term optimization"] },
      { title: "Module 5 - Amazon PPC Advertising", topics: ["Sponsored Products, Brands and Display ads", "Campaign structure and keyword strategy", "Bid optimization and ACoS management", "Scaling profitable campaigns"] },
      { title: "Module 6 - Walmart Marketplace", topics: ["Introduction to Walmart Marketplace", "Setting up a Walmart Seller account", "Listing products on Walmart vs Amazon differences", "Growing sales on Walmart.com from Pakistan"] },
      { title: "Module 7 - Account Management & Growth", topics: ["Managing inventory levels and reorders", "Handling customer reviews and feedback", "Amazon account health best practices", "Expanding to Amazon US, UK, UAE and international markets"] }
    ],
    skills: ["Amazon FBA", "Product Hunting", "Helium 10", "China Sourcing", "Alibaba Negotiation", "PPC Campaigns", "Listing Optimization", "Inventory Management", "Walmart Marketplace", "International Selling"],
    forList: [
      "Beginners who want to start selling on Amazon from Pakistan",
      "Entrepreneurs looking to build a passive income through e-commerce",
      "Freelancers wanting to offer Amazon account management services",
      "Business owners planning to expand internationally",
      "Students looking for a practical, income-generating skill",
      "Anyone serious about building a long-term e-commerce brand"
    ]
  },

  "Daraz Selling": {
    icon: "daraz",
    badge: "Pakistan's #1 Marketplace",
    fee: { online: 12000, physical: 15000 },
    tagline: "Build a profitable Daraz store and dominate Pakistan's largest online marketplace with proven strategies.",
    about: "Daraz is Pakistan's number one e-commerce platform, with millions of buyers actively searching for products every day. This course teaches you everything needed to launch and grow a successful Daraz seller account. You will learn how to set up your store professionally, create listings that rank in Daraz search, run Daraz-sponsored ads and build a reputation that drives consistent orders.",
    tags: ["Daraz", "Pakistan E-commerce", "Marketplace Selling", "Local Business", "Daraz Ads", "Order Management"],
    overview: [
      { icon: "store", label: "Platform", value: "Daraz Pakistan" },
      { icon: "level", label: "Level", value: "All Levels" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Create and verify a professional Daraz seller account",
      "Create high-ranking product listings with SEO",
      "Optimize product images to increase click-through rate",
      "Set competitive pricing and run Daraz promotions",
      "Run Daraz Sponsored Products ad campaigns",
      "Build positive reviews and seller ratings",
      "Manage orders, shipping and customer returns",
      "Analyze Daraz analytics to improve performance"
    ],
    modules: [
      { title: "Module 1 - Getting Started on Daraz", topics: ["Setting up your Daraz Seller account", "Account verification and shop profile setup", "Understanding Daraz seller policies", "Navigating the Daraz Seller Center"] },
      { title: "Module 2 - Product Listing & SEO", topics: ["Writing SEO-optimized product titles", "Creating detailed product descriptions", "Image guidelines and quality standards", "Category selection and attributes"] },
      { title: "Module 3 - Pricing & Promotions", topics: ["Competitive pricing research on Daraz", "Creating flash sales and vouchers", "Daraz Super 10.10, 11.11 and campaign strategy", "Bundle deals and upselling techniques"] },
      { title: "Module 4 - Daraz Advertising", topics: ["Introduction to Sponsored Products", "Creating and managing ad campaigns", "Keyword bidding strategy", "Measuring ad ROI and optimizing"] },
      { title: "Module 5 - Orders & Fulfillment", topics: ["Processing and confirming orders", "Packing standards and Daraz logistics", "Handling cancellations and returns", "Building a 5-star seller rating"] }
    ],
    skills: ["Daraz Seller Center", "Product SEO", "Daraz Ads", "Order Fulfillment", "Pricing Strategy", "Inventory Management", "Customer Service", "Campaign Participation", "Analytics", "Local Sourcing"],
    forList: [
      "Anyone who wants to sell products online in Pakistan",
      "Small business owners wanting to reach more customers",
      "Individuals looking to start a low-cost online business",
      "Shopkeepers who want to go digital and increase sales",
      "Students wanting to earn income through e-commerce",
      "Freelancers wanting to manage Daraz stores for clients"
    ]
  },

  "WordPress Pro": {
    icon: "wordpress",
    badge: "Website & Store Development",
    fee: { online: 19000, physical: 22000 },
    tagline: "Build stunning business websites and powerful WooCommerce stores using WordPress, no coding required.",
    about: "WordPress powers over 40% of all websites on the internet. In this professional course, you will learn to build complete business websites and fully functional WooCommerce e-commerce stores using WordPress without writing a single line of code. From installation to SEO optimization and speed performance, this course equips you with everything needed to work as a WordPress developer.",
    tags: ["WordPress", "WooCommerce", "Website Design", "SEO", "Elementor", "Web Development"],
    overview: [
      { icon: "globe", label: "Platform", value: "WordPress" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Install and configure WordPress on hosting",
      "Design professional pages with Elementor",
      "Build a complete WooCommerce e-commerce store",
      "Implement on-page SEO to rank on Google",
      "Optimize website speed and Core Web Vitals",
      "Secure your WordPress site from hacking",
      "Set up contact forms and email marketing",
      "Connect Google Analytics and Search Console"
    ],
    modules: [
      { title: "Module 1 - Web Hosting & WordPress Setup", topics: ["Choosing the right hosting provider", "Domain registration and DNS setup", "Installing WordPress on cPanel", "Initial WordPress configuration and settings"] },
      { title: "Module 2 - Theme & Page Design", topics: ["Selecting and installing professional themes", "Using Elementor page builder", "Creating homepage, about and service pages", "Mobile responsive design best practices"] },
      { title: "Module 3 - WooCommerce Store", topics: ["Installing and configuring WooCommerce", "Adding products, categories and attributes", "Setting up payment gateways for Pakistan", "Configuring shipping zones and rates"] },
      { title: "Module 4 - Plugins & Functionality", topics: ["Must-have WordPress plugins", "Contact forms with Contact Form 7", "Setting up sliders, galleries and portfolios", "Membership and booking functionality"] },
      { title: "Module 5 - SEO & Performance", topics: ["Setting up Yoast SEO or RankMath", "Keyword research and on-page optimization", "Website speed optimization with WP Rocket", "Google Analytics and Search Console integration"] }
    ],
    skills: ["WordPress", "Elementor", "WooCommerce", "SEO", "Web Hosting", "cPanel", "Yoast SEO", "Speed Optimization", "Security", "Google Analytics"],
    forList: [
      "Students who want to learn web development without coding",
      "Freelancers offering website design services to clients",
      "Business owners wanting to build their own professional website",
      "E-commerce entrepreneurs wanting a custom online store",
      "Bloggers and content creators needing a professional platform",
      "Anyone wanting a career in digital services"
    ]
  },

  "Freelancing": {
    icon: "freelance",
    badge: "Global Freelance Career",
    fee: { online: 15000, physical: 18000 },
    tagline: "Build a profitable freelance career on Upwork, Fiverr and LinkedIn and earn in dollars from Pakistan.",
    about: "Freelancing is one of the most powerful ways to earn a sustainable income online, working with international clients from the comfort of your home. This course teaches you how to build a professional freelance profile, write proposals that win projects, communicate with clients professionally and deliver work that gets 5-star reviews.",
    tags: ["Freelancing", "Upwork", "Fiverr", "LinkedIn", "Client Communication", "Remote Work"],
    overview: [
      { icon: "platform", label: "Platforms", value: "Upwork, Fiverr, LinkedIn" },
      { icon: "level", label: "Level", value: "All Levels" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Create a professional Fiverr and Upwork profile",
      "Write winning proposals and cover letters",
      "Communicate professionally with international clients",
      "Choose the right niche and position yourself as an expert",
      "Deliver quality work and earn 5-star reviews",
      "Set your rates and negotiate like a professional",
      "Build your LinkedIn personal brand and attract clients",
      "Scale from occasional gigs to consistent monthly income"
    ],
    modules: [
      { title: "Module 1 - Introduction to Freelancing", topics: ["What freelancing is and why it works for Pakistan", "Best platforms for Pakistani freelancers", "Understanding client expectations", "Freelancing mindset and discipline"] },
      { title: "Module 2 - Profile Building", topics: ["Creating a standout Fiverr gig", "Optimizing your Upwork profile for visibility", "Professional profile photo and portfolio tips", "Writing a compelling bio and overview"] },
      { title: "Module 3 - Getting Your First Order", topics: ["Sending 20+ proposals daily on Upwork", "Fiverr gig SEO and ranking techniques", "Pricing your services competitively at the start", "How to respond to messages and handle inquiries"] },
      { title: "Module 4 - Client Communication", topics: ["Professional communication in English", "Setting clear expectations and deadlines", "Handling revision requests confidently", "Building long-term client relationships"] },
      { title: "Module 5 - Scaling & Branding", topics: ["Raising your rates as you grow", "Getting testimonials and referrals", "Building a personal brand on LinkedIn", "Managing multiple clients and projects"] },
      { title: "Module 6 - Bootcamp & Incubator Path", topics: ["What is a freelance bootcamp and how to benefit", "Joining Prime Ecommerce Hub intensive bootcamp sessions", "Business Incubator program - launch your own agency", "From freelancer to business owner: scaling with a team"] }
    ],
    skills: ["Fiverr Profile Setup", "Upwork Bidding", "Proposal Writing", "Client Management", "LinkedIn Branding", "Service Packaging", "Agency Building", "Portfolio Creation", "Review Building", "Rate Negotiation"],
    forList: [
      "Students who want to earn money online with existing or new skills",
      "Fresh graduates looking for remote income opportunities",
      "Professionals wanting to offer services to international clients",
      "Homemakers and part-time workers needing flexible income",
      "Anyone with a skill in writing, design, coding or marketing to offer",
      "People who want full control over their work and income"
    ]
  },

  "Digital Marketing": {
    icon: "marketing",
    badge: "Online Advertising & Growth",
    fee: { online: 12000, physical: 15000 },
    tagline: "Master Facebook, Instagram, Google Ads and SEO to drive real traffic and generate consistent sales for any business.",
    about: "Digital Marketing is the backbone of every successful online business. In this hands-on course, you will learn how to run profitable advertising campaigns on Facebook, Instagram and Google, build an SEO strategy that generates organic traffic and create content that converts visitors into paying customers.",
    tags: ["Facebook Ads", "Instagram Ads", "Google Ads", "SEO", "Content Marketing", "Analytics"],
    overview: [
      { icon: "ads", label: "Focus", value: "Paid & Organic Marketing" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Set up and run Facebook and Instagram ad campaigns",
      "Implement SEO strategies to rank on Google",
      "Create laser-targeted audiences for maximum ROI",
      "Analyze campaign data and optimize for better results",
      "Write compelling ad copy that converts",
      "Design effective creatives using Canva",
      "Build and run email marketing campaigns",
      "Manage social media pages and grow organically"
    ],
    modules: [
      { title: "Module 1 - Digital Marketing Foundations", topics: ["Overview of digital marketing channels", "Understanding the customer journey", "Setting up Facebook Business Manager", "Google Analytics and pixel setup"] },
      { title: "Module 2 - Facebook & Instagram Ads", topics: ["Campaign objectives and structures", "Audience targeting - interests, behaviors, demographics", "Creating image, video and carousel ads", "Retargeting campaigns and lookalike audiences"] },
      { title: "Module 3 - Google Ads", topics: ["Search campaigns and keyword targeting", "Display network advertising", "Shopping ads for e-commerce", "Tracking conversions and ROAS"] },
      { title: "Module 4 - SEO", topics: ["On-page SEO - titles, meta descriptions, content", "Keyword research with free and paid tools", "Building backlinks and off-page SEO", "Local SEO for Pakistani businesses"] },
      { title: "Module 5 - Content & Social Media", topics: ["Content strategy and content calendar", "Creating viral posts and reels", "Influencer marketing approach", "Growing an organic following from zero"] }
    ],
    skills: ["Facebook Ads", "Instagram Ads", "Google Ads", "SEO", "Content Marketing", "Audience Targeting", "Ad Copywriting", "Analytics", "Email Marketing", "Social Media Management"],
    forList: [
      "Business owners wanting to market their products and services online",
      "Freelancers looking to offer digital marketing services",
      "Students interested in a career in marketing and advertising",
      "E-commerce sellers wanting to drive more traffic and sales",
      "Social media managers wanting to level up their skills",
      "Anyone who wants to learn how to grow a brand online"
    ]
  },

  "AI Tools": {
    icon: "ai",
    badge: "Artificial Intelligence for Business",
    fee: { online: 12000, physical: 15000 },
    tagline: "Harness the power of ChatGPT, Midjourney and cutting-edge AI tools to automate your work and grow your business faster.",
    about: "Artificial Intelligence is transforming how businesses operate, create content and make decisions. This practical course teaches you how to use the most powerful AI tools available today including ChatGPT, Midjourney, and automation platforms to dramatically increase your productivity and enhance your creative output.",
    tags: ["ChatGPT", "Midjourney", "AI Automation", "Prompt Engineering", "AI Writing", "Business AI"],
    overview: [
      { icon: "ai", label: "Tools", value: "ChatGPT, Midjourney & More" },
      { icon: "level", label: "Level", value: "Beginner to Intermediate" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Use ChatGPT effectively for business and content creation",
      "Generate professional images with Midjourney and DALL-E",
      "Write high-quality content, emails and ads with AI",
      "Automate repetitive tasks using AI workflow tools",
      "Build custom AI prompts for any business use case",
      "Analyze data and create reports using AI",
      "Create AI-powered social media content at scale",
      "Integrate AI tools into your existing business workflow"
    ],
    modules: [
      { title: "Module 1 - Introduction to AI Tools", topics: ["What AI tools are and how they work", "Overview of ChatGPT, Claude and Gemini", "Free vs paid AI tool options", "Setting up your AI toolkit"] },
      { title: "Module 2 - ChatGPT Mastery", topics: ["Advanced prompt engineering techniques", "Using ChatGPT for business writing and emails", "Creating marketing copy and ad scripts", "Research, analysis and summarization"] },
      { title: "Module 3 - AI Image Generation", topics: ["Midjourney setup and prompt structure", "Creating product images and brand visuals", "DALL-E 3 for custom illustrations", "AI image editing and enhancement"] },
      { title: "Module 4 - AI for Business Automation", topics: ["Zapier and Make.com AI integrations", "Automating social media posting", "AI-powered customer service chatbots", "Email marketing automation with AI"] },
      { title: "Module 5 - AI in E-commerce & Freelancing", topics: ["Using AI to write Amazon and Daraz listings", "AI tools for Shopify store management", "Offering AI services on Fiverr and Upwork", "Building an AI-powered content business"] }
    ],
    skills: ["ChatGPT", "Prompt Engineering", "Midjourney", "DALL-E", "AI Writing", "Automation", "Zapier", "Content Creation", "AI for E-commerce", "Business AI"],
    forList: [
      "Business owners wanting to work smarter with AI assistance",
      "Freelancers who want to offer AI-powered services",
      "Content creators and marketers needing faster production",
      "Students who want to be ahead in the AI-driven job market",
      "E-commerce sellers wanting to automate product listings",
      "Anyone curious about AI and its real-world applications"
    ]
  },

  "SEO Basics": {
    icon: "seo",
    badge: "Search Engine Optimization",
    fee: { online: 12000, physical: 15000 },
    tagline: "Learn how to rank your website on the first page of Google and drive free, consistent organic traffic.",
    about: "Search Engine Optimization (SEO) is the art and science of getting your website to appear at the top of Google search results without paying for ads. In this focused course, you will learn on-page and off-page SEO techniques, keyword research, link building and technical SEO fundamentals.",
    tags: ["SEO", "Google Ranking", "Keyword Research", "Backlinks", "On-Page SEO", "Technical SEO"],
    overview: [
      { icon: "search", label: "Focus", value: "Google SEO" },
      { icon: "level", label: "Level", value: "Beginner to Intermediate" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Conduct professional keyword research",
      "Optimize pages with on-page SEO best practices",
      "Build high-quality backlinks to improve authority",
      "Improve website speed and technical performance",
      "Set up and optimize Google My Business for local SEO",
      "Use Google Search Console and Analytics",
      "Write SEO-friendly content that ranks and converts",
      "Track rankings and measure SEO results"
    ],
    modules: [
      { title: "Module 1 - SEO Fundamentals", topics: ["How Google search works", "Understanding crawling, indexing and ranking", "White hat vs black hat SEO", "Setting up Google Search Console and Analytics"] },
      { title: "Module 2 - Keyword Research", topics: ["Free keyword tools - Google Keyword Planner, Ubersuggest", "Finding low-competition, high-volume keywords", "Long-tail keyword strategy", "Keyword mapping to pages"] },
      { title: "Module 3 - On-Page SEO", topics: ["Optimizing titles, meta descriptions and headings", "Internal linking strategy", "Image optimization and alt text", "Content structure and E-E-A-T principles"] },
      { title: "Module 4 - Off-Page SEO & Link Building", topics: ["What backlinks are and why they matter", "Guest posting and outreach", "Directory submissions and citations", "Social signals and brand mentions"] },
      { title: "Module 5 - Local SEO & Reporting", topics: ["Google My Business setup and optimization", "Local citation building", "Tracking rankings with free tools", "Creating SEO reports for clients"] }
    ],
    skills: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Link Building", "Technical SEO", "Google Search Console", "Google Analytics", "Local SEO", "Content SEO", "Rank Tracking"],
    forList: [
      "Website owners who want more organic traffic from Google",
      "Freelancers wanting to add SEO services to their portfolio",
      "Business owners wanting to rank higher than competitors",
      "Bloggers and content creators wanting more readers",
      "Digital marketing students wanting to specialize in SEO",
      "E-commerce sellers wanting to rank products organically"
    ]
  },

  "Store Management": {
    icon: "management",
    badge: "E-commerce Operations",
    fee: { online: 12000, physical: 15000 },
    tagline: "Master the complete day-to-day operations of any online store from inventory to customer service.",
    about: "Running a successful online store requires consistent, professional daily operations. This course teaches you the complete workflow of managing an e-commerce store across Shopify, Daraz, Amazon and WooCommerce platforms. You will learn how to handle orders, manage inventory, respond to customers and keep your store running smoothly and profitably every single day.",
    tags: ["Store Operations", "Inventory Management", "Order Processing", "Customer Service", "Multi-platform", "E-commerce Management"],
    overview: [
      { icon: "platform", label: "Platforms", value: "Shopify, Daraz, Amazon" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Process and fulfill orders efficiently and on time",
      "Manage inventory levels to prevent stockouts",
      "Handle customer inquiries and complaints professionally",
      "Process returns, refunds and exchanges smoothly",
      "Track store performance with analytics dashboards",
      "Update product listings and prices regularly",
      "Manage supplier relationships and reordering",
      "Build and protect your seller reputation and ratings"
    ],
    modules: [
      { title: "Module 1 - E-commerce Operations Overview", topics: ["The daily workflow of an online store manager", "Tools and software used in store management", "Setting up management systems and processes", "Time management for store operations"] },
      { title: "Module 2 - Order & Inventory Management", topics: ["Order processing workflow from placement to delivery", "Inventory tracking methods and tools", "Preventing stockouts and overstock situations", "Using spreadsheets and management software"] },
      { title: "Module 3 - Customer Service Excellence", topics: ["Responding to customer messages professionally", "Handling negative reviews and complaints", "Return and refund management best practices", "Building customer loyalty and repeat orders"] },
      { title: "Module 4 - Product & Listing Management", topics: ["Regular listing updates and optimization", "Seasonal pricing and promotional adjustments", "Adding new products and removing underperformers", "Multi-platform listing management"] },
      { title: "Module 5 - Analytics & Reporting", topics: ["Reading platform analytics dashboards", "Identifying best-selling and slow-moving products", "Creating weekly and monthly performance reports", "Making data-driven decisions for store growth"] }
    ],
    skills: ["Order Management", "Inventory Control", "Customer Service", "Product Listing", "Returns Management", "Analytics", "Multi-platform Management", "Supplier Relations", "Performance Reporting", "Process Optimization"],
    forList: [
      "E-commerce store owners who need to run operations professionally",
      "Freelancers wanting to offer store management services to clients",
      "Students aiming to work as e-commerce virtual assistants",
      "Employees managing online stores for businesses",
      "Anyone who has an online store but struggles with daily operations",
      "Professionals wanting to specialize in e-commerce management"
    ]
  },

  "eBay Selling": {
    icon: "ebay",
    badge: "Global Marketplace Selling",
    fee: { online: 15000, physical: 18000 },
    tagline: "Master eBay selling from product listing to international shipping and build a profitable global e-commerce business.",
    about: "eBay is one of the world's largest online marketplaces with over 130 million active buyers globally. This course teaches you everything needed to launch and grow a successful eBay seller account. From setting up your store to listing products professionally, managing auctions and Buy It Now listings, handling international shipping and building a top-rated seller reputation.",
    tags: ["eBay", "Global Selling", "Auction", "Buy It Now", "International Shipping", "Product Sourcing"],
    overview: [
      { icon: "globe", label: "Platform", value: "eBay Global" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Create and optimize a professional eBay seller account",
      "Write high-converting product titles and descriptions",
      "Take and edit product photos to eBay standards",
      "Set competitive pricing for auctions and fixed-price listings",
      "Handle international shipping and customs documentation",
      "Build a Top Rated Seller status on eBay",
      "Use eBay SEO to rank listings higher in search",
      "Analyze sales data to grow your eBay business"
    ],
    modules: [
      { title: "Module 1 - Getting Started on eBay", topics: ["Setting up your eBay seller account from Pakistan", "Understanding eBay fees and profit calculation", "PayPal and Payoneer payment setup", "Navigating eBay Seller Hub dashboard"] },
      { title: "Module 2 - Product Research & Sourcing", topics: ["Finding profitable products to sell on eBay", "Sourcing from local markets and Alibaba", "Dropshipping model on eBay", "Calculating profit margins and break-even"] },
      { title: "Module 3 - Listing Optimization", topics: ["Writing SEO-optimized titles and descriptions", "eBay Cassini search algorithm explained", "Professional product photography tips", "Category selection and item specifics"] },
      { title: "Module 4 - Auction vs Buy It Now Strategy", topics: ["When to use auctions vs fixed price", "Setting starting bids and reserve prices", "Best Offer feature strategy", "Managing multiple active listings"] },
      { title: "Module 5 - Shipping & International Selling", topics: ["Setting up shipping options and rates", "Global Shipping Program by eBay", "Packing standards for international orders", "Handling customs and import duties"] },
      { title: "Module 6 - Account Health & Growth", topics: ["Maintaining Top Rated Seller status", "Managing returns and disputes professionally", "eBay Promoted Listings advertising", "Scaling to a full-time eBay business"] }
    ],
    skills: ["eBay Seller Hub", "Product Research", "Listing SEO", "Auction Strategy", "International Shipping", "Payoneer Setup", "Customer Service", "Promoted Listings", "Dropshipping", "Account Health"],
    forList: [
      "Anyone wanting to sell products to international buyers from Pakistan",
      "Entrepreneurs looking to build a global e-commerce business",
      "Freelancers wanting to offer eBay store management services",
      "Students interested in earning in foreign currency",
      "Business owners wanting to expand their reach globally",
      "Beginners who want to start selling online with low investment"
    ]
  },

  "Etsy Shop": {
    icon: "etsy",
    badge: "Creative Marketplace Selling",
    fee: { online: 17000, physical: 20000 },
    tagline: "Build a profitable Etsy shop selling handmade products, digital downloads and vintage items to millions of buyers worldwide.",
    about: "Etsy is the world's leading marketplace for handmade, vintage and digital products with over 95 million active buyers. This course teaches you how to launch and grow a successful Etsy shop from Pakistan. You will learn to create compelling listings, use Etsy SEO to rank on the first page, sell digital products for passive income and run Etsy Ads effectively.",
    tags: ["Etsy", "Handmade", "Digital Products", "Creative Business", "Passive Income", "Etsy SEO"],
    overview: [
      { icon: "store", label: "Platform", value: "Etsy Marketplace" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Create and fully set up a professional Etsy shop",
      "Master Etsy SEO - titles, tags and descriptions",
      "Create and sell digital products for passive income",
      "Design professional product photos and mockups",
      "Run Etsy Ads campaigns that generate profitable sales",
      "Build 5-star reviews and a loyal customer base",
      "Set up Payoneer to receive international payments",
      "Scale your Etsy shop to consistent monthly revenue"
    ],
    modules: [
      { title: "Module 1 - Starting Your Etsy Shop", topics: ["Opening an Etsy account from Pakistan", "Shop name selection and branding strategy", "Setting up payment and billing with Payoneer", "Understanding Etsy fees and profit margins"] },
      { title: "Module 2 - Product Strategy", topics: ["Choosing the right niche on Etsy", "Handmade vs digital vs vintage products", "Product research using Etsy and EtsyHunt", "Pricing strategy for maximum profit"] },
      { title: "Module 3 - Listing Optimization & Etsy SEO", topics: ["Writing keyword-rich titles that rank on Etsy search", "Using all 13 tags strategically", "Description writing for conversion", "Etsy search algorithm and ranking factors"] },
      { title: "Module 4 - Digital Products & Passive Income", topics: ["Creating digital downloads with Canva", "Selling printables, templates and planners", "Setting up automatic digital delivery", "Building a passive income product catalog"] },
      { title: "Module 5 - Etsy Ads & Marketing", topics: ["Setting up and running Etsy Offsite Ads", "Etsy Ads budget strategy for beginners", "Pinterest and social media marketing for Etsy", "Email list building from Etsy customers"] },
      { title: "Module 6 - Reviews, Growth & Scaling", topics: ["Getting your first 5-star reviews quickly", "Handling customer requests and customization", "Opening multiple Etsy shops", "Scaling to full-time Etsy income from Pakistan"] }
    ],
    skills: ["Etsy SEO", "Digital Products", "Canva Design", "Product Photography", "Etsy Ads", "Payoneer Setup", "Niche Research", "Passive Income", "Brand Building", "Customer Service"],
    forList: [
      "Creative people who want to sell handmade or artistic products online",
      "Designers and content creators wanting passive income from digital products",
      "Students wanting to earn in dollars from Pakistan",
      "Freelancers wanting to add Etsy shop management to their services",
      "Anyone who wants to build a creative online business",
      "Beginners looking for a low-cost way to start selling internationally"
    ]
  },

  "Walmart Selling": {
    icon: "management",
    badge: "Global Marketplace Selling",
    fee: { online: 17000, physical: 20000 },
    tagline: "Set up and grow your Walmart Marketplace seller account with product listings and sales strategies.",
    about: "Walmart Marketplace is one of the fastest-growing e-commerce platforms in the US with millions of active buyers. This course teaches you how to launch and grow a successful Walmart seller account from Pakistan. You will learn to set up your seller profile, create optimized listings, manage inventory and build consistent sales on Walmart.com.",
    tags: ["Walmart", "US Marketplace", "Product Listing", "Seller Account", "E-commerce", "International Selling"],
    overview: [
      { icon: "globe", label: "Platform", value: "Walmart Marketplace" },
      { icon: "level", label: "Level", value: "Beginner to Pro" },
      { icon: "mode", label: "Mode", value: "Online & Offline" },
      { icon: "cert", label: "Certificate", value: "On Completion" },
      { icon: "support", label: "Support", value: "WhatsApp Group" },
      { icon: "clock", label: "Duration", value: "1.5 Months + 15 Days Internship" }
    ],
    learn: [
      "Set up a professional Walmart Marketplace seller account",
      "Create and optimize Walmart product listings",
      "Research winning products for the US market",
      "Manage inventory and fulfillment on Walmart",
      "Run Walmart sponsored ads campaigns",
      "Build positive reviews and seller ratings",
      "Analyze Walmart analytics and performance reports",
      "Scale your Walmart store for consistent monthly revenue"
    ],
    modules: [
      { title: "Module 1 - Getting Started on Walmart", topics: ["Setting up your Walmart Seller account from Pakistan", "Understanding Walmart fees and profit calculation", "Payoneer setup for receiving payments", "Navigating the Walmart Seller Center"] },
      { title: "Module 2 - Product Research & Listing", topics: ["Finding profitable products for Walmart US market", "Writing SEO-optimized titles and descriptions", "Walmart search algorithm explained", "Image guidelines and quality standards"] },
      { title: "Module 3 - Pricing & Promotions", topics: ["Competitive pricing research on Walmart", "Creating promotions and deals", "Buy Box optimization strategy", "Bundle deals and upselling"] },
      { title: "Module 4 - Walmart Advertising", topics: ["Introduction to Walmart Sponsored Products", "Creating and managing ad campaigns", "Keyword bidding strategy", "Measuring ad ROI"] },
      { title: "Module 5 - Orders & Account Health", topics: ["Processing and fulfilling orders", "Maintaining account health metrics", "Handling returns and disputes", "Building a top-rated seller profile"] }
    ],
    skills: ["Walmart Seller Center", "Product Listing", "Walmart Ads", "Order Fulfillment", "Pricing Strategy", "Inventory Management", "Customer Service", "Analytics", "International Selling", "Account Health"],
    forList: [
      "Anyone wanting to sell products to US buyers from Pakistan",
      "Amazon sellers wanting to expand to Walmart Marketplace",
      "Freelancers wanting to offer Walmart store management services",
      "Students interested in earning in foreign currency",
      "Business owners wanting to expand their reach globally",
      "Beginners who want to start selling online internationally"
    ]
  }

};

// All courses for sidebar
const ALL_COURSE_KEYS = Object.keys(COURSES);

// ============================================================
// INIT
// ============================================================
function init() {
  const params     = new URLSearchParams(window.location.search);
  const courseName = params.get('course') || 'Shopify Mastery';
  const data       = COURSES[courseName] || COURSES['Shopify Mastery'];

  if (!data) {
    document.body.innerHTML = '<div style="padding:60px;text-align:center;font-family:Inter,sans-serif"><h2>Course not found</h2><a href="index.html" style="color:#2563eb">Back to Home</a></div>';
    return;
  }

  document.title = courseName + ' | Prime Ecommerce Hub';

  // Breadcrumb
  const bc = document.getElementById('cdBreadcrumbName');
  if (bc) bc.textContent = courseName;

  // Hero icon — use SVG based on icon key
  const iconEl = document.getElementById('cdIcon');
  if (iconEl) iconEl.innerHTML = getCourseIconSVG(data.icon);

  const badgeEl = document.getElementById('cdBadge');
  if (badgeEl) badgeEl.textContent = data.badge;

  const titleEl = document.getElementById('cdTitle');
  if (titleEl) titleEl.textContent = courseName;

  const taglineEl = document.getElementById('cdTagline');
  if (taglineEl) taglineEl.textContent = data.tagline;

  // Tags
  const tagsEl = document.getElementById('cdTags');
  if (tagsEl) {
    data.tags.forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      tagsEl.appendChild(s);
    });
  }

  // Enroll buttons
  const enrollUrl = 'apply.html?course=' + encodeURIComponent(courseName);
  ['cdEnrollBtn','cdStickyEnroll','navEnrollBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.href = enrollUrl;
      if (id === 'navEnrollBtn') el.textContent = 'Enroll in ' + courseName;
    }
  });

  // Overview cards
  const ogEl = document.getElementById('cdOverviewGrid');
  if (ogEl) {
    data.overview.forEach(item => {
      ogEl.innerHTML += `<div class="cd-ov-item"><div class="cd-ov-icon">${getOverviewIcon(item.icon)}</div><div><strong>${item.value}</strong><span>${item.label}</span></div></div>`;
    });
  }

  // About
  const aboutEl = document.getElementById('cdAbout');
  if (aboutEl) aboutEl.textContent = data.about;

  // What You Will Learn
  const learnEl = document.getElementById('cdLearnGrid');
  if (learnEl) {
    data.learn.forEach(text => {
      learnEl.innerHTML += `<div class="cd-learn-item"><span>&#10003;</span><p>${text}</p></div>`;
    });
  }

  // Modules accordion
  const modulesEl = document.getElementById('cdModules');
  if (modulesEl) {
    data.modules.forEach((mod, i) => {
      const topics = mod.topics.map(t => `<li>${t}</li>`).join('');
      const isFirst = i === 0 ? 'open' : '';
      modulesEl.innerHTML += `
        <div class="cd-module ${isFirst}">
          <div class="cd-module-head" onclick="toggleModule(this)">
            <strong>${mod.title}</strong>
            <div style="display:flex;align-items:center;gap:8px">
              <span>${mod.topics.length} topics</span>
              <span class="cd-module-arrow">&#9660;</span>
            </div>
          </div>
          <div class="cd-module-body"><ul>${topics}</ul></div>
        </div>`;
    });
  }

  // Skills
  const skillsEl = document.getElementById('cdSkills');
  if (skillsEl) {
    data.skills.forEach(s => {
      skillsEl.innerHTML += `<span class="cd-skill-tag">${s}</span>`;
    });
  }

  // Who is it for
  const forEl = document.getElementById('cdForList');
  if (forEl) {
    data.forList.forEach(item => {
      forEl.innerHTML += `<li>${item}</li>`;
    });
  }

  // Sticky sidebar
  const stickyIcon = document.getElementById('cdStickyIcon');
  if (stickyIcon) stickyIcon.innerHTML = getCourseIconSVG(data.icon);

  const stickyTitle = document.getElementById('cdStickyTitle');
  if (stickyTitle) stickyTitle.textContent = courseName;

  const stickyDesc = document.getElementById('cdStickyDesc');
  if (stickyDesc) stickyDesc.textContent = data.tagline;

  // Fee display
  if (data.fee) {
    const perksEl = document.querySelector('.cd-sticky-perks');
    if (perksEl) {
      const feeHtml = `
        <li style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;">
          <strong style="color:#1e293b;display:block;margin-bottom:6px;">Course Fee</strong>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <span style="background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;padding:4px 12px;border-radius:20px;font-size:0.78rem;font-weight:700">
              &#128187; Online: PKR ${data.fee.online.toLocaleString()}
              <span style="background:#16a34a;color:#fff;padding:2px 6px;border-radius:10px;font-size:0.65rem;margin-left:4px">-3000</span>
            </span>
            <span style="background:#f1f5f9;border:1px solid #cbd5e1;color:#334155;padding:4px 12px;border-radius:20px;font-size:0.78rem;font-weight:700">
              &#127979; Physical: PKR ${data.fee.physical.toLocaleString()}
            </span>
          </div>
        </li>`;
      perksEl.insertAdjacentHTML('beforeend', feeHtml);
    }
  }

  // Other courses
  const otherEl = document.getElementById('cdOtherCourses');
  if (otherEl) {
    ALL_COURSE_KEYS.filter(k => k !== courseName).forEach(k => {
      const cd = COURSES[k];
      const div = document.createElement('div');
      div.className = 'cd-other-item';
      div.innerHTML = `<div style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:#f1f5f9;flex-shrink:0">${getCourseIconSVG(cd.icon)}</div><div><strong>${k}</strong><small>View course</small></div>`;
      div.addEventListener('click', () => {
        window.location.href = 'course-detail.html?course=' + encodeURIComponent(k);
      });
      otherEl.appendChild(div);
    });
  }
}

// Accordion toggle
function toggleModule(head) {
  head.parentElement.classList.toggle('open');
}

// ============================================================
// COURSE ICON SVGs (original brand logos as SVG)
// ============================================================
function getCourseIconSVG(icon) {
  const icons = {
    amazon:     `<svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.49.124.1.17.058.334-.13.49-.19.156-.495.37-.91.643-1.324.87-2.8 1.543-4.43 2.02C14.433 23.167 12.5 23.5 10.5 23.5c-4.36 0-8.368-1.077-12.024-3.23-.33-.19-.462-.438-.43-.74.033-.302.177-.456.433-.46l1.566-.05z" fill="#FF9900"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm2.5-10h-5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.5v1H9.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H11v-1h3.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5z" fill="#FF9900"/></svg>`,
    shopify:    `<svg viewBox="0 0 24 24" width="28" height="28" fill="#96BF48"><path d="M15.337 3.07c-.014-.087-.09-.14-.18-.134-.087.007-2.048.153-2.048.153s-1.37-1.345-1.503-1.478C11.47 1.48 11.084 1.5 10.946 1.54c-.02.006-.4.124-.99.306A4.17 4.17 0 009.73.972C9.28.03 8.6-.28 7.985.22 6.3 1.55 5.95 4.74 5.83 6.35c-1.23.38-2.1.65-2.12.66-.65.204-.67.225-.755.835L2 18.5 16 21l6-1.294L20.36 3.8c-.116-.018-.242.034-.3.143L15.337 3.07zm-3.52.53c-.47.145-.993.307-1.556.482.153-.59.453-1.177.893-1.574.148-.134.355-.28.59-.35.23.48.3 1.145.074 1.44zm-1.83-.18c-.26.063-.527.149-.8.24-.077-.576-.028-1.178.18-1.74.237.1.43.386.62.71v.79zm5.91 1.11c-.02-.012-.04-.026-.062-.038-.97-.57-2.18-.67-3.19-.67-1.01 0-2.01.1-2.98.67L9.5 4.6 9.1 6l-.69 1.5-1.04 2.8L6.6 12.7l-.45 1.8-.2 1.3L5.8 17l-.15 1.7L16 20l5-1.1-1.1-14.47z"/></svg>`,
    daraz:      `<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="6" fill="#F85606"/><text x="12" y="16.5" text-anchor="middle" fill="white" font-size="11" font-weight="900" font-family="Arial,sans-serif">dara</text></svg>`,
    wordpress:  `<svg viewBox="0 0 24 24" width="28" height="28" fill="#21759B"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.405 0 4.605.924 6.247 2.43l-8.802 25.544A8.456 8.456 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.422 8.422 0 01-4.2-1.123l4.458-12.946 4.567 12.516a8.42 8.42 0 01-4.825 1.553zm6.914-2.568l-3.892-10.672a.83.83 0 00-.055-.111c.596-1.57.92-3.088.92-4.285 0-.42-.028-.812-.077-1.17A8.44 8.44 0 0120.458 12a8.41 8.41 0 01-1.544 4.89z"/></svg>`,
    freelance:  `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#14a800" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`,
    marketing:  `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#1877f2" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    ai:         `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#6366f1" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    seo:        `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
    management: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#e11d48" stroke-width="2"><path d="M9 17H5a2 2 0 00-2 2v2h18v-2a2 2 0 00-2-2h-4M12 3v10M8 7l4-4 4 4"/></svg>`,
    ebay:       `<svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="12" r="10" fill="#e53238"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="9" font-weight="bold">eBay</text></svg>`,
    etsy:       `<svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="12" r="10" fill="#f16521"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">E</text></svg>`,
    cart:       `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" stroke-width="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`
  };
  return icons[icon] || icons['cart'];
}

function getOverviewIcon(key) {
  const map = {
    store: '&#128722;', globe: '&#127758;', level: '&#128200;',
    mode: '&#127757;', cert: '&#128220;', support: '&#129309;',
    platform: '&#128187;', ads: '&#128226;', search: '&#128269;',
    ai: '&#129302;', clock: '&#9201;'
  };
  return map[key] || '&#128197;';
}

// Run
init();

