<script lang="ts">
        interface Element {
                number: number;
                symbol: string;
                name: string;
                mass: number;
                category: string;
        }

        const elements: Element[] = [
                { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal' },
                { number: 2, symbol: 'He', name: 'Helium', mass: 4.003, category: 'noble-gas' },
                { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.941, category: 'alkali-metal' },
                { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.012, category: 'alkaline-earth' },
                { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid' },
                { number: 6, symbol: 'C', name: 'Carbon', mass: 12.01, category: 'nonmetal' },
                { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.01, category: 'nonmetal' },
                { number: 8, symbol: 'O', name: 'Oxygen', mass: 16.00, category: 'nonmetal' },
                { number: 9, symbol: 'F', name: 'Fluorine', mass: 19.00, category: 'halogen' },
                { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.18, category: 'noble-gas' },
                { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.99, category: 'alkali-metal' },
                { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.31, category: 'alkaline-earth' },
                { number: 13, symbol: 'Al', name: 'Aluminium', mass: 26.98, category: 'post-transition' },
                { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.09, category: 'metalloid' },
                { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.97, category: 'nonmetal' },
                { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.07, category: 'nonmetal' },
                { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen' },
                { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.95, category: 'noble-gas' },
                { number: 19, symbol: 'K', name: 'Potassium', mass: 39.10, category: 'alkali-metal' },
                { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.08, category: 'alkaline-earth' },
                { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.96, category: 'transition' },
                { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.87, category: 'transition' },
                { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.94, category: 'transition' },
                { number: 24, symbol: 'Cr', name: 'Chromium', mass: 52.00, category: 'transition' },
                { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.94, category: 'transition' },
                { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.85, category: 'transition' },
                { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.93, category: 'transition' },
                { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.69, category: 'transition' },
                { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.55, category: 'transition' },
                { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition' },
                { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.72, category: 'post-transition' },
                { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.63, category: 'metalloid' },
                { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.92, category: 'metalloid' },
                { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.97, category: 'nonmetal' },
                { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.90, category: 'halogen' },
                { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.80, category: 'noble-gas' },
                { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.47, category: 'alkali-metal' },
                { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, category: 'alkaline-earth' },
                { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.91, category: 'transition' },
                { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.22, category: 'transition' },
                { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.91, category: 'transition' },
                { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.95, category: 'transition' },
                { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98.00, category: 'transition' },
                { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.1, category: 'transition' },
                { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.9, category: 'transition' },
                { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.4, category: 'transition' },
                { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.9, category: 'transition' },
                { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.4, category: 'transition' },
                { number: 49, symbol: 'In', name: 'Indium', mass: 114.8, category: 'post-transition' },
                { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.7, category: 'post-transition' },
                { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.8, category: 'metalloid' },
                { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.6, category: 'metalloid' },
                { number: 53, symbol: 'I', name: 'Iodine', mass: 126.9, category: 'halogen' },
                { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.3, category: 'noble-gas' },
                { number: 55, symbol: 'Cs', name: 'Cesium', mass: 132.9, category: 'alkali-metal' },
                { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.3, category: 'alkaline-earth' },
                { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.9, category: 'lanthanide' },
                { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.1, category: 'lanthanide' },
                { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.9, category: 'lanthanide' },
                { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.2, category: 'lanthanide' },
                { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145.0, category: 'lanthanide' },
                { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.4, category: 'lanthanide' },
                { number: 63, symbol: 'Eu', name: 'Europium', mass: 152.0, category: 'lanthanide' },
                { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.3, category: 'lanthanide' },
                { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.9, category: 'lanthanide' },
                { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.5, category: 'lanthanide' },
                { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.9, category: 'lanthanide' },
                { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.3, category: 'lanthanide' },
                { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.9, category: 'lanthanide' },
                { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.0, category: 'lanthanide' },
                { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 175.0, category: 'lanthanide' },
                { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.5, category: 'transition' },
                { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.9, category: 'transition' },
                { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.8, category: 'transition' },
                { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.2, category: 'transition' },
                { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.2, category: 'transition' },
                { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.2, category: 'transition' },
                { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.1, category: 'transition' },
                { number: 79, symbol: 'Au', name: 'Gold', mass: 197.0, category: 'transition' },
                { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.6, category: 'transition' },
                { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.4, category: 'post-transition' },
                { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, category: 'post-transition' },
                { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 209.0, category: 'post-transition' },
                { number: 84, symbol: 'Po', name: 'Polonium', mass: 209.0, category: 'metalloid' },
                { number: 85, symbol: 'At', name: 'Astatine', mass: 210.0, category: 'halogen' },
                { number: 86, symbol: 'Rn', name: 'Radon', mass: 222.0, category: 'noble-gas' },
                { number: 87, symbol: 'Fr', name: 'Francium', mass: 223.0, category: 'alkali-metal' },
                { number: 88, symbol: 'Ra', name: 'Radium', mass: 226.0, category: 'alkaline-earth' },
                { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227.0, category: 'actinide' },
                { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.0, category: 'actinide' },
                { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.0, category: 'actinide' },
                { number: 92, symbol: 'U', name: 'Uranium', mass: 238.0, category: 'actinide' },
                { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237.0, category: 'actinide' },
                { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244.0, category: 'actinide' },
                { number: 95, symbol: 'Am', name: 'Americium', mass: 243.0, category: 'actinide' },
                { number: 96, symbol: 'Cm', name: 'Curium', mass: 247.0, category: 'actinide' },
                { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247.0, category: 'actinide' },
                { number: 98, symbol: 'Cf', name: 'Californium', mass: 251.0, category: 'actinide' },
                { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252.0, category: 'actinide' },
                { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257.0, category: 'actinide' },
                { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258.0, category: 'actinide' },
                { number: 102, symbol: 'No', name: 'Nobelium', mass: 259.0, category: 'actinide' },
                { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 266.0, category: 'actinide' },
                { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267.0, category: 'transition' },
                { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268.0, category: 'transition' },
                { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 269.0, category: 'transition' },
                { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 270.0, category: 'transition' },
                { number: 108, symbol: 'Hs', name: 'Hassium', mass: 277.0, category: 'transition' },
                { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 278.0, category: 'transition' },
                { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281.0, category: 'transition' },
                { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 282.0, category: 'transition' },
                { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285.0, category: 'transition' },
                { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 286.0, category: 'post-transition' },
                { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289.0, category: 'post-transition' },
                { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 290.0, category: 'post-transition' },
                { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293.0, category: 'post-transition' },
                { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294.0, category: 'halogen' },
                { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294.0, category: 'noble-gas' },
                { number: -1, symbol: '', name: 'Лантаноиды', mass: 294.0, category: 'lanthanide' },
                { number: -2, symbol: '', name: 'Актиниды', mass: 294.0, category: 'actinide' }
        ];

        const categoryColors: Record<string, string> = {
                'nonmetal': '#a8d5ba',
                'noble-gas': '#c7b8ea',
                'alkali-metal': '#ffb3ba',
                'alkaline-earth': '#ffdfba',
                'metalloid': '#ffffba',
                'halogen': '#ff9eb5',
                'transition': '#bae1ff',
                'post-transition': '#baffc9',
                'lanthanide': '#e6b8ff',
                'actinide': '#f0d09f'
        };

        let selectedElement: Element | null = $state(null);

        function getRowCol(number: number): { row: number; col: number } {
                if (number === 1) return { row: 1, col: 1 };
                if (number === 2) return { row: 1, col: 18 };

                if (number >= 3 && number <= 4) {
                        return { row: 2, col: number - 2 };
                }
                if (number >= 5 && number <= 10) {
                        return { row: 2, col: number + 8 };
                }
                if (number >= 11 && number <= 12) {
                        return { row: 3, col: number - 10 };
                }
                if (number >= 13 && number <= 18) {
                        return { row: 3, col: number  };
                }
                if (number >= 19 && number <= 36) {
                        return { row: 4, col: number - 18 };
                }
                if (number >= 37 && number <= 54) {
                        return { row: 5, col: number - 36 };
                }
                if (number >= 55 && number <= 86) {
                        if (number >= 55 && number <= 56) {
                                return { row: 6, col: number - 54 };
                        }
                        if (number >= 57 && number <= 71) {
                                return { row: 8, col: number - 54 };
                        }
                        if (number >= 72 && number <= 86) {
                                return { row: 6, col: number - 68};
                        }
                }
                if (number >= 87 && number <= 118) {
                        if (number >= 87 && number <= 88) {
                                return { row: 7, col: number - 86 };
                        }
                        if (number >= 89 && number <= 103) {
                                return { row: 9, col: number - 86 };
                        }
                        if (number >= 104 && number <= 118) {
                                return { row: 7, col: number - 100};
                                // return { row: 7, col: number - 86 };
                        }
                }
                if (number == -1) {
                    return {row: 6, col:3}
                }
                if (number == -2) {
                    return {row: 7, col:3}
                }

                return { row: 1, col: 1 };
        }
</script>

<div class="periodic-table-container">
        <h1 class="page-title">Переодическая таблица Менделеева</h1>

        <div class="table-wrapper scroll-auto flex  justify-items-center">
                <div class="periodic-table grid scroll-auto">
                        {#each elements as element(element.number)}
                                {@const { row, col } = getRowCol(element.number)}
                                <button
                                        class="element"
                                        style="grid-row: {row}; grid-column: {col}; background-color: {categoryColors[element.category]}"
                                        onclick={() => selectedElement = element}
                                        aria-label="{element.name} - Atomic number {element.number}"
                                >
                                        <span class="symbol">{element.symbol}</span>
                                        <span class="name">{element.name}</span>
                                        <span class="mass">{element.mass}</span>
                                </button>
                        {/each}
                </div>
        </div>

        {#if selectedElement}
                <div class="element-details">
                        <button class="close-btn" onclick={() => selectedElement = null}>×</button>
                        <h2>{selectedElement.name}</h2>
                        <div class="detail-grid">
                                <div class="detail-item">
                                        <span class="label">Atomic Number:</span>
                                        <span class="value">{selectedElement.number}</span>
                                </div>
                                <div class="detail-item">
                                        <span class="label">Symbol:</span>
                                        <span class="value">{selectedElement.symbol}</span>
                                </div>
                                <div class="detail-item">
                                        <span class="label">Atomic Mass:</span>
                                        <span class="value">{selectedElement.mass}</span>
                                </div>
                                <div class="detail-item">
                                        <span class="label">Category:</span>
                                        <span class="value" style="background-color: {categoryColors[selectedElement.category]}">{selectedElement.category.replace('-', ' ')}</span>
                                </div>
                        </div>
                </div>
        {/if}

        <div class="legend">
                <h3>Legend</h3>
                <div class="legend-items">
                        {#each Object.entries(categoryColors) as [category, color](category)}
                                <div class="legend-item">
                                        <div class="legend-color" style="background-color: {color}"></div>
                                        <span>{category.replace('-', ' ')}</span>
                                </div>
                        {/each}
                </div>
        </div>
</div>

<style>
        .periodic-table-container {
                margin: 0 auto;
                padding: 20px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .page-title {
                text-align: center;
                color: inherit;
                margin-bottom: 30px;
                font-size: 2.5em;
        }

        .table-wrapper {
                overflow-x: auto;
                padding: 20px 0;
        }

        .periodic-table {
                gap: 4px;
                justify-content: center;
        }

        .element {
                aspect-ratio: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 6px;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 4px;
                min-width: 70px;
        }

        .element:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 10;
        }

        .atomic-number {
                font-size: 0.65em;
                position: absolute;
                top: 4px;
                left: 4px;
        }

        .symbol {
                font-size: 1.4em;
                font-weight: bold;
                margin: 2px 0;
        }

        .name {
                font-size: 0.55em;
                text-align: center;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 90%;
        }

        .mass {
                font-size: 0.5em;
                opacity: 0.8;
        }

        .element-details {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                margin-top: 30px;
                position: relative;
                border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2em;
                cursor: pointer;
                color: inherit;
                line-height: 1;
        }

        .close-btn:hover {
                opacity: 0.7;
        }

        .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
        }

        .detail-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
        }

        .label {
                font-size: 0.9em;
                opacity: 0.8;
        }

        .value {
                font-size: 1.2em;
                font-weight: bold;
                padding: 8px 12px;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.1);
        }

        .legend {
                margin-top: 40px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
        }

        .legend h3 {
                margin-bottom: 15px;
                color: inherit;
        }

        .legend-items {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
        }

        .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
        }

        .legend-color {
                width: 24px;
                height: 24px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
                .page-title {
                        font-size: 1.8em;
                }

                .periodic-table {
                        gap: 2px;
                }

                .element {
                        min-width: 40px;
                        padding: 2px;
                }

                .symbol {
                        font-size: 1.1em;
                }

                .name {
                        font-size: 0.45em;
                }

                .mass {
                        font-size: 0.4em;
                }
        }
</style>