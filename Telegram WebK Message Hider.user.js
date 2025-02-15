// ==UserScript==
// @name         Telegram WebK Message Hider
// @namespace    https://github.com/sinancetinkaya
// @version      2025-02-15
// @description  Hides messages from unwanted users in Telegram groups
// @author       sinancetinkaya
// @match        https://web.telegram.org/k/*
// @icon         https://web.telegram.org/favicon.ico
// @grant        GM_getValue
// ==/UserScript==

(
  async () => {
    console.log("Telegram Message Hider has been started");

    const user_ids = GM_getValue('user_ids');

    function handleMessageNode(node, user_ids) {
			// console.log(node);
      let is_message = node.matches("div[class='bubbles-group'],[class^='bubbles-group bubbles-group-']");

      if (!is_message) { return; }

      let message = node.querySelector("*[class='peer-title'][data-peer-id][data-with-premium-icon]")

      if (!message) { return; }

      // console.log(`message group found`);
      let user_id = message.getAttribute("data-peer-id")

      if (!(user_id in user_ids)) { return; }

      console.log(`hiding the message from id='${user_id}' name='${user_ids[user_id]['name']}' reason='${user_ids[user_id]['reason']}'`);

      // let bubbles_group = message.closest("div[class='bubbles-group'],[class^='bubbles-group ']");

      // make color and background of the elements inside the message group black
      var all = node.getElementsByTagName("*");

      // do not remove nodes because it messes with scrolling chat messages
      for (var i=0, max=all.length; i < max; i++) {
        all[i].style.color = "black";
        all[i].style.backgroundColor = "black";
      }
    }


    function walk(node)
    {
      if (!node.nodeType) { return; }

      let child = null;
      let next = null;

      //console.log(node.nodeType);

      switch (node.nodeType)
      {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
          handleMessageNode(node, user_ids);

          child = node.firstChild;
          while (child)
          {
            next = child.nextSibling;
            walk(child);
            child = next;
          }
          break;
      }
    }


    function mutationHandler(mutationRecords)
    {
      for (const {type, addedNodes} of mutationRecords)
      {
        if (type === "childList" && typeof addedNodes === "object" && addedNodes.length)
        {
          for (const node of addedNodes)
          {
            walk(node);
          }
        }
      }
    }

    const observer = new MutationObserver(mutationHandler);
    observer.observe(
      document.querySelector("#column-center"),
      {childList: true, subtree: true, attributeFilter: ["class"]}
    );

  }

)();
