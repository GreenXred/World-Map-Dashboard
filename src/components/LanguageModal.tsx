// Модальное окно выбора языка

import { motion } from "framer-motion";

export default function LanguageModal({ onSelect }: { onSelect: (lang: string) => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Затемнённый фон */}
            <motion.div // Фон
                className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
            </motion.div>

            {/* Стеклянная иконка */}
            <motion.div // Модальное окно
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="
                    relative z-10
                    bg-white/10 
                    backdrop-blur-2xl 
                    rounded-3xl 
                    p-8 
                    border border-white/20 
                    shadow-[0_0_40px_rgba(0,0,0,0.35)]
                "
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">
                    Language:
                </h2>

                {/* Флаги */}
                <motion.div // Контейнер для кнопок
                    className="flex gap-4 justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15, // задержка между появлением 
                            },
                        },
                    }}
                >
                    <motion.button // Кнопка для английского
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        onClick={() => onSelect("en")}
                        className="    
                            w-20 h-20 
                            flex items-center justify-center 
                            rounded-2xl 
                            bg-white/10 
                            border border-white/20 
                            backdrop-blur-xl 
                            text-5xl 
                            hover:bg-white/20 
                            hover:scale-105 
                            hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]
                            active:scale-95
                            transition
                        "
                    >
                        🇬🇧
                    </motion.button>
                    <motion.button // Кнопка для русского
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        onClick={() => onSelect("ru")}
                        className="
                            w-20 h-20 
                            flex items-center justify-center 
                            rounded-2xl 
                            bg-white/10 
                            border border-white/20 
                            backdrop-blur-xl 
                            text-5xl 
                            hover:bg-white/20 
                            hover:scale-105
                            hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]
                            active:scale-95
                            transition
                        "
                    >
                        🇷🇺
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
}
