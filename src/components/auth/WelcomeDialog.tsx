import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Sparkles, 
  Coffee,
  Rocket,
  Zap,
  Star,
  Heart,
  Brain,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  Calculator,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const quotes = [
  {
    text: "La inteligencia artificial es como tener un contador que nunca se cansa y no cobra horas extras.",
    author: "Negocios Inteligentes",
    icon: Calculator,
    gradient: "from-purple-400 via-purple-500 to-indigo-600",
    bg: "from-purple-50 to-indigo-100",
    accent: "purple"
  },
  {
    text: "Antes revisaba facturas hasta las 10 PM. Ahora la AI lo hace mientras yo ceno con la familia.",
    author: "Vida Equilibrada",
    icon: Clock,
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    bg: "from-green-50 to-emerald-100",
    accent: "green"
  },
  {
    text: "Mi abuela decía: 'No dejes para mañana lo que puedes hacer hoy'. La AI dice: 'Ya lo hice por ti'.",
    author: "Sabiduría Moderna",
    icon: Heart,
    gradient: "from-rose-400 via-pink-500 to-red-600",
    bg: "from-rose-50 to-pink-100",
    accent: "rose"
  },
  {
    text: "El café colombiano y la inteligencia artificial: ambos te mantienen despierto, pero uno te ahorra trabajo.",
    author: "Tradición + Tecnología",
    icon: Coffee,
    gradient: "from-amber-400 via-orange-500 to-yellow-600",
    bg: "from-amber-50 to-orange-100",
    accent: "amber"
  },
  {
    text: "La AI no reemplaza al empresario, pero el empresario que usa AI sí reemplaza al que no la usa.",
    author: "Evolución Empresarial",
    icon: TrendingUp,
    gradient: "from-blue-400 via-cyan-500 to-teal-600",
    bg: "from-blue-50 to-cyan-100",
    accent: "blue"
  },
  {
    text: "Tengo 30 años validando facturas a mano. Ahora en 5 minutos hago lo que antes me tomaba horas.",
    author: "Experiencia Real",
    icon: Zap,
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    bg: "from-yellow-50 to-amber-100",
    accent: "yellow"
  },
  {
    text: "La inteligencia artificial es como un empleado perfecto: trabaja 24/7 y nunca pide aumento.",
    author: "Recursos Humanos 2.0",
    icon: Star,
    gradient: "from-indigo-400 via-purple-500 to-pink-600",
    bg: "from-indigo-50 to-purple-100",
    accent: "indigo"
  },
  {
    text: "Antes: 'Ay, qué pereza revisar estas facturas'. Ahora: 'Ay, qué fácil con la AI'.",
    author: "Honestidad Empresarial",
    icon: Sparkles,
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    bg: "from-emerald-50 to-green-100",
    accent: "emerald"
  },
  {
    text: "Mi negocio creció tanto que ya no puedo revisar todo a mano. Menos mal existe la AI.",
    author: "Problemas de Millonario",
    icon: ShoppingBag,
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    bg: "from-violet-50 to-purple-100",
    accent: "violet"
  },
  {
    text: "La AI lee más rápido que mi contador y es más barata que contratar otro empleado.",
    author: "Matemáticas Simples",
    icon: Brain,
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    bg: "from-cyan-50 to-blue-100",
    accent: "cyan"
  },
  {
    text: "No entiendo de tecnología, pero entiendo de ahorrar tiempo y plata. La AI hace ambas.",
    author: "Sentido Común",
    icon: Rocket,
    gradient: "from-pink-400 via-rose-500 to-red-600",
    bg: "from-pink-50 to-rose-100",
    accent: "pink"
  },
  {
    text: "Si tu competencia usa AI y tú no, es como pelear con una honda contra un rifle.",
    author: "Ventaja Competitiva",
    icon: TrendingUp,
    gradient: "from-orange-400 via-red-500 to-pink-600",
    bg: "from-orange-50 to-red-100",
    accent: "orange"
  }
];

const greetings = [
  "¡Qué más,",
  "¡Buenas,",
  "¡Hola,",
  "¡Ey,",
  "¡Qué tal,",
  "¡Buenísimo verte,"
];

const actionMessages = [
  "¡A trabajar!",
  "¡Dale pues!",
  "¡Vámonos!",
  "¡A darle!",
  "¡Echémosle!",
  "¡Arranquemos!"
];

export const WelcomeDialog = ({ isOpen, onClose, userName }: WelcomeDialogProps) => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentGreeting, setCurrentGreeting] = useState("");
  const [currentAction, setCurrentAction] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    if (isOpen) {
      // Seleccionar contenido aleatorio
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const randomAction = actionMessages[Math.floor(Math.random() * actionMessages.length)];
      
      setCurrentQuote(randomQuote);
      setCurrentGreeting(randomGreeting);
      setCurrentAction(randomAction);
      
      // Generar partículas con colores de tu UI
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);
      
      setTimeout(() => setShowContent(true), 200);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => onClose(), 300);
  };

  const firstNameOnly = userName.split(' ')[0] || userName.split('@')[0] || 'Jefe';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg border-0 p-0 bg-transparent shadow-none overflow-hidden">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -10 }}
              transition={{ 
                type: "spring", 
                stiffness: 280, 
                damping: 22,
                duration: 0.6 
              }}
              className="relative"
            >
              {/* Partículas de fondo más sutiles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    initial={{ 
                      x: `${particle.x}%`, 
                      y: `${particle.y}%`,
                      scale: 0,
                      opacity: 0 
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 0.4, 0],
                      y: [`${particle.y}%`, `${particle.y - 20}%`],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      delay: Math.random() * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px]"
                  />
                ))}
              </div>

              {/* Contenedor principal con colores de tu UI */}
              <motion.div
                initial={{ y: 15 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
              >
                {/* Borde superior con color de tu brand */}
                <div className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
                
                <div className="p-8 relative">
                  {/* Header con icono */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.3,
                      duration: 0.7 
                    }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl blur-md opacity-20"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg"
                      >
                        <currentQuote.icon className="h-7 w-7 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Saludo más colombiano */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center mb-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {currentGreeting}
                      </motion.span>{" "}
                      <motion.span
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                      >
                        {firstNameOnly}!
                      </motion.span>
                    </h2>
                  </motion.div>

                  {/* Frase principal */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="relative mb-7"
                  >
                    <motion.blockquote 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="text-lg font-medium text-gray-700 leading-relaxed text-center px-2"
                    >
                      "{currentQuote.text}"
                    </motion.blockquote>
                    
                    <motion.cite
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="block text-center text-sm font-semibold text-purple-600 mt-3"
                    >
                      — {currentQuote.author}
                    </motion.cite>
                  </motion.div>

                  {/* Botón con colores de tu UI */}
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                    className="flex justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        onClick={handleClose}
                        className="
                          bg-gradient-to-r from-purple-600 to-indigo-600 
                          hover:from-purple-700 hover:to-indigo-700
                          hover:shadow-lg hover:shadow-purple-500/25
                          text-white font-semibold px-8 py-3 rounded-xl 
                          border-0 shadow-md
                          transition-all duration-300 ease-out
                          relative overflow-hidden group
                        "
                      >
                        {/* Efecto sutil de brillo */}
                        <motion.div
                          className="absolute inset-0 bg-white/10 rounded-xl"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        <span className="relative flex items-center gap-2">
                          {currentAction}
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};