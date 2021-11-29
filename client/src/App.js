import Header from "./ui/Header";
import Routers from "./Routers/Route";

function App() {
  return (
    <>
      <div style={AppStyle}>
        {/* 헤더 영역 */}
        <Header />

        {/* 컨텐츠 영역 */}
        {/* 컨텐츠 영역을 라우터로 분리 */}
        <Routers />
      </div>
    </>
  );
}

const AppStyle = {
  margin: 0,
  padding: 0,

  backgroundColor: "#F5F6F7",

  display: "block",
  overflow: "hidden",

  minHeight: window.innerHeight,
};

export default App;
