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
      console.log(tab.id);
      const response = await chrome.tabs.sendMessage(tab.id, { action: "save" });
      console.log(response);
    })();

};



chrome.contextMenus.onClicked.addListener(function (data) {
  if (data.menuItemId == 'save_to_corner') {
    onSaveClick(data)
  }
});


// 监听content_scripts页面发来的消息
chrome.runtime.onMessage.addListener((request) => {
  console.log("接收到content_scripts消息：", request);
  if (request.todo === "saveLog") {
    //
  }
});

// 监听系统消息通知的按钮点击事件
chrome.notifications.onButtonClicked.addListener((notificationId) => {
  switch (notificationId) {
    case "overTheLimit":
      // 打开选项设置页
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});