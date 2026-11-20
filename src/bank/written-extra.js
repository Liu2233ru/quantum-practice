const tex = String.raw;

export const writtenExtra = [
  {
    id: 'e01-w1',
    chapter: 'e01',
    topic: '周期格点上的动量算符',
    difficulty: '进阶',
    type: 'written',
    prompt: tex`用偶数个格点 $N\ge4$ 离散表示长度 $L$ 的一维环，格距 $a=L/N$，格点下标 $j$ 按模 $N$ 计算。定义内积 $\langle f|g\rangle=a\sum_{j=0}^{N-1} f_j^*g_j$ 和中心差分动量 $(P_af)_j=-i\hbar(f_{j+1}-f_{j-1})/(2a)$。证明 $P_a$ 自伴随，求平面波 $f_j\propto e^{ikja}$ 的允许波数和动量本征值，并找出第一布里渊区 $[-\pi/a,\pi/a)$ 内动量为零的所有波数。`,
    hint: tex`在内积求和中分别移动 $g_{j+1}$ 和 $g_{j-1}$ 的下标。周期性确保移动后仍然遍历全部格点。`,
    explanation: tex`先对两个求和项移位，令 $g$ 都带下标 $j$。由此得到
$$\langle f|P_ag\rangle=-\frac{i\hbar}{2}\sum_j(f_{j-1}^*-f_{j+1}^*)g_j=\langle P_af|g\rangle.$$
$P_a$ 定义在整个有限维空间上，故矩阵的对称性给出自伴随。平面波的周期条件要求 $e^{ikNa}=1$，所以 $k=2\pi n/L$，其中 $n$ 与 $n+N$ 给出相同格点波。代入中心差分算符有
$$p_a(k)=-\frac{i\hbar}{2a}(e^{ika}-e^{-ika})=\frac{\hbar}{a}\sin(ka).$$
在给定区间内，$k=0$ 和 $k=-\pi/a$ 都使 $p_a=0$。第二个波数对应相邻格点符号交替的态。两个相邻值 $f_{j+1}$、$f_{j-1}$ 此时相同，中心差分便为零。

自评时核对求和移位及复共轭的符号、平面波的周期条件，以及区间左端点对应的交替格点态。`,
  },
  {
    id: 'e02-w1',
    chapter: 'e02',
    topic: '非正交纯态的最优判别',
    difficulty: '挑战',
    type: 'written',
    prompt: tex`一次实验等概率地制备 $|\psi_\pm\rangle=\cos\theta\,|0\rangle\pm\sin\theta\,|1\rangle$，其中 $0<\theta<\pi/4$。实验者测量二元 POVM $\{E,I-E\}$，其中 $0\le E\le I$，结果 $E$ 对应猜测 $+$。求最大猜对概率，给出实现它的测量，并说明为什么任何允许的 $E$ 都无法取得更高概率。`,
    hint: tex`将猜对概率整理为 $1/2+\operatorname{Tr}[E(\rho_+-\rho_-)]/2$，再在 $\rho_+-\rho_-$ 的本征基中利用 $0\le\langle u|E|u\rangle\le1$。`,
    explanation: tex`记 $\rho_\pm=|\psi_\pm\rangle\langle\psi_\pm|$。根据等先验和测量概率，
$$P_{\rm correct}=\tfrac12\operatorname{Tr}(E\rho_+)+\tfrac12\operatorname{Tr}[(I-E)\rho_-]=\tfrac12+\tfrac12\operatorname{Tr}[E(\rho_+-\rho_-)].$$
两密度矩阵的对角元一样，相减后得到 $\rho_+-\rho_-=\sin(2\theta)\sigma_x$。在 $\sigma_x$ 的归一本征基 $|x_\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ 中，
$$\operatorname{Tr}[E(\rho_+-\rho_-)]=\sin(2\theta)\big(\langle x_+|E|x_+\rangle-\langle x_-|E|x_-\rangle\big).$$
$E$ 和 $I-E$ 都半正定，因此括号里的两个数均在 $[0,1]$，差值至多为 $1$。选 $E=|x_+\rangle\langle x_+|$ 可达到界，故 $P_{\rm max}=[1+\sin(2\theta)]/2$。当两态随 $\theta\to0$ 变得相同，极限为 $1/2$。当 $\theta\to\pi/4$ 时，两态正交，极限为 $1$。

自评时核对两种先验都已计入、概率上界适用于任意二元 POVM，以及给出的测量确实达到这个上界。`,
  },
  {
    id: 'e03-w1',
    chapter: 'e03',
    topic: '自由粒子的虚时间传播子',
    difficulty: '进阶',
    type: 'written',
    prompt: tex`自由粒子 $H=P^2/(2m)$ 的虚时间传播子是 $K_E(x,\tau;x_0)=\langle x|e^{-\tau H/\hbar}|x_0\rangle$，其中 $\tau>0$。已知 $\langle x|p\rangle=e^{ipx/\hbar}/\sqrt{2\pi\hbar}$。插入动量完备关系并计算 $K_E$，再由自由粒子哈密顿量推导它在 $x$ 表象满足的偏微分方程。将固定 $x_0$ 的 $K_E$ 视作关于 $x$ 的密度，验证其归一化并给出方差。可用高斯积分 $\int_{\mathbb R}dp\,e^{-Ap^2+iBp}=\sqrt{\pi/A}\,e^{-B^2/(4A)}$，其中 $A>0$、$B$ 为实数。`,
    hint: tex`指数中取 $A=\tau/(2m\hbar)$、$B=(x-x_0)/\hbar$。对 $\tau$ 求导后，先写成 $-H/\hbar$ 作用在传播子上，再代入 $P=-i\hbar\partial_x$。`,
    explanation: tex`在两位置本征态之间插入动量完备关系，并用动能本征值 $p^2/(2m)$，得到
$$K_E(x,\tau;x_0)=\frac{1}{2\pi\hbar}\int_{\mathbb R} dp\,e^{-\tau p^2/(2m\hbar)+ip(x-x_0)/\hbar}=\sqrt{\frac{m}{2\pi\hbar\tau}}\,e^{-m(x-x_0)^2/(2\hbar\tau)}.$$
对演化算符求导给出 $\partial_\tau K_E=-(H_x/\hbar)K_E$。由于 $H_x=-\hbar^2\partial_x^2/(2m)$，可得扩散方程 $\partial_\tau K_E=(\hbar/2m)\partial_x^2K_E$。显式表达式是均值为 $x_0$、方差为 $\hbar\tau/m$ 的高斯密度。令 $u=(x-x_0)\sqrt{m/(\hbar\tau)}$，则归一化积分化为 $\int_{\mathbb R}e^{-u^2/2}du/\sqrt{2\pi}=1$。

自评时核对动量积分的 $1/(2\pi\hbar)$、扩散方程中二阶导数前的正号，以及方差随虚时间线性增长。`,
  },
  {
    id: 'e04-w1',
    chapter: 'e04',
    topic: '绝热暗态转移',
    difficulty: '挑战',
    type: 'written',
    prompt: tex`在共振的 $\Lambda$ 型三能级系统中，实且非负的两个脉冲 $\Omega_P(t)$、$\Omega_S(t)$ 给出相互作用哈密顿量 $H=\tfrac{\hbar}{2}[\Omega_P|e\rangle\langle g_1|+\Omega_S|e\rangle\langle g_2|+\text{厄米共轭}]$。在演化区间内，总耦合 $\Omega_R=\sqrt{\Omega_P^2+\Omega_S^2}$ 保持非零。原子初在 $|g_1\rangle$。构造随时间变化的暗态，求其余两条瞬时能级，说明绝热地把原子送到 $|g_2\rangle$ 要求哪束脉冲先占主导，并给出混合角变化速率的一个充分尺度条件。`,
    hint: tex`令 $\cos\theta=\Omega_S/\Omega_R$、$\sin\theta=\Omega_P/\Omega_R$。在低能子空间中找出耦合到 $|e\rangle$ 的归一化向量，以及与它正交的向量。`,
    explanation: tex`归一化的耦合态为 $|B\rangle=\sin\theta\,|g_1\rangle+\cos\theta\,|g_2\rangle$，暗态是 $|D\rangle=\cos\theta\,|g_1\rangle-\sin\theta\,|g_2\rangle$。直接代入可得 $H|D\rangle=0$，且在 $\{|B\rangle,|e\rangle\}$ 中有 $H|B\rangle=(\hbar\Omega_R/2)|e\rangle$、$H|e\rangle=(\hbar\Omega_R/2)|B\rangle$，因而其余两条能量为 $\pm\hbar\Omega_R/2$。

理想脉冲顺序从 $\Omega_P=0,\ \Omega_S>0$ 开始，使初态恰为 $|D\rangle=|g_1\rangle$，以 $\Omega_S=0,\ \Omega_P>0$ 结束，使 $|D\rangle=-|g_2\rangle$。负号是整体相位。演化中有 $|\partial_tD\rangle=-\dot{\theta}|B\rangle$。平滑改变脉冲并使 $|\dot{\theta}|\ll\Omega_R/2$，可令混合角的变化慢于暗态与其余瞬时态的能隙对应的频率，极小化离开暗态的跃迁。

自评时核对激发振幅的相消、两条非零能量、脉冲起止顺序，以及速率与能隙除以 $\hbar$ 的比较。`,
  },
];
