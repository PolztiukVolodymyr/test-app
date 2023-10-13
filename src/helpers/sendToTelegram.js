const TELEGRAM_CHAT_ID = "@TestDailyRent";
const telegramApi = process.env.TELEGRAM_API


export const sendToTelegram = async (data) => {
    const text = `Messege from Form: ${JSON.stringify(data)}`;

    try {
        const response = await fetch(telegramApi, {
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