import ReactDom from "react-dom/client";

const App = () => {
    return <div>首页</div>
}

ReactDom.createRoot(document.getElementById("root")!).render(<App/>)