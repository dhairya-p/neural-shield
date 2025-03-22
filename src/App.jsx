import React, { useState } from 'react';
import { AlertTriangle, Shield, Activity, Code, Zap } from 'lucide-react';
import Header from './components/Header';

// Sample security rules for demo purposes
const securityRules = [
  { id: 'memory-safety', name: 'Memory Safety', active: true, color: '#4ade80' },
  { id: 'input-validation', name: 'Input Validation', active: true, color: '#3b82f6' },
  { id: 'auth-checks', name: 'Authentication', active: false, color: '#f43f5e' },
  { id: 'crypto-standard', name: 'Encryption', active: true, color: '#a855f7' },
  { id: 'side-channel', name: 'Side-Channel Protection', active: false, color: '#facc15' },
  { id: 'logging', name: 'Secure Logging', active: true, color: '#fb923c' },
  { id: 'memory-bounds', name: 'Bounds Checking', active: true, color: '#14b8a6' },
  { id: 'data-privacy', name: 'Data Privacy', active: false, color: '#ec4899' },
];

// Sample code with vulnerabilities
const sampleCode = `function processUserData(userData) {
  // Store user credentials in localStorage
  localStorage.setItem('userToken', userData.token);
  
  // Execute the input as a command
  eval(userData.settings);
  
  // SQL query with string concatenation
  const query = "SELECT * FROM users WHERE id = " + userData.id;
  
  return executeQuery(query);
}
`;

const SecurityDNAVisualizer = () => {
  const [code, setCode] = useState(sampleCode);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [activeRules, setActiveRules] = useState(securityRules);
  const [generation, setGeneration] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activity, setActivity] = useState([]);

  // Simulate code analysis
  const analyzeCode = () => {
    setIsAnalyzing(true);
    setActivity([]);
    
    // Clear previous results
    setVulnerabilities([]);
    setAnalysisComplete(false);
    
    // Simulate analysis steps with delays
    setTimeout(() => {
      addActivity('Neural pattern analysis initiated...');
    }, 300);
    
    setTimeout(() => {
      addActivity('Scanning for known vulnerability patterns...');
    }, 800);
    
    setTimeout(() => {
      addActivity('Performing symbolic verification of memory safety...');
    }, 1500);
    
    setTimeout(() => {
      addActivity('Checking against security DNA constraints...');
    }, 2200);
    
    setTimeout(() => {
      addActivity('Validation complete. Generating report...');
      
      // Find sample vulnerabilities based on code content
      const foundVulnerabilities = [];
      
      if (code.includes('eval(')) {
        foundVulnerabilities.push({
          id: 'eval-usage',
          line: 7,
          severity: 'critical',
          rule: 'input-validation',
          description: 'Use of eval() with user input creates code injection vulnerability',
          suggestion: 'Replace with JSON.parse() or dedicated configuration parser'
        });
      }
      
      if (code.includes('localStorage.setItem')) {
        foundVulnerabilities.push({
          id: 'insecure-storage',
          line: 4,
          severity: 'high',
          rule: 'data-privacy',
          description: 'Sensitive data stored in localStorage is accessible to any script',
          suggestion: 'Use secure HttpOnly cookies or dedicated credential storage'
        });
      }
      
      if (code.includes('+ userData.id')) {
        foundVulnerabilities.push({
          id: 'sql-injection',
          line: 10,
          severity: 'critical',
          rule: 'input-validation',
          description: 'SQL injection vulnerability through string concatenation',
          suggestion: 'Use parameterized queries with prepared statements'
        });
      }
      
      setVulnerabilities(foundVulnerabilities);
      
      // Update security DNA based on findings
      const updatedRules = activeRules.map(rule => {
        if (rule.id === 'input-validation' && foundVulnerabilities.some(v => v.rule === 'input-validation')) {
          return { ...rule, active: false };
        }
        if (rule.id === 'data-privacy' && foundVulnerabilities.some(v => v.rule === 'data-privacy')) {
          return { ...rule, active: false };
        }
        return rule;
      });
      
      setActiveRules(updatedRules);
      setGeneration(prev => prev + 1);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const addActivity = (message) => {
    setActivity(prev => [...prev, message]);
  };
  
  // Simulate evolution of security DNA
  const evolveSecurityDNA = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      addActivity('Initiating security DNA evolution...');
    }, 300);
    
    setTimeout(() => {
      addActivity('Analyzing vulnerability patterns...');
    }, 800);
    
    setTimeout(() => {
      addActivity('Generating mutation candidates...');
    }, 1500);
    
    setTimeout(() => {
      addActivity('Applying optimal security mutations...');
      
      // Update rules based on vulnerabilities
      const evolvedRules = activeRules.map(rule => {
        if (!rule.active && (rule.id === 'input-validation' || rule.id === 'data-privacy')) {
          return { ...rule, active: true };
        }
        return rule;
      });
      
      setActiveRules(evolvedRules);
      setGeneration(prev => prev + 1);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row gap-4">
        {/* Code Editor */}
        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Code className="mr-2" size={20} /> Code Analysis
            </h2>
            <button 
              onClick={analyzeCode}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
            </button>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-green-400 p-4 font-mono text-sm rounded-md"
          />
          
          {/* Vulnerabilities Panel */}
          {analysisComplete && (
            <div className="mt-4 bg-gray-900 rounded-md p-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" size={18} />
                Vulnerabilities Detected: {vulnerabilities.length}
              </h3>
              
              {vulnerabilities.length > 0 ? (
                <div className="mt-2 space-y-3">
                  {vulnerabilities.map(vuln => (
                    <div key={vuln.id} className="bg-gray-800 p-3 rounded-md border-l-4 border-red-500">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{vuln.description}</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-300">Line {vuln.line}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Suggestion: {vuln.suggestion}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-400 mt-2">No vulnerabilities detected!</p>
              )}
            </div>
          )}
        </div>
        
        {/* Security DNA Visualization */}
        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Shield className="mr-2" size={20} /> Security DNA (Gen {generation})
            </h2>
            <button 
              onClick={evolveSecurityDNA}
              disabled={isAnalyzing || !analysisComplete}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Evolve DNA
            </button>
          </div>
          
          {/* DNA Visualization */}
          <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {activeRules.map(rule => (
                <div 
                  key={rule.id}
                  className={`px-3 py-2 rounded-md flex items-center ${rule.active ? 'border-2' : 'border border-dashed opacity-60'}`}
                  style={{ borderColor: rule.color, backgroundColor: `${rule.color}20` }}
                >
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: rule.color }}></div>
                  <span className={`text-sm font-medium`} style={{ color: rule.color }}>
                    {rule.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* DNA Helix Visualization */}
            <div className="mt-4 relative h-20 w-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {activeRules.map((rule, index) => (
                  <div 
                    key={`helix-${rule.id}`}
                    className={`absolute h-2 w-8 rounded-full transition-all duration-500 ${rule.active ? 'opacity-100' : 'opacity-30'}`}
                    style={{ 
                      backgroundColor: rule.color,
                      transform: `translateY(${Math.sin(index * Math.PI / 4) * 30}px) rotate(${index * 45}deg)`,
                      left: `${(index / activeRules.length) * 100}%`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Activity Log */}
          <div className="mt-4 bg-gray-900 rounded-md p-4 flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white flex items-center mb-2">
              <Activity className="mr-2 text-blue-400" size={18} />
              Analysis Activity
            </h3>
            <div className="space-y-2">
              {activity.map((message, i) => (
                <div key={i} className="text-sm flex items-start">
                  <Zap size={14} className="text-yellow-400 mr-2 mt-1" />
                  <span className="text-gray-300">{message}</span>
                </div>
              ))}
              {activity.length === 0 && (
                <p className="text-gray-500 text-sm italic">Click "Analyze Code" to begin...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDNAVisualizer;