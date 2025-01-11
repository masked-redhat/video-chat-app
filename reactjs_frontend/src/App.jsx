import CurrentUsername from "./components/CurrentUsername";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Username from "./components/Username";
import Users from "./components/Users";
import Video from "./components/Video";

function App() {
  return (
    <div className="flex flex-col gap-4 h-[95vh]">
      <Header />
      <main className="flex flex-col gap-3">
        <Username message="" username="" />
        <div className="flex gap-2">
          <Video />
          <Video />
        </div>
        <CurrentUsername username="fuddu" />
        <Users users={[{ username: "kartik" }, { username: "saloni" },{ username: "kartik" }, { username: "saloni" },{ username: "kartik" }, { username: "saloni" },{ username: "kartik" }, { username: "saloni" }]} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
