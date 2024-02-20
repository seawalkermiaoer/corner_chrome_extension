// 创建右键菜单
chrome.contextMenus.create({
  id: "save_to_corner",
  contexts: ['all'],
  title: "Save to Corner",
  documentUrlPatterns: ["<all_urls>"], // 限制菜单选项仅应用于URL匹配给定模式之一的页面

});


async function onSaveClick(data) {
  //获取当前打开的tab
  console.log('onSaveClick');
  (async () => {
    //获取当前的tab页面
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    // console.log(tab.id, tab.url);
    const url = tab.url
    const response = await chrome.tabs.sendMessage(tab.id, { action: "save" });
    let api_key = ""
    chrome.storage.local.get(['api_key'], function (result) {
      api_key = result.api_key
      console.log(tab.url, response.title, response.content);
      console.log(api_key)
      //submit 
      fetch('https://bl94k1.faas.xiaoduoai.com/save_to_corner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'api_key ' + api_key,

        },
        body: JSON.stringify({
          url: tab.url,
          title: response.title,
          content: response.content
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    });
  })();

};


//event from content script.
chrome.contextMenus.onClicked.addListener(function (data) {
  if (data.menuItemId == 'save_to_corner') {
    onSaveClick(data)
  }
});



// open option page.
chrome.notifications.onButtonClicked.addListener((notificationId) => {
  switch (notificationId) {
    case "overTheLimit":
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});