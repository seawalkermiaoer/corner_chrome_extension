// Saves options to chrome.storage
const saveApiKey = () => {
    const api_key = document.getElementById('api-key').value
    chrome.storage.local.set({'api_key': api_key})
    console.log(api_key)
  };
  

  const clearApiKey = () => {
    chrome.storage.local.set({'api_key': ''})
    console.log('clear.')
  };
  
  document.getElementById('save-api-key-btn').addEventListener('click', saveApiKey);
  document.getElementById('clear-api-key-btn').addEventListener('click', clearApiKey);