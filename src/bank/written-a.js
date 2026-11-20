const tex = String.raw;

export const writtenA = [
  {
    id: 'g01-w1',
    chapter: 'g01',
    topic: '双波包相干叠加',
    difficulty: '挑战',
    type: 'written',
    prompt: tex`归一化波包 $f(x)$ 在 $[0,a]$ 之外恒为零。取 $d>a$，令 $\psi_\phi(x)=[f(x)+e^{i\phi}f(x-d)]/\sqrt2$。证明其位置概率密度与 $\phi$ 无关。再用傅里叶变换求动量概率密度，以 $|\widetilde f(p)|^2$ 表示结果，并求干涉调制在 $p$ 轴上的周期。`,
    hint: tex`位置空间中两个支撑没有交集。傅里叶约定取 $\widetilde f(p)=(2\pi\hbar)^{-1/2}\int e^{-ipx/\hbar}f(x)\,dx$，对第二个波包用变量替换。`,
    explanation: tex`位置密度的交叉项含有 $f(x)^*f(x-d)$，它处处为零。因此 $|\psi_\phi(x)|^2=(|f(x)|^2+|f(x-d)|^2)/2$。第二个波包的傅里叶变换为 $e^{-ipd/\hbar}\widetilde f(p)$，所以
$$|\widetilde\psi_\phi(p)|^2=\frac{|1+e^{i(\phi-pd/\hbar)}|^2}{2}|\widetilde f(p)|^2=\bigl[1+\cos(\phi-pd/\hbar)\bigr]|\widetilde f(p)|^2.$$
调制项在 $p$ 轴上的周期是 $2\pi\hbar/d$。自评时检查三点：是否用到了支撑不重叠，是否在傅里叶变换中保留了平移相位，是否把调制周期和包络宽度区分开。`,
  },
  {
    id: 'g02-w1',
    chapter: 'g02',
    topic: '从束缚概率反推 δ 势强度',
    difficulty: '进阶',
    type: 'written',
    prompt: tex`一维质量为 $m$ 的粒子束缚在 $V(x)=-g\delta(x)$ 中，$g>0$ 未知。已知在 $|x|<d$ 内找到粒子的概率为 $3/4$，其中 $d>0$。从束缚态的薛定谔方程和原点匹配条件出发，用 $m,d,\hbar$ 求出 $g$ 与束缚能量 $E$。`,
    hint: tex`在 $x\ne0$ 写下两侧衰减解。在原点两侧对薛定谔方程积分，求 $\psi'(0^+)-\psi'(0^-)$。`,
    explanation: tex`定义 $\kappa=\sqrt{-2mE}/\hbar>0$。衰减条件与原点的连续性给出 $\psi=Ae^{-\kappa|x|}$。跨过原点积分得到
$$\psi'(0^+)-\psi'(0^-)=-\frac{2mg}{\hbar^2}\psi(0),$$
而左边等于 $-2\kappa A$，所以 $g=\hbar^2\kappa/m$。归一化给出 $|A|^2=\kappa$，进而 $P(|x|<d)=1-e^{-2\kappa d}=3/4$，得 $\kappa=(\ln 2)/d$。最终
$$g=\frac{\hbar^2\ln 2}{md},\qquad E=-\frac{\hbar^2(\ln 2)^2}{2md^2}.$$
自评时核对导数跳跃的负号、密度指数中的因子 2，以及束缚能量的负号。`,
  },
  {
    id: 'g03-w1',
    chapter: 'g03',
    topic: '忽略中间读数的连续测量',
    difficulty: '进阶',
    type: 'written',
    prompt: tex`二维系统的观测量 $A$ 具有归一化本征态 $\lvert a_+\rangle,\lvert a_-\rangle$，本征值为 $+1,-1$。观测量 $B$ 的归一化本征态为 $\lvert b_+\rangle=\cos\theta\lvert a_+\rangle+\sin\theta\lvert a_-\rangle$ 与 $\lvert b_-\rangle=-\sin\theta\lvert a_+\rangle+\cos\theta\lvert a_-\rangle$，本征值也为 $+1,-1$。初态为 $\lvert a_+\rangle$。先做理想投影测量 $B$，忽略读数，再做理想投影测量 $A$。忽略两次测量之间的演化，求最后读到 $A=-1$ 的概率，并检查 $\theta=0$ 与 $\theta=\pi/4$ 的情况。`,
    hint: tex`分别计算测得 $b_+$ 和 $b_-$ 的概率，以及从各个测后态测得 $a_-$ 的条件概率。`,
    explanation: tex`中间测量的两种结果具有概率 $P(b_+)=\cos^2\theta$ 与 $P(b_-)=\sin^2\theta$。对应的条件概率分别是 $P(a_-\mid b_+)=\sin^2\theta$ 与 $P(a_-\mid b_-)=\cos^2\theta$。因此
$$P(a_-)=2\sin^2\theta\cos^2\theta=\tfrac12\sin^2(2\theta).$$
当 $\theta=0$ 时，两次测量使用同一组本征态，末次仍得到 $+1$。当 $\theta=\pi/4$ 时，末次得到 $-1$ 的概率为 $1/2$。自评时检查是否按两条互斥测量路径把概率相加，并明确测量已经发生，即使读数被忽略。`,
  },
  {
    id: 'g04-w1',
    chapter: 'g04',
    topic: '球谐函数展开与角动量分布',
    difficulty: '进阶',
    type: 'written',
    prompt: tex`某三维无自旋粒子的径向部分已独立归一化，角向波函数为 $\chi(\theta,\varphi)=C(1+3\cos^2\theta)$，其中 $C>0$。已知 $P_2(u)=(3u^2-1)/2$ 以及 $Y_{\ell 0}=\sqrt{(2\ell+1)/(4\pi)}P_\ell(\cos\theta)$。求 $C$，列出测量 $L^2$ 和 $L_z$ 的各可能结果及其概率，并求 $\langle L^2\rangle$。`,
    hint: tex`将 $1+3\cos^2\theta$ 写成 $P_0$ 和 $P_2$ 的线性组合，并用归一化球谐函数计算系数。`,
    explanation: tex`由 $1+3\cos^2\theta=2P_0+2P_2$，可得
$$\chi=2C\sqrt{4\pi}\,Y_{00}+2C\sqrt{4\pi/5}\,Y_{20}.$$
两项正交，归一化条件是 $16\pi C^2(1+1/5)=1$，所以 $C=\sqrt{5/(96\pi)}$。取两个系数的模平方后，得到 $L^2=0$ 的概率为 $5/6$，$L^2=6\hbar^2$ 的概率为 $1/6$，因而 $\langle L^2\rangle=\hbar^2$。两个分量均有 $m=0$，$L_z=0$ 的概率为 1。自评时核对是否把勒让德多项式系数转换成了归一化基系数，以及概率之和是否为 1。`,
  },
  {
    id: 'g05-w1',
    chapter: 'g05',
    topic: '交换对称性与粒子间距的平方期望值',
    difficulty: '挑战',
    type: 'written',
    prompt: tex`两个无相互作用粒子各占据一维谐振子的一个不同轨道 $\lvert0\rangle$ 与 $\lvert1\rangle$。比较三个状态中的 $\langle (x_1-x_2)^2\rangle$：可区分粒子的乘积态 $\lvert0\rangle_1\lvert1\rangle_2$、归一化的对称空间态，以及归一化的反对称空间态。用 $x_0=\sqrt{\hbar/(2m\omega)}$ 表示结果，并指出是哪一项造成三种结果的差别。`,
    hint: tex`先展开 $(x_1-x_2)^2=x_1^2+x_2^2-2x_1x_2$，再用 $x=x_0(a+a^\dagger)$ 求单粒子矩阵元。确定 $x_1x_2$ 在两项乘积态之间的非对角矩阵元。`,
    explanation: tex`由升降算符得到 $\langle0\vert x^2\vert0\rangle=x_0^2$，$\langle1\vert x^2\vert1\rangle=3x_0^2$，且 $\langle0\vert x\vert1\rangle=x_0$。在三种状态中，$\langle x_1^2+x_2^2\rangle$ 都为 $4x_0^2$，因为单粒子平方项的交叉项含正交重叠。对乘积态，$\langle x_1x_2\rangle=0$。对 $(\lvert0,1\rangle\pm\lvert1,0\rangle)/\sqrt2$，$\langle x_1x_2\rangle=\pm|\langle0\vert x\vert1\rangle|^2=\pm x_0^2$。所以三种结果依次为 $4x_0^2,2x_0^2,6x_0^2$。自评时检查交叉矩阵元是否同时出现两次，以及间距平方展开式中的负号。`,
  },
  {
    id: 'g06-w1',
    chapter: 'g06',
    topic: '轴旋转与镜面反射的选择定则',
    difficulty: '挑战',
    type: 'written',
    prompt: tex`无自旋粒子的哈密顿量具有绕 $z$ 轴的旋转对称性和 $z\mapsto-z$ 的镜面反射对称性。令 $P_z$ 为镜面反射算符，选取 $H,L_z,P_z$ 的共同本征态，记 $L_z$ 本征值为 $m\hbar$，$P_z$ 本征值为 $\eta=\pm1$。若初态有 $m_i=1,\eta_i=+1$，由对称性导出算符 $O=z(x+iy)$ 的矩阵元 $\langle f\vert O\vert i\rangle$ 非零时对 $m_f,\eta_f$ 的必要条件。`,
    hint: tex`用 $L_z=xp_y-yp_x$ 计算 $[L_z,O]$，再求 $P_z O P_z^{-1}$。对两个等式分别取初末态之间的矩阵元。`,
    explanation: tex`由 $[L_z,x]=i\hbar y$、$[L_z,y]=-i\hbar x$ 和 $[L_z,z]=0$，得 $[L_z,O]=\hbar O$。设 $M=\langle f\vert O\vert i\rangle$，则 $\hbar(m_f-m_i)M=\hbar M$。若 $M\ne0$，必有 $m_f=m_i+1=2$。镜面反射只改变 $z$ 的符号，所以 $P_zOP_z^{-1}=-O$，从而 $\eta_f\eta_i M=-M$，给出 $\eta_f=-1$。自评时检查变化量的正负号，以及是否说明这些条件只排除被对称性禁止的矩阵元，允许的矩阵元仍需计算。`,
  },
];
