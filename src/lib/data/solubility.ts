export interface Ion {
    symbol: string;
    name: string;
    nameEn?: string;
    charge: string;
    group?: 'alkali' | 'alkaline-earth' | 'transition' | 'other' | 'ammonium' | 'hydrogen';
}

export type SolubilityLevel = 'soluble' | 'insoluble' | 'slight' | 'decomposes' | 'reacts' | 'unknown' | 'variable';

export interface SolubilityEntry {
    cation: Ion;
    anion: Ion;
    solubility: SolubilityLevel;
    formula: string;
    notes?: string;
    ksp?: string;
    solubilityGPer100ml?: string; // e.g., "35.9 g/100ml at 20°C"
}

// ============== CATIONS ==============
export const cations: Ion[] = [
    { symbol: 'H⁺', name: 'Водород', nameEn: 'Hydrogen', charge: '+1', group: 'hydrogen' },
    { symbol: 'Li⁺', name: 'Литий', nameEn: 'Lithium', charge: '+1', group: 'alkali' },
    { symbol: 'Na⁺', name: 'Натрий', nameEn: 'Sodium', charge: '+1', group: 'alkali' },
    { symbol: 'K⁺', name: 'Калий', nameEn: 'Potassium', charge: '+1', group: 'alkali' },
    { symbol: 'Rb⁺', name: 'Рубидий', nameEn: 'Rubidium', charge: '+1', group: 'alkali' },
    { symbol: 'Cs⁺', name: 'Цезий', nameEn: 'Cesium', charge: '+1', group: 'alkali' },
    { symbol: 'NH₄⁺', name: 'Аммоний', nameEn: 'Ammonium', charge: '+1', group: 'ammonium' },
    
    { symbol: 'Ag⁺', name: 'Серебро(I)', nameEn: 'Silver(I)', charge: '+1', group: 'transition' },
    { symbol: 'Cu⁺', name: 'Медь(I)', nameEn: 'Copper(I)', charge: '+1', group: 'transition' },
    { symbol: 'Hg₂²⁺', name: 'Ртуть(I)', nameEn: 'Mercury(I)', charge: '+2', group: 'transition' },
    
    { symbol: 'Mg²⁺', name: 'Магний', nameEn: 'Magnesium', charge: '+2', group: 'alkaline-earth' },
    { symbol: 'Ca²⁺', name: 'Кальций', nameEn: 'Calcium', charge: '+2', group: 'alkaline-earth' },
    { symbol: 'Sr²⁺', name: 'Стронций', nameEn: 'Strontium', charge: '+2', group: 'alkaline-earth' },
    { symbol: 'Ba²⁺', name: 'Барий', nameEn: 'Barium', charge: '+2', group: 'alkaline-earth' },
    { symbol: 'Ra²⁺', name: 'Радий', nameEn: 'Radium', charge: '+2', group: 'alkaline-earth' },
    
    { symbol: 'Mn²⁺', name: 'Марганец(II)', nameEn: 'Manganese(II)', charge: '+2', group: 'transition' },
    { symbol: 'Fe²⁺', name: 'Железо(II)', nameEn: 'Iron(II)', charge: '+2', group: 'transition' },
    { symbol: 'Co²⁺', name: 'Кобальт(II)', nameEn: 'Cobalt(II)', charge: '+2', group: 'transition' },
    { symbol: 'Ni²⁺', name: 'Никель(II)', nameEn: 'Nickel(II)', charge: '+2', group: 'transition' },
    { symbol: 'Cu²⁺', name: 'Медь(II)', nameEn: 'Copper(II)', charge: '+2', group: 'transition' },
    { symbol: 'Zn²⁺', name: 'Цинк', nameEn: 'Zinc', charge: '+2', group: 'transition' },
    { symbol: 'Cd²⁺', name: 'Кадмий', nameEn: 'Cadmium', charge: '+2', group: 'transition' },
    { symbol: 'Pb²⁺', name: 'Свинец(II)', nameEn: 'Lead(II)', charge: '+2', group: 'other' },
    { symbol: 'Sn²⁺', name: 'Олово(II)', nameEn: 'Tin(II)', charge: '+2', group: 'other' },
    
    { symbol: 'Al³⁺', name: 'Алюминий', nameEn: 'Aluminum', charge: '+3', group: 'other' },
    { symbol: 'Cr³⁺', name: 'Хром(III)', nameEn: 'Chromium(III)', charge: '+3', group: 'transition' },
    { symbol: 'Fe³⁺', name: 'Железо(III)', nameEn: 'Iron(III)', charge: '+3', group: 'transition' },
    { symbol: 'Co³⁺', name: 'Кобальт(III)', nameEn: 'Cobalt(III)', charge: '+3', group: 'transition' },
    
    { symbol: 'Sn⁴⁺', name: 'Олово(IV)', nameEn: 'Tin(IV)', charge: '+4', group: 'other' },
    { symbol: 'Pb⁴⁺', name: 'Свинец(IV)', nameEn: 'Lead(IV)', charge: '+4', group: 'other' },
];

// ============== ANIONS ==============
export const anions: Ion[] = [
    { symbol: 'OH⁻', name: 'Гидроксид', nameEn: 'Hydroxide', charge: '-1' },
    { symbol: 'F⁻', name: 'Фторид', nameEn: 'Fluoride', charge: '-1' },
    { symbol: 'Cl⁻', name: 'Хлорид', nameEn: 'Chloride', charge: '-1' },
    { symbol: 'Br⁻', name: 'Бромид', nameEn: 'Bromide', charge: '-1' },
    { symbol: 'I⁻', name: 'Иодид', nameEn: 'Iodide', charge: '-1' },
    { symbol: 'NO₂⁻', name: 'Нитрит', nameEn: 'Nitrite', charge: '-1' },
    { symbol: 'NO₃⁻', name: 'Нитрат', nameEn: 'Nitrate', charge: '-1' },
    { symbol: 'ClO⁻', name: 'Гипохлорит', nameEn: 'Hypochlorite', charge: '-1' },
    { symbol: 'ClO₃⁻', name: 'Хлорат', nameEn: 'Chlorate', charge: '-1' },
    { symbol: 'ClO₄⁻', name: 'Перхлорат', nameEn: 'Perchlorate', charge: '-1' },
    { symbol: 'MnO₄⁻', name: 'Перманганат', nameEn: 'Permanganate', charge: '-1' },
    { symbol: 'CH₃COO⁻', name: 'Ацетат', nameEn: 'Acetate', charge: '-1' },
    { symbol: 'CN⁻', name: 'Цианид', nameEn: 'Cyanide', charge: '-1' },
    { symbol: 'SCN⁻', name: 'Тиоцианат', nameEn: 'Thiocyanate', charge: '-1' },
    
    { symbol: 'SO₃²⁻', name: 'Сульфит', nameEn: 'Sulfite', charge: '-2' },
    { symbol: 'SO₄²⁻', name: 'Сульфат', nameEn: 'Sulfate', charge: '-2' },
    { symbol: 'S₂O₃²⁻', name: 'Тиосульфат', nameEn: 'Thiosulfate', charge: '-2' },
    { symbol: 'CrO₄²⁻', name: 'Хромат', nameEn: 'Chromate', charge: '-2' },
    { symbol: 'Cr₂O₇²⁻', name: 'Дихромат', nameEn: 'Dichromate', charge: '-2' },
    { symbol: 'CO₃²⁻', name: 'Карбонат', nameEn: 'Carbonate', charge: '-2' },
    { symbol: 'SiO₃²⁻', name: 'Силикат', nameEn: 'Silicate', charge: '-2' },
    { symbol: 'S²⁻', name: 'Сульфид', nameEn: 'Sulfide', charge: '-2' },
    { symbol: 'O²⁻', name: 'Оксид', nameEn: 'Oxide', charge: '-2' },
    
    { symbol: 'PO₃³⁻', name: 'Фосфит', nameEn: 'Phosphite', charge: '-3' },
    { symbol: 'PO₄³⁻', name: 'Фосфат', nameEn: 'Phosphate', charge: '-3' },
    { symbol: 'AsO₄³⁻', name: 'Арсенат', nameEn: 'Arsenate', charge: '-3' },
];

// ============== SOLUBILITY COLORS & LABELS ==============
export const solubilityColors: Record<SolubilityLevel, string> = {
    'soluble': '#86efac',        // green-300
    'insoluble': '#fca5a5',      // red-300
    'slight': '#fde047',         // yellow-300
    'decomposes': '#d8b4fe',     // purple-300
    'reacts': '#93c5fd',         // blue-300
    'unknown': '#e5e7eb',        // gray-200
    'variable': '#fbbf24',       // amber-400
};

export const solubilityLabels: Record<SolubilityLevel, string> = {
    'soluble': 'Р',
    'insoluble': 'Н',
    'slight': 'М',
    'decomposes': '∿',
    'reacts': '↯',
    'unknown': '?',
    'variable': '≈',
};

export const solubilityDescriptions: Record<SolubilityLevel, string> = {
    'soluble': 'Растворимо (>1 г/100 мл воды)',
    'insoluble': 'Нерастворимо (<0.01 г/100 мл воды)',
    'slight': 'Малорастворимо (0.01–1 г/100 мл воды)',
    'decomposes': 'Разлагается в воде',
    'reacts': 'Реагирует с водой (гидролиз)',
    'unknown': 'Данных нет',
    'variable': 'Зависит от условий',
};

// ============== HELPER: Generate formula from ions ==============
function generateFormula(cation: Ion, anion: Ion): string {
    const cCharge = parseInt(cation.charge);
    const aCharge = Math.abs(parseInt(anion.charge));
    
    if (cCharge === aCharge) {
    // eslint-disable-next-line no-useless-escape
        return `${cation.symbol.replace(/\d+[+\-]/, '')}${anion.symbol.replace(/\d+[+\-]/, '')}`;
    }
    
    const cSub = aCharge > 1 ? aCharge : '';
    const aSub = cCharge > 1 ? cCharge : '';
    
    // Handle polyatomic ions with parentheses
    // eslint-disable-next-line no-useless-escape
    const cSymbol = cation.symbol.replace(/[+\-]/g, '');
    // eslint-disable-next-line no-useless-escape
    const aSymbol = anion.symbol.replace(/[+\-]/g, '');
    const aNeedsParens = aSymbol.length > 2 && !['OH', 'CN', 'SCN'].includes(aSymbol);
    const cNeedsParens = cSymbol.length > 2 && !['NH4'].includes(cSymbol);
    
    return `${cNeedsParens ? `(${cSymbol})` : cSymbol}${cSub}${aNeedsParens ? `(${aSymbol})` : aSymbol}${aSub}`;
}

// ============== SOLUBILITY RULES ENGINE ==============
// Returns solubility based on standard chemistry rules
function getSolubilityByRules(cation: Ion, anion: Ion): { solubility: SolubilityLevel; notes?: string } {
    const c = cation.symbol;
    const a = anion.symbol;
    
    // RULE 1: All nitrates, nitrites, acetates, perchlorates, chlorates are soluble
    if (['NO₃⁻', 'NO₂⁻', 'CH₃COO⁻', 'ClO₄⁻', 'ClO₃⁻'].includes(a)) {
        return { solubility: 'soluble' };
    }
    
    // RULE 2: All alkali metals (Li, Na, K, Rb, Cs) and NH₄⁺ salts are soluble
    if (['Li⁺', 'Na⁺', 'K⁺', 'Rb⁺', 'Cs⁺', 'NH₄⁺'].includes(c)) {
        // Exception: Some complex salts may be slight, but generally soluble
        if (a === 'ClO₄⁻' && c === 'K⁺') return { solubility: 'slight', notes: 'KClO₄ малорастворим' };
        return { solubility: 'soluble' };
    }
    
    // RULE 3: Hydroxides (OH⁻)
    if (a === 'OH⁻') {
        if (['Ba²⁺', 'Sr²⁺'].includes(c)) return { solubility: 'slight', notes: 'Растворимость растёт с температурой' };
        if (c === 'Ca²⁺') return { solubility: 'slight', notes: 'Известковая вода' };
        if (['Mg²⁺', 'Mn²⁺', 'Fe²⁺', 'Co²⁺', 'Ni²⁺', 'Cu²⁺', 'Zn²⁺', 'Cd²⁺', 'Pb²⁺', 'Al³⁺', 'Cr³⁺', 'Fe³⁺'].includes(c)) {
            return { solubility: 'insoluble', notes: 'Осадок характерного цвета' };
        }
        if (c === 'Ag⁺') return { solubility: 'decomposes', notes: 'AgOH нестабилен, разлагается до Ag₂O' };
        return { solubility: 'insoluble' };
    }
    
    // RULE 4: Oxides (O²⁻) - mostly react with water or insoluble
    if (a === 'O²⁻') {
        if (['Li⁺', 'Na⁺', 'K⁺', 'Rb⁺', 'Cs⁺', 'Ba²⁺', 'Sr²⁺', 'Ca²⁺'].includes(c)) {
            return { solubility: 'reacts', notes: 'Образует гидроксид при реакции с водой' };
        }
        return { solubility: 'insoluble' };
    }
    
    // RULE 5: Halides (F⁻, Cl⁻, Br⁻, I⁻)
    if (['F⁻', 'Cl⁻', 'Br⁻', 'I⁻'].includes(a)) {
        // Fluorides have different rules
        if (a === 'F⁻') {
            if (['Na⁺', 'K⁺', 'NH₄⁺', 'Ag⁺'].includes(c)) return { solubility: 'soluble' };
            if (['Mg²⁺', 'Ca²⁺', 'Sr²⁺', 'Ba²⁺', 'Pb²⁺'].includes(c)) return { solubility: 'slight' };
            return { solubility: 'insoluble' };
        }
        // Chlorides, bromides, iodides: insoluble for Ag⁺, Pb²⁺, Hg₂²⁺, Cu⁺
        if (['Ag⁺', 'Hg₂²⁺', 'Cu⁺'].includes(c)) {
            return { solubility: 'insoluble', notes: a === 'Cl⁻' ? 'Белый осадок' : a === 'Br⁻' ? 'Светло-жёлтый' : 'Жёлтый осадок' };
        }
        if (c === 'Pb²⁺') {
            return { solubility: 'slight', notes: 'Растворимость растёт при нагревании' };
        }
        return { solubility: 'soluble' };
    }
    
    // RULE 6: Sulfates (SO₄²⁻)
    if (a === 'SO₄²⁻') {
        if (['Ba²⁺', 'Sr²⁺', 'Pb²⁺'].includes(c)) {
            return { solubility: 'insoluble', notes: 'Белый осадок, не растворяется в кислотах'};
        }
        if (c === 'Ca²⁺') return { solubility: 'slight', notes: 'Гипс' };
        if (c === 'Ag⁺') return { solubility: 'slight' };
        return { solubility: 'soluble' };
    }
    
    // RULE 7: Carbonates (CO₃²⁻), Phosphates (PO₄³⁻), Sulfites (SO₃²⁻), Silicates (SiO₃²⁻)
    if (['CO₃²⁻', 'PO₄³⁻', 'SO₃²⁻', 'SiO₃²⁻', 'PO₃³⁻', 'AsO₄³⁻'].includes(a)) {
        // Soluble only for alkali metals and NH₄⁺ (already handled in Rule 2)
        if (['Mg²⁺', 'Ca²⁺'].includes(c) && a === 'CO₃²⁻') {
            return { solubility: 'insoluble', notes: c === 'Ca²⁺' ? 'Мел, мрамор, известняк' : 'Магнезит' };
        }
        if (c === 'Ba²⁺' && ['CO₃²⁻', 'PO₄³⁻'].includes(a)) {
            return { solubility: 'insoluble' };
        }
        return { solubility: 'insoluble', notes: 'Выделяет газ при действии кислот' };
    }
    
    // RULE 8: Sulfides (S²⁻)
    if (a === 'S²⁻') {
        if (['Ba²⁺', 'Ca²⁺', 'Sr²⁺'].includes(c)) return { solubility: 'slight', notes: 'Гидролизуются' };
        if (['Mn²⁺', 'Fe²⁺', 'Co²⁺', 'Ni²⁺', 'Zn²⁺'].includes(c)) {
            return { solubility: 'insoluble', notes: 'Осадки разной окраски, растворяются в кислотах' };
        }
        if (['Cu²⁺', 'Cd²⁺', 'Pb²⁺', 'Ag⁺', 'Hg₂²⁺'].includes(c)) {
            return { solubility: 'insoluble', notes: 'Не растворяются в разбавленных кислотах' };
        }
        if (['Al³⁺', 'Cr³⁺', 'Fe³⁺'].includes(c)) {
            return { solubility: 'reacts', notes: 'Полный гидролиз до гидроксида и H₂S' };
        }
        return { solubility: 'insoluble' };
    }
    
    // RULE 9: Chromates (CrO₄²⁻) and Dichromates (Cr₂O₇²⁻)
    if (a === 'CrO₄²⁻') {
        if (['Ba²⁺', 'Sr²⁺', 'Pb²⁺', 'Ag⁺'].includes(c)) return { solubility: 'insoluble', notes: 'Жёлтый осадок' };
        return { solubility: 'soluble' };
    }
    if (a === 'Cr₂O₇²⁻') {
        if (c === 'K⁺') return { solubility: 'soluble', notes: 'Оранжевые кристаллы' };
        return { solubility: 'soluble' };
    }
    
    // RULE 10: Permanganates (MnO₄⁻) - all soluble
    if (a === 'MnO₄⁻') {
        return { solubility: 'soluble', notes: 'Фиолетовый раствор' };
    }
    
    // RULE 11: Cyanides (CN⁻) and Thiocyanates (SCN⁻)
    if (['CN⁻', 'SCN⁻'].includes(a)) {
        if (['Ag⁺', 'Hg₂²⁺', 'Pb²⁺'].includes(c)) return { solubility: 'slight' };
        return { solubility: 'soluble', notes: 'Ядовиты!' };
    }
    
    // RULE 12: Thiosulfates (S₂O₃²⁻)
    if (a === 'S₂O₃²⁻') {
        if (c === 'Ag⁺') return { solubility: 'slight', notes: 'Белый осадок, темнеет' };
        return { solubility: 'soluble' };
    }
    
    // Default: unknown or variable
    return { solubility: 'unknown', notes: 'Требуется экспериментальная проверка' };
}

// ============== GENERATE COMPLETE SOLUBILITY MATRIX ==============
export const solubilityData: SolubilityEntry[] = (() => {
    const data: SolubilityEntry[] = [];
    
    for (const cation of cations) {
        for (const anion of anions) {
            const { solubility, notes } = getSolubilityByRules(cation, anion);
            const formula = generateFormula(cation, anion);
            
            // Add specific known values and exceptions
            const entry: SolubilityEntry = { cation, anion, solubility, formula, notes };
            
            // Add Ksp values for important insoluble compounds
            const kspData: Record<string, string> = {
                'AgCl': '1.8×10⁻¹⁰',
                'AgBr': '5.0×10⁻¹³',
                'AgI': '8.3×10⁻¹⁷',
                'BaSO₄': '1.1×10⁻¹⁰',
                'CaCO₃': '3.4×10⁻⁹',
                'PbSO₄': '1.6×10⁻⁸',
                'PbCl₂': '1.7×10⁻⁵',
                'Fe(OH)₃': '2.8×10⁻³⁹',
                'Al(OH)₃': '1.3×10⁻³³',
                'Cu(OH)₂': '2.2×10⁻²⁰',
                'ZnS': '2.0×10⁻²⁵',
                'Ag₂S': '6.3×10⁻⁵⁰',
            };
            if (kspData[formula]) {
                entry.ksp = kspData[formula];
            }
            
            // Add specific solubility values for common compounds
            const solubilityValues: Record<string, string> = {
                'NaCl': '35.9 г/100 мл (20°C)',
                'KCl': '34.0 г/100 мл (20°C)',
                'CaSO₄': '0.21 г/100 мл (20°C)',
                'AgCl': '0.00019 г/100 мл (20°C)',
                'BaSO₄': '0.00024 г/100 мл (20°C)',
            };
            if (solubilityValues[formula]) {
                entry.solubilityGPer100ml = solubilityValues[formula];
            }
            
            // Special cases overrides
            if (cation.symbol === 'H⁺') {
                // Acids: most are soluble, some decompose
                if (['CO₃²⁻', 'SO₃²⁻', 'S²⁻'].includes(anion.symbol)) {
                    entry.solubility = 'reacts';
                    entry.notes = 'Выделяется газ (CO₂, SO₂, H₂S)';
                }
                if (anion.symbol === 'SiO₃²⁻') {
                    entry.solubility = 'reacts';
                    entry.notes = 'Образуется гель кремниевой кислоты';
                }
            }
            
            if (cation.symbol === 'Ag⁺' && anion.symbol === 'OH⁻') {
                entry.solubility = 'decomposes';
                entry.formula = 'Ag₂O';
                entry.notes = 'AgOH нестабилен, мгновенно разлагается';
            }
            
            if (['Al³⁺', 'Cr³⁺', 'Fe³⁺'].includes(cation.symbol) && ['CO₃²⁻', 'S²⁻', 'SO₃²⁻'].includes(anion.symbol)) {
                entry.solubility = 'reacts';
                entry.notes = 'Полный гидролиз: образуется гидроксид + газ';
            }
            
            data.push(entry);
        }
    }
    
    return data;
})();

// ============== UTILITY FUNCTIONS ==============

/**
 * Get solubility entry for a specific cation-anion pair
 */
export function getSolubilityEntry(cationSymbol: string, anionSymbol: string): SolubilityEntry | undefined {
    return solubilityData.find(
        e => e.cation.symbol === cationSymbol && e.anion.symbol === anionSymbol
    );
}

/**
 * Filter entries by solubility level
 */
export function filterBySolubility(level: SolubilityLevel): SolubilityEntry[] {
    return solubilityData.filter(e => e.solubility === level);
}

/**
 * Get all soluble compounds for a given cation
 */
export function getSolubleCompounds(cationSymbol: string): SolubilityEntry[] {
    return solubilityData.filter(
        e => e.cation.symbol === cationSymbol && e.solubility === 'soluble'
    );
}

/**
 * Search entries by formula or ion name
 */
export function searchSolubility(query: string): SolubilityEntry[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    return solubilityData.filter(e => 
        e.formula.toLowerCase().includes(q) ||
        e.cation.name.toLowerCase().includes(q) ||
        e.cation.nameEn?.toLowerCase().includes(q) ||
        e.anion.name.toLowerCase().includes(q) ||
        e.anion.nameEn?.toLowerCase().includes(q) ||
        e.notes?.toLowerCase().includes(q)
    );
}

/**
 * Get cations/anions filtered by group (for UI dropdowns)
 */
export function getIonsByGroup(group: Ion['group']): Ion[] {
    return [...cations, ...anions].filter(ion => ion.group === group);
}

export default {
    cations,
    anions,
    solubilityData,
    solubilityColors,
    solubilityLabels,
    solubilityDescriptions,
    getSolubilityEntry,
    filterBySolubility,
    getSolubleCompounds,
    searchSolubility,
    getIonsByGroup,
};