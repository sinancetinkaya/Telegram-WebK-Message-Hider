# Telegram-WebK-Message-Hider
A Tampermonkey/Violentmonkey script that hides messages from unwanted users in Telegram(WebK) groups

Example Values JSON
```
{
  "user_ids": { 
    "1234567890": { // Telegram user ID
      "name": "John Doe",
      "reason": "Annoying"
    },
    "9876543210": { // Telegram user ID
      "name": "Karen",
      "reason": "Life sucker"
    }
  }
}
```