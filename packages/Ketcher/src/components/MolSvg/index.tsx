import { useId, CSSProperties, useEffect, useRef, memo, useState, MouseEvent } from "react";
import { MolSerializer } from "ketcher-core";
import { HighlightMol, RenderStruct } from "./renderStruct";
import { LoadingOutlined } from "@ant-design/icons";
import { defaultIcons } from "./common";
import { svgTransformUrl } from "../../utils";
import "./index.css";
// 这里是使用rc-image
import Image from "rc-image";
import "rc-image/assets/index.css";
// 这里使用修改rc-image源码生成的，原因是原版的开启放大后，永远放大的第一次倍数是1，改版的已经修复了这个bug
// import Image from "am-image";
// import "am-image/assets/index.css";

interface Props {
	mol: string;
	id?: string;
	className?: string;
	style?: CSSProperties;
	width?: number;
	height?: number;
	highlight?: HighlightMol | null;
	options?: any;
	preview?: boolean | { minScale: number; maxScale: number };
}
const MolSVG = memo((props: Props) => {
	const {
		id = useId(),
		className = "",
		style = {},
		height = 400,
		width = 400,
		mol,
		highlight = null,
		options = {},
		preview = false
	} = props;
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);
	const [previewSrc, setPreviewSrc] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const MoleculeRef = useRef<HTMLDivElement>(null);
	const { minScale, maxScale } = typeof preview === "object" ? preview : { minScale: 1, maxScale: 50 };
	useEffect(() => {
		renderSVG();
	}, [mol]);
	/******** 普通方法开始 ********/

	/**
	 * 渲染SVG
	 */
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const renderSVG = () => {
		setLoading(true);
		if (MoleculeRef && MoleculeRef.current && mol) {
			const clientArea = MoleculeRef.current;
			try {
				const molSerializer = new MolSerializer();
				const struct = molSerializer.deserialize(mol);
				struct.name = id;
				RenderStruct.render(
					clientArea,
					struct,
					{
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
				);
			} catch (e) {
				console.error("渲染分子SVG错误:", e);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleZoom = (e: MouseEvent) => {
		if (MoleculeRef.current) {
			const clientArea = MoleculeRef.current;
			const url = svgTransformUrl(clientArea);
			if (url) {
				setPreviewSrc(url);
				setPreviewVisible(true);
			}
		}

		e.stopPropagation();
	};
	/******** 普通方法结束 ********/
	return (
		<>
			<div style={{ height, width }}>
				<div ref={MoleculeRef} id={id} className={["am-molecule-svg", className].join(" ")} style={{ height, width, ...style }}>
					{loading && (
						<>
							<div className="am-molecule-loading">
								<span style={{ marginBottom: "15px", color: "#9DA4B1" }}>Loading</span>
								<LoadingOutlined style={{ fontSize: "30px" }} rev={undefined} />
							</div>
						</>
					)}
					{preview && mol && (
						<>
							<button className="am-molecule-zoom" onClick={handleZoom}>
								<i className="iconfont dr-magnifier"></i>
							</button>
						</>
					)}
				</div>
				{preview && mol && (
					<>
						<div
							onClick={(e: MouseEvent) => {
								e.stopPropagation();
							}}
							style={{ display: "none", zIndex: 1, pointerEvents: "none" }}
						>
							<Image
								src=""
								preview={{
									icons: defaultIcons,
									src: previewSrc,
									visible: previewVisible,
									movable: false,
									rootClassName: "am-molecule-preview",
									minScale,
									maxScale,
									onVisibleChange: visible => {
										setPreviewVisible(visible);
									}
								}}
							></Image>
						</div>
					</>
				)}
			</div>
		</>
	);
});
MolSVG.displayName = "MolSVG";
export { MolSVG };
