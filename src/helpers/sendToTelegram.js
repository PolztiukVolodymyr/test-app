const TELEGRAM_CHAT_ID = "@TestDailyRent";
const TELEGRAM_BOT_TOKEN = "6499221709:AAE7QKkeUy7uyh0Ee0NFt2Bj4Ed4TVHeG-A";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;


export const sendToTelegram = async (data) => {
    const text = `Messege from Form: ${JSON.stringify(data)}`;

    try {
        const response = await fetch(TELEGRAM_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            }),
        });

        if (response.ok) {
            console.log("To telegram sent:", data);
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}