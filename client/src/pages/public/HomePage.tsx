import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  number: string;
  type: string;
  amount: number;
  displayType: string;
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBetType, setSelectedBetType] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [numberInput, setNumberInput] = useState("");
  const [amountStraight, setAmountStraight] = useState("");
  const [amountTote, setAmountTote] = useState("");

  const isToteOrReverse =
    selectedBetType?.type.includes("tote") ||
    selectedBetType?.type.includes("rev");

  const handleSelectBetType = (type: string, text: string) => {
    document
      .querySelectorAll(".bet-type-btn")
      .forEach((b) => b.classList.remove("selected"));
    document.querySelector(`[data-type="${type}"]`)?.classList.add("selected");
    setSelectedBetType({ type, text });
  };

  const addToCart = () => {
    const number = numberInput.trim();
    const straightAmount = parseInt(amountStraight) || 0;
    const toteAmount = parseInt(amountTote) || 0;

    if (!number) {
      alert("กรุณาใส่ตัวเลข");
      return;
    }
    if (!selectedBetType) {
      alert("กรุณาเลือกประเภทการแทง");
      return;
    }

    const amount = isToteOrReverse ? toteAmount : straightAmount;

    if (amount <= 0) {
      alert("กรุณาใส่จำนวนเงิน");
      return;
    }

    if (selectedBetType.type.startsWith("3-") && number.length !== 3) {
      alert("สำหรับ 3 ตัว ต้องใส่เลข 3 หลัก");
      return;
    }
    if (selectedBetType.type.startsWith("2-") && number.length !== 2) {
      alert("สำหรับ 2 ตัว ต้องใส่เลข 2 หลัก");
      return;
    }

    const newItem: CartItem = {
      id: Date.now(),
      number: number,
      type: selectedBetType.type,
      amount: amount,
      displayType: selectedBetType.text,
    };

    let newCart = [...cart, newItem];

    if (selectedBetType.type.includes("rev")) {
      const reversedNumber = number.split("").reverse().join("");
      if (number !== reversedNumber) {
        newCart.push({
          id: Date.now() + 1,
          number: reversedNumber,
          type: selectedBetType.type.replace("-rev", ""),
          amount: amount,
          displayType: selectedBetType.text.replace(" (กลับ)", ""),
        });
      }
    }

    setCart(newCart);
    clearInputs();
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearInputs = () => {
    setNumberInput("");
    setAmountStraight("");
    setAmountTote("");
    setSelectedBetType(null);
    document
      .querySelectorAll(".bet-type-btn")
      .forEach((b) => b.classList.remove("selected"));
    document.getElementById("number-input")?.focus();
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            ป้ากุ่ย Lotto
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            <Link to="/login">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 text-sm">
                เข้าสู่ระบบ
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Countdown Timer */}
        <section className="text-center mb-6 p-4 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-indigo-800 mb-2">
            งวดวันที่ 16 พฤศจิกายน 2568
          </h1>
          <p className="text-base text-gray-600">เหลือเวลาอีก</p>
          <div className="flex justify-center space-x-3 text-center mt-2">
            <div>
              <span className="text-3xl font-bold text-indigo-600">02</span>
              <span className="block text-xs text-gray-500">วัน</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-indigo-600">10</span>
              <span className="block text-xs text-gray-500">ชั่วโมง</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-indigo-600">35</span>
              <span className="block text-xs text-gray-500">นาที</span>
            </div>
          </div>
        </section>

        {/* Main Betting UI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Betting Form */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow p-5">
              <h2 className="font-semibold text-lg mb-3">
                เลขดังงวดนี้ (กดเพื่อใส่เลข)
              </h2>
              <div className="flex flex-wrap gap-2">
                {["59", "89", "789", "123", "25"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumberInput(num)}
                    className="popular-num bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 text-sm"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-5">
              <h2 className="font-semibold text-lg mb-4">กรอกเลขที่ต้องการ</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="number-input"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ใส่เลข (2 หรือ 3 ตัว)
                  </label>
                  <input
                    type="text"
                    id="number-input"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    placeholder="เช่น 59, 789"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-xl font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="amount-straight"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      จำนวนเงิน (เต็ง)
                    </label>
                    <input
                      type="number"
                      id="amount-straight"
                      value={amountStraight}
                      onChange={(e) => setAmountStraight(e.target.value)}
                      placeholder="บาท"
                      className="w-full p-3 rounded-lg border-2 border-gray-300"
                      disabled={isToteOrReverse}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amount-tote"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      จำนวนเงิน (โต๊ด/กลับ)
                    </label>
                    <input
                      type="number"
                      id="amount-tote"
                      value={amountTote}
                      onChange={(e) => setAmountTote(e.target.value)}
                      placeholder="บาท"
                      className="w-full p-3 rounded-lg border-2 border-gray-300"
                      disabled={!isToteOrReverse}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSelectBetType("3-top", "3 ตัวบน")}
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="3-top"
                  >
                    3 ตัวบน
                  </button>
                  <button
                    onClick={() => handleSelectBetType("3-tote", "3 ตัวโต๊ด")}
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="3-tote"
                  >
                    3 ตัวโต๊ด
                  </button>
                  <button
                    onClick={() => handleSelectBetType("2-top", "2 ตัวบน")}
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="2-top"
                  >
                    2 ตัวบน
                  </button>
                  <button
                    onClick={() => handleSelectBetType("2-bottom", "2 ตัวล่าง")}
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="2-bottom"
                  >
                    2 ตัวล่าง
                  </button>
                  <button
                    onClick={() =>
                      handleSelectBetType("2-top-rev", "2 ตัวบน (กลับ)")
                    }
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="2-top-rev"
                  >
                    2 ตัวบน (กลับ)
                  </button>
                  <button
                    onClick={() =>
                      handleSelectBetType("2-bottom-rev", "2 ตัวล่าง (กลับ)")
                    }
                    className="bet-type-btn border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50"
                    data-type="2-bottom-rev"
                  >
                    2 ตัวล่าง (กลับ)
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
                >
                  เพิ่มลงในโพย
                </button>
              </div>
            </section>
          </div>

          {/* Bet Slip / Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-5 sticky top-24">
              <h2 className="font-semibold text-xl mb-4 border-b pb-3">
                โพยของคุณ
              </h2>
              <div
                id="cart-items"
                className="space-y-3 max-h-96 overflow-y-auto"
              >
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    ยังไม่มีรายการ
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <span className="font-semibold text-indigo-700 text-lg">
                          {item.number}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({item.displayType})
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-lg">
                          {item.amount} บ.
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-700">
                    ยอดรวม
                  </span>
                  <span
                    id="total-amount"
                    className="text-2xl font-bold text-indigo-700"
                  >
                    {totalAmount} บาท
                  </span>
                </div>
                <button className="w-full bg-amber-400 text-black font-bold py-3 rounded-full hover:bg-amber-500 transition duration-300 text-lg">
                  ยืนยันการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Results */}
        <section className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            ผลสลากงวดล่าสุด (1 พ.ย. 68)
          </h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-lg font-medium text-red-600">รางวัลที่ 1</p>
              <h3 className="text-5xl font-bold text-red-600 my-2 tracking-wider">
                987<span className="text-blue-600">654</span>
              </h3>
              <div className="flex justify-around text-lg mt-3">
                <p className="font-semibold">
                  3 ตัวบน: <span className="text-blue-600">654</span>
                </p>
                <p className="font-semibold">
                  2 ตัวบน: <span className="text-blue-600">54</span>
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
              <p className="text-lg font-medium text-gray-700">เลขท้าย 2 ตัว</p>
              <h3 className="text-5xl font-bold text-indigo-700 my-2 tracking-wider">
                32
              </h3>
              <div className="text-lg mt-3">
                <p className="font-semibold">
                  2 ตัวล่าง: <span className="text-indigo-700">32</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              ซื้อง่าย 3 ขั้นตอน
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 text-indigo-600 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  1. กรอกเลข & จำนวนเงิน
                </h3>
                <p className="text-gray-600">
                  ใส่เลขที่ชอบ เลือกประเภท (บน/ล่าง/โต๊ด) และจำนวนเงิน
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 text-indigo-600 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. ยืนยันโพย</h3>
                <p className="text-gray-600">
                  ตรวจสอบรายการในโพยทั้งหมด และกดยืนยันการสั่งซื้อ
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 text-indigo-600 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. รอรับรางวัล</h3>
                <p className="text-gray-600">
                  ระบบแจ้งเตือนเมื่อถูกรางวัล โอนเงินเข้าบัญชีอัตโนมัติ
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 ป้ากุ่ย Lotto.สงวนลิขสิทธิ์</p>
            <p className="mt-1">คำเตือน: การพนันเป็นสิ่งผิดกฎหมาย</p>
          </div>
        </div>
      </footer>

      {/* Floating Cart Badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        </div>
      </div>
    </div>
  );
}
