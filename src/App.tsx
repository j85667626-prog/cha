import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { assetByName } from './assets';
import { craftSteps, patterns, secrets } from './data';

const pages = ['首页', '目录', '史', '物', '用', '新', '结尾页'] as const;
type PageName = (typeof pages)[number];

const paragraphClass = 'text-left indent-[2em] text-[15px] leading-8 text-[#4d4034]';
const cardClass =
  'rounded-[28px] border border-[#ead8c4] bg-[rgba(255,249,242,0.94)] p-5 shadow-[0_14px_36px_rgba(110,80,48,0.10)]';
const labelClass = 'text-left text-[11px] tracking-[0.35em] text-[#a07a58] uppercase';

const pageSummaries: Record<PageName, string> = {
  首页: '从成都茶馆的日常切入，建立对三才碗的整体印象。',
  目录: '总览全篇结构，按史、物、用、新四条线索展开阅读。',
  史: '追溯三才碗从唐宋萌芽到当代焕新的历史流变。',
  物: '理解三才碗的器型结构、制作工艺与纹样审美。',
  用: '观察三才碗在茶馆技法、暗语和城市生活中的真实使用。',
  新: '呈现三才碗在文创、消费和传播中的当代转化。',
  结尾页: '在总结中回望三才碗所承载的文化精神与生活气质。',
};

const homeParagraphs = [
  '在成都的街头巷尾，茶馆并不是一个附属空间，而是城市气质最稳定的表达。它不像景点那样刻意，也不像宣传语那样直接，却总能在不经意间把这座城市的慢、闲、稳和热闹一并呈现出来。茶馆门口的竹椅、木桌、热气和人声，常常比任何宏大的叙述都更能说明成都人的生活方式。而在这一切日常景象中，最能被一眼认出的器物之一，就是那只端在手里、落在桌上、又在指尖轻轻转动的三才碗。',
  '三才碗也称盖碗，由盖、碗、托三部分组成。它的结构并不复杂，但越是简单，越考验比例、功能和手感的统一。盖能聚香，也能拨茶；碗能盛汤，也能观色；托能承热，也能显礼。三者相互支撑，既符合饮茶时的具体需求，也在器物层面保留了中国文化里“天、地、人”彼此对应的观念。正因为这样，三才碗从来不只是一个茶具名词，它更像是一种被长期使用、被反复理解、又被不断赋予新意义的生活器物。',
  '若把三才碗放回成都语境中来看，它的意味还会继续放大。成都人饮茶，并不只为解渴，也不只是为了追求茶汤高低，更重要的是通过这一整套器物与场景，让日常节奏慢下来，让人与人之间的关系变得更从容。盖碗在茶馆里经常和采耳、评书、变脸、闲谈、看报、发呆并置出现，它因此不仅属于桌面，也属于城市公共生活。它是饮茶的工具，也是相处的媒介，更是成都烟火气最安静却又最持久的承载物之一。',
  '从历史上看，三才碗并非一夜之间被发明出来，而是在中国饮茶方式不断变化的过程中逐渐形成。唐代盏与托的组合、宋代点茶对器型的要求、明清散茶冲泡的普及、成都茶馆文化的成熟、民国市井生活的放大，再到今天的文创与跨界表达，都共同参与了它的成长。它看似只是器物史里的一个名字，实际上却牵连着制瓷工艺、茶文化演变、地方社会风貌和当代审美传播。',
  '因此，从三才碗进入，不只是为了讲一只茶具的前身今生，更是为了借这只小小的器物，重新打量茶与城、人和日常、传统与当代之间的关系。它既有器物的精细，也有生活的宽阔；既能落在历史之中，也能继续活在当下。真正让人着迷的，恰恰不是它某一面的孤立意义，而是它始终能在不同年代、不同场景里被重新理解，却始终没有失去自己原有的温润分寸。',
];

const directoryLead = [
  '这份页面以三才碗为中心，围绕历史源流、器物特征、使用方式、当代表达四条主线展开。阅读时并不需要把它当作单纯的器物介绍，因为三才碗所牵连的远不止制瓷和饮茶，它还连接着成都茶馆文化、地方记忆、社交秩序与当代生活方式。',
  '在篇章安排上，先由“史”说明它从哪里来，再由“物”解释它为何成为独特器物，接着通过“用”回到真实生活场景，再在“新”中观察它如何以新的身份被重新传播。结尾页则尝试把这些分散的线索重新收束，回到三才碗作为一个文化符号所留下的持久力量。',
];

const historyIntro = [
  '若只把三才碗看成成都茶馆里的常见茶具，便很容易忽视它背后漫长的演变过程。事实上，它的形成并不是孤立的地方现象，而是伴随中国饮茶方式、瓷器制作和日常审美共同成长起来的器物史结果。',
  '从唐代的盏与托，到宋代的盖盏一体，再到明清散茶冲泡与城市茶馆兴盛，三才碗在不同历史阶段都不断调整自身形态与功能。它既吸收前代器物经验，又在新的饮茶需求中逐渐稳定，最终在成都茶馆文化中获得最鲜明、最持久的生命力。',
];

const historyTimeline = [
  {
    era: '唐代',
    title: '盏托并用，雏形初现',
    image: '托地.jpg',
    paragraphs: [
      '唐代茶文化已相当繁盛，饮茶不再只是少数人的嗜好，而逐渐进入社会生活多个层面。《茶经》对茶叶、用水、火候与茶具的细致描述，意味着饮茶已经发展成一套有章法、有讲究的文化实践。彼时流行煎茶法，茶盏与盏托的配合使用，既出于实用考虑，也体现了唐人对器用礼度的重视。',
      '从器物结构上看，盏与托的组合让盛汤与承热两个功能开始分离，这种分离正是后来三才碗形成的重要前提。托的存在，使饮者不必直接触碰热器，同时也在视觉上给茶具增加了层次。虽然此时还没有成熟意义上的盖碗，但“盛茶之器”与“承器之托”之间的稳定搭配，已经让三才碗的前身轮廓浮现出来。',
      '法门寺地宫出土的唐代宫廷茶具，为这种器物关系提供了十分有力的实物印证。那些制作精良、用途明确的茶盏与托，不只说明唐人懂得如何让茶具更适配饮茶，也说明他们早已意识到器物应同时承担实用与审美的双重任务。三才碗后来的发展，并不是凭空出现，而是在这一层层经验上自然延伸出来的。',
    ],
  },
  {
    era: '宋代',
    title: '盖盏合一，器制渐成',
    image: '盖碗茶插图.png',
    paragraphs: [
      '宋代点茶风气鼎盛，饮茶活动从民间到士大夫阶层都极为活跃。点茶讲究茶汤色泽、击拂泡沫、器色映衬与品饮礼数，茶器的细节因此被放大讨论。器物不再只是“能用”，而是必须配合茶事过程的精致节奏。随着这种要求不断提高，盖、碗、托之间的关系也愈发紧密。',
      '盖的作用开始从单纯遮蔽转向保温、防尘、聚香与调节饮用节奏；碗既要承汤，也要便于观色；托则让持握动作更稳定、更安全。三者逐步形成相互配合的结构逻辑，这一逻辑后来成为三才碗最典型的器型特征。宋代瓷业的繁荣也使得器形、釉色、比例和触感都被反复推敲，三才碗因此从雏形逐渐走向成熟。',
      '在审美上，宋代尚简、尚雅的风气也深刻影响了盖碗的发展方向。它不必极尽雕饰，却要求结构端整、线条克制、使用顺手。这种“平实中见精致”的器物观念，与三才碗后来的风格十分一致。可以说，宋代不仅为三才碗提供了更稳固的结构基础，也为它确立了长期沿用的审美原则。',
    ],
  },
  {
    era: '明清',
    title: '散茶普及，走向民间',
    image: '托地.jpg',
    paragraphs: [
      '明清时期，散茶冲泡逐渐替代点茶，饮茶方式发生明显转变。相较于复杂的点茶程序，冲泡散茶更强调器物对香气、温度与出汤节奏的掌控。此时盖碗的优势变得更加突出：一器即可完成投茶、注水、观色、闻香与啜饮，且灵活、实用、便于清洁，因此迅速被越来越多的人接受。',
      '从宫廷雅器到民间常用之物，三才碗在这一时期完成了极为重要的社会身份转变。它不再主要服务于礼仪性强的茶事活动，而开始真正走进更广阔的日常生活。人们使用它，不只是因为它象征雅致，更因为它方便、耐用、顺手，能够适配家庭、会客、商谈与休息等多种场景。',
      '与此同时，制瓷工艺也不断成熟。不同地区的瓷器风格、釉色偏好和纹样设计纷纷进入盖碗之中，使三才碗在保有基本结构的同时，呈现出多样化面貌。正是在这种“结构稳定、风格丰富”的状态下，三才碗逐渐具备了向地方文化深度扎根的条件，成都后来对它的接受，便有了坚实基础。',
    ],
  },
  {
    era: '清末至民国',
    title: '茶馆兴盛，扎根成都',
    image: '碗人.jpg',
    paragraphs: [
      '清末至民国，成都茶馆数量与影响力迅速扩大，茶馆不只是饮茶场所，也逐步成为消息交换、社交往来、休闲消遣与公共讨论的重要空间。在这样的城市日常中，三才碗因其实用性与稳定性而成为最适合茶馆使用的器物之一。它耐用、易洗、出汤便捷，也方便茶博士在高频服务中反复操作。',
      '更关键的是，三才碗与成都茶馆生活形成了互相塑造的关系。茶馆让三才碗拥有更大的社会可见度，三才碗则帮助茶馆建立起一整套熟悉的动作、礼数和空间气氛。端碗、揭盖、拨茶、续水、暗语、收碗，这些细小行为长期重复，最终让三才碗从单纯器具变成市井生活里几乎不可替代的文化符号。',
      '民国时期成都茶馆的繁盛，进一步加深了三才碗与城市性格之间的联系。它既见证了公共空间中的人情往来，也承接了慢节奏生活中的闲适情绪。人们看到三才碗，往往不会只想到“喝茶”，还会自然联想到竹椅、方言、笑声、说书、采耳与漫长午后。器物与城市因此发生了深度绑定。',
    ],
  },
  {
    era: '当代',
    title: '非遗焕新，继续生长',
    image: 'IMG_20260308_160901_112634.png',
    paragraphs: [
      '进入当代，三才碗并没有随着传统茶馆的变化而失去存在感，反而在非遗保护、城市文化推广与文创消费兴起的背景下获得新的传播空间。越来越多的人开始重新认识它，不再仅把它当作“老物件”，而是视作一件能够连接历史、审美与生活方式的器物。',
      '手工制瓷匠人仍在延续传统工艺，保持胎釉、器型和绘饰上的讲究；与此同时，设计师、咖啡馆、甜品店和文创店则尝试用更符合今天传播逻辑的方式重新使用三才碗。它被做成迷你器型、礼盒产品、城市纪念品，也被重新置入社交平台与旅游叙事之中，使更多年轻人愿意主动接近这件器物。',
      '当代三才碗最值得注意的地方，并不是它“变新”了，而是它在不断变化的表达中依然保有核心气质。它仍然讲究手感、比例、礼数和日常温度，仍然让人从中看见一种缓慢、稳妥、有分寸的生活审美。历史没有把它封存起来，反而让它以新的身份继续生长。',
    ],
  },
];

const structureParagraphs = [
  '三才碗的魅力首先来自结构。盖、碗、托并不是简单叠放的三件器物，而是一套经过长期使用检验后形成的稳定系统。盖能收拢茶香，也能拨开浮叶；碗要有足够容量与弧度，便于观汤与持握；托则负责承热、稳定和礼貌动作。三者组合在一起，既回应了饮茶需求，也形成了非常完整的器物秩序。',
  '从文化意义看，盖、碗、托分别被解释为天、地、人，这种解释并非强行附会，而是正好契合三者在结构中的层次关系。盖在上，碗居中，托在下，不仅构成视觉上的上下秩序，也让器物天然带有一种内敛而清晰的东方哲学意味。人们在使用它时，并不需要时时想着象征意义，但这种意味会随着动作自然渗入日常体验之中。',
  '从器型细节看，三才碗真正难得的地方在于“顺手”。盖要扣合得紧而不死，碗口要便于借缝啜饮，托的边缘要能稳稳托住热器却不显笨重。越是日常使用频率高的器物，越要求它在比例上没有明显短板。也正因此，三才碗的设计之美并不依赖夸张装饰，而更依赖经过时间沉淀后的功能准确性。',
];

const craftLead = [
  '三才碗之所以能兼顾轻巧、温润与耐用，并不是因为它“看起来像老器物”，而是因为每一道工艺都在为最终的使用体验服务。器型的薄厚、胎质的稳定、盖碗托之间的贴合度，都会直接影响一只盖碗是否真正好用。',
  '在传统制作流程中，工艺步骤不是简单叠加，而是一环套一环。前一道工序若略有偏差，后面便很难补救，因此真正成熟的工艺往往来自经验判断与手感控制，而不只是标准化操作。',
];

const patternLead = [
  '三才碗的纹样设计并非附属装饰，而是器物性格的重要部分。很多纹样一眼就带有成都与蜀地气息，它们让三才碗不仅能被使用，也能被识别、被记住、被带走。',
  '在地方文化传播中，这些纹样的意义越来越明显。它们把城市意象、吉祥寓意与器物表面结合起来，让三才碗从茶馆器物逐渐转向兼具观赏与纪念价值的文化载体。',
];

const useIntro = [
  '若说“物”回答了三才碗是什么，那么“用”讲的便是它如何真正进入日常。很多器物在展柜中看起来完整，但只有在反复使用之后，它们的价值才会完全显露。三才碗就是这样一种必须回到动作、场景和人情关系中去理解的器物。',
  '在成都茶馆里，三才碗从不单独出现。它总和茶博士的手法、茶客的默契、桌椅的布局和茶馆的空气一起工作。正是这些真实场景，让它从抽象的文化符号变成了活生生的生活经验。',
];

const secretLead = [
  '茶馆暗语是三才碗最有生活温度的一面。它并不属于神秘表演，而属于长期形成的公共默契：一只碗盖的角度、一种放置方式，就能完成续水、留座、收碗、求助等信息传递。',
  '这种方式之所以耐人寻味，不在于复杂，而在于得体。它既避免高声招呼，也减少尴尬与打扰，让茶馆服务与茶客需求在看似无声的状态下顺畅衔接。器物因此成为语言的延伸，也成为茶馆秩序的一部分。',
];

const lifeParagraphs = [
  '在成都，喝盖碗茶并不只是一个动作，而是一整套被时间慢慢磨出来的日常节奏。人们到茶馆，并不总是为了办一件明确的事，很多时候只是为了坐下来，让时间有地方安放。三才碗因此常常和消磨午后、谈天说地、听书看戏联系在一起。',
  '茶馆里的生活感也正通过三才碗被放大。它一方面是桌面上最常见的器具，另一方面又天然带着礼数与分寸。端碗、揭盖、拨茶、啜饮，看起来都是小动作，却让“喝茶”从摄入饮料变成一种有节奏、有停顿、有气氛的行为。正是在这种反复重复的动作中，成都人的松弛与讲究同时被看见。',
  '因此，当人们提到三才碗时，真正难忘的往往并不只是茶本身，而是茶与城、人与人之间所形成的整体场景。它既属于私人感受，也属于公共空间；既能装下一碗茶汤，也能装下一座城市最日常的情绪。',
];

const innovationIntro = [
  '进入当代，三才碗最值得关注的变化，不是它是否还“正宗”，而是它如何在新的生活语境中继续被使用与传播。传统器物若只被保存在展柜里，很快就会与普通人的日常拉开距离；而三才碗之所以仍有活力，恰恰在于它没有停留在怀旧层面。',
  '在今天的城市消费空间中，三才碗被重新置入咖啡、奶茶、甜品、文创、旅游纪念和社交媒体传播场景。它因此不再只是老茶馆的配角，而是可以主动吸引新受众的一种视觉与文化媒介。',
];

const innovationNotes = [
  '盖碗咖啡、盖碗奶茶等跨界产品，把传统茶器转译成更容易被年轻人接受的消费体验。器物外形保留了文化辨识度，内容却与新的饮用习惯结合，使三才碗不再只服务传统茶事，而开始服务新的城市消费场景。',
  '文创店会将三才碗制作成摆件、礼盒和伴手礼，让它从茶馆走向展示、收藏和送礼场景。它因此获得了新的社交价值，不再只是“自己使用”的物件，也成为“送给别人讲述一座城市”的媒介。',
  '在城市宣传和旅游叙事中，三才碗也常与熊猫、茶馆、慢生活一起被讲述，成为成都形象的一部分。对外地游客而言，它既是可购买的纪念品，也是进入地方文化的入口；对本地人而言，它则重新确认了城市记忆与日常经验之间的连接。',
];

const innovationClosing = [
  '这些变化说明，传统器物真正的生命力并不来自“原封不动”，而来自在不失核心气质的前提下被不断重新理解。三才碗能够继续流行，是因为它既有足够明确的传统形象，也有足够开放的当代适应性。',
  '它在新的场景中没有丢失原有的温润与分寸，反而因为新的使用方式而让更多人意识到：一只传统器物并不只属于历史，也完全可以属于今天。',
];

const endingParagraphs = [
  '回望三才碗的前身今生，会发现它之所以值得反复讲述，并不只是因为它“古老”，而是因为它在漫长岁月里始终没有脱离生活。很多传统器物之所以容易被边缘化，往往是因为它们只剩下被观看的价值；而三才碗不同，它始终在被使用、被触碰、被端起、被放下，因此始终保有体温。',
  '从唐宋器物演变，到明清散茶普及，再到成都茶馆生活的成熟与当代文创传播的兴起，三才碗不断改变自身出现的场景，却一直保留着核心精神：讲究结构，讲究分寸，讲究人与器物之间温和而稳定的关系。它不是喧哗的器物，却总能在日常里留下极深的印象。',
  '也正因此，三才碗值得被看成一种生活方式的缩影。它提醒人们，真正有力量的传统，并不一定宏大，也不一定高远，很多时候恰恰藏在那些经得住反复使用的小器物里。它能让人慢下来，让一只碗承接一段时间，让一次喝茶变成一次与城市、与历史、与自己重新相处的机会。',
  '如果说一只三才碗最终留下了什么，那么留下的并不只是器型、纹样或工艺，更是一种温润的节奏感。一种不急于表达、却很懂得安放关系的日常智慧；一种看似细小、却足以支撑城市气质的生活审美；一种在传统与当代之间持续生长、又始终不失根脉的文化力量。',
];

const endingThoughts = [
  '它是一件茶具，也是一种生活方式。',
  '它见证了制瓷技艺的延续，也见证了成都茶馆的人情往来。',
  '它在传统与当代之间不断转换身份，却始终保有温润、从容和有分寸的气质。',
  '它把历史、工艺、日常与地方记忆安放在同一只器物之中，因此越是平常，越显珍贵。',
];

const gifNames = [
  '3月11日.gif',
  '不满意.gif',
  '倒水.gif',
  '可以收走.gif',
  '盖碗.gif',
  '要赊账.gif',
  '请续水.gif',
  '需要帮助.gif',
  '鹤鸣茶社喝茶.gif',
  '鹤鸣茶社茶壶.gif',
];

const pngNames = [
  'IMG_20260308_160901_112634.png',
  '三才碗托分解图—托.png',
  '三才碗托分解图—盖.png',
  '三才碗托分解图—碗.png',
  '上釉.png',
  '修坯.png',
  '封面.png',
  '彩绘或描金.png',
  '托.png',
  '托为地.png',
  '拉坯.png',
  '揉泥.png',
  '插图2.png',
  '插图3.png',
  '插图4.png',
  '数据可视化.png',
  '滑动撕开内容.png',
  '滑动撕开首页.png',
  '烧制.png',
  '盖.png',
  '盖为天.png',
  '盖碗分解图（盖、碗、托）.png',
  '盖碗茶插图.png',
  '碗.png',
  '碗为人.png',
  '竹纹.png',
  '素烧.png',
  '背景图1.png',
  '芙蓉纹.png',
  '转盘.png',
  '选土.png',
];

const videoNames = ['《老成都的松弛感》.mp4', '茶馆表演.mp4', '鹤鸣茶社茶师傅龙行十八式完整表演.mp4'];

const craftImageMap: Record<string, string> = {
  选土: '选土.png',
  揉泥: '揉泥.png',
  拉坯: '拉坯.png',
  修坯: '修坯.png',
  素烧: '素烧.png',
  上釉: '上釉.png',
  烧制: '烧制.png',
  '彩绘/描金': '彩绘或描金.png',
};

const secretGifMap: Record<string, string> = {
  A: '请续水.gif',
  B: '盖碗.gif',
  C: '要赊账.gif',
  D: '可以收走.gif',
  E: '需要帮助.gif',
};

const directoryPages = pages.slice(1);

const getAssetSrc = (...names: string[]) => {
  for (const name of names) {
    const src = assetByName[name]?.src;
    if (src) {
      return src;
    }
  }

  return undefined;
};

function PageShell({
  eyebrow,
  title,
  pageState,
  children,
}: {
  eyebrow: string;
  title: string;
  pageState: number;
  children: ReactNode;
}) {
  return (
    <section className="min-w-full snap-start">
      <div className="h-screen overflow-y-auto px-4 pb-8 pt-24">
        <motion.div
          initial={false}
          animate={{
            opacity: pageState === 0 ? 1 : 0.72,
            x: pageState === 0 ? 0 : pageState < 0 ? -42 : 42,
            rotateY: pageState === 0 ? 0 : pageState < 0 ? 16 : -16,
            scale: pageState === 0 ? 1 : 0.94,
          }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="mx-auto max-w-md"
        >
          <div className="mb-4">
            <p className="text-left text-xs tracking-[0.35em] text-[#9c7a5d]">{eyebrow}</p>
            <h1 className="mt-2 text-left text-[30px] font-bold leading-tight text-[#5b4634]">{title}</h1>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function RevealBlock({
  children,
  direction = 'left',
  delay = 0,
}: {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -34 : 34, y: 18 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function TextSection({
  title,
  paragraphs,
  direction = 'left',
}: {
  title: string;
  paragraphs: string[];
  direction?: 'left' | 'right';
}) {
  return (
    <RevealBlock direction={direction}>
      <div className={cardClass}>
        <p className={labelClass}>Section</p>
        <h2 className="text-left text-xl font-bold text-[#5b4634]">{title}</h2>
        <div className="mt-3 space-y-3">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={paragraphClass}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </RevealBlock>
  );
}

function MediaImage({
  name,
  alt,
  className,
}: {
  name: string;
  alt: string;
  className: string;
}) {
  const src = getAssetSrc(name);
  if (!src) return null;
  const imageClassName = className.replace(/\bobject-cover\b/g, 'object-contain');
  return <img src={src} alt={alt} className={`${imageClassName} bg-[#f8efe6]`} loading="lazy" />;
}

function ImageTile({
  name,
  alt,
  title,
}: {
  name: string;
  alt: string;
  title: string;
}) {
  const src = getAssetSrc(name);
  if (!src) return null;

  return (
    <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
      <img src={src} alt={alt} className="h-32 w-full bg-[#f8efe6] object-contain" loading="lazy" />
      <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">{title}</figcaption>
    </figure>
  );
}

function VideoCard({ name, title, direction = 'right' }: { name: string; title: string; direction?: 'left' | 'right' }) {
  const src = getAssetSrc(name);
  if (!src) return null;

  return (
    <RevealBlock direction={direction}>
      <div className={cardClass}>
        <p className={labelClass}>Video</p>
        <h2 className="text-left text-xl font-bold text-[#5b4634]">{title}</h2>
        <div className="mt-4 overflow-hidden rounded-[22px] bg-black">
          <video className="h-56 w-full object-contain" controls preload="metadata" playsInline>
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>
    </RevealBlock>
  );
}

function DirectoryWheel({
  selectedIndex,
  onSpin,
  onSelect,
  onGo,
}: {
  selectedIndex: number;
  onSpin: () => void;
  onSelect: (index: number) => void;
  onGo: (index: number) => void;
}) {
  const rotation = -selectedIndex * 60;
  const selectedPage = directoryPages[selectedIndex];
  const selectedPageIndex = pages.indexOf(selectedPage);
  const segmentColors = ['#e99a82', '#f0b178', '#8fbd72', '#79c9bf', '#7fb7c9', '#d994a2'];

  return (
    <RevealBlock direction="right">
      <div className="overflow-hidden rounded-[28px] border border-[#ead8c4] bg-[#f8eee5] shadow-[0_14px_36px_rgba(110,80,48,0.10)]">
        <div className="px-5 pt-5">
          <p className={labelClass}>目录转盘</p>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={onSpin}
              className="rounded-full bg-[#7d6049] px-7 py-3 text-sm font-bold tracking-[0.24em] text-white shadow-[0_10px_22px_rgba(86,61,41,0.26)] transition hover:bg-[#684d38] active:scale-95"
            >
              旋转目录
            </button>
          </div>
        </div>

        <div className="relative mt-4 h-[320px] overflow-hidden bg-[#f6ece3]">
          <div className="absolute left-1/2 top-[135px] z-20 h-0 w-0 -translate-x-1/2 border-x-[12px] border-b-[92px] border-x-transparent border-b-[#756053] drop-shadow" />
          <div className="absolute left-1/2 top-[245px] z-20 h-10 w-10 -translate-x-1/2 rounded-full border-[6px] border-[#6f5949] bg-[#efe0d2]" />

          <motion.div
            className="absolute left-1/2 top-[174px] h-[560px] w-[560px] -translate-x-1/2 rounded-full border-[18px] border-[#efe0d2] bg-[#ead1bd] shadow-[inset_0_0_0_20px_rgba(255,255,255,0.36)]"
            animate={{ rotate: rotation }}
            transition={{ duration: 0.72, ease: 'easeInOut' }}
          >
            <div className="absolute inset-[104px] rounded-full bg-[#f6ece3]" />
            {directoryPages.map((page, index) => {
              const angle = index * 60 - 90;
              const radians = (angle * Math.PI) / 180;
              const x = 280 + 246 * Math.cos(radians);
              const y = 280 + 246 * Math.sin(radians);
              const pageIndex = pages.indexOf(page);
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="absolute h-[86px] w-[146px] rounded-t-[46px] border border-white/70 text-center shadow-[0_8px_14px_rgba(94,64,38,0.12)] transition"
                  style={{ backgroundColor: segmentColors[index], left: x, top: y, transform: `translate(-50%, -50%) rotate(${angle + 90}deg)` }}
                >
                  <span className="absolute left-3 top-3 text-[10px] font-bold tracking-[0.22em] text-white/80">0{pageIndex + 1}</span>
                  <span className={`absolute left-1/2 top-5 -translate-x-1/2 text-2xl font-bold tracking-[0.22em] text-white ${isSelected ? 'drop-shadow' : ''}`}>
                    {page}
                  </span>
                  <span className="absolute bottom-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/55" />
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={() => onGo(selectedPageIndex)}
            className="w-full rounded-2xl bg-white/70 p-4 text-left transition hover:bg-white"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-[#ead4bb] px-3 py-1 text-xs tracking-[0.3em] text-[#7b6148]">0{selectedPageIndex + 1}</span>
              <span className="text-xs text-[#a17d5d]">点击进入</span>
            </div>
            <h2 className="text-left text-2xl font-bold text-[#5b4634]">{selectedPage}</h2>
            <p className={`${paragraphClass} mt-3`}>{pageSummaries[selectedPage]}</p>
          </button>
        </div>
      </div>
    </RevealBlock>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [directoryIndex, setDirectoryIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nextIndex = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(Math.max(0, Math.min(pages.length - 1, nextIndex)));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('video').forEach((video) => {
      video.pause();
    });
  }, [activeIndex]);

  const scrollToPage = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('video').forEach((video) => {
      video.pause();
    });

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[#f5ecdf] text-[#4a3f35]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(191,149,101,0.18),transparent_28%),linear-gradient(180deg,#fbf7ef_0%,#f0dfca_100%)]" />

      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/50 bg-[rgba(251,246,238,0.9)] backdrop-blur">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-3 py-3">
          {pages.map((page, index) => (
            <button
              key={page}
              type="button"
              onClick={() => scrollToPage(index)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                activeIndex === index ? 'bg-[#8c6b4a] text-white' : 'bg-white/70 text-[#6f5742]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </header>

      <main
        ref={containerRef}
        className="hide-scrollbar relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden [perspective:1800px]"
      >
        <PageShell eyebrow="首页" title="三才碗的前身今生" pageState={0 - activeIndex}>
          <div className="space-y-4">
            <RevealBlock direction="left">
              <div className={cardClass}>
                <p className={labelClass}>Opening</p>
                <MediaImage name="封面.png" alt="三才碗首页主视觉" className="h-[34vh] w-full rounded-[22px] object-cover" />
                <div className="mt-5 space-y-3">
                  {homeParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </RevealBlock>

            <RevealBlock direction="right" delay={0.06}>
              <div className={cardClass}>
                <p className={labelClass}>Gallery</p>
                <h2 className="text-left text-xl font-bold text-[#5b4634]">器象掠影</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <ImageTile name="滑动撕开首页.png" alt="首页图像一" title="茶馆门前的第一眼印象" />
                  <ImageTile name="插图2.png" alt="首页图像二" title="器物与场景的并置关系" />
                  <ImageTile name="插图3.png" alt="首页图像三" title="三才碗进入视觉叙事" />
                  <ImageTile name="插图4.png" alt="首页图像四" title="地方日常的温润气息" />
                </div>
              </div>
            </RevealBlock>
          </div>
        </PageShell>

        <PageShell eyebrow="目录" title="篇章目录" pageState={1 - activeIndex}>
          <div className="space-y-4">
            <DirectoryWheel
              selectedIndex={directoryIndex}
              onSpin={() => setDirectoryIndex((index) => (index + 1) % directoryPages.length)}
              onSelect={setDirectoryIndex}
              onGo={scrollToPage}
            />

            <TextSection title="卷首小引" paragraphs={directoryLead} direction="left" />
          </div>
        </PageShell>

        <PageShell eyebrow="史" title="千年流变" pageState={2 - activeIndex}>
          <div className="space-y-4">
            <TextSection title="源流提要" paragraphs={historyIntro} direction="left" />

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Archive</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">时代图像</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ImageTile name="2.jpg" alt="历史图册一" title="器型走向成熟的视觉线索" />
                <ImageTile name="滑动撕开内容.png" alt="历史图册二" title="历史叙事在图像中的展开" />
                <ImageTile name="咖啡.jpg" alt="历史图册三" title="结构演变留下的器物痕迹" />
                <ImageTile name="咖啡2.jpg" alt="历史图册四" title="传统进入当代视野" />
              </div>
              </div>
            </RevealBlock>

            {historyTimeline.map((item, index) => (
              <div key={item.era}>
                <RevealBlock direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className={cardClass}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-[#b48767] px-4 py-1 text-xs tracking-[0.25em] text-white">
                        {item.era}
                      </span>
                      <span className="text-xs tracking-[0.25em] text-[#a17d5d]">TIME 0{index + 1}</span>
                    </div>
                    <h2 className="text-left text-xl font-bold text-[#5b4634]">{item.title}</h2>
                    <MediaImage name={item.image} alt={`${item.era}${item.title}`} className="mt-4 h-52 w-full rounded-[22px] object-cover" />
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </RevealBlock>
              </div>
            ))}
          </div>
        </PageShell>

        <PageShell eyebrow="物" title="器物结构与工艺" pageState={3 - activeIndex}>
          <div className="space-y-4">
            <RevealBlock direction="left">
              <div className={cardClass}>
              <p className={labelClass}>Form</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">三才结构</h2>
              <div className="mt-3 space-y-3">
                {structureParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <MediaImage
                name="盖碗分解图（盖、碗、托）.png"
                alt="盖碗分解图"
                className="mt-4 h-52 w-full rounded-[22px] object-cover"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="盖为天.png" alt="盖为天" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">盖为天</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="碗为人.png" alt="碗为人" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">碗为人</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="托为地.png" alt="托为地" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">托为地</figcaption>
                </figure>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="三才碗托分解图—盖.png" alt="三才碗托分解图盖" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">盖部细节</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="三才碗托分解图—碗.png" alt="三才碗托分解图碗" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">碗身细节</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="三才碗托分解图—托.png" alt="三才碗托分解图托" className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-2 text-center text-xs tracking-[0.2em] text-[#7b6148]">托座细节</figcaption>
                </figure>
              </div>
              </div>
            </RevealBlock>

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Craft</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">制作工艺</h2>
              <div className="mt-3 space-y-3">
                {craftLead.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {craftSteps.map((step) => (
                  <div key={step.id} className="rounded-2xl bg-[#f5ebdf] p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#bda588] text-sm font-bold text-white">
                        {step.id}
                      </span>
                      <h3 className="text-left text-base font-bold text-[#5b4634]">{step.title}</h3>
                    </div>
                    <MediaImage
                      name={craftImageMap[step.title] ?? '转盘.png'}
                      alt={step.title}
                      className="mb-3 h-28 w-full rounded-[16px] object-cover"
                    />
                    <p className="text-left text-sm leading-7 text-[#5e4d3f]">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <ImageTile name="盖.png" alt="盖图示" title="盖" />
                <ImageTile name="碗.png" alt="碗图示" title="碗" />
                <ImageTile name="托.png" alt="托图示" title="托" />
              </div>
              <figure className="mt-3 overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                <MediaImage name="转盘.png" alt="转盘工艺" className="h-36 w-full object-cover" />
                <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">转盘与拉坯动作所依赖的工艺基础</figcaption>
              </figure>
              </div>
            </RevealBlock>

            <RevealBlock direction="left">
              <div className={cardClass}>
              <p className={labelClass}>Pattern</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">经典纹样</h2>
              <div className="mt-3 space-y-3">
                {patternLead.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-4 space-y-4">
                {patterns.map((pattern) => (
                  <div key={pattern.id} className="rounded-2xl bg-[#f5ebdf] p-4">
                    <h3 className="text-left text-base font-bold text-[#5b4634]">
                      {pattern.id}. {pattern.title}
                    </h3>
                    <p className={`${paragraphClass} mt-2 text-sm`}>{pattern.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ImageTile name="竹纹.png" alt="竹纹" title="竹纹" />
                <ImageTile name="芙蓉纹.png" alt="芙蓉纹" title="芙蓉纹" />
                <ImageTile name="熊猫纹.jpg" alt="熊猫纹" title="传播中的城市记忆" />
                <ImageTile name="青花缠枝纹.jpg" alt="青花缠枝纹" title="器表构图的延展样貌" />
              </div>
              </div>
            </RevealBlock>
          </div>
        </PageShell>

        <PageShell eyebrow="用" title="茶技、暗语与生活" pageState={4 - activeIndex}>
          <div className="space-y-4">
            <TextSection title="进入日常" paragraphs={useIntro} direction="left" />

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Use</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">盖碗茶技</h2>
              <p className={`${paragraphClass} mt-3`}>
                真正会用三才碗，才算走近成都茶馆生活。冲泡时要会开合碗盖、借缝滤茶、以托承碗，既防烫又能聚香。茶师在表演和日常服务中，也常把这种器物特性发挥到极致。揭盖闻香、轻拨茶汤、借缝啜饮，这些动作连在一起，会形成一种既优雅又非常生活化的节奏，让喝茶本身也成为可被感受的过程。
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="倒水.gif" alt="倒水" className="h-36 w-full object-cover" />
                  <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">注水动作</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="鹤鸣茶社茶壶.gif" alt="茶壶" className="h-36 w-full object-cover" />
                  <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">茶壶与桌面节奏</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="鹤鸣茶社喝茶.gif" alt="喝茶" className="h-36 w-full object-cover" />
                  <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">啜饮时刻</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                  <MediaImage name="盖碗.jpg" alt="盖碗动作" className="h-36 w-full object-cover" />
                  <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">碗盖开合</figcaption>
                </figure>
              </div>
              </div>
            </RevealBlock>

            <VideoCard name="鹤鸣茶社茶师傅龙行十八式完整表演.mp4" title="茶技影像：龙行十八式" direction="left" />

            <RevealBlock direction="left">
              <div className={cardClass}>
              <p className={labelClass}>Code</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">茶馆暗语</h2>
              <div className="mt-3 space-y-3">
                {secretLead.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {secrets.map((secret) => (
                  <div key={secret.id} className="rounded-2xl bg-[#f5ebdf] p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="rounded-full bg-[#ead4bb] px-3 py-1 text-xs tracking-[0.25em] text-[#7b6148]">
                        {secret.id}
                      </span>
                      <h3 className="text-left text-base font-bold text-[#5b4634]">{secret.title}</h3>
                    </div>
                    <p className="text-left text-sm leading-7 text-[#5e4d3f]">{secret.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-4">
                {secrets.map((secret) => (
                  <div key={`${secret.id}-gif`} className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                    <MediaImage name={secretGifMap[secret.id] ?? '盖碗.gif'} alt={secret.title} className="h-40 w-full object-cover" />
                    <div className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">{secret.title}</div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                    <MediaImage name="3月11日.gif" alt="茶馆场景延展一" className="h-36 w-full object-cover" />
                    <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">桌边片刻</figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                    <MediaImage name="不满意.gif" alt="茶馆场景延展二" className="h-36 w-full object-cover" />
                    <figcaption className="px-3 py-2 text-left text-xs tracking-[0.18em] text-[#7b6148]">神情与交流</figcaption>
                  </figure>
                </div>
              </div>
              </div>
            </RevealBlock>

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Life</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">成都人的日常</h2>
              <div className="mt-3 space-y-3">
                {lifeParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              </div>
            </RevealBlock>

            <VideoCard name="茶馆表演.mp4" title="茶馆影像：节目与人声" direction="right" />
          </div>
        </PageShell>

        <PageShell eyebrow="新" title="当代传承与创新" pageState={5 - activeIndex}>
          <div className="space-y-4">
            <TextSection title="新的进入方式" paragraphs={innovationIntro} direction="left" />

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Renewal</p>
              <MediaImage name="盖碗咖啡.jpg" alt="盖碗创新产品" className="h-52 w-full rounded-[22px] object-cover" />
              <p className={`${paragraphClass} mt-5`}>
                当代设计让三才碗走出传统茶馆，进入咖啡、奶茶、甜品、文创和旅游纪念等场景。它被重新包装、重新命名，也被赋予新的视觉语言和传播方式。这些创新并没有抹去三才碗的传统气质，反而让它以更轻盈、更贴近日常消费的方式进入年轻人的视野，形成传统文化与新生活方式之间的连接点。当人们开始在社交平台上分享“盖碗咖啡”“盖碗奶茶”时，三才碗其实已经完成了一次身份转换。它从“被认识的传统器物”变成了“可以参与当代生活的文化符号”。
              </p>
              </div>
            </RevealBlock>

            <RevealBlock direction="left">
              <div className={cardClass}>
              <p className={labelClass}>Scene</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">跨界场景</h2>
              <ImageTile name="盖碗奶茶.jpg" alt="盖碗奶茶" title="盖碗奶茶" />
              <p className={`${paragraphClass} mt-4`}>
                从盖碗咖啡到盖碗奶茶，从文创礼盒到外国游客体验，三才碗已经不只是一种器物，更成为可被传播、可被体验、可被分享的城市文化符号。它在这些新的场景里不一定保持传统饮茶逻辑，却保留了足够鲜明的地方辨识度，因此总能迅速被识别、被讨论，并在社交传播中获得新的生命。
              </p>
              <ImageTile name="甜品.jpg" alt="盖碗甜品" title="盖碗甜品" />
              <p className={`${paragraphClass} mt-4`}>
                与甜品、奶茶等轻消费内容结合之后，三才碗被更多年轻人视作一种有趣而可亲近的文化外壳。这种转译并不是把传统简单娱乐化，而是让人们先通过熟悉的消费场景接近它，再慢慢意识到其背后的文化意味。
              </p>
              <ImageTile name="外国友人.jpg" alt="外国友人体验" title="异地受众的初次体验" />
              <figure className="mt-4 overflow-hidden rounded-[18px] bg-[#f5ebdf]">
                <MediaImage name="数据可视化.png" alt="市场可视化" className="h-40 w-full object-cover" />
                <figcaption className="px-3 py-2 text-left text-xs leading-6 text-[#7b6148]">
                  2023-2024年盖碗茶市场份额占比
                  <br />
                  来源：《2025年中国盖碗茶市场占有率及行业竞争格局分析报告》
                </figcaption>
              </figure>
              </div>
            </RevealBlock>

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Afterlife</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">为什么它还能继续流行</h2>
              <div className="mt-4 space-y-3">
                {innovationNotes.map((item) => (
                  <div key={item.slice(0, 20)} className="rounded-2xl bg-[#f5ebdf] p-4">
                    <p className={paragraphClass}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {innovationClosing.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              </div>
            </RevealBlock>

            <VideoCard name="《老成都的松弛感》.mp4" title="城市影像：老成都的松弛感" direction="left" />
          </div>
        </PageShell>

        <PageShell eyebrow="结尾页" title="一碗之间，见天地与人间" pageState={6 - activeIndex}>
          <div className="space-y-4">
            <RevealBlock direction="left">
              <div className={cardClass}>
              <p className={labelClass}>Closing</p>
              <MediaImage name="1.JPG" alt="三才碗结尾视觉" className="h-[32vh] w-full rounded-[22px] object-cover" />
              <div className="mt-5 space-y-3">
                {endingParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={paragraphClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              </div>
            </RevealBlock>

            <RevealBlock direction="right">
              <div className={cardClass}>
              <p className={labelClass}>Reflection</p>
              <h2 className="text-left text-xl font-bold text-[#5b4634]">它留下了什么</h2>
              <div className="mt-4 space-y-3">
                {endingThoughts.map((item) => (
                  <div key={item.slice(0, 20)} className="rounded-2xl bg-[#f5ebdf] p-4">
                    <p className={paragraphClass}>{item}</p>
                  </div>
                ))}
              </div>
              </div>
            </RevealBlock>
          </div>
        </PageShell>
      </main>
    </div>
  );
}
