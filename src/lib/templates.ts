export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  mjmlUrl: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

export const getTemplates = async (): Promise<Template[]> => {
  try {
    const response = await fetch('https://email.diybuilder.in/mjmlwebservice/getTemplates.php');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    //console.log(data)
    return data as Template[];
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
};

export const getTemplate = async (id: string): Promise<Template | undefined> => {
  const templates = await getTemplates();
  return templates.find(template => template.id === id);
};

export const saveTemplate = async (template: Template): Promise<Template | null> => {
    try {
      const method = template.id ? 'PUT' : 'POST';
  
      const response = await fetch('https://email.diybuilder.in/mjmlwebservice/cards.php', {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save template: ${response.statusText}`);
      }
  
      const savedTemplate = await response.json();
      return savedTemplate as Template;
    } catch (error) {
      console.error('Error saving template:', error);
      return null;
    }
  };

  export const copyTemplate = async (id: string): Promise<Template | null> => {
    try {
      const response = await fetch(`https://email.diybuilder.in/mjmlwebservice/duplicateTemplate.php?id=${encodeURIComponent(id)}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Failed to duplicate template');
      }
  
      const data = await response.json();
      return data as Template;
    } catch (error) {
      console.error('Error duplicating template:', error);
      return null;
    }
  };
  
  


  export const deleteTemplate = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://email.diybuilder.in/mjmlwebservice/deleteTemplate.php?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete template: ${response.statusText}`);
      }
  
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      return false;
    }
  };
  
  

export const createNewTemplate = (): Template => ({
  id: '',
  title: 'New Template',
  description: 'Template description',
  mjmlUrl:'',
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
});
