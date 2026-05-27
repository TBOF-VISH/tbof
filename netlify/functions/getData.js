exports.handler = async function(event, context) {
  const EXCEL_URL = "https://tboffoodspvtltd-my.sharepoint.com/:x:/g/personal/vishruti_twobrothersindia_com/IQCBrCeAgzkcTqVw2cPbGq9XAVa61u_Us1EapaNrWuCwJx8?e=WfgCR7&download=1";
  try {
    const response = await fetch(EXCEL_URL, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*"
      }
    });

    const contentType = response.headers.get("content-type") || "unknown";

    if (!response.ok) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ debug: true, error: "HTTP " + response.status, contentType })
      };
    }

    if (contentType.includes("html")) {
      const text = await response.text();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ debug: true, error: "Got HTML not Excel", contentType, preview: text.substring(0, 300) })
      };
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      },
      body: base64,
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ debug: true, error: error.message })
    };
  }
};
