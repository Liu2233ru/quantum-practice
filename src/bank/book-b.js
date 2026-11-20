const math = String.raw;

function griffiths(number, page) {
  return { label: '格里菲斯《量子力学概论》第3版', ref: '习题 ' + number, page };
}

export const bookB = [
  {
    id: 'g07-b01',
    chapter: 'g07',
    topic: '无限深势阱中心的 δ 势',
    difficulty: '基础',
    type: 'written',
    source: griffiths('7.1', 245),
    prompt: math`一维无限深势阱位于 $0<x<a$，在阱中心加入弱扰动 $H'=\alpha\delta(x-a/2)$。
（a）求各态的一阶能量修正，解释偶数 $n$ 的情形。
（b）将基态的一阶波函数修正写成未扰动本征态之和，给出前三个非零项。`,
    hint: math`所有扰动矩阵元都由波函数在井中心的取值决定。求基态态修正时去掉 $n=1$ 本身。`,
    explanation: math`取 $\phi_n=\sqrt{2/a}\sin(n\pi x/a)$，记 $E_*=\pi^2\hbar^2/(2ma^2)$。一阶能移为 $(2\alpha/a)\sin^2(n\pi/2)$。偶数 $n$ 在中心有节点，$\delta$ 势对这些本征态的作用为零，故它们的原有能量和本征函数仍成立。
基态修正的第 $n$ 项系数为 $2\alpha\sin(n\pi/2)/[aE_*(1-n^2)]$，其中 $n\ne 1$。依次取 $n=3,5,7$ 得
$$
\phi_1^{(1)}=\frac{\alpha}{aE_*}\left(\frac{\phi_3}{4}-\frac{\phi_5}{12}+\frac{\phi_7}{24}+\cdots\right).
$$`,
    parts: [
      { label: '（a）能移和节点', points: 4, criterion: '写出归一化本征态、正确的奇偶能移，并指出偶数态在中心为零。' },
      { label: '（b）三个态修正项', points: 6, criterion: '写出一般系数，正确给出前三个非零项的本征态、大小与符号。' },
    ],
  },
  {
    id: 'g07-b02',
    chapter: 'g07',
    topic: '全同玻色子的接触扰动',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('7.3', 246),
    prompt: math`两个自旋为零的全同玻色子在同一个宽为 $a$ 的一维无限深势阱内，存在微弱相互作用 $V=-aV_0\delta(x_1-x_2)$。
（a）忽略相互作用，分别求基态和第一激发态的归一化空间波函数与能量。
（b）求这两个能级的一阶能移。`,
    hint: math`第一激发态要交换对称。对接触作用积分时，令两个坐标均等于 $x$。`,
    explanation: math`以 $\phi_n=\sqrt{2/a}\sin(n\pi x/a)$ 表示单粒子态，$E_n=n^2 E_*$，其中 $E_*=\pi^2\hbar^2/(2ma^2)$。基态为 $\phi_1(x_1)\phi_1(x_2)$，能量是 $2E_*$。第一激发态为 $[\phi_1(x_1)\phi_2(x_2)+\phi_2(x_1)\phi_1(x_2)]/\sqrt2$，能量是 $5E_*$。
任一态的一阶能移为 $-aV_0\int_0^a|\Psi(x,x)|^2 dx$。由三角函数积分，$\int\phi_1^4dx=3/(2a)$，$\int\phi_1^2\phi_2^2dx=1/a$。第一激发态在对角线上有 $\sqrt2\phi_1\phi_2$，因此两态能移分别为 $-3V_0/2$ 和 $-2V_0$。`,
    parts: [
      { label: '（a）未扰动的两个能级', points: 8, criterion: '两个波函数满足玻色交换对称性及归一化，能量分别为单粒子基态能的两倍和五倍。' },
      { label: '（b）接触相互作用', points: 12, criterion: '将双重积分化到对角线上，保留第一激发态的对称叠加因子，并算出两个能移。' },
    ],
  },
  {
    id: 'g07-b03',
    chapter: 'g07',
    topic: '耦合振子模型中的范德瓦耳斯能',
    difficulty: '挑战',
    type: 'written',
    source: griffiths('7.37', 272),
    prompt: math`两个固定原子核相距 $R$，各有一个质量为 $m$、电荷为 $-e$ 的电子在连线方向上谐振，弹性常数为 $k$。电子相对各自核的位置为 $x_1,x_2$，向右为正。初始频率为 $\omega_0=\sqrt{k/m}$。
（a）列出两原子之间的四项库仑相互作用，并在 $|x_1|,|x_2|\ll R$ 下保留首个非零项。
（b）用 $x_\pm=(x_1\pm x_2)/\sqrt2$ 和相应共轭动量把二次哈密顿量解耦。
（c）在偶极耦合远弱于 $k$ 时，从两个正则频率求总基态能移的主导项。
（d）对同一个偶极耦合做二阶微扰，复现能移。`,
    hint: math`分别展开每个距离的倒数。二阶微扰中，$x_1x_2$ 对 $|0,0\rangle$ 的作用只产生 $|1,1\rangle$。`,
    explanation: math`核–核、两项核–电子及电子–电子给出 $H'=\frac{e^2}{4\pi\varepsilon_0}[1/R-1/(R-x_1)-1/(R+x_2)+1/(R-x_1+x_2)]$。常数与一次项抵消，首个非零项为 $-g x_1 x_2$，其中 $g=e^2/(2\pi\varepsilon_0 R^3)$。
正交变换保持动能形式，且 $x_1x_2=(x_+^2-x_-^2)/2$，所以二次势的两个劲度为 $k-g$ 和 $k+g$。令 $\xi=g/k$，能量是 $\hbar\omega_0(\sqrt{1-\xi}+\sqrt{1+\xi})/2$。展开抵消线性项，在偶极模型内得到
$$
\Delta E\simeq -\frac{\hbar g^2}{8m^2\omega_0^3}\propto -R^{-6}.
$$
微扰计算中一阶为零，且 $|\langle1,1|-g x_1x_2|0,0\rangle|=g\hbar/(2m\omega_0)$，分母为 $-2\hbar\omega_0$，给出相同结果。这里两种算法都针对相同的偶极截断。`,
    parts: [
      { label: '（a）两原子间的势', points: 10, criterion: '四项距离和电荷符号正确，展开得到负的偶极耦合项。' },
      { label: '（b）正则坐标与频率', points: 10, criterion: '变换坐标及共轭动量，写出两个解耦振子及各自频率。' },
      { label: '（c）基态能量的展开', points: 10, criterion: '把两个零点能相加，说明一阶抵消，给出主导能移、符号和距离标度。' },
      { label: '（d）微扰核验', points: 10, criterion: '解释一阶为零，确定唯一的中间态及能量分母，复现系数。' },
    ],
  },
  {
    id: 'g08-b01',
    chapter: 'g08',
    topic: '线性势和四次势的高斯变分',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('8.1', 286),
    prompt: math`对一维粒子使用高斯试探态 $\psi_b=Ae^{-bx^2}$，其中 $b>0$。
（a）归一化试探态并求动能期望。
（b）当 $V(x)=\alpha|x|$ 时，求此试探族给出的最佳基态能量上界。
（c）当 $V(x)=\alpha x^4$ 时重复计算。两种情况下均取 $\alpha>0$。`,
    hint: math`奇次绝对值矩可以在正半轴换元。偶次高斯矩可以对基本归一化积分求导。`,
    explanation: math`归一化给出 $A=(2b/\pi)^{1/4}$，动能由 $\int|\psi_b'|^2dx$ 得 $\hbar^2b/(2m)$。记 $K=\hbar^2/(2m)$。
线性势下 $\langle |x|\rangle=1/\sqrt{2\pi b}$，所以 $E(b)=Kb+Bb^{-1/2}$，$B=\alpha/\sqrt{2\pi}$。最优 $b=(B/2K)^{2/3}$，最低期望为 $3K(B/2K)^{2/3}$。
四次势下 $\langle x^4\rangle=3/(16b^2)$，所以 $E(b)=Kb+Db^{-2}$，$D=3\alpha/16$。最优 $b=(2D/K)^{1/3}$，能量上界为 $(3K/2)(2D/K)^{1/3}$。两种期望都在 $b\to0^+$ 和 $b\to\infty$ 时发散，正驻点给出各自最小值。`,
    parts: [
      { label: '（a）归一化及动能', points: 4, criterion: '给出归一化系数，并用导数平方或直接计算得到动能。' },
      { label: '（b）线性势的优化', points: 8, criterion: '正确计算绝对值一阶矩，写出驻点及该点能量。' },
      { label: '（c）四次势的优化', points: 8, criterion: '求出四阶矩和新的最优参数，并写出极小能量。' },
    ],
  },
  {
    id: 'g08-b02',
    chapter: 'g08',
    topic: '用奇宇称试探态估计激发能',
    difficulty: '基础',
    type: 'written',
    source: griffiths('8.4', 287),
    prompt: math`（a）证明与精确基态正交的归一化试探态，其平均能量不低于第一激发能。
（b）用 $\psi_b(x)=Axe^{-bx^2}$、$b>0$ 估计频率为 $\omega$ 的一维简谐振子第一激发能。说明正交性的来源，并求此试探族的最优上界。`,
    hint: math`按能量本征态展开可证（a）。对于（b），基态为偶函数，试探函数为奇函数。`,
    explanation: math`在能量本征基展开后，正交条件令基态系数为零，因此平均能量是第一激发能及更高能量的加权平均，故 $\langle H\rangle\ge E_1$。
简谐振子的偶基态与奇试探态自动正交。归一化后可算得 $\langle x^2\rangle=3/(4b)$，$\int |\psi_b'|^2 dx=3b$。于是 $E(b)=3\hbar^2 b/(2m)+3m\omega^2/(8b)$，在 $b=m\omega/(2\hbar)$ 时取最小值 $3\hbar\omega/2$。该最优试探函数就是精确第一激发态的形状，所以此处达到等号。`,
    parts: [
      { label: '（a）激发态上界证明', points: 4, criterion: '用正交性消除基态权重，通过能谱展开证明所求不等式。' },
      { label: '（b）振子奇态优化', points: 6, criterion: '说明宇称保证正交，写出两项能量期望，求参数极小值和能量。' },
    ],
  },
  {
    id: 'g08-b03',
    chapter: 'g08',
    topic: '无限深势阱中的广义幂次试探态',
    difficulty: '挑战',
    type: 'written',
    source: griffiths('8.16', 300),
    prompt: math`在一维无限深势阱 $0<x<a$ 内取试探态 $\psi=A[x(a-x)]^p$，阱外为零。
（a）先取 $p=1$，求归一化常数及基态能量上界。
（b）允许 $p$ 取实数，找出动能期望有限的范围和最佳 $p$，给出对应上界并与精确基态能量比较。`,
    hint: math`把能量写成导数平方与波函数平方的积分之比。令 $y=x/a$ 后用贝塔积分 $B(u,v)=\int_0^1 y^{u-1}(1-y)^{v-1}\,dy$。`,
    explanation: math`$p=1$ 时，$\int_0^a x^2(a-x)^2\,dx=a^5/30$，故 $A=\sqrt{30/a^5}$。再用 $\int_0^a(a-2x)^2 dx=a^3/3$，得到 $E=10\hbar^2/(2ma^2)$。
一般的衰减试探态在端点附近满足 $|\psi'|^2\sim x^{2p-2}$，有限动能要求 $p>1/2$。换元后
$$
\frac{2ma^2 E(p)}{\hbar^2}
=\frac{p^2 B(2p-1,2p-1)}{(4p-1)B(2p+1,2p+1)}
=\frac{2p(4p+1)}{2p-1}.
$$
第一步用对称贝塔权重下 $(1-2y)^2$ 的平均值 $1/(4p-1)$。令 $s=2p-1$，上式变为 $5+2s+3/s$，最小点为 $s=\sqrt{3/2}$。于是 $p=(1+\sqrt{3/2})/2$，上界系数为 $5+2\sqrt6\approx9.899$，精确系数为 $\pi^2\approx9.870$，上界约高 $0.30\%$。`,
    parts: [
      { label: '（a）抛物线试探态', points: 8, criterion: '正确归一化，并计算能量系数 10。' },
      { label: '（b）幂次与可积性', points: 12, criterion: '给出有限动能的条件，按贝塔积分或等价方法导出 E(p)。' },
      { label: '（b）最小值与精确能量', points: 10, criterion: '找到最优 p 和能量上界，说明与精确值的定量差异。' },
    ],
  },
  {
    id: 'g09-b01',
    chapter: 'g09',
    topic: '从相位的半经典展开推导 WKB',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('9.2', 310),
    prompt: math`在经典允许区 $p(x)=\sqrt{2m(E-V(x))}>0$，写 $\psi=e^{if(x)/\hbar}$，允许 $f$ 取复值。
（a）将此表示代入定态薛定谔方程，求 $f$ 的方程。
（b）令 $f=f_0+\hbar f_1+\hbar^2 f_2+\cdots$，从 $\hbar^0$ 到 $\hbar^2$ 逐阶配系数。
（c）解出 $f_0$ 和 $f_1$，恢复 WKB 的传播相位和振幅。`,
    hint: math`对指数求两次导数。$f_1$ 的导数可写为 $f_0'$ 的对数导数。`,
    explanation: math`利用 $\psi''/\psi=if''/\hbar-(f')^2/\hbar^2$ 得 $i\hbar f''-(f')^2+p^2=0$。前三阶的方程依次为
$$
(f_0')^2=p^2,\qquad
if_0''=2f_0'f_1',\qquad
if_1''=2f_0'f_2'+(f_1')^2.
$$
所以 $f_0=\pm\int^x p\,dx'$，$f_1'=(i/2)p'/p$，积分得 $f_1=(i/2)\ln p$ 加常数。常数可吸收入归一化因子，最终单支解为 $C p^{-1/2}\exp[\pm(i/\hbar)\int^x p\,dx']$。局部相位的下一项为纯虚数，决定振幅。`,
    parts: [
      { label: '（a）指数代入', points: 5, criterion: '保留二次导数的两项，给出相位满足的非线性方程。' },
      { label: '（b）三阶配系数', points: 7, criterion: '写对零阶、一阶及二阶方程，二阶中保留一阶导数的平方。' },
      { label: '（c）相位与振幅', points: 8, criterion: '求出两支 f₀ 和 f₁，并恢复 p 的负二分之一次方振幅。' },
    ],
  },
  {
    id: 'g09-b02',
    chapter: 'g09',
    topic: '转折点匹配区的精度估计',
    difficulty: '挑战',
    type: 'written',
    source: griffiths('9.9', 321),
    prompt: math`质量 $m$ 的粒子处于角频率 $\omega$ 的简谐振子第 $n$ 能级，$n$ 从 0 编号。
（a）求右侧经典转折点 $x_2$。
（b）将势能在 $x_2$ 处线性化，求使 $[V(x_2+d)-V_{\rm lin}(x_2+d)]/V(x_2)=0.01$ 的正 $d$。
（c）艾里函数大正自变量渐近式在 $z\ge5$ 时达到题设精度。若 $z=\alpha(x-x_2)$，求使最大距离处 $\alpha d\ge5$ 的最小 $n$。`,
    hint: math`局部斜率是 $F=m\omega^2x_2$，艾里变量的逆长度为 $\alpha=(2mF/\hbar^2)^{1/3}$。`,
    explanation: math`由 $V(x_2)=(n+1/2)\hbar\omega$ 得 $x_2=\sqrt{(2n+1)\hbar/(m\omega)}$。线性化遗漏 $m\omega^2d^2/2$，其与 $V(x_2)$ 的比是 $(d/x_2)^2$，因此 $d=x_2/10$。
将此结果代入艾里尺度，得到 $\alpha d=[2(2n+1)^2]^{1/3}/10$。要求 $\alpha d\ge5$ 即 $2(2n+1)^2\ge50^3$，也就是 $2n+1\ge250$。量子数取整数，最小值为 $n=125$。这表示可以找到一点同时满足题设的线性势和渐近式精度条件。`,
    parts: [
      { label: '（a）右转折点', points: 6, criterion: '用精确振子能量写出正根，并保留零点能。' },
      { label: '（b）线性化误差', points: 10, criterion: '正确识别二次余项并得到 d 等于转折点坐标的十分之一。' },
      { label: '（c）同时满足两个精度条件', points: 14, criterion: '用局部斜率确定尺度，化为 n 的不等式，取出最小整数 125。' },
    ],
  },
  {
    id: 'g09-b03',
    chapter: 'g09',
    topic: '一般幂律阱的半经典能谱',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('9.13', 322),
    prompt: math`对一维势 $V(x)=\alpha|x|^\nu$，其中 $\alpha,\nu>0$，用 WKB 估计束缚能谱。取 $n=1,2,\ldots$ 从最低能级编号。
（a）写出两转折点，换元得到无量纲作用量积分。
（b）求积分并解出 $E_n$，用伽马函数表示系数。
（c）以 $\nu=2$ 与谐振子能谱核验。`,
    hint: math`先令 $u=x/x_t$，再用 $s=u^\nu$ 化成贝塔积分。两端都是平滑转折点。`,
    explanation: math`正转折点 $x_t=(E/\alpha)^{1/\nu}$，负转折点为 $-x_t$。允许区作用量为 $2\sqrt{2mE}(E/\alpha)^{1/\nu}\int_0^1\sqrt{1-u^\nu}\,du$。积分等于 $B(1/\nu,3/2)/\nu$，即 $\sqrt\pi\,\Gamma(1+1/\nu)/[2\Gamma(3/2+1/\nu)]$。令总作用量为 $(n-1/2)\pi\hbar$，得到
$$
E_n=\alpha\left[(n-\tfrac12)\hbar\sqrt{\frac{\pi}{2m\alpha}}\,
\frac{\Gamma(3/2+1/\nu)}{\Gamma(1+1/\nu)}\right]^{2\nu/(\nu+2)}.
$$
当 $\nu=2$ 时，$\Gamma(2)/\Gamma(3/2)=2/\sqrt\pi$，写 $\alpha=m\omega^2/2$ 得 $E_n=(n-1/2)\hbar\omega$，与精确能谱一致。`,
    parts: [
      { label: '（a）作用量和尺度', points: 5, criterion: '找到两转折点，正确保留正负两侧贡献并将作用量无量纲化。' },
      { label: '（b）能谱公式', points: 11, criterion: '正确变换贝塔积分，使用两端转折点的量子化条件，给出能谱系数与幂指数。' },
      { label: '（c）谐振子极限', points: 4, criterion: '带入二次势并得到正确的频率和零点能。' },
    ],
  },
  {
    id: 'g10-b01',
    chapter: 'g10',
    topic: '排斥性 δ 球壳的低能散射',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('10.4', 334),
    prompt: math`质量为 $m$ 的粒子在球壳势 $V(r)=\alpha\delta(r-a)$ 上散射，$\alpha,a>0$。在 $ka\ll1$ 时仅保留 $s$ 波。
（a）用约化径向函数的边界条件求低能散射长度。
（b）求领先阶散射振幅、微分截面和总截面，以 $\beta=2ma\alpha/\hbar^2$ 表示。`,
    hint: math`在零能极限，内外约化径向函数都为线性函数。外部零能解写成与 $r-a_s$ 成正比，$a_s$ 为散射长度。`,
    explanation: math`内外零能解可以分别写成 $u_{\rm in}=Cr$ 和 $u_{\rm out}=D(r-a_s)$。连续性给出 $Ca=D(a-a_s)$。对径向方程跨壳积分，得到 $D-C=(2m\alpha/\hbar^2)D(a-a_s)$。代入连续条件有 $a_s=\beta(a-a_s)$，故 $a_s=a\beta/(1+\beta)$。
低能 $s$ 波有 $\delta_0\simeq-ka_s$，因此 $f=e^{i\delta_0}\sin\delta_0/k\simeq-a_s$。截面为 $d\sigma/d\Omega\simeq a_s^2$，积分得 $\sigma\simeq 4\pi a^2\beta^2/(1+\beta)^2$。$\beta\to\infty$ 时 $a_s\to a$，得到硬球的低能结果。`,
    parts: [
      { label: '（a）零能径向解与跃变', points: 12, criterion: '正确给出内外解、连续性与导数跃变，求得散射长度。' },
      { label: '（b）振幅和截面', points: 8, criterion: '用相移与散射长度的关系得到有符号的低能振幅，再求两种截面。' },
    ],
  },
  {
    id: 'g10-b02',
    chapter: 'g10',
    topic: '用分波展开证明光学定理',
    difficulty: '基础',
    type: 'written',
    source: griffiths('10.19', 345),
    prompt: math`对实中心势的弹性散射，用分波量证明 $\sigma=(4\pi/k)\operatorname{Im}f(0)$。
（a）写出前向振幅的虚部，保留每个分波的权重。
（b）从分波振幅积分得到总截面，并完成比较。`,
    hint: math`前向有 $P_l(1)=1$。角积分用勒让德多项式的正交性。弹性条件下的相移为实数。`,
    explanation: math`分波展开为 $f(\theta)=k^{-1}\sum_l(2l+1)e^{i\delta_l}\sin\delta_l P_l(\cos\theta)$。由于 $P_l(1)=1$ 且 $\operatorname{Im}(e^{i\delta_l}\sin\delta_l)=\sin^2\delta_l$，前向虚部为 $k^{-1}\sum_l(2l+1)\sin^2\delta_l$。
对 $|f|^2$ 积分时，$\int P_l P_{l'}\,d\Omega=4\pi\delta_{ll'}/(2l+1)$。交叉项消失，得 $\sigma=(4\pi/k^2)\sum_l(2l+1)\sin^2\delta_l$，由此得到给定关系。`,
    parts: [
      { label: '（a）前向虚部', points: 5, criterion: '给出分波展开及正确的角动量权重，并对前向振幅取虚部。' },
      { label: '（b）截面积分', points: 5, criterion: '正确使用正交性并保留 4π 因子，将总截面与前向虚部联系起来。' },
    ],
  },
  {
    id: 'g10-b03',
    chapter: 'g10',
    topic: '高斯势的一阶玻恩总截面',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('10.20', 345),
    prompt: math`粒子质量为 $m$，入射波数 $k=\sqrt{2mE}/\hbar$，散射势为 $V(r)=Ae^{-\mu r^2}$，其中 $\mu>0$。用一阶玻恩近似求总截面。
（a）作高斯势的傅里叶变换，写出角分布。
（b）对角度积分，将结果用 $A,\mu,m,k$ 表示，并写出 $k\to0$ 时的极限。`,
    hint: math`用三个一维高斯积分求傅里叶变换。弹性散射有 $q^2=2k^2(1-\cos\theta)$，角积分可令 $u=\cos\theta$。`,
    explanation: math`常用散射振幅归一化给出 $f_B=-[m/(2\pi\hbar^2)]A(\pi/\mu)^{3/2}e^{-q^2/(4\mu)}$。因此 $d\sigma/d\Omega=\pi m^2A^2e^{-k^2(1-\cos\theta)/\mu}/(4\hbar^4\mu^3)$。
记 $b=k^2/\mu$。对角度积分得到 $2\pi\int_{-1}^1 e^{-b(1-u)}\,du=2\pi(1-e^{-2b})/b$，所以
$$
\sigma_B=\frac{\pi^2m^2 A^2}{2\hbar^4\mu^2 k^2}(1-e^{-2k^2/\mu}).
$$
在玻恩近似仍适用时，令 $k\to0$ 得 $\pi^2m^2A^2/(\hbar^4\mu^3)$，也等于低能各向同性截面乘 $4\pi$。`,
    parts: [
      { label: '（a）振幅及微分截面', points: 9, criterion: '傅里叶积分的系数和指数正确，从波矢差得到角分布。' },
      { label: '（b）总截面及低能检查', points: 11, criterion: '完整计算角度积分，给出总截面并从指数展开求低能极限。' },
    ],
  },
  {
    id: 'g11-b01',
    chapter: 'g11',
    topic: '高斯脉冲的突然与绝热极限',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('11.8', 354),
    prompt: math`两能级能量差为 $\hbar\omega_0$，非对角扰动为 $H'_{ab}=H'_{ba}=\alpha e^{-(t/\tau)^2}/(\sqrt\pi\,\tau)$，两对角项为零，$\tau>0$，$\alpha$ 为实常数。系统在 $t=-\infty$ 处于 $a$ 态。
（a）用一阶含时微扰求 $t=+\infty$ 时的跃迁概率。
（b）令 $\tau\to0$，将结果与同面积的 $\alpha\delta(t)$ 脉冲比较。
（c）固定 $\omega_0>0$，给出 $\omega_0\tau\gg1$ 的极限并解释。`,
    hint: math`跃迁振幅正比于脉冲在频率 $\omega_0$ 的傅里叶分量。高斯脉冲的面积由参数 $\alpha$ 固定。`,
    explanation: math`积分得
$$
c_b^{(1)}(\infty)=-\frac{i}{\hbar}\int_{-\infty}^{\infty}H'_{ba}(t)e^{i\omega_0t}\,dt
=-\frac{i\alpha}{\hbar}e^{-\omega_0^2\tau^2/4}.
$$
所以最低阶概率为 $(\alpha/\hbar)^2e^{-\omega_0^2\tau^2/2}$。窄脉冲极限给出 $(\alpha/\hbar)^2$。对同面积的瞬时脉冲，传播矩阵是 $e^{-i\alpha\sigma_x/\hbar}$，精确概率为 $\sin^2(\alpha/\hbar)$，其最低阶与上式一致。
固定面积和能隙，$\tau$ 很大时，脉冲在跃迁频率处的谱分量指数衰减，概率趋零。缓慢打开、关掉耦合后，态在绝热极限回到原能级。`,
    parts: [
      { label: '（a）跃迁振幅和概率', points: 10, criterion: '正确写出全时间积分并完成高斯变换，区分振幅与概率的指数。' },
      { label: '（b）短脉冲比较', points: 6, criterion: '给出固定面积的零宽度极限，并说明与瞬时脉冲的最低阶结果一致。' },
      { label: '（c）慢脉冲极限', points: 4, criterion: '指出非零能隙下的概率趋零，用谱宽或绝热跟随解释。' },
    ],
  },
  {
    id: 'g11-b02',
    chapter: 'g11',
    topic: '从薛定谔方程推导戴森级数',
    difficulty: '挑战',
    type: 'written',
    source: griffiths('11.23', 377),
    prompt: math`设 $G(t)=-\frac{i}{\hbar}\int_0^t H(s)ds$，哈密顿量可能在不同时刻互不对易。
（a）直接对 $e^{G(t)}$ 的幂级数求导，证明当所有考察时刻满足 $[G(t),H(t)]=0$ 时，$e^{G(t)}$ 是演化算符。
（b）由演化的积分方程写出前三个非平凡阶的迭代项，说明算符顺序。
（c）引入时间排序算符 $\mathcal T$，证明时间排序后的指数展开给出上述演化。明确阶乘从何而来。`,
    hint: math`把积分方程本身代回右边。再将 $[0,t]^n$ 按各时间变量的大小切分成相同的有序区域。`,
    explanation: math`对 $G^n$ 求导产生 $\sum_{j=0}^{n-1}G^j\dot G G^{n-1-j}$。当 $[G,\dot G]=0$ 时，各项相同，故 $\frac{d}{dt}e^G=\dot G e^G=-iH(t)e^G/\hbar$。又 $G(0)=0$，所以该指数满足所需初值。
一般地由 $U(t)=I-(i/\hbar)\int_0^t H(t_1)U(t_1)\,dt_1$ 迭代。第 $n$ 阶为
$$
\left(\frac{-i}{\hbar}\right)^n
\int_{0<t_n<\cdots<t_1<t}
H(t_1)\cdots H(t_n)\,dt_1\cdots dt_n .
$$
取 $n=1,2,3$ 即前三个非平凡阶。最晚时刻的算符排在左边。对 $[0,t]^n$ 时间排序后积分，可按 $n!$ 种大小次序分区。每区经重命名都等于同一个有序积分，除以 $n!$ 恢复迭代项。逐阶相加得到 $U(t)=\mathcal T\exp[-(i/\hbar)\int_0^t H(s)ds]$。`,
    parts: [
      { label: '（a）普通指数的可用条件', points: 10, criterion: '给出非对易情形的乘积求导式，使用对易条件和初值证明。' },
      { label: '（b）迭代及算符次序', points: 15, criterion: '从积分方程得到一至三阶，或给出适用于这三阶的通式，积分边界与算符顺序均正确。' },
      { label: '（c）时间排序指数', points: 15, criterion: '通过积分区域分区解释阶乘，并恢复一般的戴森表达式。' },
    ],
  },
  {
    id: 'g11-b03',
    chapter: 'g11',
    topic: '暂时抬高半阱底部后的跃迁概率',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('11.27', 379),
    prompt: math`粒子起初位于宽度为 $a$ 的一维无限深势阱基态。自 $t=0$ 起至 $T$ 止，将 $0<x<a/2$ 一侧底部升到 $V_0$，$a/2<x<a$ 保持为零，$V_0\ll E_1$。在 $T$ 移去这一扰动并立即测量原哈密顿量的能量。
（a）计算原阱前两个本征态之间的扰动矩阵元。
（b）用一阶态修正求测得 $E_2$ 的概率随 $T$ 的变化。`,
    hint: math`态之间的空间积分限在被抬高的半阱。相互作用绘景的时间积分含相位 $e^{i(E_2-E_1)t/\hbar}$。`,
    explanation: math`用 $\phi_n=\sqrt{2/a}\sin(n\pi x/a)$，矩阵元为 $V_{21}=(2V_0/a)\int_0^{a/2}\sin(2\pi x/a)\sin(\pi x/a)\,dx=4V_0/(3\pi)$。以 $\Delta=E_2-E_1=3\pi^2\hbar^2/(2ma^2)$ 记能隙，$c_2^{(1)}(T)=(V_{21}/\Delta)(1-e^{i\Delta T/\hbar})$。
扰动移去后测量原能量本征态，概率为
$$
P_2(T)=\frac{64V_0^2}{9\pi^2\Delta^2}\sin^2\!\left(\frac{\Delta T}{2\hbar}\right).
$$
这是最低非零阶结果，$T\to0$ 时按 $|V_{21}|^2T^2/\hbar^2$ 增长。`,
    parts: [
      { label: '（a）半阱矩阵元', points: 8, criterion: '使用归一化波函数并按实际作用区间积分，得到正确矩阵元。' },
      { label: '（b）有限时间跃迁', points: 12, criterion: '积分得到跃迁振幅，对其取模平方，并用原阱能隙表示振荡。' },
    ],
  },
  {
    id: 'g12-b01',
    chapter: 'g12',
    topic: '两分量纠缠态不可因式分解',
    difficulty: '基础',
    type: 'written',
    source: griffiths('12.1', 389),
    prompt: math`令 $|\phi_a\rangle,|\phi_b\rangle$ 为正交归一的单粒子态，两个子系统各以这两态为基底。设 $\alpha,\beta$ 均不为零。
（a）假设 $\alpha|\phi_a\rangle_1|\phi_b\rangle_2+\beta|\phi_b\rangle_1|\phi_a\rangle_2$ 可以写为两个单粒子态的乘积，在积基底中展开这一假设。
（b）比较四个分量，给出矛盾并得出结论。`,
    hint: math`一个积态的四个系数来自两个二分量列向量的外积，秩至多为 1。`,
    explanation: math`将两因子写成 $(u|\phi_a\rangle_1+v|\phi_b\rangle_1)(s|\phi_a\rangle_2+t|\phi_b\rangle_2)$，四个系数为 $us,ut,vs,vt$。目标态要求 $ut=\alpha$，$vs=\beta$，且 $us=vt=0$。前两个非零等式要求 $u,v,s,t$ 均非零，与后两个条件矛盾。
等价地，目标系数矩阵为 $\begin{pmatrix}0&\alpha\\\beta&0\end{pmatrix}$，行列式是 $-\alpha\beta\ne0$，故其秩为 2，无法表示成单粒子向量的外积。`,
    parts: [
      { label: '（a）积态的分量约束', points: 4, criterion: '构造一般积态，写出对应的四个分量或等价的秩一结构。' },
      { label: '（b）不可分性证明', points: 6, criterion: '利用两个非零交叉项与两个零对角项证明矛盾，也可用正确的行列式判据。' },
    ],
  },
  {
    id: 'g12-b02',
    chapter: 'g12',
    topic: '经典棒球模型与贝尔不等式',
    difficulty: '挑战',
    type: 'written',
    source: griffiths('12.3', 394),
    prompt: math`经典双粒子模型发射两枚自旋向量相反的棒球 $\mathbf S$ 和 $-\mathbf S$，其中 $\mathbf S$ 各向同性。两个探测器分别记录 $\mathbf a\cdot\mathbf S$ 与 $-\mathbf b\cdot\mathbf S$ 的符号 $A,B$。取 $\mathbf a$ 沿 $x$ 轴、$\mathbf b$ 在 $xy$ 平面且方位为 $\eta\in[-\pi,\pi]$，$\mathbf S$ 的方位为 $\phi$。
（a）将 $AB$ 写成 $\phi,\eta$ 的函数。
（b）对随机方向平均求 $P_{\rm cl}(\mathbf a,\mathbf b)=\langle AB\rangle$。
（c）画出或用关键点和形状描述经典关联与量子单态关联 $-\cos\eta$，找出二者重合的角度。
（d）验证经典模型满足 $|P(\mathbf a,\mathbf b)-P(\mathbf a,\mathbf c)|\le1+P(\mathbf b,\mathbf c)$。`,
    hint: math`计算两个余弦异号所占的方位角长度。最后把 $P_{\rm cl}$ 写成两个单位向量夹角的线性函数。`,
    explanation: math`若 $\mathbf S$ 的极角为 $\vartheta$，两次投影因子依次为 $\sin\vartheta\cos\phi$ 和 $-\sin\vartheta\cos(\phi-\eta)$。除去零测度的投影零点，$AB=-\operatorname{sign}[\cos\phi\,\cos(\phi-\eta)]$。
异号区是两个总长度为 $2|\eta|$ 的方位区间。在均匀 $\phi$ 下，异号使 $AB=+1$ 的概率为 $|\eta|/\pi$，故 $P_{\rm cl}=2|\eta|/\pi-1$。它是偶的分段直线，从 $0$ 处的 $-1$ 经 $|\eta|=\pi/2$ 处的 $0$ 到 $|\eta|=\pi$ 处的 $1$。$-\cos\eta$ 必经这三组位置。它在 $(0,\pi/2)$ 严格凸，且关于 $(\pi/2,0)$ 中心对称，因此两曲线仅在这些位置相等。
记单位向量 $\mathbf u,\mathbf v$ 的球面角距为 $d_{uv}$。代入关联后，贝尔不等式化为 $|d_{ab}-d_{ac}|\le d_{bc}$，这正是球面角距的反三角不等式。`,
    parts: [
      { label: '（a）投影符号', points: 7, criterion: '正确处理自旋相反的负号，给出两个余弦的符号乘积。' },
      { label: '（b）经典关联', points: 11, criterion: '按均匀方位角计算异号比例，推出线性关联。' },
      { label: '（c）与量子关联比较', points: 10, criterion: '给出曲线形状和所有相等的角度，并解释为何无其他交点。' },
      { label: '（d）贝尔不等式', points: 12, criterion: '把经典关联代入不等式，并将其化为球面角距的反三角不等式。' },
    ],
  },
  {
    id: 'g12-b03',
    chapter: 'g12',
    topic: '布洛赫球上的纯态与混合态',
    difficulty: '进阶',
    type: 'written',
    source: griffiths('12.8', 398),
    prompt: math`考虑自旋 $1/2$ 粒子。
（a）说明一般密度矩阵可写为 $\rho=(I+\mathbf a\cdot\boldsymbol\sigma)/2$，$\mathbf a=(a_1,a_2,a_3)$ 为实向量。
（b）用本征值或幂等性说明物理状态的 $\mathbf a$ 落在单位球内，并给出纯态条件。
（c）对北极、球心、南极，分别求测量 $S_z$ 得 $+\hbar/2$ 的概率。
（d）求赤道上方位角为 $\phi$ 的纯态旋量。`,
    hint: math`泡利矩阵与单位矩阵张成二维厄米矩阵的实向量空间，且 $(\mathbf a\cdot\boldsymbol\sigma)^2=|\mathbf a|^2 I$。`,
    explanation: math`实参数来自厄米性，迹为 1 固定单位矩阵前的系数为 $1/2$。因为 $\mathbf a\cdot\boldsymbol\sigma$ 迹为零且平方为 $|\mathbf a|^2 I$，$\rho$ 的本征值为 $(1\pm|\mathbf a|)/2$。要求半正定得 $|\mathbf a|\le1$，纯态恰在 $|\mathbf a|=1$ 的球面上。
在 $z$ 基底中，得到正结果的概率是 $\rho_{11}=(1+a_3)/2$，所以北极、中心、南极依次为 $1,1/2,0$。赤道点满足 $a_1+ia_2=e^{i\phi}$、$a_3=0$，可取旋量
$$
\chi=\frac{1}{\sqrt2}\begin{pmatrix}1\\e^{i\phi}\end{pmatrix},
$$
其整体相位任意，且 $\chi\chi^\dagger$ 的非对角元为 $e^{-i\phi}/2$ 和 $e^{i\phi}/2$，与该点的密度矩阵一致。`,
    parts: [
      { label: '（a）一般矩阵表示', points: 6, criterion: '使用厄米性及迹条件，给出三个实参数和泡利展开。' },
      { label: '（b）单位球及纯态条件', points: 10, criterion: '说明半正定约束及纯态判据，正确区分球面与球内。' },
      { label: '（c）三点的测量概率', points: 6, criterion: '用正确投影计算三个概率。' },
      { label: '（d）赤道旋量', points: 8, criterion: '给出归一化旋量并保留正确相对相位，整体相位任意。' },
    ],
  },
];
