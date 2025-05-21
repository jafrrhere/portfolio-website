import React, { useEffect, useState } from 'react';
import './Terminal.css';

function Terminal() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [terminalContent, setTerminalContent] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    { type: 'command', text: '<span class="new-time">[21:35:54]</span> <span class="new-prompt">$</span> <span class="new-cmd">ssh jafar@portfolio.com</span>', delay: 300 },
    { type: 'output', text: '<span class="new-output">Password: ********</span>', delay: 800 },
    { type: 'output', text: '<span class="new-output">Access granted. Initializing system...</span>', delay: 1000 },
    { type: 'command', text: '<span class="new-prompt">$</span> <span class="new-cmd">cd /secrets</span>', delay: 300 },
    { type: 'command', text: '<span class="new-prompt">$</span> <span class="new-cmd">ls -la</span>', delay: 300 },
    { type: 'output', text: '<span class="new-output">total 4</span>', delay: 100 },
    { type: 'output', text: '<span class="new-output">drwxr-xr-x 2 Jafar Jafar 4096 Apr 4 2025 .</span>', delay: 50 },
    { type: 'output', text: '<span class="new-output">drwxr-xr-x 22 Jafar Jafar 4096 Apr 4 2025 ..</span>', delay: 50 },
    { type: 'output', text: '<span class="new-output new-file">-rw-r--r-- 1 Jafar Jafar 0 Apr 4 2025 real_achievements.txt</span>', delay: 150 },
    { type: 'output', text: '<span class="new-output new-file">-rw-r--r-- 1 Jafar Jafar 10 Apr 4 2025 bank_account.txt</span>', delay: 150 },
    { type: 'output', text: '<span class="new-output new-file">-rw-r--r-- 1 Jafar Jafar 120 Apr 4 2025 future_plans.txt</span>', delay: 150 },
    { type: 'output', text: '<span class="new-output new-file">-rw-r--r-- 1 Jafar Jafar 156 Apr 4 2025 skills.txt</span>', delay: 150 },
    { type: 'command', text: '<span class="new-prompt">/home/Jafar ></span>', delay: 400 }
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      const timer = setTimeout(() => {
        setTerminalContent(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
      }, line.delay);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <div id="new-terminal" className={isMinimized ? 'minimized' : ''}>
      <div id="new-terminal-header">
        <span className="new-dot red"></span>
        <span className="new-dot yellow"></span>
        <span className="new-dot green"></span>
        <span className="new-terminal-title">jafar@portfolio:~</span>
        <button id="new-terminal-close" onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? '+' : '-'}
        </button>
      </div>
      <div id="new-terminal-body">
        {terminalContent.map((line, index) => (
          <div key={index} className="new-terminal-line" dangerouslySetInnerHTML={{ __html: line.text }} />
        ))}
      </div>
    </div>
  );
}

export default Terminal; 