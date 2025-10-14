'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface DatabaseResult {
  message: string;
  data?: Record<string, unknown>;
  error?: string;
}

export default function Dashboard() {
  const [testResult, setTestResult] = useState<DatabaseResult | null>(null);
  const [initResult, setInitResult] = useState<DatabaseResult | null>(null);
  const [loading, setLoading] = useState({ test: false, init: false });

  const testConnection = async () => {
    setLoading({ ...loading, test: true });
    try {
      const response = await fetch('/api/db/test');
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading({ ...loading, test: false });
  };

  const initDatabase = async () => {
    setLoading({ ...loading, init: true });
    try {
      const response = await fetch('/api/db/init', { method: 'POST' });
      const result = await response.json();
      setInitResult(result);
    } catch (error) {
      setInitResult({
        message: 'Failed to initialize database',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading({ ...loading, init: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Neon Database Dashboard
          </h1>
          
          <div className="space-y-8">
            {/* Connection Test Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Database Connection Test
              </h2>
              <p className="text-gray-600 mb-4">
                Test the connection to your Neon database to ensure everything is configured correctly.
              </p>
              
              <Button 
                onClick={testConnection} 
                disabled={loading.test}
                className="mb-4"
              >
                {loading.test ? 'Testing...' : 'Test Connection'}
              </Button>
              
              {testResult && (
                <div className={`p-4 rounded-md ${
                  testResult.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}>
                  <h3 className={`font-medium ${
                    testResult.error ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {testResult.message}
                  </h3>
                  {testResult.data && (
                    <pre className="mt-2 text-sm text-gray-700 overflow-x-auto">
                      {JSON.stringify(testResult.data, null, 2)}
                    </pre>
                  )}
                  {testResult.error && (
                    <p className="mt-2 text-sm text-red-600">
                      Error: {testResult.error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Database Initialization Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Database Initialization
              </h2>
              <p className="text-gray-600 mb-4">
                Initialize your database with example tables (users and products). 
                This is safe to run multiple times.
              </p>
              
              <Button 
                onClick={initDatabase} 
                disabled={loading.init}
                className="mb-4"
                variant="outline"
              >
                {loading.init ? 'Initializing...' : 'Initialize Database'}
              </Button>
              
              {initResult && (
                <div className={`p-4 rounded-md ${
                  initResult.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}>
                  <h3 className={`font-medium ${
                    initResult.error ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {initResult.message}
                  </h3>
                  {initResult.error && (
                    <p className="mt-2 text-sm text-red-600">
                      Error: {initResult.error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Configuration Instructions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Configuration Instructions
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="font-medium text-blue-800 mb-2">
                  To connect your Neon database:
                </h3>
                <ol className="list-decimal list-inside text-blue-700 space-y-2">
                  <li>Go to your <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="underline">Neon dashboard</a></li>
                  <li>Navigate to your project and click on &ldquo;Connection Details&rdquo;</li>
                  <li>Copy the connection string (it should start with <code className="bg-blue-100 px-1 rounded">postgresql://</code>)</li>
                  <li>Update the <code className="bg-blue-100 px-1 rounded">DATABASE_URL</code> in your <code className="bg-blue-100 px-1 rounded">.env.local</code> file</li>
                  <li>Restart your development server with <code className="bg-blue-100 px-1 rounded">npm run dev</code></li>
                  <li>Come back to this page and test the connection</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}