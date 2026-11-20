const tex = String.raw;
const shankar = 'Shankar《量子力学原理》第 2 版';
const cohen1 = 'Cohen-Tannoudji 等《量子力学》第一卷';
const cohen2 = 'Cohen-Tannoudji 等《量子力学》第二卷';

export const bookExtra = [
  {
    id: 'e01-b01',
    chapter: 'e01',
    topic: 'δ 分布的变量替换',
    difficulty: '进阶',
    type: 'written',
    source: {label: shankar, ref: '习题 1.10.2', page: 64},
    prompt: tex`设实函数 $f(x)$ 的零点有限，每个零点 $x_i$ 都是单根。通过比较分布 $\delta(f(x))$ 和测试函数的积分，推导它在各零点的取样公式。可假定 $f$ 连续可微。`,
    hint: tex`每个单根附近都可使用 $u=f(x)$。留意 $f'(x_i)<0$ 时，上下限和雅可比的符号。`,
    explanation: tex`设 $g(x)$ 为光滑的紧支撑测试函数。$\delta(f(x))$ 的支撑只在 $f(x)=0$ 的各点，因此可以把积分化为一组互不重叠的零点小邻域的积分。在第 $i$ 个邻域内，$u=f(x)$ 可逆，记反函数为 $x_i(u)$。变换后的正测度是 $|dx_i/du|\,du$，所以这一邻域的贡献是
$$\int du\,\delta(u)\,g(x_i(u))\left|\frac{dx_i}{du}\right|
=\frac{g(x_i)}{|f'(x_i)|}.$$
对所有单根求和即可得到
$$\delta(f(x))=\sum_i\frac{\delta(x-x_i)}{|f'(x_i)|}.$$
当某零点附近的 $f$ 递减时，原变量对应的新变量积分上下限反向，故最终保留绝对值。`,
    parts: [
      {label: '（a）在单根附近完成变量替换', points: 5, criterion: '明确测试函数、局部反函数和带绝对值的雅可比。'},
      {label: '（b）合并取样结果', points: 5, criterion: '说明积分只来自各零点小邻域，并把积分恒等式写成分布公式。'},
    ],
  },
  {
    id: 'e01-b02',
    chapter: 'e01',
    topic: '简并子空间中的共用本征基',
    difficulty: '进阶',
    type: 'written',
    source: {label: cohen1, ref: '补充材料 HⅡ · 练习 11', page: 209},
    prompt: tex`取正交归一基 $|u_1\rangle,|u_2\rangle,|u_3\rangle$，两个算符的矩阵为 $H=\hbar\omega_0\operatorname{diag}(1,-1,-1)$ 和 $B=b\begin{pmatrix}1&0&0\\0&0&1\\0&1&0\end{pmatrix}$，其中 $\omega_0,b$ 为非零实数。判断两算符是否厄米、是否对易，构造共同本征基。再逐项判断 $\{H\},\{B\},\{H,B\},\{H^2,B\}$ 能否构成对易观察算符完全集。`,
    hint: tex`$H$ 在 $\operatorname{span}\{|u_2\rangle,|u_3\rangle\}$ 上是标量，$B$ 在这个二维子空间中是交换矩阵。`,
    explanation: tex`两矩阵均为实对称矩阵。$B$ 保持 $H$ 的两个本征子空间，且 $H$ 在每个子空间中都是单位矩阵的倍数，所以 $[H,B]=0$。取基
$$|v_1\rangle=|u_1\rangle,\qquad
|v_\pm\rangle=\frac{|u_2\rangle\pm|u_3\rangle}{\sqrt2}.$$
对应的 $(H,B)$ 本征值对依次为 $(\hbar\omega_0,b)$、$(-\hbar\omega_0,b)$、$(-\hbar\omega_0,-b)$。三个联合标签彼此不同，所以 $\{H,B\}$ 完全确定基向量到一个相位。$H$ 的 $-\hbar\omega_0$ 和 $B$ 的 $b$ 均二重简并，$\{H\},\{B\}$ 各自不完备。又因 $H^2=(\hbar\omega_0)^2I$，$\{H^2,B\}$ 保留 $B$ 的二重简并。`,
    parts: [
      {label: '（a）验证厄米性与对易性', points: 5, criterion: '检查实对称性并说明 B 保持 H 的两个本征子空间，或直接算出对易子。'},
      {label: '（b）求共同本征基', points: 8, criterion: '三个态归一且正交，正确列出每个态的两个本征值。'},
      {label: '（c）判断完全集', points: 7, criterion: '四组均作出判断，并指出平方操作使 H 丢掉区分能力。'},
    ],
  },
  {
    id: 'e01-b03',
    chapter: 'e01',
    topic: '对易条件如何限制矩阵元',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen1, ref: '补充材料 HⅡ · 练习 12', page: 209},
    prompt: tex`在正交归一基 $|u_1\rangle,|u_2\rangle,|u_3\rangle$ 中，$L_z$ 的本征值依次为 $1,0,-1$。算符 $S$ 交换 $|u_1\rangle$ 与 $|u_3\rangle$，并固定 $|u_2\rangle$。写出 $L_z,L_z^2,S,S^2$ 的矩阵，判断它们能否表示可观测量。分别找出与 $L_z,L_z^2,S^2$ 对易的一般矩阵，再判定 $\{L_z^2,S\}$ 是否完备，写出共同本征基。`,
    hint: tex`对角矩阵 $D$ 满足 $[D,M]_{ij}=(d_i-d_j)M_{ij}$。只有对应同一本征值的指标之间可以出现非对角项。`,
    explanation: tex`$L_z=\operatorname{diag}(1,0,-1)$，$L_z^2=\operatorname{diag}(1,0,1)$，$S=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$，$S^2=I$。四者均厄米。由对易子的矩阵元条件，与 $L_z$ 对易的只有任意对角矩阵，与 $S^2$ 对易的包括所有 $3\times3$ 矩阵。与 $L_z^2$ 对易的矩阵为
$$\begin{pmatrix}m_{11}&0&m_{13}\\0&m_{22}&0\\m_{31}&0&m_{33}\end{pmatrix}.$$
在 $L_z^2=1$ 的二维子空间内，对 $S$ 对角化得到 $|v_\pm\rangle=(|u_1\rangle\pm|u_3\rangle)/\sqrt2$，另一个共同本征态为 $|u_2\rangle$。对应的 $(L_z^2,S)$ 标签分别为 $(1,1),(1,-1),(0,1)$，故形成完全集。`,
    parts: [
      {label: '（a）构造算符及其平方', points: 6, criterion: '四个矩阵及其观察算符判断正确。'},
      {label: '（b）分类对易矩阵', points: 8, criterion: '写出三个一般形式，并用简并本征值解释允许矩阵元。'},
      {label: '（c）找共同本征标签', points: 6, criterion: '三个态和三组标签正确，且论证联合标签唯一。'},
    ],
  },
  {
    id: 'e02-b01',
    chapter: 'e02',
    topic: '飞行时间分散造成的自旋退相干',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen1, ref: '补充材料 JⅣ · 练习 4', page: 479},
    prompt: tex`自旋 $1/2$ 经偏振器准备为 $|\psi_0\rangle=\cos(\theta/2)|+\rangle+\sin(\theta/2)|-\rangle$，其中 $S_z|\pm\rangle=\pm\hbar|\pm\rangle/2$，$0\le\theta\le\pi$。随后飞过宽度 $L$ 的磁场区，区内 $H=\omega_0 S_x$，飞行时间 $T=L/v$。求固定 $T$ 的出射态、$S_z$ 测量概率、密度矩阵、三个自旋均值和纯度。若速度分散使 $\omega_0T$ 模 $2\pi$ 在 $[0,2\pi)$ 均匀分布，重新求密度矩阵、三个均值和纯度，判断何时完全偏振或完全非偏振，并定性描述从无场到强场时 $S_z$ 计数的变化。`,
    hint: tex`用 $e^{-i\phi\sigma_x/2}$ 作用在入射态上，其中 $\phi=\omega_0T$。速度随机时，对 $|\psi_T\rangle\langle\psi_T|$ 求平均。`,
    explanation: tex`令 $c=\cos(\theta/2),s=\sin(\theta/2),C=\cos(\phi/2),S=\sin(\phi/2)$，则出射自旋态为 $(cC-isS)|+\rangle+(sC-icS)|-\rangle$。由外积得
$$\rho_T=\tfrac12\begin{pmatrix}
1+\cos\theta\cos\phi & \sin\theta+i\cos\theta\sin\phi\\
\sin\theta-i\cos\theta\sin\phi & 1-\cos\theta\cos\phi
\end{pmatrix}.$$
两个对角元给出 $p_\pm=(1\pm\cos\theta\cos\phi)/2$。三个均值按 $x,y,z$ 排列为
$$\langle\mathbf S\rangle_T=\tfrac{\hbar}{2}(\sin\theta,-\cos\theta\sin\phi,\cos\theta\cos\phi).$$
这是初始自旋绕 $x$ 轴进动角度 $\phi$ 的结果。矩阵由单一归一态构成，所以 $\operatorname{Tr}\rho_T^2=1$。

均匀平均保留 $x$ 分量，得到 $\bar\rho=(I+\sin\theta\,\sigma_x)/2$，$\langle\mathbf S\rangle=\tfrac{\hbar}{2}(\sin\theta,0,0)$，纯度为 $(1+\sin^2\theta)/2$。当 $\theta=\pi/2$ 时完全偏振，当 $\theta=0$ 或 $\pi$ 时完全非偏振。一般场强下，$p_\pm=[1\pm\cos\theta\,\mathbb E(\cos\omega_0T)]/2$。无场时恢复原始计数，强场满足均匀相位条件时两结果各占一半。对于窄而连续的飞行时间分布，场强增加时可出现逐渐失去对比度的振荡。`,
    parts: [
      {label: '（a）出射态与固定飞行时间的计数概率', points: 7, criterion: '对入射态施以正确的 x 轴旋转，给出两个 z 分量结果的概率。'},
      {label: '（b）固定飞行时间的密度矩阵', points: 8, criterion: '矩阵、三均值和纯度正确，特别注意 y 分量符号。'},
      {label: '（c）飞行时间平均后判定偏振', points: 9, criterion: '平均的是密度算符，且正确给出三均值、纯度和两个极限。'},
      {label: '（d）弱场与强场的计数变化', points: 6, criterion: '用相位分布连接无场概率和强场等概率，说明对比度来自相位平均。'},
    ],
  },
  {
    id: 'e02-b02',
    chapter: 'e02',
    topic: '两自旋的条件测量与约化自旋',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen1, ref: '补充材料 JⅣ · 练习 6', page: 481},
    prompt: tex`两个自旋 $1/2$ 的初态为 $|\psi_0\rangle=\tfrac12|++\rangle+\tfrac12|+-\rangle+\tfrac{1}{\sqrt2}|--\rangle$，符号 $\pm$ 是各自 $S_z$ 的本征态。先测 $S_{1z}$，对两种结果分别求发生概率、条件联合态及马上测 $S_{1x}$ 的结果概率。另对同一初态求同时测 $S_{1z},S_{2z}$ 得相反或相同符号的概率。若完全不测量，而让 $H=\omega_1 S_{1z}+\omega_2 S_{2z}$ 作用时间 $t$，求联合态和两个自旋的三分量均值，比较它们的长度与 $\hbar/2$，并解释对任意纯初态何时可同时达到 $\hbar/2$。`,
    hint: tex`条件态通过投影后归一化。无测量的演化只给四个分量乘相位，求局域均值时分别对另一自旋取迹。`,
    explanation: tex`测量 $S_{1z}$ 的两个结果各有概率 $1/2$。正分支的联合态为 $|+\rangle(|+\rangle+|-\rangle)/\sqrt2$，负分支为 $|--\rangle$。两分支的自旋 1 都处于确定的 $z$ 本征态，所以随后测 $S_{1x}$ 的正负结果各占一半。同时测两自旋的 $z$ 分量时，同号概率为 $1/4+1/2=3/4$，异号概率为 $1/4$。

无测量时令 $\phi_j=\omega_jt$，则
$$|\psi(t)\rangle=
\frac{e^{-i(\phi_1+\phi_2)/2}}2|++\rangle+
\frac{e^{-i(\phi_1-\phi_2)/2}}2|+-\rangle+
\frac{e^{i(\phi_1+\phi_2)/2}}{\sqrt2}|--\rangle.$$
自旋 1 的约化态对角元均为 $1/2$，非对角元 $(+,-)$ 为 $e^{-i\phi_1}/(2\sqrt2)$。自旋 2 的对角元为 $1/4,3/4$，非对角元为 $e^{-i\phi_2}/4$。因此
$$\langle\mathbf S_1\rangle=\frac{\hbar}{2}(\cos\phi_1/\sqrt2,\sin\phi_1/\sqrt2,0),\qquad
\langle\mathbf S_2\rangle=\frac{\hbar}{4}(\cos\phi_2,\sin\phi_2,-1).$$
两向量分别绕各自 $z$ 轴进动，长度均为 $\hbar/(2\sqrt2)$。达到 $\hbar/2$ 等价于对应约化态为纯态，对联合纯态又等价于只有一个非零施密特系数，因而初态必须是乘积态。`,
    parts: [
      {label: '（a）依次测量同一自旋', points: 10, criterion: '两种 z 结果的概率、归一条件态及 x 结果分布全部正确。'},
      {label: '（b）同时测量两自旋', points: 6, criterion: '列出构成同号、异号的非零振幅并分别求概率。'},
      {label: '（c）无测量时的演化和局域均值', points: 16, criterion: '三个演化相位和两组三分量均值正确，解释各自绕 z 轴进动。'},
      {label: '（d）解释均值长度与可分性', points: 8, criterion: '给出两个实际长度，并论证纯联合态下最大长度对应乘积态。'},
    ],
  },
  {
    id: 'e02-b03',
    chapter: 'e02',
    topic: '联合测量和单边边缘分布',
    difficulty: '进阶',
    type: 'written',
    source: {label: cohen1, ref: '补充材料 JⅣ · 练习 7', page: 481},
    prompt: tex`两个自旋在有序 $z$ 基 $|++\rangle,|+-\rangle,|-+\rangle,|--\rangle$ 中的归一态系数依次为 $\alpha,\beta,\gamma,\delta$。先求 $S_{1y}$ 的矩阵、本征值和一组正交归一的本征基。再分别求联合测量 $(S_{1x},S_{2y})$ 和 $(S_{1y},S_{2y})$ 时四种结果的概率，说明初态为乘积态时结果如何因子化。对前两组联合分布分别求边缘概率，核对第二个自旋测得 $S_{2y}=-\hbar/2$ 的概率。`,
    hint: tex`用 $|x_s\rangle=(|+\rangle+s|-\rangle)/\sqrt2$、$|y_s\rangle=(|+\rangle+is|-\rangle)/\sqrt2$ 表示 $s=\pm1$ 的本征态。写出内积时取复共轭。`,
    explanation: tex`在指定次序下 $S_{1y}=\tfrac{\hbar}{2}\sigma_y\otimes I$，所以
$$S_{1y}=\frac{\hbar}{2}\begin{pmatrix}0&0&-i&0\\0&0&0&-i\\i&0&0&0\\0&i&0&0\end{pmatrix}.$$
本征值 $s\hbar/2$ 各二重简并，对应基可取 $|y_s\rangle\otimes|+\rangle$ 和 $|y_s\rangle\otimes|-\rangle$。用 $s,t=\pm1$ 记联合结果，两个测量的概率分别为
$$P_{xy}(s,t)=\frac14|\alpha-it\beta+s\gamma-ist\delta|^2,$$
$$P_{yy}(s,t)=\frac14|\alpha-it\beta-is\gamma-st\delta|^2.$$
若初态为 $|\psi_1\rangle\otimes|\psi_2\rangle$，联合投影内积是两个单粒子投影内积的乘积，概率也相乘。

当 $t=-1$ 时，两组振幅的括号可统一写为 $A+sB$ 或 $A-isB$，其中 $A=\alpha+i\beta$、$B=\gamma+i\delta$。分别对 $s$ 求和会消去交叉项，均给出 $\tfrac12(|\alpha+i\beta|^2+|\gamma+i\delta|^2)$。直接用 $I\otimes|y_-\rangle\langle y_-|$ 计算也得同一结果。`,
    parts: [
      {label: '（a）写出单边算符及其谱', points: 7, criterion: '矩阵、简并度、两本征值与四个本征态正确。'},
      {label: '（b）推导两组联合概率', points: 13, criterion: '正确处理两个测量基的共轭相位，并说明乘积态的因子化。'},
      {label: '（c）求第二个自旋的边缘分布', points: 10, criterion: '从两组联合分布分别对第一个结果求和，消去交叉项。'},
    ],
  },
  {
    id: 'e03-b01',
    chapter: 'e03',
    topic: '恒力传播子与端点作用量',
    difficulty: '进阶',
    type: 'written',
    source: {label: shankar, ref: '习题 8.6.1', page: 225},
    prompt: tex`质量为 $m$ 的粒子在势能 $V(x)=-Fx$ 中从 $x_i$ 演化至 $x_f$，历时 $T>0$。求连接两个端点的经典轨道、沿这条轨道的作用量和完整的传播子。用零端点涨落说明传播子前因子的来源，并核对所得传播子确实满足薛定谔方程及短时初始条件。`,
    hint: tex`把经典轨道拆成匀速直线和零端点抛物线。将一般路径写成 $x_{\rm cl}+\eta$，其中 $\eta(0)=\eta(T)=0$。`,
    explanation: tex`记 $d=x_f-x_i$。由 $m\ddot x=F$ 及端点条件，
$$x_{\rm cl}(t)=x_i+\frac{d}{T}t+\frac{F}{2m}t(t-T).$$
动能积分中匀速项与抛物线项的交叉积分为零，余下 $md^2/(2T)+F^2T^3/(24m)$。$\int_0^T Fx_{\rm cl}\,dt=FT(x_i+x_f)/2-F^2T^3/(12m)$。相加得到
$$S_{\rm cl}=\frac{md^2}{2T}+\frac{FT(x_i+x_f)}2-\frac{F^2T^3}{24m}.$$
代入 $x=x_{\rm cl}+\eta$ 时，对 $\eta$ 的一次项由分部积分、端点条件和运动方程消去，剩余涨落作用量 $\int_0^T m\dot\eta^2/2\,dt$ 与自由粒子的相同。因此
$$K_F(x_f,T;x_i,0)=\sqrt{\frac{m}{2\pi i\hbar T}}\,e^{iS_{\rm cl}/\hbar}.$$
作为检验，$S_{\rm cl}$ 满足 $-\partial_T S_{\rm cl}=(\partial_{x_f} S_{\rm cl})^2/(2m)-Fx_f$，且 $\partial_{x_f}^2S_{\rm cl}=m/T$。前因子的对数导数 $-1/(2T)$ 恰好补足薛定谔方程中相位的二阶导数项。$T\to0^+$ 时含 $F$ 的两项相位趋零，故自由核的 $\delta(x_f-x_i)$ 初始条件保留。`,
    parts: [
      {label: '（a）求满足两端约束的轨道', points: 6, criterion: '轨道的加速度为 F/m，且两端值正确。'},
      {label: '（b）积分经典作用量', points: 9, criterion: '分别算对动能和势能贡献，并得出完整的二点作用量。'},
      {label: '（c）求传播子前因子', points: 8, criterion: '说明线性涨落项为什么消失，并用自由涨落积分给出前因子。'},
      {label: '（d）检验传播方程和初值', points: 7, criterion: '核对作用量和前因子两部分的条件，以及短时的 δ 分布极限。'},
    ],
  },
  {
    id: 'e03-b02',
    chapter: 'e03',
    topic: '简谐振子传播子的空间依赖',
    difficulty: '进阶',
    type: 'written',
    source: {label: shankar, ref: '习题 8.6.2', page: 225},
    prompt: tex`简谐振子的拉格朗日量为 $L=m(\dot x^2-\omega^2x^2)/2$。在 $0<T<\pi/\omega$ 内，求从 $(x_i,0)$ 到 $(x_f,T)$ 的经典轨道和作用量。从路径积分证明传播子可写成只依赖于 $T$ 的因子乘以由此作用量产生的相位，并写出相位的显式形式。无需求出这一时间因子。`,
    hint: tex`用 $\sin(\omega t)$ 和 $\sin[\omega(T-t)]$ 插值。沿经典轨道有 $d(x\dot x)/dt=\dot x^2-\omega^2x^2$。`,
    explanation: tex`满足 $x(0)=x_i,x(T)=x_f$ 的轨道为
$$x_{\rm cl}(t)=\frac{x_i\sin[\omega(T-t)]+x_f\sin(\omega t)}{\sin(\omega T)}.$$
沿这条轨道 $L=\tfrac{m}{2}\tfrac{d}{dt}(x_{\rm cl}\dot x_{\rm cl})$，作用量由两端决定。代入
$\dot x_{\rm cl}(0)=\omega(x_f-x_i\cos\omega T)/\sin\omega T$ 和
$\dot x_{\rm cl}(T)=\omega(x_f\cos\omega T-x_i)/\sin\omega T$，得
$$S_{\rm cl}=\frac{m\omega}{2\sin(\omega T)}
\big[(x_f^2+x_i^2)\cos(\omega T)-2x_fx_i\big].$$
将一般路径写成 $x_{\rm cl}+\eta$。一次涨落项是运动方程乘以 $\eta$ 的积分加上为零的边界项。二次项 $\int_0^T m(\dot\eta^2-\omega^2\eta^2)/2\,dt$ 与 $x_i,x_f$ 无关，故 $K=A(T)\exp(iS_{\rm cl}/\hbar)$，所求相位直接由上式给出。`,
    parts: [
      {label: '（a）解带边值条件的运动方程', points: 5, criterion: '正弦插值的相位、分母及端点正确。'},
      {label: '（b）用边界项求作用量', points: 9, criterion: '写出两个端点速度，并保留交叉项的正确系数和符号。'},
      {label: '（c）分解路径的涨落', points: 6, criterion: '论证一次项消失且二次项与端点位置无关，写出传播子的形式。'},
    ],
  },
  {
    id: 'e03-b03',
    chapter: 'e03',
    topic: '从谐振子传播子提取能谱',
    difficulty: '挑战',
    type: 'written',
    source: {label: shankar, ref: '习题 8.6.3（含可选小问）', page: 225},
    prompt: tex`谐振子传播子的谱表示为 $K(x,t;x',0)=\sum_n\psi_n(x)\psi_n^*(x')e^{-iE_n t/\hbar}$。已知
$$K(x,t;x',0)=\sqrt{\frac{m\omega}{2\pi i\hbar\sin\omega t}}\,
\exp\!\left(\frac{im\omega[(x^2+x'^2)\cos\omega t-2xx']}{2\hbar\sin\omega t}\right).$$
把 $K(0,t;0,0)$ 展开为能量相位之和，读出出现的能级并解释其余能级为何缺席。再令 $x=x'$ 为一般位置，展开到前两项，提取 $E_0,E_1$ 及 $|\psi_0(x)|^2,|\psi_1(x)|^2$。可令 $z=e^{-i\omega t}$ 并加上极小的负虚时使 $|z|<1$。`,
    hint: tex`位移相位中使用 $(\cos\omega t-1)/(i\sin\omega t)=(1-z)/(1+z)$。在一般 $x$ 时，只需把 $z^{1/2}$ 后面的系数展开到一次。`,
    explanation: tex`设 $a=m\omega/\hbar$。取与正短时传播子相容的平方根分支，用 $z=e^{-i\omega t}$ 改写得到
$$K(x,t;x,0)=\sqrt{\frac{a}{\pi}}\frac{z^{1/2}}{\sqrt{1-z^2}}
\exp\!\left[-ax^2\frac{1-z}{1+z}\right].$$
当 $x=0$，$(1-z^2)^{-1/2}=\sum_{j\ge0}\binom{2j}{j}z^{2j}/4^j$，因此谱表示中出现 $E=\hbar\omega(2j+1/2)$。谐振子奇数阶本征态具有奇宇称，在 $x=0$ 的波函数为零，因此相应能级在这个矩阵元中权重为零。

对于一般 $x$，指数项是 $e^{-ax^2}[1+2ax^2 z+O(z^2)]$，而分母的倒数没有一次项。比较 $z^{1/2}$、$z^{3/2}$ 的系数，得到
$$E_0=\tfrac12\hbar\omega,\qquad E_1=\tfrac32\hbar\omega,$$
$$|\psi_0(x)|^2=\sqrt{\frac{a}{\pi}}e^{-ax^2},\qquad
|\psi_1(x)|^2=2ax^2\sqrt{\frac{a}{\pi}}e^{-ax^2}.$$
$z$ 的幂次对应 $E/(\hbar\omega)$，各幂次前的系数就是同一点的概率密度。`,
    parts: [
      {label: '（a）改写对角传播子', points: 9, criterion: '正确处理平方根分支与指数，得到关于 z 的核。'},
      {label: '（b）在原点展开并识别能级', points: 9, criterion: '找出幂次规律，说明奇宇称态在原点节点使相应权重为零。'},
      {label: '（c）在一般位置恢复前两态', points: 12, criterion: '准确展开至 z 的一次项，并正确读出两个能量及归一的密度。'},
    ],
  },
  {
    id: 'e04-b01',
    chapter: 'e04',
    topic: '矩形电场脉冲驱动量子谐振子',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen2, ref: '补充材料 EⅩⅢ · 练习 1', page: 441},
    prompt: tex`电荷 $q$、质量 $m$、角频率 $\omega_0$ 的一维谐振子从基态开始。在 $0<t<\tau$ 加恒定电场 $\mathcal E$，相互作用 $W=-q\mathcal E X$，区间外 $W=0$。脉冲结束后，以无场数态 $|n\rangle$ 为测量基。用最低非零阶的含时微扰分别计算 $P_{01}$、$P_{02}$，说明它们随 $\tau$ 的变化。再利用平移或位移算符求两概率的精确表达式，并验证弱场极限。`,
    hint: tex`$X=\sqrt{\hbar/(2m\omega_0)}(a+a^\dagger)$，两次吸收每次只能增加一个量子。精确结果可先把脉冲区间内的哈密顿量配方为按实数偏移的振子。`,
    explanation: tex`定义 $g=q\mathcal E/\sqrt{2m\hbar\omega_0}$ 和 $s=g/\omega_0$，则 $W=-\hbar g(a+a^\dagger)$。一阶相互作用绘景振幅为
$$c_1^{(1)}=ig\int_0^\tau e^{i\omega_0 t}\,dt=s(e^{i\omega_0\tau}-1).$$
$\langle2|X|0\rangle=0$，故到 $|2\rangle$ 至少要二阶，唯一中间态是 $|1\rangle$。其二阶时间排序积分是两个相同一重积分乘积的一半，再乘阶梯算符矩阵元 $\sqrt2$，得 $c_2^{(2)}=(c_1^{(1)})^2/\sqrt2$。设 $\lambda=4s^2\sin^2(\omega_0\tau/2)$，最低阶结果是 $P_{01}\simeq\lambda$、$P_{02}\simeq\lambda^2/2$。两者都随脉宽周期性变化，整周期处回到零。

用 $D(s)=e^{s(a^\dagger-a)}$，有 $D(s)aD^\dagger(s)=a-s$，因此脉冲区间哈密顿量为 $D(s)H_0D^\dagger(s)-\hbar\omega_0s^2$。先把 $|0\rangle$ 位移为 $|-s\rangle$，让它在 $H_0$ 下自由演化，再位移回来，末态忽略整体相位为相干态 $|s(1-e^{-i\omega_0\tau})\rangle$。其数分布为 $P_{0n}=e^{-\lambda}\lambda^n/n!$，所以精确值为
$$P_{01}=e^{-\lambda}\lambda,\qquad P_{02}=e^{-\lambda}\lambda^2/2.$$
按 $\lambda\propto\mathcal E^2$ 展开，最低非零项与微扰结果相同。`,
    parts: [
      {label: '（a）一阶求单量子跃迁', points: 9, criterion: '从矩阵元建立积分，得到一阶振幅、概率及正确的脉宽周期。'},
      {label: '（b）二阶求双量子跃迁', points: 10, criterion: '说明一阶为零，只保留中间态 1，并处理时间排序和阶梯矩阵元。'},
      {label: '（c）用位移求精确概率', points: 15, criterion: '给出配方、末态的相干振幅和两个数态概率。'},
      {label: '（d）比对微扰极限', points: 6, criterion: '按电场幅度展开，说明两个概率的最低非零阶如何再现。'},
    ],
  },
  {
    id: 'e04-b02',
    chapter: 'e04',
    topic: '不等间隔能级的双光子跃迁',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen2, ref: '补充材料 EⅩⅢ · 练习 3', page: 442},
    prompt: tex`自旋 $J=1$ 的三态 $|-\rangle,|0\rangle,|+\rangle$ 依次相隔 $\hbar\omega'_0$ 和 $\hbar\omega_0$，两频率为正且不同。转动场给出 $W(t)=\tfrac{\omega_1}{2}(J_+e^{-i\omega t}+J_-e^{i\omega t})$。写出相互作用绘景的三个振幅方程。若从 $|-\rangle$ 出发，解释为什么到 $|+\rangle$ 的最低阶是二阶，求出时间 $T$ 的概率。分析随 $\omega$ 扫描时的一光子共振和两光子共振，并说明它们的区别。`,
    hint: tex`$J_+$ 的两个相邻态矩阵元都是 $\sqrt2\hbar$。二阶振幅中先积分中间态激发的时刻，再积分到末态的时刻。`,
    explanation: tex`令 $A=\omega_1/\sqrt2,\ \delta'=\omega'_0-\omega,\ \delta=\omega_0-\omega$。相互作用绘景中有
$$i\dot b_-=A e^{-i\delta't}b_0,\qquad
i\dot b_0=A(e^{i\delta't}b_-+e^{-i\delta t}b_+),\qquad
i\dot b_+=A e^{i\delta t}b_0.$$
每次作用只能让磁量子数改变一级。以 $b_-(0)=1$ 出发，一阶只到中间态，于是到最上层的最低阶振幅为
$$b_+^{(2)}(T)=-A^2\int_0^T dt_1\,e^{i\delta t_1}
\int_0^{t_1}dt_2\,e^{i\delta' t_2}.$$
记 $F_T(u)=\int_0^T e^{iut}dt$，即当 $u\ne0$ 时为 $(e^{iuT}-1)/(iu)$，且 $F_T(0)=T$。于是
$$b_+^{(2)}(T)=-\frac{A^2}{i\delta'}\big[F_T(\delta+\delta')-F_T(\delta)\big],
\qquad P_{-\to+}\simeq |b_+^{(2)}(T)|^2.$$
在 $\delta'=0$ 应取连续极限 $-A^2\int_0^T t e^{i\delta t}dt$。$T$ 足以分辨两条频率时，$\delta=0$ 或 $\delta'=0$ 可借某一相邻跃迁的共振放大振幅。即便两步分别失谐，当 $\delta+\delta'=0$ 时，$F_T(\delta+\delta')=T$ 同样产生共振增长，因为两份驱动能量合起来恰等于初末态能差。有限 $T$ 的各峰均无发散，微扰有效性还要求跃迁概率足够小。`,
    parts: [
      {label: '（a）建立相互作用绘景方程', points: 10, criterion: '三条方程的共轭失谐相位和 J 的矩阵元正确。'},
      {label: '（b）计算最低非零振幅和概率', points: 16, criterion: '给出选择定则、时间排序、积分闭式和 δ′=0 的连续极限。'},
      {label: '（c）解释共振条件', points: 14, criterion: '辨认两处相邻跃迁频率以及算术平均频率，对应的能量关系正确。'},
    ],
  },
  {
    id: 'e04-b03',
    chapter: 'e04',
    topic: 'Autler–Townes 双峰的频率与强度',
    difficulty: '挑战',
    type: 'written',
    source: {label: cohen2, ref: '补充材料 EⅩⅢ · 练习 5', page: 443},
    prompt: tex`三能级能量满足 $E_3>E_2>E_1$，且 $E_3-E_2\ll E_2-E_1$。驱动项只有 $W_{23}=W_{32}=\hbar\omega_1\sin(\omega t)$，其中 $\omega$ 近 $\omega_{32}=(E_3-E_2)/\hbar$，$\omega_1>0$。初态 $(|1\rangle+|2\rangle)/\sqrt2$。写出相互作用绘景的振幅方程，并用旋波近似求解。若偶极算符只有 $D_{12}=D_{21}=d$，求 $\langle D\rangle(t)$ 的频率成分和相对权重。讨论共振时增大驱动，以及固定驱动时调节失谐的结果。`,
    hint: tex`令 $\Delta=\omega_{32}-\omega$。保留频率 $\Delta$ 的项，再为 $b_2,b_3$ 分配相反的半失谐相位，得到常系数二能级问题。`,
    explanation: tex`以 $\omega_{ij}=(E_i-E_j)/\hbar$ 记能级差。精确方程为 $\dot b_1=0$、
$i\dot b_2=\omega_1\sin(\omega t)e^{-i\omega_{32}t}b_3$、
$i\dot b_3=\omega_1\sin(\omega t)e^{i\omega_{32}t}b_2$。舍弃频率 $\omega+\omega_{32}$ 的项后，
$$i\dot b_2=-i(\omega_1/2)e^{-i\Delta t}b_3,\qquad
i\dot b_3=i(\omega_1/2)e^{i\Delta t}b_2.$$
令 $b_2=e^{-i\Delta t/2}c_2,\ b_3=e^{i\Delta t/2}c_3$，则 $i\dot{\mathbf c}=M\mathbf c$，其中
$$M=\tfrac12\begin{pmatrix}-\Delta&-i\omega_1\\i\omega_1&\Delta\end{pmatrix},
\qquad M^2=(\Omega^2/4)I,\qquad \Omega=\sqrt{\Delta^2+\omega_1^2}.$$
从初值 $c_2(0)=1/\sqrt2,c_3(0)=0$ 得 $b_1=1/\sqrt2$ 及
$$c_2(t)=\frac{\cos(\Omega t/2)+i(\Delta/\Omega)\sin(\Omega t/2)}{\sqrt2},
\qquad c_3(t)=\frac{\omega_1\sin(\Omega t/2)}{\sqrt2\,\Omega}.$$
代回原能级相位，有 $\langle D\rangle=2d\operatorname{Re}[b_1^*b_2e^{-i\omega_{21}t}]$。将 $c_2$ 中正弦、余弦合并成指数，即可读出两个余弦成分的频率及权重。
$$\begin{aligned}
\omega_{\rm lo}&=\omega_{21}+\tfrac12(\Delta-\Omega),& w_{\rm lo}&=\tfrac12(1+\Delta/\Omega),\\
\omega_{\rm hi}&=\omega_{21}+\tfrac12(\Delta+\Omega),& w_{\rm hi}&=\tfrac12(1-\Delta/\Omega).
\end{aligned}$$
即 $\langle D\rangle=d[w_{\rm lo}\cos(\omega_{\rm lo}t)+w_{\rm hi}\cos(\omega_{\rm hi}t)]$。在共振处，双线距原谱线对称、权重相等，间隔 $\omega_1$ 线性随驱动幅度增长。失谐使中心移动 $\Delta/2$、间隔增大为 $\Omega$，且强弱不再相等。当正失谐远大于耦合时，靠近 $\omega_{21}$ 的低频支占主导。在绝对值较大的负失谐下，高频支占主导。`,
    parts: [
      {label: '（a）整理精确与旋波方程', points: 9, criterion: '从正弦展开正确选择快慢项，说明为何 b₁ 恒定。'},
      {label: '（b）求带失谐的时间演化', points: 11, criterion: '找到常系数矩阵并用初值求得两个含时振幅。'},
      {label: '（c）分解偶极响应', points: 12, criterion: '正确还原能级相位，给出两条频率和各自的归一权重。'},
      {label: '（d）分析驱动幅度和失谐', points: 8, criterion: '说明共振分裂的幅度标度、失谐移动中心和权重转移。'},
    ],
  },
];
