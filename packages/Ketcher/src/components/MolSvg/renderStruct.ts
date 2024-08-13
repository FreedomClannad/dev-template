import { Render, Struct, fromHighlightCreate } from "ketcher-core";
export interface HighlightMol {
	atoms: number[];
	bonds: number[];
	color?: string;
}
const renderCache = new Map();

export class RenderStruct {
	static prepareStruct(struct: Struct) {
		if (struct.sgroups.size > 0) {
			const newStruct = struct.clone();
			newStruct.sgroups.delete(0);
			return newStruct;
		}
		return struct;
	}

	static render(el: HTMLElement | null, struct: Struct | null, options: any = {}, highlight?: HighlightMol | null) {
		if (el && struct) {
			const { cachePrefix = "", needCache = true } = options;
			const cacheKey = `${cachePrefix}${struct.name}`;
			if (renderCache.has(cacheKey) && needCache) {
				el.innerHTML = renderCache.get(cacheKey);
				return;
			}
			const preparedStruct = this.prepareStruct(struct);
			preparedStruct.initHalfBonds();
			preparedStruct.initNeighbors();
			preparedStruct.setImplicitHydrogen();
			preparedStruct.markFragments();
			const rnd = new Render(el, {
				autoScale: true,
				...options
			});
			preparedStruct.rescale();
			rnd.setMolecule(preparedStruct);
			if (highlight) {
				const { atoms, bonds, color = "#FF7F50" } = highlight;
				const atomsMap = rnd.ctab.atoms;
				const boundsMap = rnd.ctab.bonds;
				const atomList = Array.from(atomsMap.keys());
				const boundsList = Array.from(boundsMap.keys());
				const nAtoms: number[] = [];
				const nBonds: number[] = [];
				atoms?.forEach(index => {
					nAtoms.push(atomList[index]);
				});
				bonds?.forEach(index => {
					nBonds.push(boundsList[index]);
				});
				fromHighlightCreate(rnd.ctab, [{ atoms: nAtoms, bonds: nBonds, color }]);
				rnd.update();
			}
			if (needCache) {
				renderCache.set(cacheKey, rnd.clientArea.innerHTML);
			}
		}
	}
}
