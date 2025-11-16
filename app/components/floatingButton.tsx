"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Phone, X, Send } from "lucide-react";

const BUTTON_SIZE = 64;
const EDGE_MARGIN = 20;

type Sender = "user" | "bot";
interface Message {
  id: number;
  text?: string;
  sender: Sender;
  quickReplies?: string[];
  image?: string;
  meta?: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imgs: string[];
  desc: string;
}
const PRODUCTS: Product[] = [
  {
    id: "D001",
    name: "Đầm A",
    price: 289000,
    imgs: ["/dress1.jpg"],
    desc: "Form rộng dễ thương, che khuyết điểm tốt, vải mềm mát – khách nhà mình đặt cực nhiều.",
  },
  {
    id: "D002",
    name: "Đầm B",
    price: 349000,
    imgs: ["/dress2.jpg"],
    desc: "Form rộng dễ thương, che khuyết điểm tốt, vải mềm mát – khách nhà mình đặt cực nhiều. chất co giãn thoải mái.",
  },
  {
    id: "D003",
    name: "Đầm Dạo Phố",
    price: 319000,
    imgs: ["/dress3.jpg"],
    desc: "Dài thướt tha, phong cách nữ tính – đi biển, đi cà phê đều siêu xinh.",
  },
  {
    id: "D004",
    name: "Đầm Công Sở Thanh Lịch",
    price: 369000,
    imgs: ["/dress4.jpg"],
    desc: "Form chuẩn sang – xịn, tôn dáng nhẹ, phù hợp đi làm và sự kiện.",
  },
  {
    id: "D005",
    name: "Đầm Xòe Dự Tiệc",
    price: 399000,
    imgs: ["/dress5.jpg"],
    desc: "Thiết kế xòe sang trọng, tôn dáng, khách mặc đi tiệc cực kỳ nổi bật.",
  },
];

const nowId = () => Date.now() + Math.floor(Math.random() * 1000);
const money = (v: number) => v.toLocaleString("vi-VN") + "₫";

export default function FloatingChatbot() {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [onLeftSide, setOnLeftSide] = useState(true);
  const wasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem("floating_chat_history");
      return raw
        ? JSON.parse(raw)
        : [
            {
              id: nowId(),
              sender: "bot",
              text: "Chào chị đẹp ✨ Chị đang tìm mẫu đầm nào ạ?! Mình là trợ lý bán hàng của BeMine shop. Bạn quan tâm sản phẩm nào?",
              quickReplies: ["Xem mẫu", "Tôi đã có mã", "Chỉ xem giá"],
            },
          ];
    } catch (e) {
      return [
        {
          id: nowId(),
          sender: "bot",
          text: "Xin chào! Mình là trợ lý bán hàng của BeMine shop. Bạn quan tâm sản phẩm nào?",
          quickReplies: ["Xem mẫu", "Tôi đã có mã", "Chỉ xem giá"],
        },
      ];
    }
  });
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [collectInfoStep, setCollectInfoStep] = useState<
    null | "name" | "phone" | "address"
  >(null);
  const [customerInfo, setCustomerInfo] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendingRef = useRef(false);

  useEffect(() => {
    const placeInitial = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const initLeft = w - BUTTON_SIZE - EDGE_MARGIN;
      const initTop = h - BUTTON_SIZE - 140;
      setLeft(initLeft);
      setTop(initTop);
      setOnLeftSide(false);
    };
    placeInitial();
    window.addEventListener("resize", placeInitial);
    return () => window.removeEventListener("resize", placeInitial);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("floating_chat_history", JSON.stringify(messages));
    } catch (e) {}
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleDragStart = () => {
    wasDraggedRef.current = true;
  };
  const handleDragEnd = () => {
    const deltaX = x.get();
    const deltaY = y.get();
    const newLeft = left + deltaX;
    const newTop = top + deltaY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const btnCenter = newLeft + BUTTON_SIZE / 2;
    const snapToLeft = btnCenter < screenW / 2;
    const targetLeft = snapToLeft
      ? EDGE_MARGIN
      : screenW - BUTTON_SIZE - EDGE_MARGIN;
    const targetTop = Math.min(
      Math.max(newTop, EDGE_MARGIN),
      screenH - BUTTON_SIZE - EDGE_MARGIN
    );
    setOnLeftSide(snapToLeft);
    animate(x, targetLeft - left, {
      type: "spring",
      stiffness: 350,
      damping: 30,
      onComplete() {
        setLeft(targetLeft);
        x.set(0);
      },
    });
    animate(y, targetTop - top, {
      type: "spring",
      stiffness: 350,
      damping: 30,
      onComplete() {
        setTop(targetTop);
        y.set(0);
        setTimeout(() => (wasDraggedRef.current = false), 50);
      },
    });
  };

  const handleToggle = () => {
    if (wasDraggedRef.current) return;
    setOpen((s) => !s);
  };

  const pushBot = (payload: Partial<Message>) => {
    const msg: Message = { id: nowId(), sender: "bot", ...payload } as Message;
    setMessages((p) => [...p, msg]);
  };
  const pushUser = (text?: string, meta?: any) => {
    const msg: Message = { id: nowId(), sender: "user", text, meta };
    setMessages((p) => [...p, msg]);
  };

  const sendLocal = (text?: string, meta?: any) => {
    if (sendingRef.current) return;
    if (text && text.trim() === "") return;
    sendingRef.current = true;
    pushUser(text, meta);
    setInput("");

    setTimeout(() => {
      processUserMessage(text || "", meta);
      sendingRef.current = false;
    }, 600);
  };

  const processUserMessage = (text: string, meta?: any) => {
    const lower = (text || "").toLowerCase();

    if (meta?.type === "select_product") {
      const pid = meta.id as string;
      const p = PRODUCTS.find((x) => x.id === pid) || null;
      if (p) {
        setSelectedProduct(p);
        pushBot({ text: `Bạn chọn: ${p.name} (${p.id})`, image: p.imgs[0] });
        pushBot({ text: p.desc });
        pushBot({ text: `Giá: ${money(p.price)}` });
        pushBot({
          text: "Bạn muốn chọn size/màu hay xem chính sách đổi trả?",
          quickReplies: ["Chọn size/màu", "Xem chính sách", "Mua ngay"],
        });
        return;
      }
    }

    if (meta?.type === "quick") {
      const val = meta.value as string;
      if (val === "Xem mẫu") {
        const picks = PRODUCTS.slice(0, 4);
        pushBot({
          text: "Dưới đây là một số mẫu gợi ý:",
          quickReplies: picks.map((p) => `${p.id} - ${p.name}`),
        });
        picks.forEach((p) =>
          pushBot({
            text: `${p.id} - ${p.name} • ${money(p.price)}`,
            image: p.imgs[0],
          })
        );
        pushBot({
          text: "Bạn chọn mã nào? Nhấn vào nút mẫu hoặc gõ mã (ví dụ: D001).",
          quickReplies: picks.map((p) => p.id),
        });
        return;
      }
      if (val === "Tôi đã có mã") {
        pushBot({ text: "Bạn hãy gửi mã sản phẩm (ví dụ: D001)." });
        return;
      }
      if (val === "Chỉ xem giá") {
        pushBot({
          text: "Bạn đang xem giá cho mẫu nào? Nếu chưa có mã, mình gửi vài phân khúc:",
          quickReplies: [
            "Phân khúc cao - D002",
            "Phân khúc trung - D001",
            "Phân khúc giá rẻ - D003",
          ],
        });
        return;
      }
      if (PRODUCTS.some((p) => p.id === val)) {
        const p = PRODUCTS.find((x) => x.id === val)!;
        setSelectedProduct(p);
        pushBot({ text: `Bạn chọn: ${p.name} (${p.id})`, image: p.imgs[0] });
        pushBot({ text: p.desc });
        pushBot({ text: `Giá: ${money(p.price)}` });
        pushBot({
          text: "Bạn muốn chọn size/màu hay xem chính sách đổi trả?",
          quickReplies: ["Chọn size/màu", "Xem chính sách", "Mua ngay"],
        });
        return;
      }
    }

    const matchCode = (text || "").trim().toUpperCase();
    if (PRODUCTS.some((p) => p.id === matchCode)) {
      const p = PRODUCTS.find((x) => x.id === matchCode)!;
      setSelectedProduct(p);
      pushBot({ text: `Bạn chọn: ${p.name} (${p.id})`, image: p.imgs[0] });
      pushBot({ text: p.desc });
      pushBot({ text: `Giá: ${money(p.price)}` });
      pushBot({
        text: "Bạn muốn chọn size/màu hay xem chính sách đổi trả?",
        quickReplies: ["Chọn size/màu", "Xem chính sách", "Mua ngay"],
      });
      return;
    }

    if (collectInfoStep) {
      if (collectInfoStep === "name") {
        setCustomerInfo((p) => ({ ...p, name: text }));
        setCollectInfoStep("phone");
        pushBot({ text: "Cảm ơn. Cho mình số điện thoại (ví dụ: 09xxxx)." });
        return;
      }
      if (collectInfoStep === "phone") {
        setCustomerInfo((p) => ({ ...p, phone: text }));
        setCollectInfoStep("address");
        pushBot({ text: "Cho mình địa chỉ nhận hàng (tỉnh/quận/đường)." });
        return;
      }
      if (collectInfoStep === "address") {
        setCustomerInfo((p) => ({ ...p, address: text }));
        setCollectInfoStep(null);
        pushBot({ text: "Cám ơn! Mình tóm tắt đơn cho bạn:" });
        pushBot({
          text: `Sản phẩm: ${selectedProduct?.name || "(chưa chọn)"}`,
        });
        pushBot({ text: `Khách: ${customerInfo.name || "(đang cập nhật)"}` });
        pushBot({ text: `SĐT: ${customerInfo.phone || "(đang cập nhật)"}` });
        pushBot({
          text: `Địa chỉ: ${customerInfo.address || "(đang cập nhật)"}`,
        });
        pushBot({
          text: "Xác nhận đặt hàng?",
          quickReplies: ["Xác nhận", "Chỉnh sửa thông tin"],
        });
        return;
      }
    }

    if (lower.includes("giá")) {
      pushBot({
        text: "Bạn muốn xem giá mẫu nào? (gõ mã hoặc xem gợi ý)",
        quickReplies: PRODUCTS.slice(0, 3).map((p) => p.id),
      });
      return;
    }

    if (lower.includes("mua") || lower.includes("đặt")) {
      if (selectedProduct) {
        pushBot({
          text: `Bạn muốn đặt ${selectedProduct.name}. Mình cần tên người nhận.`,
        });
        setCollectInfoStep("name");
      } else {
        pushBot({ text: "Bạn muốn mua sản phẩm nào? Gõ mã hoặc chọn mẫu." });
      }
      return;
    }

    if (
      lower.includes("chính sách") ||
      lower.includes("đổi trả") ||
      lower.includes("kiểm hàng")
    ) {
      pushBot({
        text: "Chính sách đổi trả: 7 ngày đổi nếu lỗi do NSX. Kiểm hàng trước khi nhận. Bạn muốn mình gửi link chi tiết không?",
        quickReplies: ["Gửi link", "Không cần"],
      });
      return;
    }

    pushBot({
      text: "Mình chưa hiểu, bạn có thể chọn 1 trong các nút gợi ý hoặc mô tả ngắn nhu cầu (đi làm/đi chơi...).",
      quickReplies: ["Xem mẫu", "Tôi đã có mã", "Chỉ xem giá"],
    });
  };

  const handleQuick = (value: string) => {
    sendLocal(value, { type: "quick", value });
  };

  const handleSelectProduct = (id: string) => {
    sendLocal(id, { type: "quick", value: id });
  };

  const handleConfirmOrder = () => {
    pushBot({ text: "Đang tạo đơn... Xin chờ 1s" });
    setTimeout(() => {
      pushBot({
        text: "Đã tạo đơn thành công! Nhân viên sẽ gọi xác nhận trong 30 phút.",
      });
    }, 900);
  };

  const handleSendClick = () => sendLocal(input || undefined);
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendLocal(input || undefined);
    }
  };

  const renderMessage = (m: Message) => {
    if (m.image) {
      return (
        <div
          key={m.id}
          className={`rounded-lg p-2 max-w-[80%] ${
            m.sender === "user" ? "ml-auto bg-pink-500 text-white" : "bg-white"
          }`}
        >
          {m.text && <div className="text-sm mb-2">{m.text}</div>}
          <img
            src={m.image}
            alt="img"
            className="w-36 h-24 object-cover rounded"
          />
        </div>
      );
    }
    return (
      <div
        key={m.id}
        className={`rounded-lg p-2 max-w-[80%] ${
          m.sender === "user" ? "ml-auto bg-pink-500 text-white" : "bg-white"
        }`}
      >
        {m.text}
      </div>
    );
  };

  const lastBotQuick = (() => {
    const botMsgs = messages.filter((m) => m.sender === "bot");
    const last = botMsgs[botMsgs.length - 1];
    return last?.quickReplies || null;
  })();

  return (
    <div ref={containerRef}>
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x,
          y,
          position: "fixed",
          left,
          top,
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          zIndex: 9999,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 80 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 80 }}
                transition={{ type: "spring", damping: 18, stiffness: 230 }}
                className={`absolute bottom-20 ${
                  onLeftSide ? "left-0" : "right-0"
                } w-80 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
              >
                <div className="bg-pink-500 text-white p-3 font-semibold flex items-center justify-between">
                  <span>Tư vấn đầm BeMine Shop</span>
                  <X
                    size={18}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
                  {messages.map((m) => (
                    <div key={m.id} className="flex w-full">
                      <div className="flex-1">{renderMessage(m)}</div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {lastBotQuick && (
                  <div className="p-2 border-t bg-white flex gap-2 overflow-auto">
                    {lastBotQuick.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuick(q)}
                        className="text-xs px-2 py-1 rounded-full border"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-2 border-t bg-white flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn hoặc mã (vd: D001)..."
                    className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyUp}
                  />
                  <button
                    onClick={handleSendClick}
                    className="p-2 bg-pink-500 rounded-full text-white"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleToggle}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center bg-pink-500"
          >
            {open ? (
              <X size={28} className="text-white" />
            ) : (
              <Phone size={28} className="text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
