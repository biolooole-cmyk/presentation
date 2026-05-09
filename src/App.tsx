/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  ExternalLink, 
  Dna, 
  BrainCircuit, 
  Cpu, 
  Atom, 
  Microscope,
  Box,
  Monitor,
  Rocket,
  Search,
  MessageSquareCode,
  Zap,
  Globe,
  Share2,
  X
} from 'lucide-react';

// --- DATA ---
const SIMULATIONS = [
    {
        title: 'Ферментативний конструктор',
        description: 'Дослідження кінетики ферментів. Моделювання активного центру та специфічності субстрату.',
        url: 'https://claude.ai/public/artifacts/549c2231-1158-4d98-80a8-6b008dbab48c',
        emoji: '🧪',
        level: 'Middle'
    },
    {
        title: 'Ланцюги живлення',
        description: 'Моделювання енергетичних трофічних рівнів та стійкості екосистеми.',
        url: 'https://trophic-weave-hub.lovable.app',
        emoji: '🌱',
        level: 'Advanced'
    },
    {
        title: 'Гомеостаз глюкози',
        description: 'Система негативного зворотного зв’язку. Роль інсуліну та глюкагону.',
        url: 'https://glucose-flow-explorer.lovable.app',
        emoji: '🩸',
        level: 'Middle'
    },
    {
        title: 'BioSolve Lab',
        description: 'Алгоритмічне розв’язання задач з генетики та молекулярної біології.',
        url: 'https://bio-quest-shuffle.lovable.app',
        emoji: '🧬',
        level: 'Advanced'
    },
    {
        title: 'Епідемія в місті',
        description: 'Математичне моделювання поширення інфекції (SIR-модель) та карантину.',
        url: 'https://websim.com/p/lf0mseqavivina_ji8fs',
        emoji: '🦠',
        level: 'First'
    },
    {
        title: 'Газообмін легень',
        description: 'Фізика дихання: дифузія газів крізь альвеолярно-капілярну мембрану.',
        url: 'https://light-lung-bloom.lovable.app',
        emoji: '🫁',
        level: 'First'
    },
    {
        title: 'Клітинний поділ',
        description: 'Візуалізація мітотичного циклу та передачі спадковості.',
        url: 'https://cell-voyage-ukraine.lovable.app',
        emoji: '⚛️',
        level: 'Middle'
    },
    {
        title: 'Генетичний міксер',
        description: 'Статистичний аналіз розщеплення ознак за Менделем та комбінаторика генів.',
        url: 'https://biolooole-cmyk.github.io/virtugenlab/',
        emoji: '🐭',
        level: 'Advanced'
    },
    {
        title: 'ЦНС симулятор',
        description: 'Нейрофізіологічна карта мозку та локалізація функцій півкуль.',
        url: 'https://brain-bright-explore.lovable.app',
        emoji: '🧠',
        level: 'First'
    },
    {
        title: 'Штучний добір',
        description: 'Еволюція під контролем людини. Створення нових сортів та порід.',
        url: 'https://gene-garden-wizard.lovable.app',
        emoji: '🐕',
        level: 'Middle'
    },
    {
        title: 'Фотосинтез',
        description: 'Вивчення світлової фази та залежності біомаси від світла.',
        url: 'https://photosynthesis-lab.lovable.app',
        emoji: '☀️',
        level: 'Middle'
    },
    {
        title: 'Клітинне дихання',
        description: 'Енергетичний обмін в мітохондріях та синтез АТФ.',
        url: 'https://mito-energy-sim.lovable.app',
        emoji: '🔋',
        level: 'Advanced'
    },
    {
        title: 'Імунітет людини',
        description: 'Вроджений та адаптивний імунітет. Процес фагоцитозу.',
        url: 'https://immune-chronicle.lovable.app',
        emoji: '🛡️',
        level: 'Middle'
    },
    {
        title: 'Екологічні закони',
        description: 'Вплив лімітуючих факторів на ріст популяції. Закон Лібіха.',
        url: 'https://life-laws-play.lovable.app',
        emoji: '⚖️',
        level: 'Advanced'
    },
    {
        title: 'Станція переливання',
        description: 'Групи крові AB0 та резус-фактор. Логіка сумісності.',
        url: 'https://biolooole-cmyk.github.io/bloodsimulator/',
        emoji: '💉',
        level: 'Middle'
    },
    {
        title: 'Плантагочи',
        description: 'STEM-симулятор вирощування рослини: догляд та умови.',
        url: 'https://biolooole-cmyk.github.io/plantagotchi/',
        emoji: '🪴',
        level: 'First'
    },
    {
        title: 'Нефрон',
        description: '3D-модель фільтрації в нирках на клітинному рівні.',
        url: 'https://nephro-flow-lab.lovable.app',
        emoji: '🧶',
        level: 'Advanced'
    },
    {
        title: 'Згортування крові',
        description: 'Процес гемостазу: від пошкодження до згустку.',
        url: 'https://clot-compass.lovable.app',
        emoji: '🩹',
        level: 'Middle'
    },
    {
        title: 'Слуховий аналізатор',
        description: 'Трансформація звукової хвилі в нервовий імпульс.',
        url: 'https://pelajaran-3d.lovable.app',
        emoji: '👂',
        level: 'Middle'
    },
    {
        title: 'Життя в краплі',
        description: 'Екосистема мікросвіту: динаміка найпростіших.',
        url: 'https://biolooole-cmyk.github.io/lifeinadrop/',
        emoji: '🔬',
        level: 'First'
    },
    {
        title: 'Транспорт газів',
        description: 'Зв’язування кисню гемоглобіном та транспорт вуглекислого газу.',
        url: 'https://oxygen-transport-sim.lovable.app',
        emoji: '⭕',
        level: 'Middle'
    },
    {
        title: 'Енергобаланс',
        description: 'Розрахунок калорійності раціону та енергетичних витрат.',
        url: 'https://energy-balance-ua.lovable.app',
        emoji: '🍎',
        level: 'Middle'
    },
    {
        title: 'Око людини',
        description: 'Акомодація кришталика та механізм сприйняття світла сітківкою.',
        url: 'https://eye-focus-explore.lovable.app',
        emoji: '👁️',
        level: 'First'
    },
    {
        title: 'Будова вуха',
        description: 'Анатомія середнього та внутрішнього вуха (завитки та кісточки).',
        url: 'https://ear-mechanics-3d.lovable.app',
        emoji: '🐚',
        level: 'Middle'
    }
];

// --- COMPONENTS ---

const Background = () => {
  const bubbles = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-brand-bg uppercase">
      <div className="absolute inset-0 grain" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-light opacity-25 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-ink opacity-15 blur-[150px] rounded-full" />
      
      {/* Floating Chaotic Bubbles */}
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: (Math.random() * 100) + "vw", 
            y: (Math.random() * 100 + 100) + "vh",
            scale: Math.random() * 0.8 + 0.4,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{ 
            y: ["110vh", "50vh", "-20vh"],
            x: [
              (Math.random() * 100) + "vw",
              (Math.random() * 100) + "vw",
              (Math.random() * 100) + "vw"
            ],
            scale: [1, 1.4, 0.8, 1.2],
            rotate: [0, 90, 180, 270],
          }}
          transition={{ 
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * -40,
            ease: "linear"
          }}
          className="absolute w-8 h-8 rounded-full bg-brand-light/50 backdrop-blur-md border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      ))}
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 h-1 bg-brand-light/20">
    <motion.div 
      className="h-full bg-brand-ink"
      initial={{ width: 0 }}
      animate={{ width: `${(current / (total - 1)) * 100}%` }}
    />
  </div>
);

const Navigation = ({ onNext, onPrev, isFirst, isLast }: any) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 bg-brand-light/30 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
    <button 
      onClick={onPrev}
      disabled={isFirst}
      className={`group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isFirst ? 'opacity-20' : 'opacity-60 hover:opacity-100 hover:text-brand-ink'}`}
    >
      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span>Назад</span>
    </button>
    
    <div className="h-4 w-[1px] bg-brand-ink/10" />
    
    <button 
      onClick={onNext}
      disabled={isLast}
      className={`group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isLast ? 'opacity-20' : 'opacity-60 hover:opacity-100 hover:text-brand-ink'}`}
    >
      <span>Далі</span>
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const SimulationModal = ({ simulation, onClose }: any) => {
  if (!simulation) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/80 backdrop-blur-xl p-4 md:p-12"
    >
      <div className="relative w-full h-full max-w-7xl glass rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 flex items-center justify-between border-b border-brand-ink/10">
          <h3 className="text-2xl font-display font-semibold">{simulation.title}</h3>
          <div className="flex gap-4">
            <a 
              href={simulation.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-ink/20 hover:bg-brand-ink hover:text-brand-light transition-all"
            >
              <ExternalLink size={18} />
              <span>Відкрити в новій вкладці</span>
            </a>
            <button onClick={onClose} className="p-2 hover:bg-brand-ink/10 rounded-full transition-all">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white">
          <iframe 
            src={simulation.url} 
            className="w-full h-full border-none"
            title={simulation.title}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- SLIDES ---

const slidesContent = [
  {
    type: 'hero',
    label: 'ВИСТУП',
    title: 'Методичні та педагогічні засади створення і використання симуляцій',
    subtitle: 'із застосуванням ШІ-платформ як інструменту реалізації STEM-підходу',
    meta: [
      'Капліна Олександра Олексіївна',
      'Вчитель біології, спеціаліст «вищої» категорії',
      'Криворізька гімназія № 52 | 2026'
    ]
  },
  {
    type: 'route',
    title: 'Маршрут виступу',
    items: [
      'Актуальність теми',
      'Чому STEM та AI є необхідністю сучасної освіти',
      'Чому інтерактивні симуляції ефективні',
      'Покрокове створення AI-симуляції',
      'Тестування та STEM-аналіз',
      'Публікація цифрового продукту',
      'Демонстрація готових симуляцій',
      'Сильний сучасний висновок'
    ]
  },
  {
    type: 'problem',
    title: 'Чому звичний урок більше не працює?',
    items: [
      { id: '1', title: 'Складні процеси', desc: 'Фотосинтез, генетика, транспорт газів — невидимі для учнів процеси.' },
      { id: '2', title: 'Пасивне навчання', desc: 'Учень лише слухає, але не діє — знання зникають без практики.' },
      { id: '3', title: 'Відсутність досвіду', desc: 'Неможливо поставити реальний досвід із клітиною чи геном у класі.' },
      { id: '4', title: 'Абстрактність', desc: 'Схеми і малюнки не передають живу динаміку біологічних систем.' }
    ]
  },
  {
    type: 'features',
    title: 'Що формує STEM-підхід із AI?',
    grid: [
      { icon: Microscope, title: 'STEM-компетентності', desc: 'Наука + Технології + Інженерія + Математика в дії' },
      { icon: BrainCircuit, title: 'Критичне мислення', desc: 'Аналіз, прогнозування та перевірка гіпотез' },
      { icon: Cpu, title: 'Цифрова грамотність', desc: 'Робота з AI-інструментами та створення продуктів' },
      { icon: Search, title: 'Дослідницький підхід', desc: 'Від реальної проблеми — до висновку через модель' },
      { icon: Atom, title: 'Міжпредметність', desc: 'Біологія + Інформатика + Математика + Фізика' },
      { icon: Zap, title: 'Цифрове мислення', desc: 'Алгоритмічний підхід до вирішення складних задач' }
    ]
  },
  {
    type: 'process',
    title: 'Повний шлях: від ідеї до застосунку',
    steps: [
      'Предмет і проблема',
      'Тема симуляції',
      'Теоретична основа',
      'Промпт для AI',
      'Вибір платформи',
      'Створення моделі',
      'Тестування та аналіз',
      'Публікація онлайн'
    ]
  },
  {
    type: 'split',
    title: 'Етап 1-2: Вибір та Логіка',
    left: '«Який процес неможливо зрозуміти без цифрової моделі?»',
    right: 'Визначаємо об’єкти, параметри зміну та очікувану поведінку. Це архітектура майбутньої моделі.'
  },
  {
    type: 'editorial',
    title: 'Найважливіший STEM-етап',
    quote: 'Дослідження перед моделлю',
    text: 'Учні не просто шукають інформацію — вони аналізують механізми. Без глибокого розуміння біохімії неможливо описати логіку симуляції. Глибоке розуміння + STEM-мислення = готовність до промпту.'
  },
  {
    type: 'prompt',
    title: 'Якість симуляції = Якість промпту',
    bad: 'Зроби симуляцію фотосинтезу',
    good: 'Створи інтерактивну симуляцію фотосинтезу для учнів 7 класу. Додай слайдери: інтенсивність світла, CO2, температура. Показуй швидкість та графік залежності. Стиль: сучасний, для підлітків.'
  },
  {
    type: 'platforms',
    title: 'Екосистема AI-платформ',
    platforms: [
      { name: 'WebSim / Canva AI', role: 'Швидка візуалізація та 2D-моделі без коду', level: 'First' },
      { name: 'Claude / Google AI Studio', role: 'Глибока логіка, наукові алгоритми та тестування Gemini', level: 'Middle' },
      { name: 'Lovable / Bolt.new', role: 'Розробка повноцінних веб-застосунків', level: 'Advanced' },
      { name: 'Vercel / Netlify / GitHub', role: 'Платформи для хостингу та публікації проєктів', level: 'General' },
      { name: 'Cursor / VS Code', role: 'Професійне середовище з ШІ-асистентом', level: 'Expert' }
    ]
  },
  {
    type: 'loop',
    title: 'Від промпту — до живої моделі',
    left: [
      'Структура та інтерфейс',
      'Кнопки, слайдери, анімація',
      'Логіка розрахунків',
      'Навчальні пояснення',
      'Повний код (HTML/JS)'
    ],
    right: [
      'Наукова достовірність',
      'Коректність логіки',
      'Відповідність програмі',
      'Зручність для учня',
      'Виправлення через AI'
    ]
  },
  {
    type: 'publication',
    title: 'Хостинг та публікація',
    items: [
      { icon: Globe, title: 'Vercel / Netlify / GitHub', desc: 'Автоматизовані інструменти для миттєвого розгортання проєктів онлайн' },
      { icon: Share2, title: 'Миттєвий доступ', desc: 'Учні відкривають моделі через QR-коди на будь-яких пристроях' },
      { icon: Monitor, title: 'STEM-портфоліо', desc: 'Цифровий хаб усіх результатів діяльності вчителя та учнів' }
    ]
  },
  {
    type: 'showcase',
    title: 'Галерея STEM-симуляцій',
    description: 'Кожна симуляція — це реальний інструмент, що демонструє міжпредметну інтеграцію та дослідницький підхід.'
  },
  {
    type: 'stem_final',
    title: 'Кожна симуляція — це STEM у дії',
    items: [
      { char: 'S', name: 'Science', desc: 'Предметний зміст: біологія, хімія, фізика' },
      { char: 'T', name: 'Technology', desc: 'ШІ-платформи як інструмент творчості' },
      { char: 'E', name: 'Engineering', desc: 'Проєктування логіки, алгоритмів та структури' },
      { char: 'M', name: 'Mathematics', desc: 'Формули, графіки, аналіз даних' }
    ]
  },
  {
    type: 'closing',
    title: 'ШІ підсилює вчителя, не замінює його',
    quote: '«Майбутнє освіти — не в тому, хто знає більше. А в тому, хто вміє навчати з новими інструментами. І цей вчитель — ви.»',
    meta: 'Капліна О.О. | Криворізька гімназія № 52 | 2026'
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSimulation, setActiveSimulation] = useState<any>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slidesContent.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slidesContent[currentSlide];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-ink selection:text-brand-light relative overflow-hidden">
      <Background />
      
      <main className="relative z-10 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6 md:px-16 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl"
          >
            {/* HERO SLIDE */}
            {slide.type === 'hero' && (
              <div className="flex flex-col items-start gap-8">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-5 py-1.5 rounded-full glass text-xs tracking-[0.2em] font-bold uppercase shadow-sm"
                >
                  {slide.label}
                </motion.span>
                <h1 className="text-5xl md:text-[80px] font-display font-black leading-[0.9] tracking-tighter text-brand-ink drop-shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl font-serif italic text-brand-ink/80 max-w-3xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="mt-4 space-y-2 opacity-70 border-l-2 border-brand-ink/20 pl-6">
                   {Array.isArray(slide.meta) && slide.meta.map((m, i) => <p key={i} className="text-xs font-bold uppercase tracking-[0.1em]">{m}</p>)}
                </div>
              </div>
            )}

            {/* ROUTE SLIDE */}
            {slide.type === 'route' && (
              <div className="space-y-12">
                <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {slide.items?.map((item: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-center gap-6 p-4 glass rounded-2xl group cursor-pointer hover:bg-brand-ink/10"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-ink text-brand-light flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-xl opacity-80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* PROBLEM SLIDE */}
            {slide.type === 'problem' && (
              <div className="space-y-10">
                <h2 className="text-4xl font-display font-black tracking-tight">{slide.title}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {slide.items?.map((item: any, idx: number) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="p-8 rounded-[32px] glass group hover:bg-brand-ink hover:text-brand-light transition-all duration-700 shadow-xl"
                    >
                      <span className="text-[9px] opacity-40 font-black tracking-[0.2em] mb-4 block uppercase">Scenario 0{idx + 1}</span>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-base opacity-80 group-hover:opacity-100 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURES SLIDE */}
            {slide.type === 'features' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-display font-black tracking-tight">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.grid?.map((item: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="p-6 glass rounded-2xl flex flex-col gap-3 border-l-4 border-l-brand-ink/40"
                    >
                      <div className="text-brand-ink">
                        <item.icon size={28} />
                      </div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-xs opacity-70 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* PROCESS SLIDE */}
            {slide.type === 'process' && (
              <div className="space-y-16">
                 <h2 className="text-5xl font-display font-bold text-center mb-20">{slide.title}</h2>
                 <div className="relative flex flex-wrap justify-center gap-4">
                    {slide.steps?.map((step: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-16 h-16 rounded-full glass flex items-center justify-center font-display font-bold text-xl group-hover:bg-brand-ink group-hover:text-brand-light transition-all">
                          {idx + 1}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold opacity-80">{step}</span>
                           {idx < 7 && <ChevronRight className="opacity-20 mt-1" size={16} />}
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-24 p-8 glass rounded-3xl text-center italic font-serif text-xl border-y border-brand-ink/10">
                    AI не замінює вчителя — він виконує технічну частину.
                    Педагогічна мудрість та натхнення — це назавжди за людиною.
                 </div>
              </div>
            )}

            {/* PLATFORMS SLIDE */}
            {slide.type === 'platforms' && (
              <div className="space-y-12">
                <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                <div className="space-y-4">
                  {slide.platforms?.map((p: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center justify-between p-6 glass rounded-2xl group hover:translate-x-4 transition-transform duration-500"
                    >
                      <div className="flex flex-col">
                         <h3 className="text-2xl font-bold">{p.name}</h3>
                         <span className="text-sm opacity-50">{p.role}</span>
                      </div>
                      <div className="px-4 py-1 rounded-full border border-brand-ink/20 text-xs font-bold bg-brand-light/20">
                        {p.level}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* SHOWCASE SLIDE */}
            {slide.type === 'showcase' && (
              <div className="w-full h-full flex flex-col gap-6">
                <div className="flex justify-between items-end">
                   <div>
                      <h2 className="text-3xl font-display font-black tracking-tight mb-1">{slide.title}</h2>
                      <p className="text-sm font-serif italic opacity-70">{slide.description}</p>
                   </div>
                   <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest bg-brand-ink/5 px-3 py-1 rounded-full border border-brand-ink/5">
                      {SIMULATIONS.length} активних проєктів
                   </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 overflow-y-auto no-scrollbar max-h-[65vh] pb-8 pr-2">
                  {SIMULATIONS.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => setActiveSimulation(item)}
                      className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-brand-light/20 bg-brand-light/10"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-4xl select-none group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        {item.emoji}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-0">
                        <span className="text-[7px] font-black uppercase tracking-widest text-brand-light/40">{item.level}</span>
                        <h3 className="text-[11px] font-bold text-brand-light leading-tight tracking-tight truncate">{item.title}</h3>
                        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-[8px] text-brand-light/80 line-clamp-1 font-semibold leading-normal">{item.description}</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 p-0.5 rounded-full glass text-brand-light transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <Maximize2 size={8} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* STEM FINAL SLIDE */}
            {slide.type === 'stem_final' && (
               <div className="space-y-16">
                 <h2 className="text-5xl font-display font-bold text-center">{slide.title}</h2>
                 <div className="grid md:grid-cols-4 gap-4">
                    {slide.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex flex-col items-center text-center gap-6 p-8 glass rounded-[40px]">
                         <div className="w-24 h-24 rounded-full bg-brand-ink text-brand-light flex items-center justify-center text-5xl font-display font-bold animate-pulse-slow">
                           {item.char}
                         </div>
                         <div>
                            <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                            <p className="text-sm opacity-60">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <p className="text-center italic font-serif text-2xl opacity-80">
                    "Учні не лише вивчають біологію — вони думають як науковці, діють як інженери."
                 </p>
               </div>
            )}

            {/* CLOSING SLIDE */}
            {slide.type === 'closing' && (
              <div className="flex flex-col items-center text-center gap-16">
                <div className="w-24 h-24 rounded-full border border-brand-ink/20 flex items-center justify-center text-brand-ink/40">
                  <Rocket size={48} />
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-neutral-900 border-none">
                  {slide.title}
                </h2>
                <div className="max-w-4xl p-12 rounded-[50px] bg-brand-ink text-brand-light relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-full grain opacity-20 pointer-events-none" />
                  <p className="text-3xl md:text-5xl font-serif italic leading-tight relative z-10">
                    {slide.quote}
                  </p>
                </div>
                <div className="space-y-2 pt-12 border-t border-brand-ink/10 w-full opacity-40">
                   <p className="text-sm font-bold tracking-widest uppercase">{slide.meta}</p>
                </div>
              </div>
            )}
            
            {/* GENERIC CONTENT FOR TYPES LIKE DRAFT/EDITORIAL */}
            {slide.type === 'editorial' && (
              <div className="flex flex-col gap-8 max-w-4xl">
                <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                <p className="text-6xl font-serif italic text-brand-ink/40 leading-none">
                  {slide.quote}
                </p>
                <p className="text-2xl leading-relaxed opacity-80">
                  {slide.text}
                </p>
              </div>
            )}

            {slide.type === 'prompt' && (
               <div className="space-y-12">
                 <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                 <div className="grid md:grid-cols-2 gap-12">
                   <div className="p-10 rounded-3xl bg-red-950/5 border border-red-900/10 grayscale opacity-40">
                      <span className="text-xs font-bold text-red-900 uppercase tracking-widest mb-4 block">Слабкий запит</span>
                      <p className="text-2xl font-mono text-neutral-900 italic">"{slide.bad}"</p>
                   </div>
                   <div className="p-10 rounded-3xl glass border-2 border-brand-ink/20 shadow-2xl scale-105">
                      <span className="text-xs font-bold text-brand-ink uppercase tracking-widest mb-4 block">Якісний промпт</span>
                      <p className="text-2xl text-neutral-900 leading-snug">"{slide.good}"</p>
                   </div>
                 </div>
               </div>
            )}

            {slide.type === 'loop' && (
              <div className="space-y-12">
                <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 block">AI генерує</span>
                    {Array.isArray(slide.left) && slide.left.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 text-xl">
                        <div className="w-2 h-2 rounded-full bg-brand-ink/40" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 block">Педагог та учні перевіряють</span>
                    {Array.isArray(slide.right) && slide.right.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 text-xl font-bold">
                        <div className="w-2 h-2 rounded-full bg-brand-ink" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'split' && (
              <div className="grid md:grid-cols-2 gap-24 items-center">
                <h2 className="text-7xl font-display font-bold leading-[0.9]">
                  {slide.left}
                </h2>
                <div className="p-12 glass rounded-[60px] text-2xl leading-relaxed italic border-brand-ink/10">
                   {slide.right}
                </div>
              </div>
            )}

            {slide.type === 'publication' && (
              <div className="space-y-16">
                 <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                    {slide.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-10 glass rounded-[40px] flex flex-col gap-6 group hover:translate-y-[-10px] transition-transform duration-500">
                         <div className="w-16 h-16 rounded-3xl bg-brand-ink/5 flex items-center justify-center text-brand-ink group-hover:bg-brand-ink group-hover:text-brand-light transition-all">
                           <item.icon size={32} />
                         </div>
                         <div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <div className="fixed top-8 left-12 z-50 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand-ink flex items-center justify-center text-brand-light shadow-lg">
          <Dna size={20} className="animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink">STEM BIO</span>
          <span className="text-[10px] opacity-40 uppercase">Interactive Experience</span>
        </div>
      </div>

      <Navigation 
        onNext={nextSlide} 
        onPrev={prevSlide} 
        isFirst={currentSlide === 0}
        isLast={currentSlide === slidesContent.length - 1}
      />
      
      <ProgressBar current={currentSlide} total={slidesContent.length} />

      <AnimatePresence>
        {activeSimulation && (
          <SimulationModal 
            simulation={activeSimulation} 
            onClose={() => setActiveSimulation(null)} 
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-12 z-50 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 invisible md:visible">
        Slide {currentSlide + 1} / {slidesContent.length}
      </div>
    </div>
  );
}
