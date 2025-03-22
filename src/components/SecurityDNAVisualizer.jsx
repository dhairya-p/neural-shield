import { Shield, Code } from 'lucide-react';
import Header from './Header';
import VulnerabilityPanel from './VulnerabilityPanel';
import DNAVisualizer from './DNAVisualizer';
import ActivityLog from './ActivityLog';
import { useState } from 'react';

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

  // Add activity message to log
  const addActivity = (message) => {
    setActivity(prev => [...prev, message]);
  };

  // Simulate code analysis
  const analyzeCode = () => {
    setIsAnalyzing(true);
    setActivity([]);
    setVulnerabilities([]);
    setAnalysisComplete(false);
    
    // Simulate analysis steps with delays
    const analysisSteps = [
      { message: 'Neural pattern analysis initiated...', delay: 300 },
      { message: 'Scanning for known vulnerability patterns...', delay: 800 },
      { message: 'Performing symbolic verification of memory safety...', delay: 1500 },
      { message: 'Checking against security DNA constraints...', delay: 2200 },
      { message: 'Validation complete. Generating report...', delay: 3000 }
    ];
    
    analysisSteps.forEach(step => {
      setTimeout(() => {
        addActivity(step.message);
        
        // Final step - generate vulnerabilities report
        if (step.delay === 3000) {
          generateVulnerabilityReport();
        }
      }, step.delay);
    });
  };
  
  // Generate vulnerability report based on code content
  const generateVulnerabilityReport = () => {
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
  };
  
  // Simulate evolution of security DNA
  const evolveSecurityDNA = () => {
    setIsAnalyzing(true);
    
    const evolutionSteps = [
      { message: 'Initiating security DNA evolution...', delay: 300 },
      { message: 'Analyzing vulnerability patterns...', delay: 800 },
      { message: 'Generating mutation candidates...', delay: 1500 },
      { message: 'Applying optimal security mutations...', delay: 2500 }
    ];
    
    evolutionSteps.forEach(step => {
      setTimeout(() => {
        addActivity(step.message);
        
        // Final step - apply mutations
        if (step.delay === 2500) {
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
        }
      }, step.delay);
    });
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-1 overflow-hidden">
          {/* Code Editor Panel */}
          <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4 flex flex-col">
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
              <VulnerabilityPanel vulnerabilities={vulnerabilities} />
            )}
          </div>
          
          {/* Security DNA Visualization Panel */}
          <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4 flex flex-col">
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
            <DNAVisualizer activeRules={activeRules} />
            
            {/* Activity Log */}
            <ActivityLog activity={activity} />
        </div>
      </div>
    </div>
  );
};

export default SecurityDNAVisualizer;