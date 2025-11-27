import { motion } from "framer-motion";

export default function LanguageModal({ onSelect }: { onSelect: (lang: string) => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            {/* Затемнённый фон */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            {/* Стеклянная иконка */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
            >
                <h2 className="text-xl font-semibold mb-4 text-center text-slate-100">
                    Choose Language
                </h2>

                {/* Кнопки-флаги */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => onSelect("en")}
                        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition text-2xl"
                    >
                        🇬🇧
                    </button>
                    <button
                        onClick={() => onSelect("ru")}
                        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition text-2xl"
                    >
                        🇷🇺
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
