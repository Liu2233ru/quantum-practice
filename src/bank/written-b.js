const math = String.raw;

export const writtenB = [
  {
    id: 'g07-w1',
    chapter: 'g07',
    topic: '用精确能谱核验二阶微扰',
    difficulty: '挑战',
    type: 'written',
    prompt: math`对频率为 $\omega$ 的一维简谐振子加入静态扰动 $\kappa x^2$，满足 $|\kappa|\ll m\omega^2$。用升降算符求第 $n$ 能级的一阶和二阶能量修正，再将精确频率展开到 $\kappa^2$ 阶核验结果。写出所有实际贡献二阶修正的中间态。`,
    hint: math`展开 $(a+a^\dagger)^2$，保留算符的顺序。对角项给出一阶能量，非对角项只能令 $n$ 改变 2。`,
    explanation: math`令 $C=\kappa\hbar/(2m\omega)$。扰动等于 $C(a^2+(a^\dagger)^2+2a^\dagger a+1)$，故一阶能量修正为 $C(2n+1)$。二阶中间态为 $|n+2\rangle$ 和存在时的 $|n-2\rangle$，其分母分别为 $-2\hbar\omega$ 和 $2\hbar\omega$。对于 $n=0,1$，降低项无贡献。
$$
\Delta E_n^{(2)}
=\frac{C^2}{2\hbar\omega}\big[n(n-1)-(n+1)(n+2)\big]
=-\frac{\kappa^2\hbar(2n+1)}{4m^2\omega^3}.
$$
总势能仍为二次型，精确频率为 $\Omega=\sqrt{\omega^2+2\kappa/m}$。展开得到 $\Omega=\omega+\kappa/(m\omega)-\kappa^2/(2m^2\omega^3)+O(\kappa^3)$，乘 $\hbar(n+1/2)$ 后两阶结果都吻合。
自评时检查 $aa^\dagger$ 是否留下常数项，以及两条中间态的能量分母是否取了相反符号。`,
  },
  {
    id: 'g08-w1',
    chapter: 'g08',
    topic: '由变分误差估计基态重叠',
    difficulty: '进阶',
    type: 'written',
    prompt: math`哈密顿量有离散能谱和非简并基态，已知基态能量 $E_0$，并且所有激发能都至少为 $E_0+\Delta$。归一化试探态的能量满足 $\langle H\rangle_\psi-E_0\le3\Delta/25$。推导 $|\langle 0|\psi\rangle|^2$ 的下界，并说明什么样的试探态可以恰好达到这个下界。`,
    hint: math`把能量误差写成激发态权重与各对应能隙乘积的和，用最小允许能隙给这部分权重设限。`,
    explanation: math`在能量基底展开 $|\psi\rangle=\sum_k c_k|k\rangle$。由于所有 $E_k-E_0\ge\Delta$（$k>0$），
$$
\langle H\rangle_\psi-E_0
=\sum_{k>0}|c_k|^2(E_k-E_0)
\ge \Delta(1-|c_0|^2).
$$
结合已知能量上界，得到 $|c_0|^2\ge22/25$。如果恰有能量为 $E_0+\Delta$ 的态 $|1\rangle$，取 $|\psi\rangle=\sqrt{22/25}|0\rangle+e^{i\varphi}\sqrt{3/25}|1\rangle$ 可达到等号。激发态权重若分布到更高能级，同样的能量误差允许的总激发权重就更小。
自评时检查推导是否使用了归一化、能隙的下界，以及能量误差的上界。等号需要这两个界同时取到。`,
  },
  {
    id: 'g09-w1',
    chapter: 'g09',
    topic: '倒抛物线势垒的穿透指数',
    difficulty: '进阶',
    type: 'written',
    prompt: math`一维势垒的禁阻区满足 $V(x)=V_0-\frac12m\omega_b^2x^2$。粒子能量为 $E<V_0$，且两转折点间全部可用该式描述。求作用量 $S(E)=\int_{x_-}^{x_+}\sqrt{2m(V-E)}\,dx$，并推导厚势垒下的领先透射指数。若 $E$ 提高 $\hbar\omega_b/(2\pi)$，且仍在厚势垒条件下，领先透射因子变为原来的多少倍？`,
    hint: math`令 $\delta=V_0-E$，先确定转折点。采用 $x=x_t u$ 换元，将积分化为半圆面积。`,
    explanation: math`转折点为 $\pm x_t$，其中 $x_t=\sqrt{2\delta/(m\omega_b^2)}$。换元后有
$$
S=\sqrt{2m\delta}\,x_t\int_{-1}^{1}\sqrt{1-u^2}\,du
=\frac{\pi\delta}{\omega_b}.
$$
因此保留领先指数时 $T(E)\approx\exp[-2\pi(V_0-E)/(\hbar\omega_b)]$。能量增加 $\hbar\omega_b/(2\pi)$ 时，指数恰好增加 1，透射因子乘以 $e$。这个结论使用提高前后均有 $S/\hbar\gg1$ 的条件。
自评时检查作用量的单位是否为能量乘时间，并确认透射概率的指数包含因子 2。`,
  },
  {
    id: 'g10-w1',
    chapter: 'g10',
    topic: '薄球壳散射的第一极小值',
    difficulty: '挑战',
    type: 'written',
    prompt: math`用第一玻恩近似研究弱球壳势 $V(r)=g\delta(r-R)$，其中 $g\ne0$，$R>0$。用 $f_B(\mathbf q)=-\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf q\cdot\mathbf r}V(r)\,d^3r$ 推导散射振幅。对入射波数 $k$，判断非零散射角上何时出现第一个截面零点，并给出它的角度。`,
    hint: math`选 $\mathbf q$ 为球坐标的极轴，角积分用 $u=\cos\theta'$。散射时 $q=2k\sin(\theta/2)$，其中 $\theta$ 是散射角。`,
    explanation: math`对 $\phi'$ 和 $u$ 积分得到 $\int e^{-iqru}\,d\Omega'=4\pi\sin(qr)/(qr)$。径向积分的测度为 $r^2\,dr$，因此
$$
f_B(q)=-\frac{2mg R^2}{\hbar^2}\frac{\sin(qR)}{qR}.
$$
截面与 $\big[\sin(qR)/(qR)\big]^2$ 成正比，这个因子在前向的极限为 1。第一个正零点在 $qR=\pi$，仅当 $2kR\ge\pi$ 才可达到。此时 $\theta_1=2\arcsin[\pi/(2kR)]$。等号对应后向零点。
自评时检查是否保留了球坐标测度里的 $R^2$，以及是否把 $\theta_1$ 限在物理角度区间 $[0,\pi]$。`,
  },
  {
    id: 'g11-w1',
    chapter: 'g11',
    topic: '双脉冲干涉与相位读出',
    difficulty: '挑战',
    type: 'written',
    prompt: math`在旋转表象中定义两能级基底 $|g\rangle=|+z\rangle$、$|e\rangle=|-z\rangle$。准备 $|g\rangle$，依次施加脉冲 $U_x=e^{-i\pi\sigma_x/4}$、自由演化 $U_z=e^{-i\phi\sigma_z/2}$、再施加相同的 $U_x$。求最终的激发概率 $P_e(\phi)$，并判断 $\phi=0$ 与 $\phi=\pi$ 各得到哪个能级。`,
    hint: math`$U_x=(I-i\sigma_x)/\sqrt2$，而 $U_z$ 给 $|g\rangle$ 和 $|e\rangle$ 加上符号相反的相位。按演化顺序逐步计算即可。`,
    explanation: math`第一个脉冲将状态变为 $(|g\rangle-i|e\rangle)/\sqrt2$。在自由演化后，两分量分别乘 $e^{-i\phi/2}$ 和 $e^{i\phi/2}$。经过第二个脉冲后，两条路径对激发态振幅的贡献相加，得到
$$
c_e=-\frac{i}{2}\big(e^{-i\phi/2}+e^{i\phi/2}\big)=-i\cos(\phi/2).
$$
所以 $P_e(\phi)=\cos^2(\phi/2)$。$\phi=0$ 时激发概率为 1，$\phi=\pi$ 时两条激发路径抵消，系统回到基态，允许整体相位不同。
自评时检查自由演化处理中保留的是相对相位，以及两个激发振幅相加后才取模平方。`,
  },
  {
    id: 'g12-w1',
    chapter: 'g12',
    topic: '同一密度算符的两种系综分解',
    difficulty: '进阶',
    type: 'written',
    prompt: math`来源 A 等概率制备 $|u_\pm\rangle=(\sqrt3\,|0\rangle\pm|1\rangle)/2$，来源 B 以 $3/4$ 的概率制备 $|0\rangle$、以 $1/4$ 的概率制备 $|1\rangle$。两来源每次随机抽样均独立，且制备标签不可见。写出两个密度矩阵，计算它们的纯度，并说明对收到的粒子做任意测量能否辨别来源。`,
    hint: math`先给每个可能的纯态写出投影算符，再按经典概率加权。测量结果的概率由 $\operatorname{Tr}(\rho M)$ 给出，其中 $M$ 是相应测量效应。`,
    explanation: math`来源 A 中 $|u_+\rangle\langle u_+|$ 与 $|u_-\rangle\langle u_-|$ 的非对角元分别是 $\sqrt3/4$ 和 $-\sqrt3/4$，加权平均后抵消。两个来源都给出
$$
\rho=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},\qquad
\operatorname{Tr}(\rho^2)=9/16+1/16=5/8.
$$
因此所有单粒子测量结果的概率都相同。独立制备的多粒子总态也是相同的 $\rho^{\otimes N}$，无法用联合测量区分来源。测量概率取决于密度算符，不取决于它采用哪种系综分解。
自评时检查是否先对投影算符求平均，以及是否用相同的测量概率公式解释了两种来源为何不可分辨。`,
  },
];
