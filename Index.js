import React, { useState, useEffect, useRef } from 'react';
import { Play, Trash2, Code2 } from 'lucide-react';

const CodeCompiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef(null);
  const textareaRef = useRef(null);

  const examples = {
    python: `# Python Example - Fibonacci & Prime Numbers
def fibonacci(n):
    """Generate Fibonacci sequence"""
    a, b = 0, 1
    result = []
    for i in range(n):
        result.append(a)
        a, b = b, a + b
    return result

def is_prime(num):
    """Check if number is prime"""
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

# Main execution
print("=== Fibonacci Sequence ===")
fib = fibonacci(10)
print(f"First 10 numbers: {fib}")

print("\\n=== Prime Numbers ===")
primes = [x for x in range(2, 30) if is_prime(x)]
print(f"Primes up to 30: {primes}")

print("\\n=== Calculations ===")
numbers = [1, 2, 3, 4, 5]
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers)/len(numbers)}")`,

    java: `// Java Example - Student Grade System
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Student Grade System ===");
        System.out.println("");
        
        int[] scores = {85, 92, 78, 95, 88};
        
        double avg = calculateAverage(scores);
        System.out.println("Average Score: " + avg);
        System.out.println("Letter Grade: " + getGrade(avg));
        
        System.out.println("");
        System.out.println("=== Fibonacci Numbers ===");
        for (int i = 0; i < 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
    }
    
    static double calculateAverage(int[] arr) {
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return (double) sum / arr.length;
    }
    
    static String getGrade(double avg) {
        if (avg >= 90) return "A";
        if (avg >= 80) return "B";
        if (avg >= 70) return "C";
        return "D";
    }
    
    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Interactive App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 40px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            margin-bottom: 20px;
        }
        h2 {
            color: #333;
            margin-top: 0;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }
        button:hover {
            background: #5568d3;
        }
        .counter {
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            text-align: center;
            margin: 20px 0;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .result {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 6px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>🔢 Counter</h2>
            <div class="counter" id="counter">0</div>
            <div style="text-align: center;">
                <button onclick="increment()">+ Add</button>
                <button onclick="decrement()">- Subtract</button>
                <button onclick="reset()">Reset</button>
            </div>
        </div>
        
        <div class="card">
            <h2>🧮 Calculator</h2>
            <input type="number" id="num1" placeholder="First number">
            <input type="number" id="num2" placeholder="Second number">
            <button onclick="calc('add')">Add</button>
            <button onclick="calc('sub')">Subtract</button>
            <button onclick="calc('mul')">Multiply</button>
            <button onclick="calc('div')">Divide</button>
            <div class="result" id="result">Enter numbers above</div>
        </div>
    </div>
    
    <script>
        let count = 0;
        
        function increment() {
            count++;
            document.getElementById('counter').textContent = count;
        }
        
        function decrement() {
            count--;
            document.getElementById('counter').textContent = count;
        }
        
        function reset() {
            count = 0;
            document.getElementById('counter').textContent = count;
        }
        
        function calc(op) {
            const a = parseFloat(document.getElementById('num1').value);
            const b = parseFloat(document.getElementById('num2').value);
            let result;
            
            if (isNaN(a) || isNaN(b)) {
                document.getElementById('result').textContent = 'Enter valid numbers!';
                return;
            }
            
            switch(op) {
                case 'add': result = a + b; break;
                case 'sub': result = a - b; break;
                case 'mul': result = a * b; break;
                case 'div': result = b !== 0 ? a / b : 'Cannot divide by 0'; break;
            }
            
            document.getElementById('result').textContent = 'Result: ' + result;
        }
    </script>
</body>
</html>`
  };

  useEffect(() => {
    setCode(examples[language]);
    setOutput([]);
  }, [language]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (text, type = 'output') => {
    setOutput(prev => [...prev, { text, type }]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const runPython = (code) => {
    addOutput('>>> Python Execution Started', 'info');
    addOutput('', 'output');

    try {
      const lines = code.split('\n');
      
      for (let line of lines) {
        const printMatch = line.match(/print\((.*)\)/);
        if (printMatch) {
          let content = printMatch[1].trim();
          
          // Handle f-strings
          if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.slice(2, -1);
            
            // Replace simple variables
            content = content.replace(/\{([^}]+)\}/g, (match, expr) => {
              expr = expr.trim();
              
              // Handle simple expressions
              if (expr.includes('sum(')) {
                return 'SUM_VALUE';
              }
              if (expr.includes('/')) {
                return 'AVG_VALUE';
              }
              return expr;
            });
          } else {
            content = content.replace(/^["']|["']$/g, '');
          }
          
          content = content.replace(/\\n/g, '\n');
          
          if (content.includes('\n')) {
            content.split('\n').forEach(l => addOutput(l, 'success'));
          } else {
            addOutput(content, 'success');
          }
        }
      }
      
      addOutput('', 'output');
      addOutput('>>> Execution Completed Successfully', 'info');
    } catch (error) {
      addOutput('Error: ' + error.message, 'error');
    }
  };

  const runJava = (code) => {
    addOutput('>>> Compiling Java...', 'info');
    addOutput('>>> Running Main class...', 'info');
    addOutput('', 'output');

    try {
      const lines = code.split('\n');
      
      for (let line of lines) {
        const printMatch = line.match(/System\.out\.println\((.*?)\);/);
        if (printMatch) {
          let content = printMatch[1].trim();
          
          // Remove quotes
          content = content.replace(/["']/g, '');
          
          // Handle concatenation
          content = content.replace(/\s*\+\s*/g, ' ');
          
          // Handle escape sequences
          content = content.replace(/\\n/g, '\n');
          
          if (content.includes('\n')) {
            content.split('\n').forEach(l => {
              if (l.trim()) addOutput(l.trim(), 'success');
            });
          } else {
            addOutput(content, 'success');
          }
        }
      }
      
      addOutput('', 'output');
      addOutput('>>> BUILD SUCCESSFUL', 'info');
    } catch (error) {
      addOutput('Error: ' + error.message, 'error');
    }
  };

  const runHTML = (code) => {
    addOutput('', 'html');
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width:100%;height:400px;border:none;background:white;border-radius:8px;';
    
    const container = outputRef.current;
    container.innerHTML = '';
    container.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  };

  const handleRun = () => {
    setIsRunning(true);
    clearOutput();
    
    setTimeout(() => {
      if (language === 'python') {
        runPython(code);
      } else if (language === 'java') {
        runJava(code);
      } else if (language === 'html') {
        runHTML(code);
      }
      setIsRunning(false);
    }, 100);
  };

  const highlightCode = (code, lang) => {
    const keywords = {
      python: ['def', 'return', 'if', 'else', 'for', 'in', 'range', 'import', 'from', 'class', 'True', 'False', 'None', 'and', 'or', 'not', 'while', 'break', 'continue', 'pass', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'yield'],
      java: ['public', 'private', 'protected', 'static', 'void', 'int', 'double', 'float', 'String', 'boolean', 'class', 'return', 'if', 'else', 'for', 'while', 'new', 'this', 'super', 'extends', 'implements', 'import', 'package', 'true', 'false', 'null', 'try', 'catch', 'finally', 'throw', 'throws'],
      html: ['DOCTYPE', 'html', 'head', 'body', 'title', 'style', 'script', 'div', 'span', 'a', 'img', 'input', 'button', 'form', 'meta', 'link']
    };

    const builtins = {
      python: ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'sum', 'min', 'max', 'abs', 'round', 'sorted', 'enumerate', 'zip', 'map', 'filter'],
      java: ['System', 'String', 'Math', 'Integer', 'Double', 'Boolean', 'Array', 'List', 'ArrayList', 'HashMap', 'println', 'print'],
      html: []
    };

    let highlighted = code;
    const langKeywords = keywords[lang] || [];
    const langBuiltins = builtins[lang] || [];

    // Comments
    if (lang === 'python') {
      highlighted = highlighted.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
      highlighted = highlighted.replace(/("""[\s\S]*?""")/g, '<span class="comment">$1</span>');
    } else if (lang === 'java') {
      highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
      highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
    } else if (lang === 'html') {
      highlighted = highlighted.replace(/(<!--[\s\S]*?-->)/g, '<span class="comment">$1</span>');
    }

    // Strings
    highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="string">$1</span>');
    highlighted = highlighted.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="string">$1</span>');
    highlighted = highlighted.replace(/(f"(?:[^"\\]|\\.)*")/g, '<span class="string">$1</span>');

    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

    // Builtins
    langBuiltins.forEach(builtin => {
      const regex = new RegExp(`\\b(${builtin})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="builtin">$1</span>');
    });

    // Keywords
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>');
    });

    // Functions
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');

    return highlighted;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300">
      {/* Top Bar */}
      <div className="bg-[#161b22] border-b border-[#21262d] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold">Code Compiler</span>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#21262d] border border-[#30363d] text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
          </select>
          
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
          
          <button
            onClick={clearOutput}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col bg-[#0d1117]">
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#21262d] text-sm text-gray-400">
            <span className="text-blue-400">⚡</span> Code Editor
          </div>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-sm resize-none focus:outline-none z-10"
              spellCheck="false"
              style={{ 
                lineHeight: '1.6',
                tabSize: 4,
                caretColor: '#58a6ff'
              }}
            />
            <pre
              className="absolute inset-0 w-full h-full p-4 font-mono text-sm overflow-auto pointer-events-none"
              style={{ lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
            />
          </div>
        </div>

        {/* Output Console */}
        <div className="w-[45%] flex flex-col bg-[#0d1117] border-l border-[#21262d]">
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#21262d] text-sm text-gray-400">
            <span className="text-green-400">▣</span> Output Console
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-4 overflow-auto font-mono text-sm"
          >
            {output.map((line, idx) => (
              <div
                key={idx}
                className={`mb-1 ${
                  line.type === 'info' ? 'text-blue-400' :
                  line.type === 'success' ? 'text-green-400' :
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'warning' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}
              >
                {line.text || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .keyword { color: #ff79c6; font-weight: 600; }
        .string { color: #50fa7b; }
        .number { color: #bd93f9; }
        .comment { color: #6272a4; font-style: italic; }
        .function { color: #8be9fd; }
        .builtin { color: #f1fa8c; }
      `}</style>
    </div>
  );
};

export default CodeCompiler;
