import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { assetByName, type AssetRecord } from './assets';

const imageMap: Record<string, string> = {
  '三才碗插画图': '盖碗茶插图.png',
  '竹纹三才碗实景图': '盖碗.jpg',
  '盖碗分解图 (盖、碗、托)': '盖碗分解图（盖、碗、托）.png',
  '盖碗三部分字样排版图': '背景图1.png',
  选土: '选土.png',
  揉泥: '揉泥.png',
  拉坯: '拉坯.png',
  修坯: '修坯.png',
  素烧: '素烧.png',
  上釉: '上釉.png',
  烧制: '烧制.png',
  '彩绘/描金': '彩绘或描金.png',
  '纹样图:竹纹': '竹纹.png',
  '纹样图:芙蓉纹': '芙蓉纹.png',
  '纹样图:熊猫纹': '熊猫纹.jpg',
  '纹样图:青花缠枝纹': '青花缠枝纹.jpg',
  '暗语图/GIF:茶盖朝下靠茶托': '请续水.gif',
  '暗语图/GIF:茶盖上放点小东西': '盖碗.gif',
  '暗语图/GIF:碗盖立起放茶碗旁': '要赊账.gif',
  '暗语图/GIF:盖朝上放进茶碗': '可以收走.gif',
  '暗语图/GIF:盖碗朝上平放': '需要帮助.gif',
  '鹤鸣茶社实景图': '鹤鸣茶社喝茶.gif',
  '创新盖碗茶图例 1': '盖碗咖啡.jpg',
  '创新盖碗茶图例 2': '盖碗奶茶.jpg',
  '创新盖碗茶图例 3': '甜品.jpg',
  '创新盖碗茶图例 4': '外国友人.jpg',
  '2023-2024年盖碗茶市场份额占比(饼图)': '数据可视化.png',
  '外国友人体验盖碗茶': '外国友人.jpg',
  '历史博物馆展品三才碗': '1.JPG',
  '三才碗千年时间轴长图': '滑动撕开内容.png',
};

const videoMap: Record<string, string> = {
  '盖碗倒茶动态': '倒水.gif',
  '茶博士《龙行十八式》表演': '鹤鸣茶社茶师傅龙行十八式完整表演.mp4',
  '茶馆节目表演': '茶馆表演.mp4',
  '鹤鸣茶社的一下午': '《老成都的松弛感》.mp4',
};

const fallbackClasses =
  'w-full bg-[#f0e6da] flex flex-col items-center justify-center text-[#8c6b4a] font-medium rounded-lg shadow-inner my-4 overflow-hidden p-4 text-center border-4 border-white';

const resolveAsset = (text: string, mode: 'image' | 'video') => {
  const filename = mode === 'image' ? imageMap[text] : videoMap[text];
  return filename ? assetByName[filename] : undefined;
};

const renderMedia = (asset: AssetRecord, title: string) => {
  if (asset.kind === 'video') {
    return (
      <video className="h-full w-full object-cover" controls preload="metadata" playsInline>
        <source src={asset.src} type="video/mp4" />
      </video>
    );
  }

  return <img src={asset.src} alt={title} loading="lazy" className="h-full w-full object-cover" />;
};

export const FadeIn = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({ title }: { title: string }) => (
  <FadeIn className="flex flex-col items-start mb-8 relative z-10">
    <h2 className="text-4xl font-bold text-[#5c4a3d] font-serif pl-2 z-10 tracking-wider">{title}</h2>
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="absolute top-2 left-6 opacity-80 z-0">
      <path d="M5 35L20 20L35 25L55 10L70 20L85 5L100 20L115 15" stroke="#8c6b4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
      <path d="M10 35L25 25L40 30L60 15L75 25L90 10L105 25" stroke="#bda588" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
    </svg>
  </FadeIn>
);

export const SubTitle = ({ num, text }: { num?: string | number; text: string }) => (
  <div className="flex items-center gap-3 mb-6 mt-10">
    {num && <span className="bg-[#bda588] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">{num}</span>}
    <h3 className="text-lg font-bold text-[#5c4a3d] relative">
      {text}
      <span className="absolute -bottom-1.5 left-0 w-8 h-1 bg-[#bda588] rounded-full"></span>
    </h3>
  </div>
);

export const CenterBadge = ({ text }: { text: string }) => (
  <div className="flex justify-center my-8">
    <div className="bg-[#f0e6da] border border-[#bda588] rounded-full px-6 py-2 text-[#8c6b4a] font-bold text-sm tracking-widest shadow-sm flex items-center gap-2">
      <span className="text-lg opacity-80">◆</span>
      {text}
    </div>
  </div>
);

export const ImagePlaceholder = ({ text, className = 'aspect-video' }: { text: string; className?: string }) => {
  const asset = resolveAsset(text, 'image');

  if (!asset) {
    return (
      <div className={`${fallbackClasses} ${className}`}>
        <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs break-words tracking-widest">[ 图片占位 / {text} ]</p>
      </div>
    );
  }

  return <div className={`w-full rounded-lg my-4 overflow-hidden border-4 border-white bg-[#f0e6da] shadow-inner ${className}`}>{renderMedia(asset, text)}</div>;
};

export const VideoPlaceholder = ({ text, time }: { text: string; time: string }) => {
  const asset = resolveAsset(text, 'video');

  if (!asset) {
    return (
      <div className="w-full bg-[#4a3f35] flex items-center justify-center text-[#fdf8f1] font-medium rounded-lg shadow-xl my-4 aspect-video relative overflow-hidden ring-4 ring-[#f0e6da]">
        <div className="absolute inset-0 bg-black/30" />
        <div className="z-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/80 flex justify-center items-center mb-3 bg-white/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
          </div>
          <p className="text-xs tracking-widest font-mono bg-black/40 px-2 py-0.5 rounded">{time}</p>
          <p className="text-sm mt-3 opacity-80 text-white tracking-widest">[ 视频占位 / {text} ]</p>
        </div>
      </div>
    );
  }

  if (asset.kind === 'video') {
    return (
      <div className="w-full rounded-lg shadow-xl my-4 aspect-video relative overflow-hidden ring-4 ring-[#f0e6da] bg-black">
        <video className="h-full w-full object-cover" controls preload="metadata" playsInline>
          <source src={asset.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg shadow-xl my-4 aspect-video relative overflow-hidden ring-4 ring-[#f0e6da] bg-[#4a3f35]">
      <img src={asset.src} alt={text} loading="lazy" className="h-full w-full object-cover" />
      <div className="absolute right-3 top-3 rounded bg-black/50 px-2 py-1 text-xs tracking-widest text-white">{time}</div>
    </div>
  );
};
