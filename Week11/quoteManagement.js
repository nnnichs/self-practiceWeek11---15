import { getItems } from "./myLib/fetchUtils.js";

// ดึง quotes ทั้งหมดจาก server
async function loadQuotes() {
  try {
    const quotes = await getItems(`${import.meta.env.VITE_APP_URL}/quotes`);
    console.log("Quotes loaded:", quotes); // ดูข้อมูลใน console
    return quotes; // ✅ ต้อง return ตลอด
  } catch (error) {
    console.error("Error loading quotes:", error);
    return []; // ✅ คืน array ว่าง เพื่อให้ forEach ทำงานได้
  }
}

export { loadQuotes };
