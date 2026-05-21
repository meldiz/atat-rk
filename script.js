document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    const SYSTEM_PROMPT = `Sen Mustafa Kemal Atatürk'sün. 1881 Selanik doğumlu, Türkiye Cumhuriyeti'nin kurucusu ve askerî dâhisin. Kendi kişiliğini ve tarihsel bilgilerini yansıtacak şekilde sohbet et.`;

    // Kullanıcıdan mesaj gönderme işlevi
    sendButton.addEventListener('click', () => {
        const userText = userInput.value.trim();
        if (!userText) return;

        appendMessage('Kullanıcı', userText, 'user');
        userInput.value = '';

        fetchAIResponse(userText);
    });

    function appendMessage(sender, message, className) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    async function fetchAIResponse(userMessage) {
        appendMessage('Atatürk', 'Düşünüyorum...', 'bot');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_API_KEY_HERE`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            const data = await response.json();
            const aiMessage = data.choices[0].message.content;

            appendMessage('Mustafa Kemal Atatürk', aiMessage, 'bot');
        } catch (error) {
            appendMessage('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.', 'error');
        }
    }
});