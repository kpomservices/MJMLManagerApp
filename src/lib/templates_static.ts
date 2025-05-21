
export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

// Sample templates
const defaultTemplates: Template[] = [
  {
    id: '1',
    title: 'Welcome Email',
    description: 'A welcome email for new users',
    content: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Welcome to Our Service</mj-text>
        <mj-text font-size="16px">Thank you for signing up! We're excited to have you on board.</mj-text>
        <mj-button background-color="#F45E43" href="https://example.com">Get Started</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
    createdAt: '2023-01-01T12:00:00Z',
    updatedAt: '2023-01-01T12:00:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/welcome/300/200'
  },
  {
    id: '2',
    title: 'Newsletter',
    description: 'Monthly newsletter template',
    content: `<mjml>
  <mj-body>
    <mj-section background-color="#f0f0f0">
      <mj-column>
        <mj-text font-size="20px" font-family="helvetica">Monthly Newsletter</mj-text>
        <mj-text font-size="16px">Here's what's new this month...</mj-text>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text>Read our latest articles and updates.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
    createdAt: '2023-02-01T12:00:00Z',
    updatedAt: '2023-02-01T12:00:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/newsletter/300/200'
  },
  {
    id: '3',
    title: 'Promo',
    description: 'Promotional email template',
    content: `<mjml>
  <mj-body>
    <mj-section background-color="#fceb9f">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" font-family="helvetica">SPECIAL OFFER!</mj-text>
        <mj-text font-size="18px">Get 25% off your next purchase</mj-text>
        <mj-button background-color="#F45E43" href="https://example.com/promo">Shop Now</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
    createdAt: '2023-03-01T12:00:00Z',
    updatedAt: '2023-03-01T12:00:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/promo/300/200'
  }
];

// Template storage functions using localStorage
export const getTemplates = (): Template[] => {
  try {
    const templates = localStorage.getItem('mjmlTemplates');
    if (templates) {
      return JSON.parse(templates);
    }
    
    // Initialize with default templates if none exist
    localStorage.setItem('mjmlTemplates', JSON.stringify(defaultTemplates));
    return defaultTemplates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return defaultTemplates;
  }
};

export const getTemplate = (id: string): Template | undefined => {
  const templates = getTemplates();
  return templates.find(template => template.id === id);
};

export const saveTemplate = (template: Template): Template => {
  const templates = getTemplates();
  const now = new Date().toISOString();
  
  if (template.id && templates.some(t => t.id === template.id)) {
    // Update existing template
    const updatedTemplates = templates.map(t => {
      if (t.id === template.id) {
        return { ...template, updatedAt: now };
      }
      return t;
    });
    localStorage.setItem('mjmlTemplates', JSON.stringify(updatedTemplates));
    return { ...template, updatedAt: now };
  } else {
    // Create new template
    const newTemplate = {
      ...template,
      id: String(Date.now()),
      createdAt: now,
      updatedAt: now
    };
    localStorage.setItem('mjmlTemplates', JSON.stringify([newTemplate, ...templates]));
    return newTemplate;
  }
};

export const deleteTemplate = (id: string): void => {
  const templates = getTemplates();
  const updatedTemplates = templates.filter(template => template.id !== id);
  localStorage.setItem('mjmlTemplates', JSON.stringify(updatedTemplates));
};

export const createNewTemplate = (): Template => {
  return {
    id: '',
    title: 'New Template',
    description: 'Template description',
    content: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-family="helvetica">Hello World</mj-text>
        <mj-button background-color="#F45E43" href="https://example.com">Click me</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
    createdAt: '',
    updatedAt: ''
  };
};
