const promptElement = document.getElementById('prompt');
// const cursorElement = document.getElementById('cursor');
const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const ansi_up = new AnsiUp();

const sendButton = document.getElementById('sendButton'); // Get reference to sendButton
const clearButton = document.getElementById('clearButton'); // Get reference to clearButton

const vaultKey = "12345";
const username = "rudolphpienaar";
const cubeURL = "https://cube.chrisproject.org/api/v1/";

function prompt_set(promptElement) {
  prefix = `<span class="username">${username}</span>@<span class="cubeURL">${cubeURL}</span>`
  promptElement.innerHTML = prefix + " &gt;"
} 

function command_parse(command) {
  if(command == "help") {
    command = "--help";
  }
  if(command == "version") {
    command = "--version";
  }
  if(command == "clear") {
    command = "";
    clearOutput()
  }
  return command;
}

function sendCommand() {
  const command = command_parse(inputElement.value.trim());
  if (command) {
    outputOrig = outputElement.innerHTML;
    outputElement.innerHTML = `<code class="input">&gt chrs ${command}\n<code>` + outputElement.innerHTML;
    const url = `http://192.168.1.200:2025/api/v1/chrs/${command}?username=rudolphpienaar&vaultKey=12345`;
    fetch(url, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      let stdoutDecoded = '';
      let stderrDecoded = '';

      if (data.stdout instanceof Uint8Array) {
        stdoutDecoded = new TextDecoder().decode(data.stdout);
      } else if (typeof data.stdout === 'string') {
        stdoutDecoded = data.stdout;
      }

      if (data.stderr instanceof Uint8Array) {
        stderrDecoded = new TextDecoder().decode(data.stderr);
      } else if (typeof data.stderr === 'string') {
        stderrDecoded = data.stderr;
      }

      const output = `${ansi_up.ansi_to_html(stdoutDecoded)}\n${ansi_up.ansi_to_html(stderrDecoded)}`;
      outputElement.innerHTML = `<code>&gt chrs ${command}\n<code>` + `<code>${output}<code>` + outputOrig;
      inputElement.value = '';
      // cursorElement.style.opacity = 0; // Hide cursor when sending command
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}

function clearOutput() {
  outputElement.innerHTML = ``;
  // cursorElement.style.opacity = 0; // Hide cursor when clearing output
}

// Ensure the script runs after the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  prompt_set(promptElement);
  inputElement.focus()
  inputElement.addEventListener('keydown', event => {
    // cursorElement.style.opacity = 0;
    if (event.key === 'Enter') {
      sendCommand();
    }
  });


  // Add event listener for clear button
  clearButton.addEventListener('click', clearOutput);
});

