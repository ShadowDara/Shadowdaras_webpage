'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [csvData, setCsvData] = useState<string>('');

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/data/repo_database/project_list.csv');
      const text = await response.text();
      setCsvData(text);
    };

    fetchCSV();
  }, []);

  return (
    <div>
      <pre>{csvData}</pre>
    </div>
  );
}
