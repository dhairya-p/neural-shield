
const DNAVisualizer = ({ activeRules }) => {
    return (
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
    );
  };
  
  export default DNAVisualizer;
  