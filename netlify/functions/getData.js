exports.handler = async function(event, context) {
  const EXCEL_URL = "https://tboffoodspvtltd-my.sharepoint.com/:x:/g/personal/vishruti_twobrothersindia_com/IQCBrCeAgzkcTqVw2cPbGq9XAVa61u_Us1EapaNrWuCwJx8?e=WfgCR7&download=1";
  try {
    const response = await fetch(EXCEL_URL, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    if (!response.ok) throw new Error("Status: " + response.status);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store"
      },
      body: base64,
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
