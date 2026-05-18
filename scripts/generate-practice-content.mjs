import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/lib/practice/content');

function write(name, data) {
	fs.writeFileSync(path.join(contentDir, name), JSON.stringify(data, null, '\t') + '\n', 'utf8');
}

const equations = [];

const eqEasy = [
	['eq-e-01', 'Окисление железа', 'Расставьте коэффициенты.', '*0*\\mathrm{Fe} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{Fe}_2\\mathrm{O}_3', '4,3,2'],
	['eq-e-02', 'Вода', 'Коэффициенты.', '*0*\\mathrm{H}_2 + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{H}_2\\mathrm{O}', '2,1,2'],
	['eq-e-03', 'Оксид магния', '', '*0*\\mathrm{Mg} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{MgO}', '2,1,2'],
	['eq-e-04', 'Водород и хлор', '', '*0*\\mathrm{H}_2 + *1*\\mathrm{Cl}_2 \\rightarrow *2*\\mathrm{HCl}', '1,1,2'],
	['eq-e-05', 'Аммиак', '', '*0*\\mathrm{N}_2 + *1*\\mathrm{H}_2 \\rightarrow *2*\\mathrm{NH}_3', '1,3,2'],
	['eq-e-06', 'Оксид алюминия', '', '*0*\\mathrm{Al} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{Al}_2\\mathrm{O}_3', '4,3,2'],
	['eq-e-07', 'Оксид меди(II)', '', '*0*\\mathrm{Cu} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{CuO}', '2,1,2'],
	['eq-e-08', 'Оксид серы(IV)', '', '*0*\\mathrm{S} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{SO}_2', '1,1,1'],
	['eq-e-09', 'Оксид углерода(IV)', '', '*0*\\mathrm{C} + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{CO}_2', '1,1,1'],
	['eq-e-10', 'Оксид фосфора(V)', '', '*0*\\mathrm{P}_4 + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{P}_2\\mathrm{O}_5', '1,5,2']
];
const eqMed = [
	['eq-m-01', 'Нитрат калия', '', '*0*\\mathrm{KNO}_3 \\rightarrow *1*\\mathrm{KNO}_2 + *2*\\mathrm{O}_2', '2,2,1'],
	['eq-m-02', 'Гидроксид натрия и хлор', '', '*0*\\mathrm{NaOH} + *1*\\mathrm{Cl}_2 \\rightarrow *2*\\mathrm{NaCl} + *3*\\mathrm{NaClO}_3 + *4*\\mathrm{H}_2\\mathrm{O}', '6,3,5,1,3'],
	['eq-m-03', 'Марганец и кислота', '', '*0*\\mathrm{KMnO}_4 + *1*\\mathrm{HCl} \\rightarrow *2*\\mathrm{KCl} + *3*\\mathrm{MnCl}_2 + *4*\\mathrm{Cl}_2 + *5*\\mathrm{H}_2\\mathrm{O}', '2,16,2,2,5,8'],
	['eq-m-04', 'Декомпозиция перекиси', '', '*0*\\mathrm{H}_2\\mathrm{O}_2 \\rightarrow *1*\\mathrm{H}_2\\mathrm{O} + *2*\\mathrm{O}_2', '2,2,1'],
	['eq-m-05', 'Гидроксид железа(III)', '', '*0*\\mathrm{Fe(OH)}_3 \\rightarrow *1*\\mathrm{Fe}_2\\mathrm{O}_3 + *2*\\mathrm{H}_2\\mathrm{O}', '2,1,3'],
	['eq-m-06', 'Нитрат аммония', '', '*0*\\mathrm{NH}_4\\mathrm{NO}_3 \\rightarrow *1*\\mathrm{N}_2\\mathrm{O} + *2*\\mathrm{H}_2\\mathrm{O}', '1,1,2'],
	['eq-m-07', 'Карбонат кальция', '', '*0*\\mathrm{CaCO}_3 \\rightarrow *1*\\mathrm{CaO} + *2*\\mathrm{CO}_2', '1,1,1'],
	['eq-m-08', 'Хлорат калия', '', '*0*\\mathrm{KClO}_3 \\rightarrow *1*\\mathrm{KCl} + *2*\\mathrm{O}_2', '2,2,3'],
	['eq-m-09', 'Сульфат меди и гидроксид', '', '*0*\\mathrm{CuSO}_4 + *1*\\mathrm{NaOH} \\rightarrow *2*\\mathrm{Cu(OH)}_2 + *3*\\mathrm{Na}_2\\mathrm{SO}_4', '1,2,1,1'],
	['eq-m-10', 'Нитрат серебра', '', '*0*\\mathrm{AgNO}_3 \\rightarrow *1*\\mathrm{Ag} + *2*\\mathrm{NO}_2 + *3*\\mathrm{O}_2', '2,2,2,1']
];
const eqHard = [
	['eq-h-01', 'Хлорид алюминия', '', '*0*\\mathrm{Al} + *1*\\mathrm{Cl}_2 \\rightarrow *2*\\mathrm{AlCl}_3', '2,3,2'],
	['eq-h-02', 'Хром и кислота', '', '*0*\\mathrm{K}_2\\mathrm{Cr}_2\\mathrm{O}_7 + *1*\\mathrm{H}_2\\mathrm{SO}_4 + *2*\\mathrm{SO}_2 \\rightarrow *3*\\mathrm{Cr}_2(\\mathrm{SO}_4)_3 + *4*\\mathrm{K}_2\\mathrm{SO}_4 + *5*\\mathrm{H}_2\\mathrm{O}', '1,1,3,1,1,1'],
	['eq-h-03', 'Цинк и азотная', '', '*0*\\mathrm{Zn} + *1*\\mathrm{HNO}_3 \\rightarrow *2*\\mathrm{Zn}(\\mathrm{NO}_3)_2 + *3*\\mathrm{NO}_2 + *4*\\mathrm{H}_2\\mathrm{O}', '1,4,1,2,2'],
	['eq-h-04', 'Йод и хлор', '', '*0*\\mathrm{I}_2 + *1*\\mathrm{Cl}_2 \\rightarrow *2*\\mathrm{ICl}_3', '1,3,2'],
	['eq-h-05', 'Фосфор и бром', '', '*0*\\mathrm{P}_4 + *1*\\mathrm{Br}_2 \\rightarrow *2*\\mathrm{PBr}_5', '1,10,4'],
	['eq-h-06', 'Сульфид железа(II)', '', '*0*\\mathrm{FeS}_2 + *1*\\mathrm{O}_2 \\rightarrow *2*\\mathrm{Fe}_2\\mathrm{O}_3 + *3*\\mathrm{SO}_2', '4,11,2,8'],
	['eq-h-07', 'Перманганат и перекись', '', '*0*\\mathrm{KMnO}_4 + *1*\\mathrm{H}_2\\mathrm{O}_2 + *2*\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow *3*\\mathrm{MnSO}_4 + *4*\\mathrm{K}_2\\mathrm{SO}_4 + *5*\\mathrm{O}_2 + *6*\\mathrm{H}_2\\mathrm{O}', '2,5,3,2,1,5,8'],
	['eq-h-08', 'Дихромат и железо', '', '*0*\\mathrm{K}_2\\mathrm{Cr}_2\\mathrm{O}_7 + *1*\\mathrm{FeSO}_4 + *2*\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow *3*\\mathrm{Cr}_2(\\mathrm{SO}_4)_3 + *4*\\mathrm{Fe}_2(\\mathrm{SO}_4)_3 + *5*\\mathrm{K}_2\\mathrm{SO}_4 + *6*\\mathrm{H}_2\\mathrm{O}', '1,6,7,1,3,1,7'],
	['eq-h-09', 'Азотная и медь', '', '*0*\\mathrm{Cu} + *1*\\mathrm{HNO}_3 \\rightarrow *2*\\mathrm{Cu}(\\mathrm{NO}_3)_2 + *3*\\mathrm{NO} + *4*\\mathrm{H}_2\\mathrm{O}', '3,8,3,2,4'],
	['eq-h-10', 'Хлорид олова(II)', '', '*0*\\mathrm{Sn} + *1*\\mathrm{HCl} \\rightarrow *2*\\mathrm{SnCl}_2 + *3*\\mathrm{H}_2', '1,2,1,1']
];

for (const [id, title, prompt, f, a] of eqEasy) {
	equations.push({ id, type: 'equations', difficulty: 'easy', title, promptMd: prompt || 'Расставьте коэффициенты.', formulaF: f, answers: a, points: 50 });
}
for (const [id, title, prompt, f, a] of eqMed) {
	equations.push({ id, type: 'equations', difficulty: 'medium', title, promptMd: prompt || 'Сбалансируйте уравнение.', formulaF: f, answers: a, points: 50 });
}
for (const [id, title, prompt, f, a] of eqHard) {
	equations.push({ id, type: 'equations', difficulty: 'hard', title, promptMd: prompt || 'Расставьте коэффициенты.', formulaF: f, answers: a, points: 50 });
}

write('equations.json', equations);

const calcs = [];
const cEasy = [
	['c-e-01', 'Масса воды', 'Молярная масса $\\mathrm{H}_2\\mathrm{O} \\approx 18$ г/моль. Масса **2 моль** воды (г).', 36, 0.5, 'г', '**Решение:** $m = n \\cdot M = 2 \\cdot 18 = 36$ г.'],
	['c-e-02', 'Моли CO₂', 'Молярная масса $\\mathrm{CO}_2 \\approx 44$ г/моль. Сколько **моль** в **88 г**?', 2, 0.1, 'моль', '$n = m/M = 88/44 = 2$ моль.'],
	['c-e-03', 'Число молекул', 'Сколько молекул в **1 моль** вещества (число Авогадро $6{,}02\\cdot10^{23}$)?', 6.02e23, 0.05e23, 'молекул', '$N = n \\cdot N_A = 1 \\cdot 6{,}02\\cdot10^{23}$.'],
	['c-e-04', 'Масса NaCl', '$M(\\mathrm{NaCl}) \\approx 58{,}5$ г/моль. Масса **0,5 моль** (г).', 29.25, 0.5, 'г', '$m = 0{,}5 \\cdot 58{,}5$.'],
	['c-e-05', 'Объём H₂ н.у.', 'Сколько литров $\\mathrm{H}_2$ (н.у.) занимает **0,25 моль**?', 5.6, 0.3, 'л', '$V = 0{,}25 \\cdot 22{,}4 = 5{,}6$ л.'],
	['c-e-06', 'Моли по массе O₂', 'Молярная масса $\\mathrm{O}_2 = 32$ г/моль. **64 г** кислорода — это сколько моль?', 2, 0.1, 'моль', '$n = 64/32 = 2$.'],
	['c-e-07', 'Масса CaCO₃', '$M \\approx 100$ г/моль. Масса **0,1 моль** известняка (г).', 10, 0.5, 'г', '$m = 0{,}1 \\cdot 100 = 10$ г.'],
	['c-e-08', 'Моли NH₃', 'Молярная масса $\\mathrm{NH}_3 \\approx 17$ г/моль. **34 г** аммиака — моль?', 2, 0.1, 'моль', '$n = 34/17 = 2$.'],
	['c-e-09', 'Объём CH₄', '**1,5 моль** метана при н.у. — объём (л).', 33.6, 0.5, 'л', '$1{,}5 \\cdot 22{,}4 = 33{,}6$ л.'],
	['c-e-10', 'Масса SO₂', '$M(\\mathrm{SO}_2) \\approx 64$ г/моль. Масса **3 моль** (г).', 192, 1, 'г', '$m = 3 \\cdot 64 = 192$ г.']
];
const cMed = [
	['c-m-01', 'Объём H₂ от Zn', '$\\mathrm{Zn} + 2\\mathrm{H}^+ \\rightarrow \\mathrm{Zn}^{2+} + \\mathrm{H}_2$. Объём $\\mathrm{H}_2$ (н.у.) от **2 моль** Zn (л).', 44.8, 0.5, 'л', '1:1 по мольному отношению, $2 \\cdot 22{,}4$ л.'],
	['c-m-02', 'Массовая доля', '**20 г** соли и **180 г** воды. $\\omega(\\%)$.', 10, 0.3, '%', '$(20/200)\\cdot100\\%$.'],
	['c-m-03', 'Молярность', '**4 г** NaOH ($M\\approx40$) в **500 мл** раствора. Молярность (моль/л).', 0.2, 0.02, 'моль/л', '$n=0{,}1$ моль; $c = 0{,}1/0{,}5 = 0{,}2$.'],
	['c-m-04', 'Эквивалент', 'Молярная масса эквивалента $\\mathrm{H}_2\\mathrm{SO}_4$ в реакции с **двумя** замещаемыми H⁺ (г/моль).', 49, 0.5, 'г/моль', '$98/2 = 49$.'],
	['c-m-05', 'Выход', 'Теория 5 моль продукта, факт **4 моль**. Выход (%).', 80, 1, '%', '$4/5\\cdot100\\%$.'],
	['c-m-06', 'Теплота', 'Удельная теплота плавления льда **334 Дж/г**. Сколько Дж для **10 г**?', 3340, 20, 'Дж', '$334 \\cdot 10$.'],
	['c-m-07', 'pH', '$[\\mathrm{H}^+] = 10^{-3}$ моль/л. pH.', 3, 0.05, '', '$-\\lg 10^{-3}=3$.'],
	['c-m-08', 'Концентрация ионов', 'В 1 л **0,2 М** $\\mathrm{CaCl}_2$. $[\\mathrm{Cl}^-]$ (моль/л).', 0.4, 0.02, 'моль/л', 'На 1 формульный — 2 иона $\\mathrm{Cl}^-$.'],
	['c-m-09', 'Разбавление', 'Смешали **200 мл 0,5 М** и **300 мл воды**. Итоговая молярность (моль/л).', 0.2, 0.02, 'моль/л', '$n=0{,}1$ моль; $V=0{,}5$ л; $c=0{,}2$.'],
	['c-m-10', 'Масса осадка', 'Из **0,1 моль** $\\mathrm{AgNO}_3$ выпал весь AgCl ($M\\approx143$). Масса осадка (г).', 14.3, 0.5, 'г', '0{,}1 моль AgCl.']
];
const cHard = [
	['c-h-01', 'Выход 80%', 'Теория **4 моль**, факт **3,2 моль**. Выход (%).', 80, 1, '%', 'как в базовой задаче.'],
	['c-h-02', 'Энергия Гесса', 'Упрощённо: если $\\Delta H_1=-50$, $\\Delta H_2=+30$ кДж/моль для двух шагов, суммарное $\\Delta H$ (кДж/моль).', -20, 0.5, 'кДж/моль', '$-50+30=-20$.'],
	['c-h-03', 'Степень диссоциации', 'Из **0,2 моль** электролита диссоциировало **0,05 моль**. $\\alpha$ (%).', 25, 1, '%', '$0{,}05/0{,}2\\cdot100\\%$.'],
	['c-h-04', 'Осмотическое', 'Идеальный разбавленный раствор: **0,01 моль** в **2 л**. Осмотическая молярность (моль/л).', 0.005, 0.0005, 'моль/л', '$0{,}01/2$.'],
	['c-h-05', 'pOH', 'pH = **11**. pOH при 25°C.', 3, 0.05, '', '$14-11=3$.'],
	['c-h-06', 'Константа', 'Для $\\mathrm{A} \\rightleftharpoons \\mathrm{B}$ начальные **2 моль/л** A, равновесие **1,5 моль/л** A. $K_c$ (доли 0,1).', 0.17, 0.03, '', '$K = [\\mathrm{B}]/[\\mathrm{A}] = 0{,}5/1{,}5$.'],
	['c-h-07', 'Скорость', 'Первая реакция: концентрация выросла в **2 раза**, скорость выросла в **8 раз**. Порядок по этому реагенту.', 3, 0.1, '', '$2^x=8 \\Rightarrow x=3$.'],
	['c-h-08', 'Электролиз', 'За Фарадеем: при **2 моль** электронов масса Cu ($M\\approx64$, заряд +2) выделившегося (г).', 64, 1, 'г', '$m = (2/2) \\cdot 64$.'],
	['c-h-09', 'Буфер', 'Упрощённо: pH буфера с равными концентрациями кислоты и сопряжённого основания, pKa = **4,75**.', 4.75, 0.05, '', 'по формуле Гендерсона — Хассельбальха.'],
	['c-h-10', 'Соль гидролиза', 'Для сильной кислоты и слабого основания pH **7** при какой-то задаче — введите **7**.', 7, 0.1, '', 'контрольное значение.']
];
for (const [id, title, prompt, ans, tol, unit, expl] of cEasy) {
	calcs.push({ id, type: 'calculations', difficulty: 'easy', title, promptMd: prompt, answer: ans, tolerance: tol, unit, explanationMd: expl, points: 50 });
}
for (const row of cMed) {
	calcs.push({ id: row[0], type: 'calculations', difficulty: 'medium', title: row[1], promptMd: row[2], answer: row[3], tolerance: row[4], unit: row[5], explanationMd: row[6], points: 50 });
}
for (const row of cHard) {
	calcs.push({ id: row[0], type: 'calculations', difficulty: 'hard', title: row[1], promptMd: row[2], answer: row[3], tolerance: row[4], unit: row[5], explanationMd: row[6], points: 50 });
}
write('calculations.json', calcs);

function chain(id, diff, title, chainMd, promptMd, steps, expected) {
	return { id, type: 'chains', difficulty: diff, title, chainMd, promptMd, steps, expectedBlanks: expected, points: 50 };
}

const chains = [
	chain('ch-e-01', 'easy', 'Карбонат кальция', '$\\mathrm{CaCO}_3 \\rightarrow \\mathrm{CaO} \\rightarrow \\mathrm{Ca(OH)}_2 \\rightarrow \\mathrm{CaCO}_3$', 'Заполните пропуски.', [
		{ parts: [{ kind: 'text', value: 'CaCO3', after: ' = CaO + ' }, { kind: 'blank', after: '' }] },
		{ parts: [{ kind: 'text', value: 'CaO', after: ' + ' }, { kind: 'blank', after: ' = Ca(OH)2' }] },
		{ parts: [{ kind: 'text', value: 'Ca(OH)2', after: ' + ' }, { kind: 'blank', after: ' = CaCO3 + ' }, { kind: 'blank', after: '' }] }
	], ['CO2', 'H2O', 'CO2', 'H2O']),
	chain('ch-e-02', 'easy', 'Сера', '$\\mathrm{S} \\rightarrow \\mathrm{SO}_2 \\rightarrow \\mathrm{SO}_3$', 'Простая цепь.', [
		{ parts: [{ kind: 'text', value: 'S', after: ' + ' }, { kind: 'blank', after: ' = SO2' }] },
		{ parts: [{ kind: 'text', value: 'SO2', after: ' + ' }, { kind: 'blank', after: ' = SO3' }] }
	], ['O2', 'O2']),
	chain('ch-e-03', 'easy', 'Натрий', '$\\mathrm{Na} \\rightarrow \\mathrm{Na}_2\\mathrm{O}$', '', [
		{ parts: [{ kind: 'text', value: 'Na', after: ' + ' }, { kind: 'blank', after: ' = Na2O' }] }
	], ['O2']),
	chain('ch-e-04', 'easy', 'Кремний', '$\\mathrm{Si} \\rightarrow \\mathrm{SiO}_2$', '', [
		{ parts: [{ kind: 'text', value: 'Si', after: ' + ' }, { kind: 'blank', after: ' = SiO2' }] }
	], ['O2']),
	chain('ch-e-05', 'easy', 'Фосфор', '$\\mathrm{P} \\rightarrow \\mathrm{P}_2\\mathrm{O}_5$', '', [
		{ parts: [{ kind: 'text', value: 'P', after: ' + ' }, { kind: 'blank', after: ' = P2O5' }] }
	], ['O2']),
	chain('ch-e-06', 'easy', 'Железо и кислота', '$\\mathrm{Fe} \\rightarrow \\mathrm{FeCl}_2$', '', [
		{ parts: [{ kind: 'text', value: 'Fe', after: ' + ' }, { kind: 'blank', after: ' = FeCl2 + H2' }] }
	], ['HCl']),
	chain('ch-e-07', 'easy', 'Медь', '$\\mathrm{Cu} \\rightarrow \\mathrm{CuO}$', '', [
		{ parts: [{ kind: 'text', value: 'Cu', after: ' + ' }, { kind: 'blank', after: ' = CuO' }] }
	], ['O2']),
	chain('ch-e-08', 'easy', 'Алюминий', '$\\mathrm{Al} \\rightarrow \\mathrm{Al}_2\\mathrm{O}_3$', '', [
		{ parts: [{ kind: 'text', value: 'Al', after: ' + ' }, { kind: 'blank', after: ' = Al2O3' }] }
	], ['O2']),
	chain('ch-e-09', 'easy', 'Магний', '$\\mathrm{Mg} \\rightarrow \\mathrm{MgO}$', '', [
		{ parts: [{ kind: 'text', value: 'Mg', after: ' + ' }, { kind: 'blank', after: ' = MgO' }] }
	], ['O2']),
	chain('ch-e-10', 'easy', 'Цинк', '$\\mathrm{Zn} \\rightarrow \\mathrm{ZnO}$', '', [
		{ parts: [{ kind: 'text', value: 'Zn', after: ' + ' }, { kind: 'blank', after: ' = ZnO' }] }
	], ['O2']),
	chain('ch-m-01', 'medium', 'Медь и кислота', '$\\mathrm{Cu} \\rightarrow \\mathrm{CuO} \\rightarrow \\mathrm{CuSO}_4$', '', [
		{ parts: [{ kind: 'text', value: 'Cu', after: ' + ' }, { kind: 'blank', after: ' = CuO' }] },
		{ parts: [{ kind: 'text', value: 'CuO', after: ' + ' }, { kind: 'blank', after: ' = CuSO4 + ' }, { kind: 'blank', after: '' }] }
	], ['O2', 'H2SO4', 'H2O']),
	chain('ch-m-02', 'medium', 'Железо', '$\\mathrm{Fe} \\rightarrow \\mathrm{Fe}_2\\mathrm{O}_3$', '', [
		{ parts: [{ kind: 'text', value: 'Fe', after: ' + ' }, { kind: 'blank', after: ' = Fe2O3' }] }
	], ['O2']),
	chain('ch-m-03', 'medium', 'Аммиак', '$\\mathrm{NH}_3 \\rightarrow \\mathrm{NO} \\rightarrow \\mathrm{NO}_2$', 'Каталитическое окисление (схема).', [
		{ parts: [{ kind: 'text', value: 'NH3', after: ' + ' }, { kind: 'blank', after: ' = NO + H2O' }] },
		{ parts: [{ kind: 'text', value: 'NO', after: ' + ' }, { kind: 'blank', after: ' = NO2' }] }
	], ['O2', 'O2']),
	chain('ch-m-04', 'medium', 'Карбонат натрия и кислота', '$\\mathrm{Na}_2\\mathrm{CO}_3 + \\mathrm{HCl} \\rightarrow \\mathrm{NaCl} + \\mathrm{CO}_2 + \\mathrm{H}_2\\mathrm{O}$', '', [
		{ parts: [{ kind: 'text', value: 'Na2CO3', after: ' + ' }, { kind: 'blank', after: ' = NaCl + H2O + ' }, { kind: 'blank', after: '' }] }
	], ['HCl', 'CO2']),
	chain('ch-m-05', 'medium', 'Сульфат железа(II)', '$\\mathrm{Fe} \\rightarrow \\mathrm{FeSO}_4$', '', [
		{ parts: [{ kind: 'text', value: 'Fe', after: ' + ' }, { kind: 'blank', after: ' = FeSO4 + H2' }] }
	], ['H2SO4']),
	chain('ch-m-06', 'medium', 'Карбонат натрия', '$\\mathrm{Na}_2\\mathrm{CO}_3 \\rightarrow \\mathrm{NaHCO}_3$', '', [
		{ parts: [{ kind: 'text', value: 'Na2CO3', after: ' + ' }, { kind: 'blank', after: ' + H2O = NaHCO3' }] }
	], ['CO2']),
	chain('ch-m-07', 'medium', 'Этилен', '$\\mathrm{C}_2\\mathrm{H}_4 \\rightarrow \\mathrm{C}_2\\mathrm{H}_5\\mathrm{OH}$', '', [
		{ parts: [{ kind: 'text', value: 'C2H4', after: ' + ' }, { kind: 'blank', after: ' = C2H5OH' }] }
	], ['H2O']),
	chain('ch-m-08', 'medium', 'Бромид натрия', '$\\mathrm{NaBr} \\rightarrow \\mathrm{Br}_2$', '', [
		{ parts: [{ kind: 'text', value: 'NaBr', after: ' + ' }, { kind: 'blank', after: ' = Br2 + NaCl' }] }
	], ['Cl2']),
	chain('ch-m-09', 'medium', 'Йодид калия', '$\\mathrm{KI} \\rightarrow \\mathrm{I}_2$', '', [
		{ parts: [{ kind: 'text', value: 'KI', after: ' + ' }, { kind: 'blank', after: ' = I2 + KCl' }] }
	], ['Cl2']),
	chain('ch-m-10', 'medium', 'Сульфит', '$\\mathrm{SO}_2 \\rightarrow \\mathrm{Na}_2\\mathrm{SO}_3$', '', [
		{ parts: [{ kind: 'text', value: 'SO2', after: ' + ' }, { kind: 'blank', after: ' = Na2SO3 + H2O' }] }
	], ['NaOH']),
	chain('ch-h-01', 'hard', 'Хром', '$\\mathrm{Cr} \\rightarrow \\mathrm{Cr}_2\\mathrm{O}_3 \\rightarrow \\mathrm{K}_2\\mathrm{Cr}_2\\mathrm{O}_7$', '', [
		{ parts: [{ kind: 'text', value: 'Cr', after: ' + ' }, { kind: 'blank', after: ' = Cr2O3' }] },
		{ parts: [{ kind: 'text', value: 'Cr2O3', after: ' + ' }, { kind: 'blank', after: ' + KOH = K2Cr2O7 + ' }, { kind: 'blank', after: '' }] }
	], ['O2', 'KNO3', 'H2O']),
	chain('ch-h-02', 'hard', 'Марганец', '$\\mathrm{MnO}_2 \\rightarrow \\mathrm{K}_2\\mathrm{MnO}_4$', '', [
		{ parts: [{ kind: 'text', value: 'MnO2', after: ' + ' }, { kind: 'blank', after: ' + KOH = K2MnO4 + ' }, { kind: 'blank', after: '' }] }
	], ['KNO3', 'H2O']),
	chain('ch-h-03', 'hard', 'Азотная кислота', '$\\mathrm{Cu} \\rightarrow \\mathrm{Cu}(\\mathrm{NO}_3)_2$', '', [
		{ parts: [{ kind: 'text', value: 'Cu', after: ' + ' }, { kind: 'blank', after: ' = Cu(NO3)2 + NO2 + H2O' }] }
	], ['HNO3']),
	chain('ch-h-04', 'hard', 'Серебро', '$\\mathrm{Ag} \\rightarrow \\mathrm{Ag}_2\\mathrm{O}$', '', [
		{ parts: [{ kind: 'text', value: 'Ag', after: ' + ' }, { kind: 'blank', after: ' = Ag2O' }] }
	], ['O2']),
	chain('ch-h-05', 'hard', 'Золото (схема)', '$\\mathrm{Au} \\rightarrow \\mathrm{HAuCl}_4$', 'Упрощённо.', [
		{ parts: [{ kind: 'text', value: 'Au', after: ' + ' }, { kind: 'blank', after: ' + HCl = HAuCl4' }] }
	], ['HNO3']),
	chain('ch-h-06', 'hard', 'Фосфорная', '$\\mathrm{P}_4 \\rightarrow \\mathrm{H}_3\\mathrm{PO}_4$', '', [
		{ parts: [{ kind: 'text', value: 'P4', after: ' + ' }, { kind: 'blank', after: ' + H2O = H3PO4' }] }
	], ['HNO3']),
	chain('ch-h-07', 'hard', 'Кремнезём', '$\\mathrm{SiO}_2 \\rightarrow \\mathrm{Na}_2\\mathrm{SiO}_3$', '', [
		{ parts: [{ kind: 'text', value: 'SiO2', after: ' + ' }, { kind: 'blank', after: ' = Na2SiO3 + H2O' }] }
	], ['NaOH']),
	chain('ch-h-08', 'hard', 'Амфотерный', '$\\mathrm{Al(OH)}_3 \\rightarrow \\mathrm{NaAlO}_2$', '', [
		{ parts: [{ kind: 'text', value: 'Al(OH)3', after: ' + ' }, { kind: 'blank', after: ' = NaAlO2 + H2O' }] }
	], ['NaOH']),
	chain('ch-h-09', 'hard', 'Сульфид', '$\\mathrm{H}_2\\mathrm{S} \\rightarrow \\mathrm{SO}_2$', '', [
		{ parts: [{ kind: 'text', value: 'H2S', after: ' + ' }, { kind: 'blank', after: ' = SO2 + H2O' }] }
	], ['O2']),
	chain('ch-h-10', 'hard', 'Ацетилен', '$\\mathrm{CaC}_2 \\rightarrow \\mathrm{C}_2\\mathrm{H}_2$', '', [
		{ parts: [{ kind: 'text', value: 'CaC2', after: ' + ' }, { kind: 'blank', after: ' = C2H2 + Ca(OH)2' }] }
	], ['H2O'])
];

write('chains.json', chains);

const redox = [];
function rx(id, diff, title, reactionMd, ox, oz, rd, bc, expl) {
	return {
		id,
		type: 'redox',
		difficulty: diff,
		title,
		promptMd: 'Степени окисления, окислитель, восстановитель, коэффициенты через запятую слева направо.',
		reactionMd,
		oxidationInputs: ox,
		oxidizer: oz,
		reducer: rd,
		balanceCoeffs: bc,
		explanationMd: expl,
		points: 50
	};
}

redox.push(
	rx('rx-e-01', 'easy', 'Fe и CuSO₄', '$\\mathrm{Fe} + \\mathrm{CuSO}_4 \\rightarrow \\mathrm{FeSO}_4 + \\mathrm{Cu}$', [
		{ id: 'a', label: 'Fe (металл)', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Fe в FeSO₄', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Cu в CuSO₄', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Cu (металл)', accepted: ['0', '+0'] }
	], 'CuSO4', 'Fe', '1,1,1,1', 'Fe окисляется, Cu²⁺ восстанавливается.'),
	rx('rx-e-02', 'easy', 'Zn и Cu²⁺', '$\\mathrm{Zn} + \\mathrm{CuCl}_2 \\rightarrow \\mathrm{ZnCl}_2 + \\mathrm{Cu}$', [
		{ id: 'a', label: 'Zn', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Zn в ZnCl₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Cu в CuCl₂', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Cu', accepted: ['0', '+0'] }
	], 'CuCl2', 'Zn', '1,1,1,1', ''),
	rx('rx-e-03', 'easy', 'Mg и HCl', '$\\mathrm{Mg} + 2\\mathrm{HCl} \\rightarrow \\mathrm{MgCl}_2 + \\mathrm{H}_2$', [
		{ id: 'a', label: 'Mg', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Mg в MgCl₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'H в HCl', accepted: ['+1', '1'] },
		{ id: 'd', label: 'H в H₂', accepted: ['0', '+0'] }
	], 'HCl', 'Mg', '1,2,1,1', ''),
	rx('rx-e-04', 'easy', 'Na и H₂O', '$2\\mathrm{Na} + 2\\mathrm{H}_2\\mathrm{O} \\rightarrow 2\\mathrm{NaOH} + \\mathrm{H}_2$', [
		{ id: 'a', label: 'Na', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Na в NaOH', accepted: ['+1', '1'] },
		{ id: 'c', label: 'H в H₂O', accepted: ['+1', '1'] },
		{ id: 'd', label: 'H в H₂', accepted: ['0', '+0'] }
	], 'H2O', 'Na', '2,2,2,1', ''),
	rx('rx-e-05', 'easy', 'Al и Fe₂O₃', '$2\\mathrm{Al} + \\mathrm{Fe}_2\\mathrm{O}_3 \\rightarrow \\mathrm{Al}_2\\mathrm{O}_3 + 2\\mathrm{Fe}$', [
		{ id: 'a', label: 'Al', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Al в Al₂O₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'Fe в Fe₂O₃', accepted: ['+3', '3'] },
		{ id: 'd', label: 'Fe', accepted: ['0', '+0'] }
	], 'Fe2O3', 'Al', '2,1,1,2', ''),
	rx('rx-e-06', 'easy', 'H₂ и CuO', '$\\mathrm{H}_2 + \\mathrm{CuO} \\rightarrow \\mathrm{Cu} + \\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'H в H₂', accepted: ['0', '+0'] },
		{ id: 'b', label: 'H в H₂O', accepted: ['+1', '1'] },
		{ id: 'c', label: 'Cu в CuO', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Cu', accepted: ['0', '+0'] }
	], 'CuO', 'H2', '1,1,1,1', ''),
	rx('rx-e-07', 'easy', 'Cl₂ и KBr', '$\\mathrm{Cl}_2 + 2\\mathrm{KBr} \\rightarrow 2\\mathrm{KCl} + \\mathrm{Br}_2$', [
		{ id: 'a', label: 'Cl в Cl₂', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Cl в KCl', accepted: ['-1'] },
		{ id: 'c', label: 'Br в KBr', accepted: ['-1'] },
		{ id: 'd', label: 'Br в Br₂', accepted: ['0', '+0'] }
	], 'Cl2', 'KBr', '1,2,2,1', ''),
	rx('rx-e-08', 'easy', 'I₂ и S²⁻', '$\\mathrm{I}_2 + \\mathrm{Na}_2\\mathrm{S} \\rightarrow 2\\mathrm{NaI} + \\mathrm{S}$', [
		{ id: 'a', label: 'I в I₂', accepted: ['0', '+0'] },
		{ id: 'b', label: 'I в NaI', accepted: ['-1'] },
		{ id: 'c', label: 'S в Na₂S', accepted: ['-2', '-2'] },
		{ id: 'd', label: 'S', accepted: ['0', '+0'] }
	], 'I2', 'Na2S', '1,1,2,1', ''),
	rx('rx-e-09', 'easy', 'Fe и AgNO₃', '$\\mathrm{Fe} + 2\\mathrm{AgNO}_3 \\rightarrow \\mathrm{Fe}(\\mathrm{NO}_3)_2 + 2\\mathrm{Ag}$', [
		{ id: 'a', label: 'Fe', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Fe в Fe(NO₃)₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Ag в AgNO₃', accepted: ['+1', '1'] },
		{ id: 'd', label: 'Ag', accepted: ['0', '+0'] }
	], 'AgNO3', 'Fe', '1,2,1,2', ''),
	rx('rx-e-10', 'easy', 'Pb и Cu²⁺', '$\\mathrm{Pb} + \\mathrm{Cu(NO}_3)_2 \\rightarrow \\mathrm{Pb}(\\mathrm{NO}_3)_2 + \\mathrm{Cu}$', [
		{ id: 'a', label: 'Pb', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Pb в Pb(NO₃)₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Cu в Cu(NO₃)₂', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Cu', accepted: ['0', '+0'] }
	], 'Cu(NO3)2', 'Pb', '1,1,1,1', '')
);

redox.push(
	rx('rx-m-01', 'medium', 'FeCl₂ и Cl₂', '$2\\mathrm{FeCl}_2 + \\mathrm{Cl}_2 \\rightarrow 2\\mathrm{FeCl}_3$', [
		{ id: 'a', label: 'Fe в FeCl₂', accepted: ['+2', '2'] },
		{ id: 'b', label: 'Fe в FeCl₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'Cl в Cl₂', accepted: ['0', '+0'] },
		{ id: 'd', label: 'Cl⁻ (среднее)', accepted: ['-1'] }
	], 'Cl2', 'FeCl2', '2,1,2', ''),
	rx('rx-m-02', 'medium', 'SO₂ и Br₂', '$\\mathrm{SO}_2 + \\mathrm{Br}_2 + 2\\mathrm{H}_2\\mathrm{O} \\rightarrow \\mathrm{H}_2\\mathrm{SO}_4 + 2\\mathrm{HBr}$', [
		{ id: 'a', label: 'S в SO₂', accepted: ['+4', '4'] },
		{ id: 'b', label: 'S в H₂SO₄', accepted: ['+6', '6'] },
		{ id: 'c', label: 'Br в Br₂', accepted: ['0', '+0'] },
		{ id: 'd', label: 'Br в HBr', accepted: ['-1'] }
	], 'Br2', 'SO2', '1,1,2,1,2', ''),
	rx('rx-m-03', 'medium', 'H₂S и O₂', '$2\\mathrm{H}_2\\mathrm{S} + 3\\mathrm{O}_2 \\rightarrow 2\\mathrm{SO}_2 + 2\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'S в H₂S', accepted: ['-2', '-2'] },
		{ id: 'b', label: 'S в SO₂', accepted: ['+4', '4'] },
		{ id: 'c', label: 'O в O₂', accepted: ['0', '+0'] },
		{ id: 'd', label: 'O в SO₂', accepted: ['-2', '-2'] }
	], 'O2', 'H2S', '2,3,2,2', ''),
	rx('rx-m-04', 'medium', 'NH₃ и O₂', '$4\\mathrm{NH}_3 + 5\\mathrm{O}_2 \\rightarrow 4\\mathrm{NO} + 6\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'N в NH₃', accepted: ['-3', '-3'] },
		{ id: 'b', label: 'N в NO', accepted: ['+2', '2'] },
		{ id: 'c', label: 'O в O₂', accepted: ['0', '+0'] },
		{ id: 'd', label: 'O в H₂O', accepted: ['-2', '-2'] }
	], 'O2', 'NH3', '4,5,4,6', ''),
	rx('rx-m-05', 'medium', 'KMnO₄ и FeSO₄ (кислая)', '$2\\mathrm{KMnO}_4 + 10\\mathrm{FeSO}_4 + 8\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow \\mathrm{K}_2\\mathrm{SO}_4 + 2\\mathrm{MnSO}_4 + 5\\mathrm{Fe}_2(\\mathrm{SO}_4)_3 + 8\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Mn в KMnO₄', accepted: ['+7', '7'] },
		{ id: 'b', label: 'Mn в MnSO₄', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Fe в FeSO₄', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Fe в Fe₂(SO₄)₃', accepted: ['+3', '3'] }
	], 'KMnO4', 'FeSO4', '2,10,8,1,2,5,8', ''),
	rx('rx-m-06', 'medium', 'K₂Cr₂O₇ и HI', '$\\mathrm{K}_2\\mathrm{Cr}_2\\mathrm{O}_7 + 6\\mathrm{HI} + 4\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow \\mathrm{Cr}_2(\\mathrm{SO}_4)_3 + \\mathrm{K}_2\\mathrm{SO}_4 + 3\\mathrm{I}_2 + 7\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Cr в K₂Cr₂O₇', accepted: ['+6', '6'] },
		{ id: 'b', label: 'Cr в Cr₂(SO₄)₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'I в HI', accepted: ['-1'] },
		{ id: 'd', label: 'I в I₂', accepted: ['0', '+0'] }
	], 'K2Cr2O7', 'HI', '1,6,4,1,1,3,7', ''),
	rx('rx-m-07', 'medium', 'NO₂ и H₂O', '$3\\mathrm{NO}_2 + \\mathrm{H}_2\\mathrm{O} \\rightarrow 2\\mathrm{HNO}_3 + \\mathrm{NO}$', [
		{ id: 'a', label: 'N в NO₂', accepted: ['+4', '4'] },
		{ id: 'b', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'c', label: 'N в NO', accepted: ['+2', '2'] },
		{ id: 'd', label: 'O в H₂O', accepted: ['-2', '-2'] }
	], 'NO2', 'NO2', '3,1,2,1', ''),
	rx('rx-m-08', 'medium', 'Cl₂ и NaOH (холод)', '$\\mathrm{Cl}_2 + 2\\mathrm{NaOH} \\rightarrow \\mathrm{NaCl} + \\mathrm{NaClO} + \\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Cl в Cl₂', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Cl в NaCl', accepted: ['-1'] },
		{ id: 'c', label: 'Cl в NaClO', accepted: ['+1', '1'] },
		{ id: 'd', label: 'Na в NaOH', accepted: ['+1', '1'] }
	], 'Cl2', 'Cl2', '1,2,1,1,1', ''),
	rx('rx-m-09', 'medium', 'Cu и HNO₃ (разб.)', '$3\\mathrm{Cu} + 8\\mathrm{HNO}_3 \\rightarrow 3\\mathrm{Cu}(\\mathrm{NO}_3)_2 + 2\\mathrm{NO} + 4\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Cu', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Cu в Cu(NO₃)₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO', accepted: ['+2', '2'] }
	], 'HNO3', 'Cu', '3,8,3,2,4', ''),
	rx('rx-m-10', 'medium', 'S и HNO₃', '$\\mathrm{S} + 2\\mathrm{HNO}_3 \\rightarrow \\mathrm{H}_2\\mathrm{SO}_4 + 2\\mathrm{NO}$', [
		{ id: 'a', label: 'S', accepted: ['0', '+0'] },
		{ id: 'b', label: 'S в H₂SO₄', accepted: ['+6', '6'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO', accepted: ['+2', '2'] }
	], 'HNO3', 'S', '1,2,1,2', '')
);

redox.push(
	rx('rx-h-01', 'hard', 'MnO₂ и HCl', '$\\mathrm{MnO}_2 + 4\\mathrm{HCl} \\rightarrow \\mathrm{MnCl}_2 + \\mathrm{Cl}_2 + 2\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Mn в MnO₂', accepted: ['+4', '4'] },
		{ id: 'b', label: 'Mn в MnCl₂', accepted: ['+2', '2'] },
		{ id: 'c', label: 'Cl в HCl', accepted: ['-1'] },
		{ id: 'd', label: 'Cl в Cl₂', accepted: ['0', '+0'] }
	], 'MnO2', 'HCl', '1,4,1,1,2', ''),
	rx('rx-h-02', 'hard', 'KClO₃ и HCl', '$\\mathrm{KClO}_3 + 6\\mathrm{HCl} \\rightarrow \\mathrm{KCl} + 3\\mathrm{Cl}_2 + 3\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Cl в KClO₃', accepted: ['+5', '5'] },
		{ id: 'b', label: 'Cl в KCl', accepted: ['-1'] },
		{ id: 'c', label: 'Cl в HCl', accepted: ['-1'] },
		{ id: 'd', label: 'Cl в Cl₂', accepted: ['0', '+0'] }
	], 'KClO3', 'HCl', '1,6,1,3,3', ''),
	rx('rx-h-03', 'hard', 'H₂O₂ и KMnO₄', '$2\\mathrm{KMnO}_4 + 5\\mathrm{H}_2\\mathrm{O}_2 + 3\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow \\mathrm{K}_2\\mathrm{SO}_4 + 2\\mathrm{MnSO}_4 + 5\\mathrm{O}_2 + 8\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Mn в KMnO₄', accepted: ['+7', '7'] },
		{ id: 'b', label: 'Mn в MnSO₄', accepted: ['+2', '2'] },
		{ id: 'c', label: 'O в H₂O₂', accepted: ['-1'] },
		{ id: 'd', label: 'O в O₂', accepted: ['0', '+0'] }
	], 'KMnO4', 'H2O2', '2,5,3,1,2,5,8', ''),
	rx('rx-h-04', 'hard', 'Al и HNO₃ (конц.)', '$\\mathrm{Al} + 6\\mathrm{HNO}_3 \\rightarrow \\mathrm{Al}(\\mathrm{NO}_3)_3 + 3\\mathrm{NO}_2 + 3\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Al', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Al в Al(NO₃)₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO₂', accepted: ['+4', '4'] }
	], 'HNO3', 'Al', '1,6,1,3,3', ''),
	rx('rx-h-05', 'hard', 'FeS₂ и O₂', '$4\\mathrm{FeS}_2 + 11\\mathrm{O}_2 \\rightarrow 2\\mathrm{Fe}_2\\mathrm{O}_3 + 8\\mathrm{SO}_2$', [
		{ id: 'a', label: 'Fe в FeS₂', accepted: ['+2', '2'] },
		{ id: 'b', label: 'Fe в Fe₂O₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'S в FeS₂', accepted: ['-1'] },
		{ id: 'd', label: 'S в SO₂', accepted: ['+4', '4'] }
	], 'O2', 'FeS2', '4,11,2,8', ''),
	rx('rx-h-06', 'hard', 'NH₃ и CuO', '$2\\mathrm{NH}_3 + 3\\mathrm{CuO} \\rightarrow 3\\mathrm{Cu} + \\mathrm{N}_2 + 3\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'N в NH₃', accepted: ['-3', '-3'] },
		{ id: 'b', label: 'N в N₂', accepted: ['0', '+0'] },
		{ id: 'c', label: 'Cu в CuO', accepted: ['+2', '2'] },
		{ id: 'd', label: 'Cu', accepted: ['0', '+0'] }
	], 'CuO', 'NH3', '2,3,3,1,3', ''),
	rx('rx-h-07', 'hard', 'C и H₂SO₄', '$\\mathrm{C} + 2\\mathrm{H}_2\\mathrm{SO}_4 \\rightarrow \\mathrm{CO}_2 + 2\\mathrm{SO}_2 + 2\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'C', accepted: ['0', '+0'] },
		{ id: 'b', label: 'C в CO₂', accepted: ['+4', '4'] },
		{ id: 'c', label: 'S в H₂SO₄', accepted: ['+6', '6'] },
		{ id: 'd', label: 'S в SO₂', accepted: ['+4', '4'] }
	], 'H2SO4', 'C', '1,2,1,2,2', ''),
	rx('rx-h-08', 'hard', 'P и HNO₃', '$\\mathrm{P} + 5\\mathrm{HNO}_3 \\rightarrow \\mathrm{H}_3\\mathrm{PO}_4 + 5\\mathrm{NO}_2 + \\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'P', accepted: ['0', '+0'] },
		{ id: 'b', label: 'P в H₃PO₄', accepted: ['+5', '5'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO₂', accepted: ['+4', '4'] }
	], 'HNO3', 'P', '1,5,1,5,1', ''),
	rx('rx-h-09', 'hard', 'As и HNO₃', '$\\mathrm{As} + 5\\mathrm{HNO}_3 \\rightarrow \\mathrm{H}_3\\mathrm{AsO}_4 + 5\\mathrm{NO}_2 + \\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'As', accepted: ['0', '+0'] },
		{ id: 'b', label: 'As в H₃AsO₄', accepted: ['+5', '5'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO₂', accepted: ['+4', '4'] }
	], 'HNO3', 'As', '1,5,1,5,1', ''),
	rx('rx-h-10', 'hard', 'Bi и HNO₃', '$\\mathrm{Bi} + 6\\mathrm{HNO}_3 \\rightarrow \\mathrm{Bi}(\\mathrm{NO}_3)_3 + 3\\mathrm{NO}_2 + 3\\mathrm{H}_2\\mathrm{O}$', [
		{ id: 'a', label: 'Bi', accepted: ['0', '+0'] },
		{ id: 'b', label: 'Bi в Bi(NO₃)₃', accepted: ['+3', '3'] },
		{ id: 'c', label: 'N в HNO₃', accepted: ['+5', '5'] },
		{ id: 'd', label: 'N в NO₂', accepted: ['+4', '4'] }
	], 'HNO3', 'Bi', '1,6,1,3,3', '')
);

write('redox.json', redox);

const classes = [];
const cls = (id, d, title, f, c) =>
	classes.push({ id, type: 'classes', difficulty: d, title, promptMd: 'Выберите класс.', formula: f, correctValue: c, points: 50 });

const easyF = [
	['cl-e-01', 'KOH', 'KOH', 'base'],
	['cl-e-02', 'HNO3', 'HNO3', 'acid'],
	['cl-e-03', 'S8', 'S8', 'simple'],
	['cl-e-04', 'KCl', 'KCl', 'salt'],
	['cl-e-05', 'Ba(OH)2', 'Ba(OH)2', 'hydroxide'],
	['cl-e-06', 'CO2', 'CO2', 'oxide'],
	['cl-e-07', 'Li2O', 'Li2O', 'oxide'],
	['cl-e-08', 'HF', 'HF', 'acid'],
	['cl-e-09', 'MgCl2', 'MgCl2', 'salt'],
	['cl-e-10', 'N2', 'N2', 'simple']
];
const medF = [
	['cl-m-01', 'SO3', 'SO3', 'oxide'],
	['cl-m-02', 'Cu(OH)2', 'Cu(OH)2', 'hydroxide'],
	['cl-m-03', 'KMnO4', 'KMnO4', 'salt'],
	['cl-m-04', 'NaHSO4', 'NaHSO4', 'acid_salt'],
	['cl-m-05', 'Pb(OH)Cl', 'Pb(OH)Cl', 'basic_salt'],
	['cl-m-06', 'H3PO4', 'H3PO4', 'acid'],
	['cl-m-07', 'Fe(OH)3', 'Fe(OH)3', 'hydroxide'],
	['cl-m-08', 'Ca(HCO3)2', 'Ca(HCO3)2', 'acid_salt'],
	['cl-m-09', 'NO2', 'NO2', 'oxide'],
	['cl-m-10', 'K2Cr2O7', 'K2Cr2O7', 'salt']
];
const hardF = [
	['cl-h-01', 'NaHCO3', 'NaHCO3', 'acid_salt'],
	['cl-h-02', 'Cu2(OH)2CO3', 'Cu2(OH)2CO3', 'basic_salt'],
	['cl-h-03', 'CH3COOH', 'CH3COOH', 'acid'],
	['cl-h-04', 'NH4Cl', 'NH4Cl', 'salt'],
	['cl-h-05', 'P2O5', 'P2O5', 'oxide'],
	['cl-h-06', 'Al(OH)3', 'Al(OH)3', 'hydroxide'],
	['cl-h-07', 'FeSO4', 'FeSO4', 'salt'],
	['cl-h-08', 'Cl2', 'Cl2', 'simple'],
	['cl-h-09', 'Na2O2', 'Na2O2', 'oxide'],
	['cl-h-10', 'H2C2O4', 'H2C2O4', 'acid']
];
for (const [id, t, f, c] of easyF) cls(id, 'easy', t, f, c);
for (const [id, t, f, c] of medF) cls(id, 'medium', t, f, c);
for (const [id, t, f, c] of hardF) cls(id, 'hard', t, f, c);

write('classes.json', classes);

console.log('Wrote equations, calculations, chains, redox, classes');
