import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Powered WhatsApp Agents`,
      description: `Create intelligent WhatsApp agents that handle customer inquiries 24/7 with human-like conversations`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Smart Response Management`,
      description: `Automated responses that learn and improve over time, ensuring consistent and accurate customer service`,
      icon: <i className="las la-comments"></i>,
    },
    {
      heading: `Real-Time Analytics`,
      description: `Track performance metrics and customer interactions to optimize your communication strategy`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Multi-Agent Support`,
      description: `Manage multiple AI agents across different departments and business functions effortlessly`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Template Library`,
      description: `Access pre-built response templates for common scenarios to maintain brand consistency`,
      icon: <i className="las la-copy"></i>,
    },
    {
      heading: `Seamless Integration`,
      description: `Connect with your existing business tools and CRM systems for streamlined operations`,
      icon: <i className="las la-plug"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `E-commerce Owner`,
      content: `AIConnect Hub transformed our customer service. We're now handling 3x more inquiries with half the team, and our response time dropped from hours to minutes.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Digital Agency Director`,
      content: `The AI agents are incredibly smart. Our clients are amazed by the natural conversations and 24/7 availability. It's a game-changer for small businesses.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `David Park`,
      designation: `Retail Store Manager`,
      content: `We've cut our customer service costs by 40% while improving satisfaction rates. The automated responses are spot-on and keep getting better.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small businesses starting with WhatsApp automation`,
      monthly: 29,
      yearly: 290,
      features: [
        `1 AI Agent`,
        `1000 messages/month`,
        `Basic templates`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing businesses needing advanced automation`,
      monthly: 79,
      yearly: 790,
      features: [
        `3 AI Agents`,
        `Unlimited messages`,
        `Advanced templates`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solution for large-scale operations`,
      monthly: 199,
      yearly: 1990,
      features: [
        `Unlimited AI Agents`,
        `Custom templates`,
        `Dedicated support`,
        `API access`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can I get started with AIConnect Hub?`,
      answer: `You can start within minutes! Simply sign up, connect your WhatsApp Business account, and your first AI agent will be ready to handle customer conversations.`,
    },
    {
      question: `Can I customize the AI responses?`,
      answer: `Absolutely! You can create custom templates, train your AI agents with specific responses, and maintain your brand voice across all communications.`,
    },
    {
      question: `What kind of support do you offer?`,
      answer: `We provide email support for all plans, with priority support for Professional plans and dedicated support managers for Enterprise customers.`,
    },
    {
      question: `Is it compatible with my existing tools?`,
      answer: `Yes, AIConnect Hub integrates seamlessly with popular CRM systems, e-commerce platforms, and business tools to enhance your workflow.`,
    },
  ]

  const steps = [
    {
      heading: `Connect WhatsApp`,
      description: `Link your WhatsApp Business account in just a few clicks`,
    },
    {
      heading: `Create Your AI Agent`,
      description: `Customize your virtual assistant with your brand voice and preferences`,
    },
    {
      heading: `Train & Launch`,
      description: `Quick training process to ensure accurate responses for your business`,
    },
    {
      heading: `Monitor & Optimize`,
      description: `Track performance and fine-tune your automation strategy`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in customer messages`,
    },
    {
      emoji: `💸`,
      title: `High customer service costs`,
    },
    {
      emoji: `😴`,
      title: `Missing after-hours inquiries`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your WhatsApp Business with AI-Powered Customer Service`}
        subtitle={`Automate customer support, boost response times, and cut costs by 30% with intelligent WhatsApp agents that work 24/7`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/ixV29r-aiconnectv2-bLIy`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`businesses growing with AIConnect Hub`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Brands`} />
      <LandingPainPoints
        title={`Businesses lose $75 billion annually due to poor customer service. Don't be one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks title={`Start Automating in Minutes`} steps={steps} />
      <LandingFeatures
        id="features"
        title={`Empower Your Business with Intelligent Automation`}
        subtitle={`Everything you need to deliver exceptional customer service at scale`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ Businesses Already Saving Time and Money`}
        subtitle={`See how others are transforming their customer service with AIConnect Hub`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Choose Your Path to Customer Service Excellence`}
        subtitle={`Flexible plans that grow with your business`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AIConnect Hub`}
        subtitle={`Everything you need to know to get started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Customer Service?`}
        subtitle={`Join thousands of businesses already saving time and money with AIConnect Hub`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
