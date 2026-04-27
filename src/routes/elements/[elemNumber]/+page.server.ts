import { elements, type ChemElement } from '$lib/data/elements';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const num = Number.parseInt(params.elemNumber)

    let elem: ChemElement|null = null;

    if (!num){
        console.log("Incorrect element number");
        return {elem: elem};
    }

    if (num > 0 && num < elements.length){
        elem = elements[num-1]
    }

    return {
        elem: elem
    };
};



