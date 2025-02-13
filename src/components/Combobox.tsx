import React, { useState } from 'react';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const Combobox: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState('');

  return (
    <div>
      <label htmlFor="framework" style={{ display: 'block', marginBottom: '8px' }}>Select framework:</label>
      <select
        id="framework"
        value={selectedFramework}
        onChange={(e) => setSelectedFramework(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
      >
        <option value="" disabled>Select framework...</option>
        {frameworks.map((framework) => (
          <option key={framework.value} value={framework.value}>
            {framework.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;