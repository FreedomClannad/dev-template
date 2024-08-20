import "./App.css";
// import { MolSVG } from "../lib/main";
import { MolIMG } from "@/MolIMG";
import { useState } from "react";
function App() {
	const [textarea, setTextarea] = useState<string>("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [mol, setMol] = useState<string>(`Benzene
   Ketcher  8152413542D 1   1.00000     0.00000     0

 12 13  0  0  0  0  0  0  0  0999 V2000
    7.3848   -1.7751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -1.7746    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2516   -1.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -2.7755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.3848   -2.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2538   -3.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9812   -3.2755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7115   -3.2739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8476   -2.7748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7121   -4.2748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9819   -4.2805    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8512   -4.7749    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  3  1  2  0     0  0
  1  5  1  0     0  0
  5  6  2  0     0  0
  6  4  1  0     0  0
  4  2  2  0     0  0
  2  3  1  0     0  0
  4  7  1  0     0  0
  9  7  2  0     0  0
  7 11  1  0     0  0
 11 12  2  0     0  0
 12 10  1  0     0  0
 10  8  2  0     0  0
  8  9  1  0     0  0
M  END`);

	const handleClick = () => {
		setMol(`Benzene
   ${textarea}`);
	};

	return (
		<>
			<textarea
				onChange={e => {
					setTextarea(e.target.value);
				}}
			></textarea>
			<button onClick={handleClick}>生成</button>
			<div>
				<MolIMG mol={mol} height={200} width={200}></MolIMG>
			</div>
		</>
	);
}

export default App;
