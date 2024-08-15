import { MolSerializer, LogSettings } from "ketcher-core";
import { useEffect, useRef } from "react";
import { HighlightMol, RenderStruct } from "./renderStruct";
import { v4 as uuid4 } from "uuid";

type Props = {
	mol: string;
	id?: string;
	width?: number;
	height?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options?: any;
	highlight?: HighlightMol;
};

const MolSVG = (props: Props) => {
	const { mol, id = uuid4(), width = 400, height = 400, options, highlight } = props;
	const moleculeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 新版加了日志
		const logging: LogSettings = { enabled: false, showTrace: false, level: 0 };
		console.log("ketcher" in window && window.ketcher !== undefined);
		if (!("ketcher" in window && window.ketcher !== undefined)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).ketcher = { logging };
		}
		renderSVG();
	}, [mol]);

	const renderSVG = () => {
		if (moleculeRef && moleculeRef.current && mol) {
			const clientArea = moleculeRef.current;
			console.log(clientArea);
			try {
				const molSerializer = new MolSerializer();
				const struct = molSerializer.deserialize(mol);
				struct.name = id;
				RenderStruct.render({
					el: clientArea,
					struct,
					options: {
						scale: 75,
						autoScale: true,
						autoScaleMargin: 30,
						width: width || clientArea.clientWidth - 10,
						height: height || clientArea.clientHeight - 10,
						showValenceWarnings: false,
						showValence: false,
						...options
					},
					highlight
				});
			} catch (e) {
				console.error("渲染分子SVG错误:", e);
			} finally {
				console.log("结束");
			}
		}
	};
	return (
		<div style={{ width, height }}>
			<div ref={moleculeRef}></div>
		</div>
	);
};

export { MolSVG };
