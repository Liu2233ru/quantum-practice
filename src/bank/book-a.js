const tex = String.raw;
const label = '格里菲斯《量子力学概论》第3版';

export const bookA = [
  {
    id: 'g01-b01', chapter: 'g01', topic: '经典谐振子的位置分布', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 1.11', page: 17},
    prompt: tex`经典粒子质量为 $m$、能量为 $E$，在势阱 $V(x)$ 的两个转折点之间往复运动。在一个周期内均匀随机地取时刻观察，位置概率与粒子经过该处所花的时间成正比。用能量守恒写出速率与位置的关系。再取势能 $V=kx^2/2$，推导并画出归一化的位置密度，计算 $\langle x\rangle$、$\langle x^2\rangle$ 和 $\sigma_x$。`,
    hint: tex`令振幅为 $A=\sqrt{2E/k}$、角频率为 $\omega=\sqrt{k/m}$。把 $x$ 换成 $A\sin\theta$ 来积分。`,
    explanation: tex`能量守恒给出速率 $v(x)=\sqrt{2[E-V(x)]/m}$。从左转折点到右转折点所花的时间 $T=\int dx/v(x)$，故停留时间归一化后 $\rho(x)=1/[Tv(x)]$。

谐振子在 $|x|<A$ 中有 $v=\omega\sqrt{A^2-x^2}$，代入可得 $T=\pi/\omega$ 和 $\rho(x)=1/[\pi\sqrt{A^2-x^2}]$，区间外密度为零。曲线关于零对称，中心取最小值，在两端向上发散。用 $x=A\sin\theta$ 换元，端点奇异性可积，密度的积分为 1。

奇偶性给出 $\langle x\rangle=0$。在换元后，$\langle x^2\rangle=(A^2/\pi)\int_{-\pi/2}^{\pi/2}\sin^2\theta\,d\theta=A^2/2$，所以 $\sigma_x=A/\sqrt2$。`,
    parts: [
      {label: '（a）速率与停留时间', points: 5, criterion: '由能量守恒得到速率，并给出由停留时间构造密度的方法。'},
      {label: '（b）密度、归一化与图形', points: 8, criterion: '密度与支撑正确，积分为一，图中显示中心最小、两端发散。'},
      {label: '（c）位置矩', points: 7, criterion: '说明均值为零的理由，正确积分求二阶矩及标准差。'},
    ],
  },
  {
    id: 'g01-b02', chapter: 'g01', topic: '截断抛物波函数的不确定度', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 1.16', page: 18},
    prompt: tex`在 $t=0$，粒子的波函数在 $|x|\le a$ 时是 $\psi(x,0)=A(a^2-x^2)$，其余处为零。确定归一化常数后，分别计算位置和动量的一阶矩、二阶矩、标准差。说明为何单凭给出的初态不能用位置均值的时间导数代算动量均值，并验证不确定关系。`,
    hint: tex`先利用奇偶性。二阶动量矩可写作 $\hbar^2\int|\psi'|^2dx$，这个形式可直接处理端点处的一阶导数跳跃。`,
    explanation: tex`取 $A>0$。归一化积分为 $A^2\int_{-a}^a(a^2-x^2)^2dx=A^2(16a^5/15)$，故 $A=\sqrt{15/(16a^5)}$。$x|\psi|^2$ 与 $\psi^*\psi'$ 都是奇函数，所以 $\langle x\rangle=\langle p\rangle=0$。这里只知道 $\langle x\rangle$ 在一个时刻的值，无法从这一数值读出其时间导数。

位置二阶矩为 $A^2\int_{-a}^a x^2(a^2-x^2)^2dx=A^2(16a^7/105)=a^2/7$。动量二阶矩用平方范数求：
$$\langle p^2\rangle=\hbar^2\int_{-a}^a4A^2x^2dx=\frac{5\hbar^2}{2a^2}.$$
因此 $\sigma_x=a/\sqrt7$，$\sigma_p=(\hbar/a)\sqrt{5/2}$，乘积 $\hbar\sqrt{5/14}>\hbar/2$。`,
    parts: [
      {label: '（a–c）归一化与一阶矩', points: 8, criterion: '求出归一化常数，用奇偶性处理两个均值，并说明单时刻信息为何不足以取时间导数。'},
      {label: '（d–e）二阶矩', points: 14, criterion: '正确写出位置积分和动量二阶矩的平方范数，得到两项结果。'},
      {label: '（f–h）标准差与不确定关系', points: 8, criterion: '分别求出两个标准差，乘积与海森堡下界的比较正确。'},
    ],
  },
  {
    id: 'g01-b03', chapter: 'g01', topic: '虚势与指数衰减', difficulty: '基础', type: 'written',
    source: {label, ref: '习题 1.17', page: 19},
    prompt: tex`设势能为 $V(x)=V_0(x)-i\Gamma$，$V_0$ 为实势，$\Gamma>0$ 为常数。取全空间总概率 $P(t)=\int|\Psi(x,t)|^2dx$，初态归一化，且无无穷远端的净概率流。由薛定谔方程推导 $P$ 的微分方程，解出 $P(t)$，并确定把结果写成 $e^{-t/\tau}$ 时的寿命 $\tau$。`,
    hint: tex`对 $\Psi^*\Psi$ 求时间导数。注意 $V$ 与 $V^*$ 之差，处理动能项的全导数。`,
    explanation: tex`代入波函数及其共轭的演化方程，得
$$\partial_t|\Psi|^2=-\partial_x J+\frac{V-V^*}{i\hbar}|\Psi|^2=-\partial_xJ-\frac{2\Gamma}{\hbar}|\Psi|^2.$$
全空间积分后，边界概率流为零，故 $dP/dt=-(2\Gamma/\hbar)P$。从 $P(0)=1$ 积分得到 $P(t)=e^{-2\Gamma t/\hbar}$，比较标准指数式给出 $\tau=\hbar/(2\Gamma)$。`,
    parts: [
      {label: '（a）总概率的演化', points: 6, criterion: '正确求出虚势贡献的符号与因子，解释边界项为何不贡献。'},
      {label: '（b）衰减曲线与寿命', points: 4, criterion: '使用初始条件解出指数函数，得到寿命。'},
    ],
  },
  {
    id: 'g02-b01', chapter: 'g02', topic: '下降势阶的量子反射', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 2.35', page: 66},
    prompt: tex`质量为 $m$ 的粒子由左入射，势能在 $x=0$ 处从 $0$ 降至 $-V_0$。求 $E=V_0/3$ 时的反射概率。说明为什么这个势阶不能直接描述汽车驶下真实悬崖。把同一模型用于动能为 $4\,\mathrm{MeV}$、从核外进入核内势能约 $-12\,\mathrm{MeV}$ 区域的中子，估算它通过核表面的概率，并讨论能否据此判断会发生新的裂变。`,
    hint: tex`用 $k_1=\sqrt{2mE}/\hbar$、$k_2=\sqrt{2m(E+V_0)}/\hbar$ 匹配两个平面波。透射概率需要按概率流计算。`,
    explanation: tex`左边取 $e^{ik_1x}+re^{-ik_1x}$，右边取 $te^{ik_2x}$。波函数及导数连续给出 $1+r=t$ 与 $k_1(1-r)=k_2t$，所以 $R=|r|^2=[(k_1-k_2)/(k_1+k_2)]^2$。当 $E=V_0/3$，$k_2=2k_1$，故 $R=1/9$。

真实汽车越过崖边后沿连续轨迹下落，重力势能随高度连续改变。下降势阶把落差压缩在一个水平位置，假设势能在越过崖边的一刻便全部下降。

中子的给定动能和势阶落差同样满足 $E=V_0/3$，于是 $T=1-R=8/9$，这是题设势阶模型中进入核内的概率。若进入便视作吸收，吸收估算也为 $8/9$。具体会否诱发裂变，还需要核种及进入后反应的概率。`,
    parts: [
      {label: '（a）势阶反射', points: 10, criterion: '写出正确的波数、边界方程和反射振幅，算得反射概率。'},
      {label: '（b）悬崖模型', points: 4, criterion: '分辨实际重力势能的连续变化和势阶的瞬时跳变。'},
      {label: '（c）中子通过核表面', points: 6, criterion: '应用概率流守恒并算得透射率，说明从进入到裂变还需哪些信息。'},
    ],
  },
  {
    id: 'g02-b02', chapter: 'g02', topic: '无限深势阱的波函数复现', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 2.38', page: 67},
    prompt: tex`一维无限深势阱的宽度为 $a$。证明任一初态在时间 $T_q=4ma^2/(\pi\hbar)$ 后恢复成原波函数。再求具有固定能量 $E$ 的经典粒子在两壁之间的往返周期，确定两个时间相等所需的能量。`,
    hint: tex`量子部分检查全部 $n$ 的因子 $e^{-iE_nT_q/\hbar}$。经典部分在相同的位置和运动方向再次出现时才算走完一个周期。`,
    explanation: tex`写成 $\Psi(x,t)=\sum_{n\ge1}c_n\psi_n(x)e^{-iE_nt/\hbar}$，其中 $E_n=n^2\pi^2\hbar^2/(2ma^2)$。在 $T_q$ 时，任意分量的相位因子均为 $e^{-2\pi in^2}=1$，所以任意初态精确复现。

经典粒子速率为 $\sqrt{2E/m}$，完整周期走过 $2a$，所以 $T_c=2a\sqrt{m/(2E)}$。令 $T_c=T_q$，得 $E=\pi^2\hbar^2/(8ma^2)=E_1/4$，低于量子阱的基态能量。`,
    parts: [
      {label: '（a）所有量子分量的相位', points: 8, criterion: '用定态展式验证每一项的因子在所给时间都等于一。'},
      {label: '（b）经典往返时间', points: 6, criterion: '用经典速率和完整路程推导周期。'},
      {label: '（c）匹配能量', points: 6, criterion: '正确求出匹配能量并比较基态能量。'},
    ],
  },
  {
    id: 'g02-b03', chapter: 'g02', topic: '谐振子能量分布与镜像复现', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 2.40', page: 67},
    prompt: tex`一维谐振子的初态为 $\psi(x,0)=A(1-2y)^2e^{-y^2/2}$，其中 $y=\sqrt{m\omega/\hbar}\,x$。求归一化常数及全部定态展开系数，给出测能的结果、概率与平均值。经过最短的多少正时间 $T$，波函数能写成 $B(1+2y)^2e^{-y^2/2}$，其中 $B$ 可为复常数？`,
    hint: tex`把 $(1-2y)^2$ 写成 $H_0,H_1,H_2$ 的组合，再换成归一化定态。镜像将奇宇称项变号。`,
    explanation: tex`多项式恒等式是 $(1-2y)^2=3H_0-2H_1+H_2$。令 $N_0=(m\omega/(\pi\hbar))^{1/4}$，则 $\varphi_n=N_0 H_n(y)e^{-y^2/2}/\sqrt{2^n n!}$。换算为归一化定态的未归一系数为 $(A/N_0)(3,-2\sqrt2,2\sqrt2)$。取 $A=N_0/5$ 后，得到 $c_0=3/5,c_1=-2\sqrt2/5,c_2=2\sqrt2/5$，其余皆零。

能量 $\hbar\omega/2,3\hbar\omega/2,5\hbar\omega/2$ 的概率分别为 $9/25,8/25,8/25$，加权平均为 $73\hbar\omega/50$。在去掉共同相位后，$n=1,2$ 的演化因子分别为 $e^{-i\omega T},e^{-2i\omega T}$。所需镜像要求它们分别为 $-1,1$，故最短正时间为 $T=\pi/\omega$。`,
    parts: [
      {label: '（a）初态展开', points: 12, criterion: '正确作厄米多项式展开，换算定态归一化并求出常数和三个系数。'},
      {label: '（b）能量测量', points: 8, criterion: '列出三个本征值、概率和加权平均能量。'},
      {label: '（c）镜像复现', points: 10, criterion: '用奇偶性和相对相位导出最短正时间。'},
    ],
  },
  {
    id: 'g03-b01', chapter: 'g03', topic: '反厄米算符与伴随运算', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 3.32', page: 107},
    prompt: tex`设 $Q^\dagger=-Q$。证明 $Q$ 的期望值与本征值都是纯虚数或零，并证明对应不同本征值的本征矢正交。分别确定两个厄米算符的对易子、两个反厄米算符的对易子的伴随性质。最后把任意 $Q$ 分解成一个厄米算符与一个反厄米算符的和。可在有限维空间中论证。`,
    hint: tex`共轭期望值等于伴随算符的期望值。对乘积取伴随时，记得反转因子顺序。`,
    explanation: tex`由 $\langle Q\rangle^*=\langle Q^\dagger\rangle=-\langle Q\rangle$，期望值的实部为零。若 $Q|u\rangle=\lambda|u\rangle$ 且 $|u\rangle$ 已归一化，$\lambda$ 就是该态的期望值。

对于本征对 $(|u\rangle,\lambda)$ 与 $(|v\rangle,\mu)$，$\langle u|Q|v\rangle=\mu\langle u|v\rangle=-\lambda^*\langle u|v\rangle=\lambda\langle u|v\rangle$。若 $\mu\ne\lambda$，内积必为零。

由 $[X,Y]^\dagger=-[X^\dagger,Y^\dagger]$，当两算符同为厄米或同为反厄米时，结果都为 $-[X,Y]$。一般算符可分解为 $Q=(Q+Q^\dagger)/2+(Q-Q^\dagger)/2$。第一项取伴随保持不变，第二项取伴随变号。`,
    parts: [
      {label: '（a–b）期望值和本征值', points: 5, criterion: '由伴随关系得到纯虚性，并把本征值联系到本征态的期望值。'},
      {label: '（c）本征矢正交性', points: 5, criterion: '从同一个矩阵元的两种算法严格推出正交。'},
      {label: '（d）两类对易子', points: 5, criterion: '正确反转乘积次序，判断两类对易子都反厄米。'},
      {label: '（e）分解任意算符', points: 5, criterion: '给出两项分解式并检验各自的伴随性质。'},
    ],
  },
  {
    id: 'g03-b02', chapter: 'g03', topic: '洛伦兹形振幅的动量表示', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 3.36', page: 108},
    prompt: tex`初态的位置波函数为 $\psi(x)=A/(x^2+a^2)$，$x\in\mathbb R$，$a>0$。求归一化常数、位置一阶矩和二阶矩及标准差。求归一化的动量波函数，用它算出动量一阶矩、二阶矩和标准差，并验证不确定关系。`,
    hint: tex`位置积分可令 $x=a\tan\theta$。傅里叶积分可用 $\int_{-\infty}^{\infty}e^{-ikx}(x^2+a^2)^{-1}dx=(\pi/a)e^{-a|k|}$，也可以用留数计算。`,
    explanation: tex`取 $A>0$。由于 $\int dx/(x^2+a^2)^2=\pi/(2a^3)$，得 $A=\sqrt{2a^3/\pi}$。位置密度是偶函数，$\langle x\rangle=0$；用 $x^2/(x^2+a^2)^2=(x^2+a^2)^{-1}-a^2(x^2+a^2)^{-2}$，得 $\langle x^2\rangle=a^2$ 和 $\sigma_x=a$。

按 $(2\pi\hbar)^{-1/2}$ 的傅里叶约定，$\phi(p)=\sqrt{a/\hbar}\,e^{-a|p|/\hbar}$。模平方在实轴上的积分为 $(2a/\hbar)\int_0^\infty e^{-2ap/\hbar}dp=1$。

偶性给出 $\langle p\rangle=0$，$\langle p^2\rangle=(2a/\hbar)\int_0^\infty p^2e^{-2ap/\hbar}dp=\hbar^2/(2a^2)$。故 $\sigma_p=\hbar/(\sqrt2a)$，乘积为 $\hbar/\sqrt2$，大于 $\hbar/2$。`,
    parts: [
      {label: '（a–b）位置表示', points: 10, criterion: '求出正确归一化常数，明确位置均值、二阶矩和标准差。'},
      {label: '（c）动量波函数', points: 10, criterion: '使用正确的傅里叶因子和含绝对值的指数，并检验归一化。'},
      {label: '（d–e）动量矩及不确定关系', points: 10, criterion: '用动量积分得到二阶矩和标准差，比较乘积与下界。'},
    ],
  },
  {
    id: 'g03-b03', chapter: 'g03', topic: '等权双能级态的正交化时间', difficulty: '基础', type: 'written',
    source: {label, ref: '习题 3.38', page: 108},
    prompt: tex`在同一不含时势能中，取两个能量不同的归一化定态 $|1\rangle,|2\rangle$，初态为 $(|1\rangle+|2\rangle)/\sqrt2$。计算初态与演化态第一次正交所需时间 $\tau$。用 $\Delta t=\tau/\pi$ 计算 $\sigma_E\Delta t$，检验它是否达到能量–时间不确定关系的下界 $\hbar/2$。`,
    hint: tex`把内积写成两个相位因子的和。相消时两相位相差 $\pi$ 的奇数倍。`,
    explanation: tex`存活振幅为 $(e^{-iE_1t/\hbar}+e^{-iE_2t/\hbar})/2$，模平方为 $\cos^2[(E_2-E_1)t/(2\hbar)]$。它首次为零时 $\tau=\pi\hbar/|E_2-E_1|$。对两种等概率能量，$\langle E\rangle=(E_1+E_2)/2$，方差为 $(E_2-E_1)^2/4$，因此 $\sigma_E\tau/\pi=\hbar/2$，达到题中关系的下界。`,
    parts: [
      {label: '（a）正交化时间', points: 6, criterion: '正确计算初态与演化态的内积并找出第一处零点。'},
      {label: '（b）能量方差与下界', points: 4, criterion: '得到能量标准差，代入题中时间定义并验证等号。'},
    ],
  },
  {
    id: 'g04-b01', chapter: 'g04', topic: '三维各向同性谐振子的能谱', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 4.46', page: 164},
    prompt: tex`粒子在三维势 $V(r)=m\omega^2r^2/2$ 中运动。用笛卡尔坐标的乘积分离法得到定态能量。若以 $n$ 为三个一维激发量子数之和，求 $n$ 所对应能级的空间简并度，忽略自旋。`,
    hint: tex`先把哈密顿量写成 $H_x+H_y+H_z$。计数时可让 $n_x$ 从 0 到 $n$，再数固定 $n_x$ 后的解。`,
    explanation: tex`用 $\psi(x,y,z)=\varphi_{n_x}(x)\varphi_{n_y}(y)\varphi_{n_z}(z)$，每项哈密顿量只作用于自身坐标，分别给出 $(n_i+1/2)\hbar\omega$。因此 $E_n=(n+3/2)\hbar\omega$，其中 $n=n_x+n_y+n_z$。

固定 $n_x=j$ 后，$n_y$ 可以从 $0$ 到 $n-j$，$n_z$ 随之确定。这些乘积态互相正交，故
$$d(n)=\sum_{j=0}^n(n-j+1)=\frac{(n+1)(n+2)}2.$$
例如前三级的空间简并度依次为 1、3、6。`,
    parts: [
      {label: '（a）分离并求能谱', points: 10, criterion: '写出三个一维问题及乘积解，清楚得到总能量和总量子数。'},
      {label: '（b）空间简并度', points: 10, criterion: '给出无重复计数的整数三元组方法并得到闭式。'},
    ],
  },
  {
    id: 'g04-b02', chapter: 'g04', topic: '氢原子基态的动量空间', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 4.50', page: 165},
    prompt: tex`以玻尔半径 $a$ 表示氢原子基态波函数 $\psi(\mathbf r)=e^{-r/a}/\sqrt{\pi a^3}$。使用三维傅里叶变换求 $\phi(\mathbf p)$ 并检验归一化。计算 $\langle p^2\rangle$，以基态能量 $E_1$ 表示平均动能，并与位力定理结果比较。采用电子质量 $m$，忽略核反冲。`,
    hint: tex`取极轴沿 $\mathbf p$。角向积分给出 $4\pi\sin(pr/\hbar)/(pr/\hbar)$。检验动量空间归一化时要积分 $4\pi p^2dp$。`,
    explanation: tex`令 $p=|\mathbf p|$、$q=p/\hbar$。对角度积分后，剩下 $\int_0^\infty r e^{-r/a}\sin(qr)\,dr/q$，可由 $\int_0^\infty e^{-\alpha r}e^{iqr}dr=(\alpha-iq)^{-1}$ 对 $\alpha$ 求导得到。含三维傅里叶归一化因子的结果为
$$\phi(p)=\frac1\pi\left(\frac{2a}{\hbar}\right)^{3/2}\frac1{[1+(ap/\hbar)^2]^2}.$$
令 $u=ap/\hbar$，归一化积分为 $(32/\pi)\int_0^\infty u^2(1+u^2)^{-4}du=1$。该积分等于 $\pi/32$，可用 $u=\tan\theta$ 求出。

二阶矩对应积分将分子换成 $u^4$ 并乘上 $(\hbar/a)^2$。用 $u\mapsto1/u$ 可见两积分相等，故 $\langle p^2\rangle=\hbar^2/a^2$。又 $E_1=-\hbar^2/(2ma^2)$，所以 $\langle T\rangle=-E_1$，与库仑势的位力关系一致。`,
    parts: [
      {label: '（a）三维傅里叶变换', points: 14, criterion: '采用正确傅里叶因子，完成角、径向积分，给出动量波函数。'},
      {label: '（b）归一化积分', points: 9, criterion: '包含正确球坐标积分权重，验证积分为一。'},
      {label: '（c）动量二阶矩', points: 9, criterion: '在动量空间求得二阶矩，保持量纲正确。'},
      {label: '（d）与位力定理比较', points: 8, criterion: '给出平均动能与基态能量的关系，并正确比较。'},
    ],
  },
  {
    id: 'g04-b03', chapter: 'g04', topic: '电子自旋的三个轴向测量', difficulty: '基础', type: 'written',
    source: {label, ref: '习题 4.58', page: 166},
    prompt: tex`在 $S_z$ 的标准基底中，电子自旋态为 $\chi=A(1-2i,\,2)^{\mathsf T}$。确定归一化常数。分别对同样制备的电子测量 $S_z,S_x,S_y$，列出各测量的可能值、概率和期望值。`,
    hint: tex`可分别计算 $\langle\sigma_i\rangle$，再用 $P_i(\pm)=(1\pm\langle\sigma_i\rangle)/2$。注意 $\sigma_y$ 的复数矩阵元。`,
    explanation: tex`取 $A>0$，范数条件为 $A^2(5+4)=1$，故 $A=1/3$。各轴可能的测量结果都是 $\pm\hbar/2$。设归一化分量为 $u=(1-2i)/3$、$v=2/3$。

对 $S_z$，对应概率是 $5/9,4/9$，期望为 $\hbar/18$。对 $S_x$，$\langle\sigma_x\rangle=2\operatorname{Re}(u^*v)=4/9$，相应概率为 $13/18,5/18$，期望 $2\hbar/9$。对 $S_y$，$\langle\sigma_y\rangle=2\operatorname{Im}(u^*v)=8/9$，相应概率为 $17/18,1/18$，期望 $4\hbar/9$。同一轴的两个概率均按正、负结果的顺序列出。`,
    parts: [
      {label: '（a）归一化', points: 5, criterion: '按复分量的模平方求出归一化常数。'},
      {label: '（b）测量 z 分量', points: 5, criterion: '列出两个本征值、相应概率及期望值。'},
      {label: '（c）测量 x 分量', points: 5, criterion: '正确投影到 x 基底或使用泡利矩阵，给出概率和期望。'},
      {label: '（d）测量 y 分量', points: 5, criterion: '正确处理相位和符号，给出概率和期望。'},
    ],
  },
  {
    id: 'g05-b01', chapter: 'g05', topic: '三粒子态的占据组合计数', difficulty: '基础', type: 'written',
    source: {label, ref: '习题 5.29', page: 199},
    prompt: tex`三个粒子只能使用三个互相正交的完整单粒子态 $a,b,c$。分别把三个粒子视作可区分粒子、全同玻色子和全同费米子，计算每种情形可组成多少个独立的三粒子基底向量。说明何时可以重复占据单粒子态。`,
    hint: '可区分粒子各自选择一个态。对全同粒子，用各单粒子态的占据数来标记基底。',
    explanation: tex`给粒子加标签后，每个标签都有三项选择，故可区分情形有 $3^3=27$ 个基底态，允许同一单粒子态重复使用。

玻色子按占据数计数。和为三的三个非负整数个数是 $\binom{5}{2}=10$，也可按 $3+0+0$、$2+1+0$ 和 $1+1+1$ 分别计 3、6、1 种。

费米子每个完整单粒子态只能占一个，唯一占据方式为 $(1,1,1)$。相应基底态可写成三个轨道构成的归一化斯莱特行列式。`,
    parts: [
      {label: '（a）可区分粒子', points: 3, criterion: '把每个粒子的选择独立计数，得出 27。'},
      {label: '（b）全同玻色子', points: 4, criterion: '对无序占据方式计数并得到 10。'},
      {label: '（c）全同费米子', points: 3, criterion: '应用泡利原理解释为何只剩一种。'},
    ],
  },
  {
    id: 'g05-b02', chapter: 'g05', topic: '二维自由电子气的费米能', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 5.30', page: 199},
    prompt: tex`自由电子被限制在面积为 $A$ 的二维无限深势阱内。以 $\sigma=N/A$ 表示面数密度。取零温、宏观面积极限，并包含两种自旋。利用波矢空间的态数计数，求费米波数 $k_F$ 和费米能 $E_F$。`,
    hint: tex`可取边长为 $L_x,L_y$ 的矩形。允许波数为正整数乘以 $\pi/L_i$；先只计四分之一圆盘里的空间轨道，再乘自旋数。`,
    explanation: tex`面元 $\pi^2/A$ 对应一个空间轨道。正象限内半径为 $k_F$ 的圆盘面积是 $\pi k_F^2/4$。每个空间轨道可容纳两个自旋相反的电子，所以
$$N\simeq 2\frac{\pi k_F^2/4}{\pi^2/A}=\frac{Ak_F^2}{2\pi}.$$
因此 $k_F=\sqrt{2\pi\sigma}$，而电子色散为 $E=\hbar^2k^2/(2m)$，得到 $E_F=\pi\hbar^2\sigma/m$。有限矩形中应逐个数格点，这里的圆盘面积给出宏观极限值。`,
    parts: [
      {label: '（a）态数几何', points: 10, criterion: '由边界条件确定波数网格，计入正象限面积和两种自旋。'},
      {label: '（b）费米波数和能量', points: 10, criterion: '将体系统计量换成面数密度，给出正确的波数和能量。'},
    ],
  },
  {
    id: 'g05-b03', chapter: 'g05', topic: '自旋极化的电子气动能', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 5.32', page: 199},
    prompt: tex`一个体积 $V$ 的三维自由电子气中，两类自旋的粒子数为 $N_+,N_-$。令 $\rho=(N_++N_-)/V$，电子磁化强度为 $M=-\mu_B(N_+-N_-)/V$，其中 $\mu_B$ 是玻尔磁子。假设每类自旋填满自身的低能态。求总动能并核对 $N_+=N_-$ 的极限，再把能量密度对小参数 $M/(\rho\mu_B)$ 展开到二阶，指出零磁化的能量性质。`,
    hint: tex`分别给两个自旋族计数，每族内部没有二重自旋因子。将两族的费米波数用各自的数密度表示。`,
    explanation: tex`每类自旋的单位体积波矢态密度为 $(2\pi)^{-3}$，故 $\rho_\pm=N_\pm/V=k_{F\pm}^3/(6\pi^2)$。各自的能量密度由 $\hbar^2k^2/(2m)$ 积分到 $k_{F\pm}$，得到
$$\frac{E_{\mathrm{tot}}}{V}=\frac{3\hbar^2}{10m}(6\pi^2)^{2/3}\left(\rho_+^{5/3}+\rho_-^{5/3}\right).$$
在等密度情形下，两类具有同一费米能 $E_F=\hbar^2(3\pi^2\rho)^{2/3}/(2m)$，于是 $E_{\mathrm{tot}}=(3/5)(N_++N_-)E_F$。

令 $s=M/(\rho\mu_B)$，有 $\rho_\pm=\rho(1\mp s)/2$。两项的线性修正相消，二阶展开是
$$\frac{E_{\mathrm{tot}}}{V}=\frac{\hbar^2(3\pi^2\rho)^{5/3}}{10\pi^2m}\left[1+\frac59s^2+O(s^4)\right].$$
二阶系数为正，零磁化处为极小。更一般地，$u^{5/3}$ 的凸性使固定总密度下的两种密度相等时能量最低。`,
    parts: [
      {label: '（a）两个费米球与总能量', points: 13, criterion: '对两种自旋分别计数并积分各自的动能密度。'},
      {label: '（a）无极化检验', points: 5, criterion: '证明等数填充恢复通常的三维自由电子气总能量。'},
      {label: '（b）弱极化展开', points: 12, criterion: '正确换元为磁化强度，给出二阶系数并说明极小值。'},
    ],
  },
  {
    id: 'g06-b01', chapter: 'g06', topic: '平移算符作用于带尖点的波包', difficulty: '进阶', type: 'written',
    source: {label, ref: '习题 6.31', page: 235},
    prompt: tex`将平移算符定义为 $T(a)=\int e^{-iap/\hbar}|p\rangle\langle p|\,dp$。取有尖点的归一化波函数 $\psi(x)=\sqrt\lambda e^{-\lambda|x|}$，$\lambda>0$。求它在所用傅里叶约定下的动量波函数，证明谱定义给出的 $T(a)\psi$ 是正确的平移结果，并给出尖点的新位置。`,
    hint: tex`可用偶性把傅里叶积分化为余弦变换。逆变换中将 $e^{-iap/\hbar}$ 和位置本征相位合并。`,
    explanation: tex`采用 $\langle x|p\rangle=e^{ipx/\hbar}/\sqrt{2\pi\hbar}$。由于波函数为偶函数，动量振幅是
$$\Phi(p)=\sqrt{\frac{\lambda}{2\pi\hbar}}\,\frac{2\lambda}{\lambda^2+(p/\hbar)^2}.$$
其中余弦积分 $\int_0^\infty e^{-\lambda x}\cos(px/\hbar)dx=\lambda/[\lambda^2+(p/\hbar)^2]$。在谱定义下，
$$\langle x|T(a)|\psi\rangle=\frac1{\sqrt{2\pi\hbar}}\int e^{ip(x-a)/\hbar}\Phi(p)\,dp=\psi(x-a)=\sqrt\lambda e^{-\lambda|x-a|}.$$
尖点移到 $x=a$。谱定义只需对动量振幅乘单位模相位，避开了原点处不能逐项进行的泰勒展开。`,
    parts: [
      {label: '（a）动量表示', points: 8, criterion: '选定一致的变换规范，由偶性求出动量振幅。'},
      {label: '（b）谱定义和平移结果', points: 12, criterion: '合并相位并正确逆变换，给出新尖点及谱方法为何适用。'},
    ],
  },
  {
    id: 'g06-b02', chapter: 'g06', topic: '自旋旋转矩阵与双覆盖', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 6.32', page: 235},
    prompt: tex`对于自旋 $1/2$，旋转算符为 $R_{\mathbf n}(\varphi)=\exp[-i\varphi\mathbf n\cdot\mathbf S/\hbar]$。先证明 $(\mathbf a\cdot\boldsymbol\sigma)(\mathbf b\cdot\boldsymbol\sigma)=(\mathbf a\cdot\mathbf b)I+i(\mathbf a\times\mathbf b)\cdot\boldsymbol\sigma$，再由此求任意单位轴的旋转矩阵，并证明它幺正。用 $R_z(\varphi)$ 求 $R_z^\dagger S_xR_z$。最后给出 $R_x(\pi)$ 对 $|+z\rangle$ 的作用以及 $R_z(2\pi)$，解释结果。`,
    hint: tex`先用 $\sigma_i\sigma_j=\delta_{ij}I+i\epsilon_{ijk}\sigma_k$。指数展开中偶数次幂是单位矩阵，奇数次幂含 $\mathbf n\cdot\boldsymbol\sigma$。`,
    explanation: tex`把两个点积逐项相乘，再代入泡利矩阵的乘积关系，对称部分给内积，反对称部分给叉积。取 $\mathbf a=\mathbf b=\mathbf n$，得到 $(\mathbf n\cdot\boldsymbol\sigma)^2=I$，所以
$$R_{\mathbf n}(\varphi)=\cos(\varphi/2)I-i\sin(\varphi/2)\begin{pmatrix}\cos\theta&\sin\theta e^{-i\phi}\\ \sin\theta e^{i\phi}&-\cos\theta\end{pmatrix},$$
其中 $(\theta,\phi)$ 是轴方向的球角。矩阵中乘正弦的部分来自平方等于 $I$ 的厄米矩阵，故 $R^\dagger R=I$。

$R_z(\varphi)$ 的对角元是 $e^{-i\varphi/2}$ 和 $e^{i\varphi/2}$。矩阵共轭使 $S_x$ 的右上元乘 $e^{i\varphi}$，左下元乘 $e^{-i\varphi}$，故 $R_z^\dagger S_x R_z=S_x\cos\varphi-S_y\sin\varphi$。

$R_x(\pi)=-i\sigma_x$，将 $|+z\rangle$ 变为 $-i|-z\rangle$；$R_z(2\pi)=-I$，所以转一整圈后旋量变号，转两圈才恢复原旋量。单独一支的整体负号不会改变测量概率，与未经旋转的相干分支干涉时可显示这个相对相位。`,
    parts: [
      {label: '（a–b）泡利乘积与指数', points: 12, criterion: '证明乘积恒等式，用偶、奇幂得到旋转半角公式。'},
      {label: '（c–d）具体矩阵与幺正性', points: 10, criterion: '在标准基底写出正确矩阵并验证幺正。'},
      {label: '（e）绕 z 轴变换算符', points: 8, criterion: '算出两个非对角矩阵元，得到正确的旋转符号。'},
      {label: '（f–g）两个有限角旋转', points: 10, criterion: '给出翻转的相位、整圈旋转的负号以及相干比较的含义。'},
    ],
  },
  {
    id: 'g06-b03', chapter: 'g06', topic: '正方形势阱的旋转简并', difficulty: '挑战', type: 'written',
    source: {label, ref: '习题 6.33', page: 236},
    prompt: tex`边长为 $L$ 的二维正方形无限深势阱以原点为中心。设 $u_n(x)=\sqrt{2/L}\sin[n\pi(x-L/2)/L]$，$\psi_{ab}=u_a(x)u_b(y)$，$a\ne b$。求主动逆时针 $90^\circ$ 旋转将 $\psi_{ab}$ 变到 $\psi_{ba}$ 时的系数。证明当 $a,b$ 同奇偶时，$\psi_\pm=(\psi_{ab}\pm\psi_{ba})/\sqrt2$ 都是旋转本征态。对 $a=5,b=7$，画出 $\psi_-$ 的有符号等高线，并检验正方形的旋转与反射如何作用于该态。指出这些操作能否把 $\psi_-$ 变为 $\psi_+$。`,
    hint: tex`主动逆时针旋转 $90^\circ$ 后，计算原波函数在逆旋转坐标 $(y,-x)$ 的值。先求 $u_n(-x)$ 与 $u_n(x)$ 的关系。`,
    explanation: tex`有 $u_n(-x)=(-1)^{n+1}u_n(x)$。因此 $(R\psi_{ab})(x,y)=\psi_{ab}(y,-x)=(-1)^{b+1}\psi_{ba}(x,y)$，而能量只含 $a^2+b^2$，交换两量子数能量不变。若 $a,b$ 同奇偶，令 $s=(-1)^{a+1}=(-1)^{b+1}$，则 $R\psi_\pm=\pm s\psi_\pm$。

对 $a=5,b=7$，可按 $L=1$ 画图。用于画等高线的表达式为
$$\psi_-(x,y)=\frac{\sqrt2}{L}\left[\cos(7\pi x/L)\cos(5\pi y/L)-\cos(5\pi x/L)\cos(7\pi y/L)\right].$$
绘图时选关于零对称的正负等高值。图案对横、纵中线反射保持符号，对两条对角线反射交换正负，其中两条对角线本身是节点。转动 $90^\circ$ 或 $270^\circ$ 交换正负，转动 $180^\circ$ 保持符号。这些操作只把 $\psi_-$ 乘上 $+1$ 或 $-1$，因此无法把它变成正交的 $\psi_+$。此对简并无法单靠正方形的离散几何操作把两支联系起来。`,
    parts: [
      {label: '（a）逆时针旋转的系数', points: 11, criterion: '正确使用逆旋坐标和一维宇称，得到旋转系数。'},
      {label: '（b）同奇偶的旋转本征态', points: 9, criterion: '写出两个态各自的本征值，说明同奇偶的作用。'},
      {label: '（c）等高线和几何对称性', points: 10, criterion: '给出符号可区分的等高线或正确指出节点和所有对称操作的符号，判断两态不能由方形对称操作互变。'},
    ],
  },
];
