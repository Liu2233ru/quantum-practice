export const groups = [
  {
    title: "第 I 部分 · 理论",
    chapters: [
      ["g01", "第 1 章", "波函数", "概率解释、归一化与不确定性", 2],
      ["g02", "第 2 章", "定态薛定谔方程", "势阱、定态叠加与谐振子", 20],
      ["g03", "第 3 章", "形式理论", "希尔伯特空间、算符与测量", 79],
      ["g04", "第 4 章", "三维空间中的量子力学", "中心势、氢原子、角动量与自旋", 114],
      ["g05", "第 5 章", "全同粒子", "交换对称性与多粒子态", 174],
      ["g06", "第 6 章", "对称性和守恒律", "平移、宇称、旋转与选择定则", 204],
    ],
  },
  {
    title: "第 II 部分 · 应用",
    chapters: [
      ["g07", "第 7 章", "定态微扰理论", "能量修正、简并子空间和微扰矩阵", 242],
      ["g08", "第 8 章", "变分原理", "试探波函数与基态能量上界", 283],
      ["g09", "第 9 章", "WKB 近似", "半经典量子化、禁阻区与隧穿", 307],
      ["g10", "第 10 章", "散射", "振幅、截面、分波与玻恩近似", 327],
      ["g11", "第 11 章", "量子动力学", "含时微扰、跃迁与绝热演化", 349],
      ["g12", "第 12 章", "跋", "EPR、贝尔定理、密度矩阵与不可克隆", 388],
    ],
  },
  {
    title: "补充专题",
    chapters: [
      ["e01", "专题 1", "算符与表象进阶", "自伴性、算符定义域与连续表象"],
      ["e02", "专题 2", "量子测量与信道", "密度算符、广义测量与退相干"],
      ["e03", "专题 3", "传播子与路径积分", "传播核、作用量与半经典相位"],
      ["e04", "专题 4", "光与原子的相互作用", "旋波近似、缀饰态和暗态"],
    ],
  },
];

export const chapters = groups.flatMap(group => group.chapters.map(
  ([id, label, title, description, page]) => ({id, label, title, description, page, group: group.title}),
));
export const chapterById = Object.fromEntries(chapters.map(chapter => [chapter.id, chapter]));
export const levelNames = ["基础", "进阶", "挑战"];
export const typeNames = {single: "单选", multiple: "多选", written: "推导自评"};
