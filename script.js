// Background Code Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create background code element
    const backgroundCode = document.createElement('div');
    backgroundCode.className = 'background-code';
    document.body.appendChild(backgroundCode);
    
    // Grid system to prevent overlapping
    const gridRows = 20;
    const gridCols = 3;
    const grid = Array(gridRows).fill().map(() => Array(gridCols).fill(false));
    
    // Define code snippets and characters
    const codeSnippets = [
        "function randomize(min, max) {",
        "  return Math.floor(Math.random() * (max - min + 1)) + min;",
        "}",
        "const analyze = async (data) => {",
        "  try {",
        "    const result = await processData(data);",
        "    return optimize(result);",
        "  } catch (err) {",
        "    console.error('Analysis failed:', err);",
        "  }",
        "};",
        "class Neural {",
        "  constructor(nodes) {",
        "    this.nodes = nodes;",
        "    this.layers = [];",
        "  }",
        "  addLayer(size) {",
        "    this.layers.push(new Array(size).fill(0));",
        "  }",
        "  activate() {",
        "    return this.forward(this.nodes);",
        "  }",
        "}",
        "const encryptData = (data, key) => {",
        "  let encrypted = '';",
        "  for (let i = 0; i < data.length; i++) {",
        "    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key);",
        "  }",
        "  return encrypted;",
        "}",
        "import { useState, useEffect } from 'react';",
        "function App() {",
        "  const [data, setData] = useState([]);",
        "  useEffect(() => {",
        "    fetchData().then(result => setData(result));",
        "  }, []);",
        "  return (",
        "    <div className='container'>",
        "      {data.map(item => <Component key={item.id} {...item} />)}",
        "    </div>",
        "  );",
        "}",
        "def quicksort(arr):",
        "  if len(arr) <= 1:",
        "    return arr",
        "  pivot = arr[len(arr) // 2]",
        "  left = [x for x in arr if x < pivot]",
        "  middle = [x for x in arr if x == pivot]",
        "  right = [x for x in arr if x > pivot]",
        "  return quicksort(left) + middle + quicksort(right)",
        "var matrix = [];",
        "for (let i = 0; i < 4; i++) {",
        "  matrix[i] = [];",
        "  for (let j = 0; j < 4; j++) {",
        "    matrix[i][j] = i * 4 + j;",
        "  }",
        "}"
    ];
    
    const symbols = "{}[]()<>.:,;+-*/=&|^%$#@!~`'\"\\";
    const keywords = ["function", "const", "let", "var", "if", "else", "for", "while", "do", "switch", "case", "break", 
                     "continue", "return", "try", "catch", "finally", "class", "extends", "implements", "interface", 
                     "export", "import", "from", "async", "await", "yield", "static", "public", "private", "protected"];
    
    // Find an empty grid cell
    function findEmptyCell() {
        // Try to find an empty cell
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                if (!grid[r][c]) {
                    grid[r][c] = true;
                    return { row: r, col: c };
                }
            }
        }
        
        // If all cells are full, clear a random cell
        const row = Math.floor(Math.random() * gridRows);
        const col = Math.floor(Math.random() * gridCols);
        return { row, col };
    }
    
    // Generate and display code with typing effect
    function generateCodeLine() {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        
        // Find an empty cell for positioning
        const cell = findEmptyCell();
        const cellHeight = window.innerHeight / gridRows;
        const cellWidth = window.innerWidth / gridCols;
        
        // Position within the cell with some randomness
        const yPos = cell.row * cellHeight + Math.floor(Math.random() * 10);
        const xPos = cell.col * cellWidth + Math.floor(Math.random() * 20);
        
        lineDiv.style.position = 'absolute';
        lineDiv.style.top = yPos + 'px';
        lineDiv.style.left = xPos + 'px';
        lineDiv.style.maxWidth = (cellWidth - 30) + 'px';
        
        // Either use an existing code snippet or generate random gibberish
        if (Math.random() < 0.7) {
            // Use code snippet
            const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            const indentation = ' '.repeat(Math.floor(Math.random() * 12));
            const typingSpan = document.createElement('span');
            typingSpan.className = 'typing';
            typingSpan.textContent = indentation + snippet;
            lineDiv.appendChild(typingSpan);
        } else {
            // Generate random code-like gibberish
            const length = 20 + Math.floor(Math.random() * 60);
            let text = ' '.repeat(Math.floor(Math.random() * 12)); // Indentation
            
            for (let i = 0; i < length; i++) {
                if (Math.random() < 0.1) {
                    // Add a symbol
                    text += symbols.charAt(Math.floor(Math.random() * symbols.length));
                } else if (Math.random() < 0.2) {
                    // Add a keyword
                    text += keywords[Math.floor(Math.random() * keywords.length)] + ' ';
                    i += 6; // Skip ahead as we added a longer word
                } else {
                    // Add a letter, number or space
                    const char = Math.random() < 0.9 ? 
                        String.fromCharCode(97 + Math.floor(Math.random() * 26)) : 
                        Math.floor(Math.random() * 10).toString();
                    text += char;
                }
            }
            
            const typingSpan = document.createElement('span');
            typingSpan.className = 'typing';
            typingSpan.textContent = text;
            lineDiv.appendChild(typingSpan);
        }
        
        backgroundCode.appendChild(lineDiv);
        
        // Set data-cell attribute to track grid position
        lineDiv.setAttribute('data-row', cell.row);
        lineDiv.setAttribute('data-col', cell.col);
        
        // Make text more visible by adding a slight glow
        lineDiv.style.textShadow = '0 0 5px rgba(0, 255, 127, 0.3)';
        
        // Remove line after animation completes and free up the grid cell
        setTimeout(() => {
            if (lineDiv.parentNode) {
                grid[cell.row][cell.col] = false;
                lineDiv.parentNode.removeChild(lineDiv);
            }
        }, 8000); // Remove after 8 seconds
    }
    
    // Add initial code lines
    for (let i = 0; i < Math.min(gridRows * gridCols, 15); i++) {
        setTimeout(() => {
            generateCodeLine();
        }, i * 300);
    }
    
    // Continuously add new lines
    setInterval(generateCodeLine, 1500);
}); 